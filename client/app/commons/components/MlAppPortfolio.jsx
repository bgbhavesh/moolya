import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import classNames from "classnames"
import { render } from 'react-dom';
import formHandler from '../../../commons/containers/MlFormHandler';
import {updatePortfolioActionHandler, updateIdeatorIdeaActionHandler, requestProtfolioForGoLive} from '../../../../client/admin/transaction/portfolio/actions/updatePortfolioDetails';
import {fetchTemplateHandler} from "../../../commons/containers/templates/mltemplateActionHandler";
import {findComments} from '../../../commons/annotaterComments/findComments'
import {createCommentActionHandler} from '../../../commons/annotaterComments/createComment';
import {resolveCommentActionHandler} from '../../../commons/annotaterComments/createComment';
import {reopenCommentActionHandler} from '../../../commons/annotaterComments/createComment';
import AppActionButtons from '../../commons/components/appActionButtons'
import moment from "moment";
import MlCustomActionButtons from '../../ideators/components/MlCustomActionButtons'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import {fetchIdeaByPortfolioId} from '../../ideators/actions/IdeaActionHandler'
import MlLoader from '../../../commons/components/loader/loader';
import MlAppActionComponent from './MlAppActionComponent';
import MlAccordion from './MlAccordion';
import PopoverActionIcon from '../../../app/appActions/components/PopoverActionIcon';
import Connect from  "../../../app/appActions/components/Connect";
import Inquiry from  "../../../app/appActions/components/Inquiry";
import Review from  "../../../app/appActions/components/Review";
import handleLikeAction from '../../../app/appActions/actions/likeActionHandler';
import handleFollowAction from '../../../app/appActions/actions/followActionHandler';
import handleFavouriteAction from '../../../app/appActions/actions/favouriteActionHandler';

class MlAppPortfolio extends React.Component{
  constructor(props){
    super(props)
    this.state = {editComponent:'', portfolio:{}, selectedTab:"", annotations:[], isOpen:false,
      annotationData: {},commentsData:[], popoverOpen: false, saveButton:false}
    this.fetchEditPortfolioTemplate.bind(this);
    this.fetchViewPortfolioTemplate.bind(this);
    this.getPortfolioDetails.bind(this);
    this.getContext.bind(this);
    this.getSelectedAnnotation.bind(this);
    this.fetchComments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.fetchIdeaId.bind(this);
    this.interactionActionHandler.bind(this);
    return this;
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  componentDidMount(){
    let portfolioId = this.props.config;
    var pathname = window.location.pathname
    if(pathname.indexOf("view") != -1 || pathname.indexOf("edit") != -1 || this.props.communityType != "ideator"){
      this.setState({isMyPortfolio:true})
    }
  }

  getContext(){
    return {
      annotationsInfo: this.state.annotations
    }
  }
  getSelectedAnnotation(selAnnotation){
    if(!this.state.popoverOpen){
      this.toggle();
      $('.comment-input-box').slideToggle();
     }
    if(selAnnotation){
      this.setState({annotationData : selAnnotation},function(){
        this.fetchComments(selAnnotation.id);
      })
    }


  }

  commentClicked(){

    $('.comment-input-box').slideToggle();
    this.setState({"saveButton" : true})

  }

  async componentWillMount() {

    if(this.props.viewMode){
      this.fetchViewPortfolioTemplate(this.props.config);
    }else{
      this.fetchEditPortfolioTemplate(this.props.config);
    }
    if(this.props.communityType == "Ideators"){
      this.setState({loading:true});
      this.fetchIdeaId()
    }else if(this.props.communityType =="ideator"){
      this.setState({loading:true});
      this.fetchIdeaId()
    }else{
      this.setState({ideaId:" "})
    }
  }

  async fetchEditPortfolioTemplate(pId) {
      let userType = this.context.userType;
      const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:userType});
      this.setState({editComponent:reg&&reg.component?reg.component:null});
  }

  async fetchViewPortfolioTemplate(id) {
    let userType = this.context.userType;
    const reg= await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:id, mode:"view", userType:userType});
    this.setState({editComponent:reg&&reg.component?reg.component:null});
  }

  async onSavingComment(){
    let commentsData={
      annotatorId : this.state.annotationData.id,
      portfolioId : this.props.config,
      comment :  this.refs.comment.value
    }

    const response =  await createCommentActionHandler(commentsData)

    if(response){
      this.setState({annotationData : this.state.annotationData},function(){
        this.fetchComments(this.state.annotationData.id);
      })
    }
  }

  async onResolveComment(){
    const response = await resolveCommentActionHandler(this.state.annotationData.id)
    return response;
  }


  async onReopenComment(){
    const response = await reopenCommentActionHandler(this.state.annotationData.id)
    return response;
  }


  async fetchComments(annotationId){
    if(annotationId){
      const response = await findComments(annotationId);
      this.setState({commentsData : response},function () {

      });
    }
  }
  async fetchIdeaId(){
      let portfolioId = this.props.config;
      const response = await fetchIdeaByPortfolioId(portfolioId);
      this.setState({loading:false, ideaId : response._id});
  }
  getIdeatorIdeaDetails(details){
    this.setState({idea:details});
  }

  getPortfolioDetails(details){
    this.setState({portfolio:details});
  }

  async updatePortfolioDetails() {
    let jsonData={
      portfolioId :this.props.config,
      portfolio :this.state.portfolio
    }
    const response = await updatePortfolioActionHandler(jsonData)
    if(response){
      if(this.props.communityType == "Ideators" || this.props.communityType == "ideator"){
        let idea = this.state.idea
        if(idea){
          const response1 = await updateIdeatorIdeaActionHandler(idea)
          return response1;
        }
      }
      return response;
    }
  }

  async testEditPortfolioDetails(){
    console.log('edit testing')
  }

  async requestForGoLive(){
      console.log("golive")
      let portfolioId = this.props.config;
      requestProtfolioForGoLive(portfolioId);
  }

  async handleSuccess(response) {
    FlowRouter.go("/app/portfolio");
  };

  //handler for like,review,comment,inquiry,collaborate,connect
  interactionActionHandler(actionConfig,handlerCallback) {
    var resourceDetails={resourceId:this.props.config,resourceType:'portfolio'};
    if(handlerCallback) {
      handlerCallback(resourceDetails);
    }else if(actionConfig&&actionConfig.handleCallBack){
      actionConfig.handleCallBack(resourceDetails);
    }
  }

  render(){
    let that=this;
      let appActionConfig= [{showAction: true,actionName: 'connect',hasPopOver:true,popOverTitle:'Connect Request',placement:'top',target:'connectRequest',popOverComponent:<Connect />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'like',handleCallBack:handleLikeAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'favourite',handleCallBack:handleFavouriteAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'follow',handleCallBack:handleFollowAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'enquire',hasPopOver:true,popOverTitle:'Enquire',placement:'top',target:'enquireRequest',popOverComponent:<Inquiry />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'review',hasPopOver:true,popOverTitle:'Review',placement:'top',target:'reviewRequest',popOverComponent:<Review />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'save',handler: async(event) => this.props.handler(this.updatePortfolioDetails.bind(this), this.handleSuccess.bind(this))},
      {showAction: true,actionName: 'edit',handler: async(event) => this.props.handler(this.testEditPortfolioDetails.bind(this))},
      {showAction: true,actionName: 'golive',handler: async(event) => this.props.handler(this.requestForGoLive.bind(this))}
      ];

    export const genericPortfolioAccordionConfig= {id:'portfolioAccordion',
      panelItems:[{'title':'Related',isText:true,contentComponent:'upcoming',style:{'background': '#273545'}},
        {'title':'Actions',isText:false,style:{'background': '#ef4647'},contentComponent:<MlAppActionComponent resourceDetails={{resourceId:this.props.config,resourceType:'portfolio'}} actionOptions={appActionConfig}  />}]
    };

    let EditComponent = ""; let ViewComponent = "";
    if(this.props.viewMode){
      ViewComponent=this.state.editComponent;
    }else{
      EditComponent=this.state.editComponent;
    }


    let hasViewComponent = false
    let hasEditComponent = false
    if(EditComponent != "")
      hasEditComponent  = true
    if(ViewComponent != "")
      hasViewComponent = true

    let annotations = this.state.annotations;
    let annotationDetails = this.state.annotationData;
    let isMyPortfolio = this.state.isMyPortfolio
    const showLoader=this.state.loading;
    return(
      <div className="app_main_wrap">
        {showLoader===true?(<MlLoader/>):(
          <div className="app_padding_wrap">
              {hasEditComponent && <EditComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} getIdeatorIdeaDetails={this.getIdeatorIdeaDetails.bind(this)} portfolioDetailsId={this.props.config} ideaId={this.state.ideaId}/>}
                {hasViewComponent && <ViewComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} portfolioDetailsId={this.props.config} ideaId={this.state.ideaId} annotations={annotations} getSelectedAnnotations={this.getSelectedAnnotation.bind(this)}/>}
          </div>)}
        <div className="overlay"></div>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverTitle>Portfolio Annotations</PopoverTitle>
            <PopoverContent>
              <div className="ml_annotations">
                <div className="comments-container cus_scroll large_popover">
                  <ul id="comments-list" className="comments-list">
                    <li>
                      <div className="comment-main-level">
                        <div className="comment-avatar"><img src="/images/p_1.jpg" alt=""/></div>
                        <div className="comment-box">
                          <div style={{marginTop:'8px'}} className="annotate">1</div>
                          <div style={{paddingLeft:'50px'}} className="comment-head">
                            <h6 className="comment-name"> {annotationDetails.userName?annotationDetails.userName:""}</h6>
                            <div className="author">Chapter Manager</div>
                            <span>{moment(annotationDetails.createdAt).format('DD MM YYYY,HH:MM:SS')}</span>
                          </div>
                          <div className="comment-content">
                            {annotationDetails.text}
                          </div>

                        </div>
                      </div>
                      <div className="ml_btn">
                        <a href="#" className="save_btn"  onClick={this.onResolveComment.bind(this)}>Resolve</a>
                        <a href="#" className="cancel_btn"  onClick={this.onReopenComment.bind(this)}>Re open</a>
                        <a href="#" className="cancel_btn"  onClick={this.commentClicked.bind(this)}>Comment</a>
                      </div>
                      <div>
                        <textarea ref="comment" id="comment" className="form-control comment-input-box" placeholder="Enter your comment here"></textarea>
                        <div className="ml_icon_btn">
                          <a href="#" data-id={annotationDetails.id} className="save_btn"><span
                            className="ml ml-save"  onClick={this.onSavingComment.bind(this)}></span></a>
                        </div>
                      </div>

                      <ul className="comments-list reply-list">
                        {that.state.commentsData.map(function (options, key) {
                          return(<li key={key}>
                            <div className="comment-avatar">
                              <img src="/images/p_2.jpg" alt=""/>
                            </div>
                            <div className="comment-box">
                              <div className="comment-head">
                                <h6 className="comment-name">{options.userName}</h6>
                                <span>{moment(options.createdAt).format('DD MM YYYY,HH:MM:SS')}</span>
                              </div>
                              <div className="comment-content">
                                {options.comment}
                              </div>
                            </div>
                          </li>)
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="overlay"></div>
            </PopoverContent>
          </Popover>
        {/*{isMyPortfolio?<AppActionButtons ActionOptions={appActionConfig} showAction='showAction' actionName="actionName"/>:<MlCustomActionButtons/>}*/}
        {isMyPortfolio?<MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />:<MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />}
      </div>
    )
  }
}

MlAppPortfolio.contextTypes = {
  userType: PropTypes.string,
  annotationsInfo :  PropTypes.array,
};

export default MlAppPortfolio = formHandler()(MlAppPortfolio);
