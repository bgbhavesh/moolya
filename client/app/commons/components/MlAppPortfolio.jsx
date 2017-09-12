import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import  _ from "lodash";
import formHandler from "../../../commons/containers/MlFormHandler";
import {updatePortfolioActionHandler,updateIdeatorIdeaActionHandler} from "../../../../client/admin/transaction/portfolio/actions/updatePortfolioDetails";
import {fetchTemplateHandler} from "../../../commons/containers/templates/mltemplateActionHandler";
import {findComments} from "../../../commons/annotaterComments/findComments";
import {createCommentActionHandler,resolveCommentActionHandler,reopenCommentActionHandler} from "../../../commons/annotaterComments/createComment";
import moment from "moment";
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {fetchIdeaByPortfolioId, fetchPortfolioImageHandler} from "../../ideators/actions/ideatorActionHandler";
import MlLoader from "../../../commons/components/loader/loader";
import InteractionsCounter from "../../commons/components/InteractionsCounter";
import MlAppPortfolioAccordionContainer from "../components/MlAppPortfolioAccordion";
import {requestPortfolioForGoLive} from "../actions/fetchUserDetails";
import {appClient} from "../../core/appConnection";
import CDNImage from "../../../commons/components/CDNImage/CDNImage";

class MlAppPortfolio extends Component{
  constructor(props){
    super(props)
    this.state = {
      editComponent: '',
      portfolio: {},
      selectedTab: "",
      privateKeys: [],
      removePrivateKeys: [],
      annotations: [],
      isOpen: false,
      annotationData: {},
      commentsData: [],
      popoverOpen: false,
      saveButton: false,
      backHandlerMethod: "",
      portfolioDetails: {}
    }
    this.fetchEditPortfolioTemplate.bind(this);
    this.fetchViewPortfolioTemplate.bind(this);
    this.getPortfolioDetails.bind(this);
    this.getContext.bind(this);
    this.getSelectedAnnotation.bind(this);
    this.fetchComments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.fetchIdeaId.bind(this);
    this.interactionActionHandler.bind(this);
    this.assignActionHandlerProxy.bind(this);
    return this;
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  componentDidMount(){
    // $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+20));
    // if(WinWidth > 768){
    //   $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}

    let portfolioId = this.props.config;
    $("#portfolioAccordion0").addClass("in")
  }

  getContext(){
    return {
      annotationsInfo: this.state.annotations
    }
  }
  getSelectedAnnotation(selAnnotation){
    if(!this.state.popoverOpen){
      this.toggle();
      $('.comment_wrap').slideToggle();
     }
    if(selAnnotation){
      this.setState({annotationData : selAnnotation},function(){
        this.fetchComments(selAnnotation.id);
      })
    }
  }

  commentClicked(){
    $('.comment_wrap').slideToggle();
    this.setState({"saveButton" : true})
  }

  async componentWillMount() {
    if (this.props.viewMode) {
      this.fetchViewPortfolioTemplate(this.props.config);
    } else {
      this.fetchEditPortfolioTemplate(this.props.config);
    }
    if (this.props.communityType == "Ideators" || this.props.communityType == "ideator") {
      this.setState({loading: true});
      this.fetchIdeaId()
    } else{
      this.setState({ideaId: " "})
    }
    const resp = this.fetchPortfolioImage()
    return resp
    // if(this.props.communityType == "Ideators"){
    //   this.setState({loading:true});
    //   this.fetchIdeaId()
    // }else if(this.props.communityType =="ideator"){
    //   this.setState({loading:true});
    //   this.fetchIdeaId()
    // }else{
    //   this.setState({ideaId:" "})
    // }
    return;
  }

  async fetchPortfolioImage() {
    var response = await fetchPortfolioImageHandler(this.props.config)
    if(response){
      this.setState({portfolioDetails:response})
    }
    console.log(response)
  }

  async fetchEditPortfolioTemplate(pId) {
      let userType = this.context.userType;
      const reg = await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:pId, mode:"edit", userType:userType,connection:appClient});
      this.setState({editComponent:reg&&reg.component?reg.component:null});
  }

  async fetchViewPortfolioTemplate(id) {
    let userType = this.context.userType;
    const reg= await fetchTemplateHandler({process:"Registration",subProcess:"Registration", stepCode:"PORTFOLIO", recordId:id, mode:"view", userType:userType,connection:appClient});
    this.setState({editComponent:reg&&reg.component?reg.component:null});
  }

  async onSavingComment(){
    let commentsData={
      annotatorId : this.state.annotationData.id,
      portfolioId : this.props.config,
      comment :  this.refs.comment.value
    }

    const response =  await createCommentActionHandler(commentsData,appClient)

    if(response){
      this.setState({annotationData : this.state.annotationData},function(){
        this.fetchComments(this.state.annotationData.id);
      })
    }
  }

  async onResolveComment(){
    const response = await resolveCommentActionHandler(this.state.annotationData.id,appClient)
    return response;
  }


  async onReopenComment(){
    const response = await reopenCommentActionHandler(this.state.annotationData.id,appClient)
    return response;
  }


  async fetchComments(annotationId){
    if(annotationId){
      const response = await findComments(annotationId,appClient);
      this.setState({commentsData : response},function () {

      });
    }
  }
  async fetchIdeaId(){
      let portfolioId = this.props.config;
      const response = await fetchIdeaByPortfolioId(portfolioId);
      this.setState({loading:false, ideaId : response._id});
  }
  getIdeatorIdeaDetails(details, privateKey){
    this.setState({idea:details});
    if(!_.isEmpty(privateKey)){
      this.updatePrivateKeys(privateKey)
    }
  }

  getPortfolioDetails(details, privateKey){
    this.setState({portfolio:details});
    if(!_.isEmpty(privateKey)){
      this.updatePrivateKeys(privateKey)
    }
  }

  updatePrivateKeys(privateKey){
    var keyName = privateKey.keyName
    var booleanKey = privateKey.booleanKey
    var isPrivate = privateKey.isPrivate
    var index = -1;
    var tabName = ""
    var objectName = ""
    if(privateKey.index >= 0){
      index = privateKey.index
    }else index = 0;
    if(privateKey.tabName){
      tabName = privateKey.tabName
    }
    if(privateKey.objectName){
      objectName = privateKey.objectName
    }

    var keyIndex = _.findIndex(this.state.privateKeys, {keyName:keyName, index:index})
    if(keyIndex < 0 && index >= 0){
      keyIndex = _.findIndex(this.state.privateKeys, {keyName:keyName, index:index})
    }
    var privateKeys = this.state.privateKeys;
    var removePrivateKeys = this.state.removePrivateKeys;
    if(isPrivate && keyIndex < 0){
      var rIndex = _.findIndex(this.state.removePrivateKeys, {keyName:keyName, index:index})
      removePrivateKeys.splice(rIndex, 1);
      privateKeys.push({keyName:keyName, booleanKey:booleanKey, index:index, tabName:tabName, objectName : objectName})
      this.setState({privateKeys:privateKeys})
    }else if(!isPrivate){
      if(keyIndex >= 0){
        var keyObj = _.cloneDeep(privateKeys[keyIndex])
        removePrivateKeys.push(keyObj)
        privateKeys.splice(keyIndex, 1);
      }else{
        removePrivateKeys.push({keyName:keyName, booleanKey:booleanKey, index:index, tabName:tabName, objectName : objectName})
      }

    }
    this.setState({privateKeys:privateKeys, removePrivateKeys:removePrivateKeys})
  }

  async updatePortfolioDetails() {
    let jsonData={
      portfolioId :this.props.config,
      portfolio :this.state.portfolio,
      privateKeys: this.state.privateKeys,
      removeKeys: this.state.removePrivateKeys
    }
    console.log(jsonData)
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

  // async testEditPortfolioDetails(){
  //   console.log('edit testing')
  // }

  async requestForGoLive() {
    let portfolioId = this.props.config;
    const response = await requestPortfolioForGoLive(portfolioId);
    if(response && response.success)
      toastr.success(response.result);
    return response
  }

  /**
   * success handle if no error in server
   * */
  async handleSuccess(response) {
    if (response && response.success)
      toastr.success(response.result)
    else if (response && !response.success)
      toastr.error(response.result)
    // FlowRouter.go("/app/portfolio");
  };

  //handler for like,review,comment,inquiry,collaborate,connect,follow
  async interactionActionHandler(actionConfig,handlerCallback) {
    var resourceDetails={resourceId:this.props.config,resourceType:'portfolio'};
    if(handlerCallback) {//to handle the popover
      handlerCallback(resourceDetails);
    }else if(actionConfig&&actionConfig.handleCallBack){//to handle actions
      var resp=await actionConfig.handleCallBack(resourceDetails);
       return resp;
    }
  }
  async onInteractionSuccess() {
    var interactionAutoId=new Date().getTime();
    this.setState({interactionAutoId:interactionAutoId});
  }

  /**removing edit not required in edit mode only save can be used*/
  assignActionHandlerProxy(actionConfig){
    var action=actionConfig.actionName||'';
    var actionMap={'like':'interaction','connect':'interaction','favourite':'interaction','follow':'interaction','enquire':'interaction','review':'interaction','partner':'interaction','collaborate':'interaction'};
    let actionName =actionMap[action]||action;
    switch(actionName){
      case 'interaction': actionConfig.handler=async(actionData,callback) =>this.props.handler(this.interactionActionHandler.bind(this,actionData,callback), this.onInteractionSuccess.bind(this));break;
      case 'save': actionConfig.handler=async(event) => this.props.handler(this.updatePortfolioDetails.bind(this), this.handleSuccess.bind(this)); break;
      // case 'edit': actionConfig.handler=async(event) => this.props.handler(this.testEditPortfolioDetails.bind(this)); break;
      case 'golive': actionConfig.handler=async(event) => this.props.handler(this.requestForGoLive.bind(this)); break;
      case '': actionConfig.handler=() => {console.log("action handler is not defined")}; break;
    }
  }

  backHandler(){
    if(!_.isString(this.state.backHandlerMethod)){
      this.state.backHandlerMethod();
      this.setState({backHandlerMethod:""})
    }
  }

  setBackHandler(backHandlerMethod){
    this.setState({backHandlerMethod:backHandlerMethod})
  }

  render(){
    let that=this;
     /* let appActionConfig= [{showAction: true,actionName: 'connect',hasPopOver:true,popOverTitle:'Connect Request',placement:'top',target:'connectRequest',popOverComponent:<Connect />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'like',handleCallBack:handleLikeAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'favourite',handleCallBack:handleFavouriteAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'follow',handleCallBack:handleFollowAction,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'enquire',hasPopOver:true,popOverTitle:'Enquire',placement:'top',target:'enquireRequest',popOverComponent:<Inquiry />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'review',hasPopOver:true,popOverTitle:'Review',placement:'top',target:'reviewRequest',popOverComponent:<Review />,actionComponent:PopoverActionIcon,handler:this.interactionActionHandler.bind(this)},
      {showAction: true,actionName: 'save',handler: async(event) => this.props.handler(this.updatePortfolioDetails.bind(this), this.handleSuccess.bind(this))},
      {showAction: true,actionName: 'edit',handler: async(event) => this.props.handler(this.testEditPortfolioDetails.bind(this))},
      {showAction: true,actionName: 'golive',handler: async(event) => this.props.handler(this.requestForGoLive.bind(this))}];

    var genericPortfolioAccordionConfig= {id:'portfolioAccordion',panelItems:[{'title':'Related',isText:true,contentComponent:'upcoming',style:{'background': '#273545'}},
        {'title':'Actions',isText:false,style:{'background': '#ef4647'},contentComponent:<MlAppActionComponent resourceDetails={{resourceId:this.props.config,resourceType:'portfolio'}} actionOptions={appActionConfig}  />}]
    };*/

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
    // let isMyPortfolio = this.state.isMyPortfolio
    const showLoader=this.state.loading;
    return(
      <div className="app_main_wrap">
        {showLoader===true?(<MlLoader/>):(
          <div className="app_padding_wrap">
            <div className="col-md-12">
              <InteractionsCounter resourceType={'portfolio'} resourceId={this.props.config}
                                   interactionAutoId={this.state.interactionAutoId}
                                   backHandler={this.backHandler.bind(this)}
                                   portfolioDetails={this.state.portfolioDetails}/>
              {hasEditComponent && <EditComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)}
                                                  getIdeatorIdeaDetails={this.getIdeatorIdeaDetails.bind(this)}
                                                  portfolioDetailsId={this.props.config} ideaId={this.state.ideaId}
                                                  privateKeys={this.state.privateKeys}
                                                  removePrivateKeys={this.state.removePrivateKeys}
                                                  setBackHandler={this.setBackHandler.bind(this)}/>}
              {hasViewComponent && <ViewComponent getPortfolioDetails={this.getPortfolioDetails.bind(this)}
                                                  portfolioDetailsId={this.props.config} ideaId={this.state.ideaId}
                                                  annotations={annotations}
                                                  getSelectedAnnotations={this.getSelectedAnnotation.bind(this)}
                                                  setBackHandler={this.setBackHandler.bind(this)}/>}
            </div></div>)}
        {/*<div className="overlay"></div>*/}
          <Popover placement="top" isOpen={this.state.popoverOpen} target="comment" toggle={this.toggle}>
            <PopoverTitle>Portfolio Annotations</PopoverTitle>
            <PopoverContent>
              <div className="ml_annotations">
                <div className="comments-container cus_scroll large_popover">
                  <ul id="comments-list" className="comments-list">
                    <li>
                      <div className="comment-main-level">
                        <div className="comment-avatar">
                          {annotationDetails.profileImage ? <img src={annotationDetails.profileImage} /> : <CDNImage src="/images/def_profile.png"/> }
                        </div>
                        <div className="comment-box">
                          <div style={{marginTop:'8px'}} className="annotate">1</div>
                          <div style={{paddingLeft:'50px'}} className="comment-head">
                            <h6 className="comment-name"> {annotationDetails.userName?annotationDetails.userName:""}</h6>
                            <div className="author">{annotationDetails.roleName ? annotationDetails.roleName : ""}</div>
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
                      {/*<div>
                        <textarea ref="comment" id="comment" className="form-control comment-input-box" placeholder="Enter your comment here"></textarea>
                        <div className="ml_icon_btn">
                          <a href="#" data-id={annotationDetails.id} className="save_btn"><span
                            className="ml ml-save"  onClick={this.onSavingComment.bind(this)}></span></a>
                        </div>
                      </div>*/}
                      <div className="comment_wrap">
                      <textarea ref="comment"  id="commentData" className="form-control comment-input-box"
                                placeholder="Enter your comment here"></textarea>

                        <a href="#" data-id={annotationDetails.id} className="circle_btn">
                          <span className="fa fa-check" onClick={this.onSavingComment.bind(this)}></span>
                        </a>

                      </div>

                      <ul className="comments-list reply-list">
                        {that.state.commentsData.map(function (options, key) {
                          return(<li key={key}>
                            <div className="comment-avatar">
                              {options.profileImage ? <img src={options.profileImage} /> : <CDNImage src="/images/def_profile.png" /> }
                            </div>
                            <div className="comment-box">
                              <div className="comment-head">
                                <h6 className="comment-name">{options.firstName} {options.lastName}</h6>
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
              {/*<div className="overlay"></div>*/}
            </PopoverContent>
          </Popover>
        {/*{isMyPortfolio?<AppActionButtons ActionOptions={appActionConfig} showAction='showAction' actionName="actionName"/>:<MlCustomActionButtons/>}*/}
        {/*{isMyPortfolio?<MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />:<MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />}*/}
         <MlAppPortfolioAccordionContainer interactionAutoId={this.state.interactionAutoId} viewMode={this.props.viewMode} communityType={this.props.communityType} resourceId={this.props.config} assignActionHandler={this.assignActionHandlerProxy.bind(this)}/>
      </div>
    )
  }
}

MlAppPortfolio.contextTypes = {
  userType: PropTypes.string,
  annotationsInfo :  PropTypes.array,
};

export default MlAppPortfolio = formHandler()(MlAppPortfolio);
