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

class MlPortfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {editComponent:'', portfolio:{}, selectedTab:"", annotations:[], isOpen:false, anotationDetails:{}, text:"",annotationData: {},commentsData:[]}
        this.fetchEditPortfolioTemplate.bind(this);
        this.fetchViewPortfolioTemplate.bind(this);
        this.getPortfolioDetails.bind(this);
        this.getContext.bind(this);
        this.getSelectedAnnotation.bind(this);
        this.fetchComments.bind(this);
        return this;
    }

    componentDidMount(){
      let portfolioId = this.props.config;
      $(document).on('click', '#saveComment', function(e){
        let annotationId = $("#saveComment").data("id");
        let commentsData={
          annotatorId : annotationId,
          portfolioId : portfolioId,
          comment :  $(this).parent().prev().val()
        }

        const response = createCommentActionHandler(commentsData)
        return response;
      });
      $(document).on('click', '.resolveComment', function(e){
        alert($(this).attr("id"));
        let commentId = $(this).attr("id");
        const response = resolveCommentActionHandler(commentId)
        return response;

      });
      $(document).on('click', '.reopenComment', function(e){
        alert($(this).attr("id"));
        let commentId = $(this).attr("id");
        const response = reopenCommentActionHandler(commentId)
        return response;

      });



    }
    getContext(){
        return {
          annotationsInfo: this.state.annotations
        }
    }

    getSelectedAnnotation(selAnnotation){
      this.setState({anotationDetails:selAnnotation})
      if(selAnnotation){
        this.setState({annotationData : selAnnotation},function(){
          this.fetchComments(selAnnotation);
        })
      }

    }

/*
    getSelectedTab(tabName){
          this.setState({selectedTab:tabName})
    }*/

    async componentWillMount() {

        if(this.props.viewMode){
            this.fetchViewPortfolioTemplate(this.props.config);
        }else{
           this.fetchEditPortfolioTemplate(this.props.config);
        }

    }

    async fetchEditPortfolioTemplate(pId) {
        let userType = this.context.userType;
        const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:userType});
        this.setState({editComponent:reg&&reg.component?reg.component:null});
    }

    async fetchViewPortfolioTemplate(id) {
        //const reg= await fetchTemplateHandler({process:"Portfolio",subProcess:"Portfolio", stepCode:"Portfolio", recordId:""});
      let userType = this.context.userType;
      const reg= await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:id, mode:"view", userType:userType});
      this.setState({editComponent:reg&&reg.component?reg.component:null});
    }


    async fetchComments(annotation){


      if(annotation && annotation.id){
        const response = await findComments(annotation.id);
        this.setState({commentsData : response},function(){
          $(".ml-annotate").popover({
            'title' : 'Annotations',
            'html' : true,
            'placement' : 'top',
            'container' : '.admin_main_wrap',
            'content' : $(".ml_annotations").html()
          });
          $('.ml-annotate').click();
        });
      }

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
      return response;
    }

    async handleSuccess(response) {
      FlowRouter.go("/admin/transactions/portfolio/requestedPortfolioList");
    };
/*

     onSavingComment(){
        let commentsData={
          annotatorId : this.state.annotationData.id,
          portfolioId : this.props.config,
          comment :  this.refs.comment.value
        }

      const response =  createComment(commentsData)
      return response;
    }
*/


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
            handler: null
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

        console.log("------------------------------------");
        console.log(annotationDetails)
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

            <div style={{'display':'none'}} className="ml_annotations">
              <div className="comments-container cus_scroll large_popover">
                <ul id="comments-list" className="comments-list">
                  <li>
                    <div className="comment-main-level">
                      <div className="comment-avatar"><img src="/images/p_1.jpg" alt=""/></div>
                      <div className="comment-box">
                        <div style={{marginTop:'8px'}} className="annotate">1</div>
                        <div style={{paddingLeft:'50px'}} className="comment-head">
                          <h6 className="comment-name"> {annotationDetails.userName}</h6>
                          <div className="author">Chapter Manager</div>
                          <span>{moment(annotationDetails.createdAt).format('DD MM YYYY,HH:MM:SS')}</span>
                        </div>
                        <div className="comment-content">
                          {annotationDetails.text}
                         </div>

                      </div>
                    </div>
                    <div className="ml_btn">
                      <a href="#" className="save_btn resolveComment" id={annotationDetails.id}>Resolve</a>
                      <a href="#" className="cancel_btn reopenComment" id={annotationDetails.id}>Re open</a>
                      <a href="#" className="cancel_btn add_comment">Comment</a>
                    </div>
                    <div>
                      <textarea ref="comment" id="comment" className="form-control comment-input-box" placeholder="Enter your comment here"></textarea>
                      <div className="ml_icon_btn">
                        <a href="#" id="saveComment"  data-id={annotationDetails.id} className="save_btn"><span
                          className="ml ml-save"></span></a>
                        {/*<a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>*/}
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
