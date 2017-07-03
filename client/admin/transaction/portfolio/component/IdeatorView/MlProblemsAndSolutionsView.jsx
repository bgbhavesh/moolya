import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import 'react-responsive-tabs/styles.css'
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import _ from 'lodash'
import {validateUserForAnnotation} from '../../actions/findPortfolioIdeatorDetails'

export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
  constructor(props, context) {
      super(props);
      this.state = {
          portfolioIdeatorInfo: {
            problemImage:[],
            solutionImage:[]
          },
          annotations:[],
        content:{}
      }

      this.createAnnotations.bind(this);
      this.fetchPortfolioInfo.bind(this);
      //this.fetchAnnotations.bind(this);
      this.initalizeAnnotaor.bind(this);
      this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
    }

  initalizeAnnotaor(){
      initializeMlAnnotator(this.annotatorEvents.bind(this))
      this.state.content = jQuery("#psContent").annotator();
      this.state.content.annotator('addPlugin', 'MyPlugin', {
          pluginInit:  function () {
          }
      });
  }




  annotatorEvents(event, annotation, editor){
      if(!annotation)
          return;
      switch (event){
          case 'create':{
              let response = this.createAnnotations(annotation);
          }
          break;
          case 'update':{
          }
          break;
          case 'annotationViewer':{
            if(annotation[0].id){
              this.props.getSelectedAnnotations(annotation[0]);
            }else{
              this.props.getSelectedAnnotations(annotation[1]);
            }

          }
          break;
      }
  }

  async createAnnotations(annotation){
      let details = {portfolioId:this.props.portfolioDetailsId, docId:"problems", quote:JSON.stringify(annotation)}
      const response = await createAnnotationActionHandler(details);
      if(response && response.success){
        this.fetchAnnotations(true);
      }
      return response;
  }



  async fetchAnnotations(isCreate){
      const response = await findAnnotations(this.props.portfolioDetailsId, "problems");
      let resp = JSON.parse(response.result);
      let annotations = this.state.annotations;
      this.setState({annotations:JSON.parse(response.result)})

          let quotes = [];

          _.each(this.state.annotations, function (value) {
              quotes.push({
                  "id":value.annotatorId,
                  "text" : value.quote.text,
                  "quote" : value.quote.quote,
                  "ranges" : value.quote.ranges,
                  "userName" : value.userName,
                  "roleName" : value.roleName,
                  "profileImage" : value.profileImage,
                  "createdAt" : value.createdAt
              })
          })
          this.state.content.annotator('loadAnnotations', quotes);

      return response;
  }
  componentWillMount() {
    let resp = this.validateUserForAnnotation();
    return resp
  }

  componentDidMount(){
    $('.actions_switch').click();

    this.fetchPortfolioInfo();

    //this.fetchAnnotations();
    initalizeFloatLabel();
  }
  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({isUserValidForAnnotation:response})
      this.initalizeAnnotaor()
      this.fetchAnnotations()
    }
  }

  async fetchPortfolioInfo(){
      const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
      response.problemImage ? response.problemImage : response.problemImage =[];
      response.solutionImage ? response.solutionImage : response.solutionImage =[];
      this.setState({portfolioIdeatorInfo : response});
      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
  }

  render(){
    return (

      <div>

        <h2>Problems and Solutions </h2>



        <div id="psContent" className="ml_tabs">
          <ul  className="nav nav-pills">
            <li className="active">
              <a  href="#1a" data-toggle="tab">Problems</a>
            </li>
            <li><a href="#2a" data-toggle="tab">Solutions</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      {this.state.portfolioIdeatorInfo.problemStatement}
                      {this.state.portfolioIdeatorInfo.problemImage.map(function (imgLink, i) {
                        return <img className="upload-image img upload" src={imgLink.fileUrl} key={i} />
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="2a">
              <div className="col-lg-12 col-sm-12">
                <div className="row">
                  <div className="panel panel-default panel-form-view">

                    <div className="panel-body">
                      {this.state.portfolioIdeatorInfo.solutionStatement}
                      {this.state.portfolioIdeatorInfo.solutionImage.map(function (imgLink, i) {
                        return <img className="upload-image img upload" src={imgLink.fileUrl} key={i} />
                      })}
                    </div>
                  </div></div>
              </div>
            </div>


          </div>

        </div>
          {/*<a href="#" id="annotationss">one</a>*/}
      </div>



    )
  }
}
