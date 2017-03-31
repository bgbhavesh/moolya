import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';
import _underscore from 'underscore'
//import formHandler from '../../../../commons/containers/MlFormHandler';
import {multipartASyncFormHandler} from '../../../../commons/MlMultipartFormAction'
import DocumentViewer from './DocumentViewer';
import {findProcessDocumentForRegistrationActionHandler} from '../actions/findProcessDocumentForRegistration'
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import {approvedStausForDocuments} from '../actions/approvedStatusForDocuments'
import {rejectedStausForDocuments} from '../actions/rejectedStatusForDocuments'
import {removeFileFromDocumentsActionHandler} from '../actions/removeFileFromDocuments'
export default class Step5 extends React.Component{
  constructor(props){
    super(props);
    this.onDocumentSelect.bind(this);
    this.onFileUpload.bind(this);
    this.state={
     loading:true,
      selectedFiles:[]
    }
       return this;
  }

  compareQueryOptions(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  componentWillUpdate(nextProps) {
    /*let registrtionInfo = nextProps.registrationInfo
    let kycInfo = registrtionInfo && registrtionInfo.kycDocuments ? registrtionInfo.kycDocuments : []
    this.setState({"registrationDocuments": kycInfo})*/

    let kycInfo = nextProps.registrationInfo && nextProps.registrationInfo.kycDocuments ? nextProps.registrationInfo.kycDocuments : []
    if(!this.compareQueryOptions(this.props.registrationInfo.kycDocuments,nextProps.registrationInfo.kycDocuments)){
      this.setState({loading:false,registrationDocuments:kycInfo||[]});
    }
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
   // this.props.getRegistrationKYCDetails()
  }
  componentWillMount(){
    const resp=this.findProcessDocuments();
    /*return resp;*/
  }
  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    this.props.getRegistrationKYCDetails();
  };
  async updateapprovedDocuments(){
    let  registrationId=this.props.registrationInfo._id
    let selectedDocs=this.state.selectedFiles
    const response = await approvedStausForDocuments(selectedDocs,registrationId);
    if(response){
      this.setState({selectedFiles:[]})
      this.props.getRegistrationKYCDetails();
    }
  }

  approvedDocuments() {
    const resp=this.updateapprovedDocuments();
    return resp;

  }
  async updateRejectedDocuments(){
    let  registrationId=this.props.registrationInfo._id
    let selectedDocs=this.state.selectedFiles
    const response = await rejectedStausForDocuments(selectedDocs,registrationId);
    if(response){
      this.setState({selectedFiles:[]})
      this.props.getRegistrationKYCDetails();
    }
  }
  rejectedDocuments(){
    const resp=this.updateRejectedDocuments();
    return resp;
  }
  async findProcessDocuments() {
    let kycDocuments=this.props.registrationInfo&&this.props.registrationInfo.kycDocuments?this.props.registrationInfo.kycDocuments:[];
    if(kycDocuments.length<1) {
      let clusterId = this.props.registrationInfo && this.props.registrationInfo.registrationInfo.clusterId ? this.props.registrationInfo.registrationInfo.clusterId : '';
      let communityType =this.props.registrationInfo && this.props.registrationInfo.registrationInfo.registrationType ? this.props.registrationInfo.registrationInfo.registrationType : '';
      let userType=this.props.registrationInfo && this.props.registrationInfo.registrationDetails.userType ? this.props.registrationInfo.registrationDetails.userType : '';
      const response = await  findProcessDocumentForRegistrationActionHandler(clusterId,communityType,userType);
      if (response) {
        let processDoc=response
        if (processDoc.processDocuments) {
          let processDocuments = processDoc.processDocuments
          var ActiveResults = _underscore.where(processDocuments, {isActive: true});
          var result = _.map(ActiveResults, function (currentObject) {
            return _.pick(currentObject, "docTypeName", "docTypeId", "kycCategoryId", "kycCategoryName", "documentId", "documentDisplayName", "documentName", "isMandatory", "isActive","allowableFormat","allowableMaxSize");
          });
          var KYCDocResp = result.map(function (el) {
            var o = Object.assign({}, el);
            o.status = "";
            o.docFiles = []
            return o;
          })
          let  registrationId=this.props.registrationInfo._id
          const regResponse = await  addRegistrationStep3Details(KYCDocResp,"KYCDOCUMENT",registrationId);
          if(regResponse){
          this.props.getRegistrationKYCDetails();

          }
        }
      }
    }
    else{
      this.setState({loading:false,registrationDocuments:kycDocuments})
    }
  }

  onDocumentSelect(selectedDocs){
    let selectedValues=[];
    selectedValues=selectedDocs
    this.setState({selectedFiles:selectedValues})
    console.log(this.state.selectedFiles)
  };
  async onDocumentRemove(documentId,fileId){
    let  registrationId=this.props.registrationInfo._id
    const response = await removeFileFromDocumentsActionHandler(fileId,documentId,registrationId);
    if(response){
      this.props.getRegistrationKYCDetails();

    }
  }

   onFileUpload(file,documentId){
    let id=this.props.registrationInfo&&this.props.registrationInfo._id?this.props.registrationInfo._id:'';
    let data = {moduleName: "REGISTRATION",actionName: "UPLOAD",registrationId:"registration1",documentId:documentId,registrationId:id};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));

   }

  onFileUploadCallBack(resp){
        if(resp){
          this.props.getRegistrationKYCDetails();
        }
   }

  render(){
    let MlActionConfig = [
      {
        actionName: 'documentApprove',
        showAction: true,
        handler: this.approvedDocuments.bind(this)
      },
      {
        actionName: 'documentReject',
        showAction: true,
        handler: this.rejectedDocuments.bind(this)
      },
      {
       actionName: 'download',
       showAction: true,
       handler: null
       },
      {
        showAction: true,
        actionName: 'save',
        handler: null
      },
      {
        showAction: true,
        actionName: 'comment',
        handler: null
      },
      {
        showAction: true,
        actionName: 'approveUser',
        handler: null
      },
      {
        showAction: true,
        actionName: 'rejectUser',
        handler: null
      }
    ]
    let registrationDocuments=this.state.registrationDocuments||[];
    let registrationDocumentsGroup=_.groupBy(registrationDocuments,'docTypeName')||{};
    let that=this;
  //  const showLoader=this.state.loading;
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          {Object.keys(registrationDocumentsGroup).map(function(key) {
            return (<div key={key}>
                     <h3>{key}</h3>
                    {registrationDocumentsGroup[key].map(function (regDoc,id) {

                      return(
                       <DocumentViewer key={regDoc.documentId} doc={regDoc} selectedDocuments={that.state.selectedFiles} onFileUpload={that.onFileUpload.bind(that)} onDocumentSelect={that.onDocumentSelect.bind(that)} onDocumentRemove={that.onDocumentRemove.bind(that)}/>);
                    })
                    }<br className="brclear"/></div>
                    )
          })}
         </ScrollArea>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
};
//export default Step5 = formHandler()(Step5);
