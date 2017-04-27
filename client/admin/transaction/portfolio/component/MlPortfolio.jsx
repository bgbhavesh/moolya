import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import classNames from "classnames"
import { render } from 'react-dom';
import formHandler from '../../../../commons/containers/MlFormHandler';
import {updatePortfolioActionHandler} from '../actions/updatePortfolioDetails';
import {fetchTemplateHandler} from "../../../../commons/containers/templates/mltemplateActionHandler";
import MlActionComponent from '../../../../commons/components/actions/ActionComponent';
import {findComments} from '../../../../commons/annotaterComments/findComments'
import {createCommentActionHandler} from '../../../../commons/annotaterComments/createComment';
import {resolveCommentActionHandler} from '../../../../commons/annotaterComments/createComment';
import {reopenCommentActionHandler} from '../../../../commons/annotaterComments/createComment';
import moment from "moment";
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';


class MlPortfolio extends React.Component{
  constructor(props){
    super(props)
    this.state = {editComponent:'', portfolio:{}, selectedTab:"", annotations:[], isOpen:false,
      annotationData: {},commentsData:[], popoverOpen: false, saveButton:false, indexArray:[]}
    this.fetchEditPortfolioTemplate.bind(this);
    this.fetchViewPortfolioTemplate.bind(this);
    this.getPortfolioDetails.bind(this);
    this.getContext.bind(this);
    this.getSelectedAnnotation.bind(this);
    this.fetchComments.bind(this);
    this.toggle = this.toggle.bind(this);

    return this;
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  componentDidMount(){
    let portfolioId = this.props.config;
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

  }

  async fetchEditPortfolioTemplate(pId) {
      let userType = this.context.userType;
      const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:"external"});
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

  getPortfolioDetails(details, indexArray){
    this.setState({portfolio:details, indexArray:indexArray});
  }

  async updatePortfolioDetails() {
    let jsonData={
      portfolioId :this.props.config,
      portfolio :this.state.portfolio
    }
    let indexArray = this.state.indexArray;
    const response = await updatePortfolioActionHandler(jsonData, indexArray)
    return response;
  }

  async handleSuccess(response) {
    FlowRouter.go("/admin/transactions/portfolio/requestedPortfolioList");
  };

  render(){
    let that=this;
    let MlActionConfig = [
      // {
      //   showAction: true,
      //   actionName: 'progress',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'edit',
        handler: null
      },
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updatePortfolioDetails.bind(this), this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      },
      {
        showAction: true,
        actionName: 'assign',
        handler: null
      },
      {
        showAction: true,
        actionName: 'comment',
        handler: null,
        iconID:'Popover1'
      },
    ]
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
    const showLoader=this.state.loading;
    return(
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_padding_wrap">
            <div className='step-progress' >
              {/*{this.props.viewMode?<ViewComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} portfolioDetailsId={this.props.config}/>:<EditComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} portfolioDetailsId={this.props.config}/>}*/}
              {hasEditComponent && <EditComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} portfolioDetailsId={this.props.config}/>}
              {hasViewComponent && <ViewComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)} portfolioDetailsId={this.props.config} annotations={annotations} getSelectedAnnotations={this.getSelectedAnnotation.bind(this)}/>}
            </div>
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
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
}

MlPortfolio.contextTypes = {
  userType: PropTypes.string,
  annotationsInfo :  PropTypes.array,
};

export default MlPortfolio = formHandler()(MlPortfolio);
