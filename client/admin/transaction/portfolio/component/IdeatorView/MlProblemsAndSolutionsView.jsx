import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'

export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
  constructor(props, context) {
    super(props);
    console.log(context);
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

  componentWillUpdate(nextProps, nextState){
    console.log(nextState)
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
              $('.ml-annotate').click();
              // this.state.annotations.indexOf()
              this.props.getSelectedAnnotations(annotation);
          }
          break;
      }
  }

  async createAnnotations(annotation){
      let details = {portfolioId:this.props.portfolioDetailsId, docId:"problems", quote:JSON.stringify(annotation)}
      const response = await createAnnotationActionHandler(details);
      if(response && response.success){
        this.fetchAnnotations();
      }
      return response;
  }

  async fetchAnnotations(){
    const response = await findAnnotations(this.props.portfolioDetailsId, "problems");
    this.setState({annotations:JSON.parse(response.result)})
    if(this.state.annotations.length > 0){
        let quotes = [];
        _.each(this.state.annotations, function (value) {
          quotes.push(value.quote)
        })
        var annotator = jQuery("#psContent").data('annotator');
        this.state.content.annotator('loadAnnotations', quotes);
    }
    return response;
  }

  componentDidMount(){
    $('.actions_switch').click();
      $(".ml-annotate").popover({
        'title' : 'Annotations',
        'html' : true,
        'placement' : 'top',
        'container' : '.admin_main_wrap',
        'content' : $(".ml_annotations").html()
      });
    $("#timeLine").popover({
      'title' : 'Timeline',
      'html' : true,
      'placement' : 'top',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_timeline").html()
    });
    $(document).on('click', '.add_comment', function(e){
      $('.comment-input-box').slideToggle();
    });

    this.initalizeAnnotaor()
    this.fetchPortfolioInfo();
    this.fetchAnnotations();
    initalizeFloatLabel();
  }

  async componentWillMount() {
    this.props.getSelectedTab("problems");
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
          {/*<a href="#" id="annotationss">one</a>*/}
      </div>



    )
  }
}
