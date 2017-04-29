import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorAudienceActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import 'react-responsive-tabs/styles.css'
export default class MlPortfolioIdeatorAudienceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {}
    }
    this.fetchPortfolioInfo.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.fetchAnnotations.bind(this);
    this.annotatorEvents.bind(this);
  }

  initalizeAnnotaor(){
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#audienceContent").annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit:  function () {
      }
    });


  }

  async createAnnotations(annotation){
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"audience", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }

  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "audience");
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
        "createdAt" : value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
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

  componentDidMount()
  {
    $('.actions_switch').click();

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

  async fetchPortfolioInfo(){
    const response = await findIdeatorAudienceActionHandler(this.props.portfolioDetailsId);
    if(response){
      this.setState({portfolioIdeatorInfo : response});
    }
  }

  render(){
    return (

      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Audience</h2>
          <div id="audienceContent" className="panel panel-default panel-form-view">

            <div className="panel-body">
              {this.state.portfolioIdeatorInfo.description}
            </div>
          </div>
        </div>
      </div>


    )
  }
}
