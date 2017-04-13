import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler, findAnnotations} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'

export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {},
      annotations:[],
      content:{}
    }

    this.createAnnotations.bind(this);
    this.fetchPortfolioInfo.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
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
              this.createAnnotations(annotation);
          }
          break;
          case 'update':{

          }
          break;
      }
  }

  async createAnnotations(annotation){
      let details = {portfolioId:this.props.portfolioDetailsId, docId:"problems", quote:JSON.stringify(annotation)}
      const response = await createAnnotationActionHandler(details);
      return response;
  }

  async fetchAnnotations(){
    const response = await findAnnotations(this.props.portfolioDetailsId, "problems");
    this.setState({annotations:JSON.parse(response.result)})
    if(this.state.annotations.length > 0){
        var annotator = jQuery("#psContent").data('annotator');
        this.state.content.annotator('loadAnnotations', this.state.annotations);
    }
    return response;
  }

  componentDidMount()
  {
    this.initalizeAnnotaor()
    this.fetchPortfolioInfo();
    this.fetchAnnotations();
    initalizeFloatLabel();
  }

  async fetchPortfolioInfo(){
      const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
      this.setState({portfolioIdeatorInfo : response});
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
                    </div>
                  </div></div>
              </div>
            </div>


          </div>

        </div>

      </div>



    )
  }
}
