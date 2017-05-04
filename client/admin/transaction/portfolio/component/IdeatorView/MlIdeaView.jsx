import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorLookingForActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {fetchIdeaActionHandler} from '../../../../../app/ideators/actions/IdeaActionHandler'
import _ from 'lodash';


export default class MlIdeaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:true,
      portfolioIdeatorInfo: {}
    }
    // this.fetchPortfolioInfo.bind(this);
    // this.fetchAnnotations.bind(this);
    // this.initalizeAnnotaor.bind(this);
    // this.annotatorEvents.bind(this);
    this.fetchIdeatorIdeas.bind(this);

  }

  // initalizeAnnotaor(){
  //   initializeMlAnnotator(this.annotatorEvents.bind(this))
  //   this.state.content = jQuery("#lookingForContent").annotator();
  //   this.state.content.annotator('addPlugin', 'MyPlugin', {
  //     pluginInit:  function () {
  //     }
  //   });
  //
  //
  // }
  //
  // annotatorEvents(event, annotation, editor){
  //   if(!annotation)
  //     return;
  //   switch (event){
  //     case 'create':{
  //       let response = this.createAnnotations(annotation);
  //     }
  //       break;
  //     case 'update':{
  //     }
  //       break;
  //     case 'annotationViewer':{
  //       if(annotation[0].id){
  //         this.props.getSelectedAnnotations(annotation[0]);
  //       }else{
  //         this.props.getSelectedAnnotations(annotation[1]);
  //       }
  //     }
  //       break;
  //   }
  // }
  //
  // async createAnnotations(annotation){
  //   let details = {portfolioId:this.props.portfolioDetailsId, docId:"lookingFor", quote:JSON.stringify(annotation)}
  //   const response = await createAnnotationActionHandler(details);
  //   if(response && response.success){
  //     this.fetchAnnotations(true);
  //   }
  //   return response;
  // }
  //
  // async fetchAnnotations(isCreate){
  //   const response = await findAnnotations(this.props.portfolioDetailsId, "lookingFor");
  //   let resp = JSON.parse(response.result);
  //   let annotations = this.state.annotations;
  //   this.setState({annotations:JSON.parse(response.result)})
  //
  //   let quotes = [];
  //
  //   _.each(this.state.annotations, function (value) {
  //     quotes.push({
  //       "id":value.annotatorId,
  //       "text" : value.quote.text,
  //       "quote" : value.quote.quote,
  //       "ranges" : value.quote.ranges,
  //       "userName" : value.userName,
  //       "createdAt" : value.createdAt
  //     })
  //   })
  //   this.state.content.annotator('loadAnnotations', quotes);
  //
  //   return response;
  // }
  componentWillMount(){
    this.fetchIdeatorIdeas();
  }
  async fetchIdeatorIdeas() {
    let ideaId = this.props.ideaId;
    const response = await fetchIdeaActionHandler();
    if(response){
      // this.setState({loading:false, ideas:response})
      let currentIdea ={}
      _.each(response, function (idea) {
        if(idea._id == ideaId){
          currentIdea = idea
        }
      })
      this.setState({loading:false, idea:currentIdea})
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

    // this.initalizeAnnotaor()
    // this.fetchPortfolioInfo();
    // this.fetchAnnotations();
    initalizeFloatLabel();
  }

  // async fetchPortfolioInfo(){
  //   const response = await findIdeatorLookingForActionHandler(this.props.portfolioDetailsId);
  //   if(response){
  //     this.setState({portfolioIdeatorInfo : response});
  //   }
  //
  // }

  render(){
    const showLoader = this.state.loading;

    return (
      <div className="admin_padding_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div>
        <h2>About Ideas</h2>
        <div className="col-lg-2 col-lg-offset-5 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4">
          <a href="#" >
            <div className="list_block notrans">
              <FontAwesome name='lock'/>
              {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
              <div className="hex_outer portfolio-font-icons"><span className="ml ml-idea"></span></div>
              <h3>Ideas</h3>
            </div>
          </a>
        </div>
        <div className="form_bg col-lg-8 col-lg-offset-2">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Title" className="form-control float-label" id="cluster_name" defaultValue={this.state.idea.title} name="title" readOnly="true"/>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasTitlePrivate" /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.idea.isIdeaTitlePrivate}/>
            </div>
            <div className="form-group">
              <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={this.state.idea.description} name="description" readOnly="true"></textarea>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeasPrivate"/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.idea.isIdeaPrivate}/>
            </div>
          </form>
        </div>
      </div>)}
      </div>

    )



  }
}
