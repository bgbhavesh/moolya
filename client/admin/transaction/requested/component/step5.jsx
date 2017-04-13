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
import {approvedStatusForUser} from '../actions/approveUser'
import {rejectStatusForUser} from '../actions/rejectUser'
export default class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.onDocumentSelect.bind(this);
    this.onFileUpload.bind(this);
    this.state = {
      loading: true,
      selectedFiles: [],
      selectedDocTypeFiles: []
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

    let kycInfo = nextProps.registrationData && nextProps.registrationData.kycDocuments ? nextProps.registrationData.kycDocuments : []
    if (!this.compareQueryOptions(this.props.registrationData.kycDocuments, nextProps.registrationData.kycDocuments)) {
      this.setState({loading: false, registrationDocuments: kycInfo || []});
    }
  }

  componentDidMount() {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (160 + $('.admin_header').outerHeight(true)));
    // this.props.getRegistrationKYCDetails()
  }

  componentWillMount() {
    const resp = this.findProcessDocuments();
    /*return resp;*/
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    this.props.getRegistrationKYCDetails();
  };

  async updateapprovedDocuments() {
    let registrationId = this.props.registrationData._id
    let selectedDocs = this.state.selectedFiles
    let selectedDocType = this.state.selectedDocTypeFiles
    const response = await approvedStausForDocuments(selectedDocs, selectedDocType, registrationId);
    if (response) {
      this.setState({selectedFiles: []})
      this.setState({selectedDocTypeFiles:[]})
      this.props.getRegistrationKYCDetails();
      toastr.success("Selected Documents Approved Successfully")
    }
  }

  async downloadSelectedDocuments() {
    let registrationId = this.props.registrationData._id
    let selectedDocs = this.state.selectedFiles
    console.log(selectedDocs);

    let registrationDocuments = this.state.registrationDocuments
    console.log(registrationDocuments)
    let kycDocFile = []
    for (let i = 0; i < selectedDocs.length; i++) {
      kycDoc = _.find(registrationDocuments, function (item) {
        return item.documentId == selectedDocs[i];
      });
      if (kycDoc) {
        if (kycDoc.docFiles) {
          let DocFiles = kycDoc.docFiles
          for (let j = 0; j < DocFiles.length; j++) {
            kycDocFile.push(DocFiles[j].fileUrl)
          }
        }

      }

    }
    console.log(kycDocFile)


  }

  approvedDocuments() {
    const resp = this.updateapprovedDocuments();
    return resp;

  }

  downloadDocuments() {
    const resp = this.downloadSelectedDocuments();
    return resp;
  }

  async updateRejectedDocuments() {
    let registrationId = this.props.registrationData._id
    let selectedDocs = this.state.selectedFiles
    let selectedDocType = this.state.selectedDocTypeFiles
    const response = await rejectedStausForDocuments(selectedDocs, selectedDocType, registrationId);
    if (response) {
      this.setState({selectedFiles: []})
      this.setState({selectedDocTypeFiles:[]})
      this.props.getRegistrationKYCDetails();
      toastr.success("Selected Documents Rejected Successfully")
    }
  }


  rejectedDocuments() {
    const resp = this.updateRejectedDocuments();
    return resp;
  }
  async updateApproveUser(){
    let registrationId = this.props.registrationData._id
    const response = await approvedStatusForUser(registrationId);
    if (response) {
      this.props.getRegistrationKYCDetails();
      toastr.success("User Approved Successfully")
    }
  }
  approveUser(){
    const resp = this.updateApproveUser();
    return resp;
  }
  async updateRejectUser(){
    let registrationId = this.props.registrationData._id
    const response = await rejectStatusForUser(registrationId);
    if (response) {
      this.props.getRegistrationKYCDetails();
      toastr.success("User Rejected Successfully")
    }
  }
  rejectUser(){
    const resp = this.updateRejectUser();
    return resp;
  }
  async findProcessDocuments() {
    let kycDocuments=this.props.registrationData&&this.props.registrationData.kycDocuments?this.props.registrationData.kycDocuments:[];
    if(kycDocuments.length<1) {
      let clusterId = this.props.registrationData && this.props.registrationData.registrationInfo.clusterId ? this.props.registrationData.registrationInfo.clusterId : '';
      let chapterId = this.props.registrationData && this.props.registrationData.registrationInfo.chapterId ? this.props.registrationData.registrationInfo.chapterId : '';
      let subChapterId = this.props.registrationData && this.props.registrationData.registrationInfo.subChapterId ? this.props.registrationData.registrationInfo.subChapterId : '';
      let communityType =this.props.registrationData && this.props.registrationData.registrationInfo.registrationType ? this.props.registrationData.registrationInfo.registrationType : '';
      let userType=this.props.registrationData && this.props.registrationData.registrationInfo.userType ? this.props.registrationData.registrationInfo.userType : '';
      let identityType=this.props.registrationData && this.props.registrationData.registrationInfo.identityType ? this.props.registrationData.registrationInfo.identityType : '';
      let profession=this.props.registrationData && this.props.registrationData.registrationInfo.profession ? this.props.registrationData.registrationInfo.profession : '';
      let industry=this.props.registrationData && this.props.registrationData.registrationInfo.industry ? this.props.registrationData.registrationInfo.industry : '';
      const response = await  findProcessDocumentForRegistrationActionHandler(clusterId,chapterId,subChapterId,communityType,userType,identityType,profession,industry);
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
            o.status = "Pending";
            o.docFiles = []
            return o;
          })
          let  registrationId=this.props.registrationData._id
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

  onDocumentSelect(selectedDocs,selectedDocType){
    let selectedValues=[];
    selectedValues=selectedDocs
    this.setState({selectedFiles:selectedValues})
    this.setState({selectedDocTypeFiles:selectedDocType})
  };
  async onDocumentRemove(docTypeId,documentId,fileId){
    console.log(docTypeId)
    let  registrationId=this.props.registrationData._id
    const response = await removeFileFromDocumentsActionHandler(fileId,docTypeId,documentId,registrationId);
    if(response){
      this.props.getRegistrationKYCDetails();

    }
  }

   onFileUpload(file,documentId,docTypeId){
    let id=this.props.registrationData&&this.props.registrationData._id?this.props.registrationData._id:'';
    let processDocument=this.state.registrationDocuments
     kycDoc=_.find(processDocument, function(item) {
       return item.docTypeId==docTypeId&&item.documentId == documentId;
     });
    let fileName=file.name
     let fileFormate=fileName.split('.').pop()
     let docFormate=kycDoc.allowableFormat[0]
     console.log(docFormate)
     let lowerDocFormate=docFormate.toLowerCase();
     console.log(lowerDocFormate)
    let docResponse=_.includes(lowerDocFormate, fileFormate);
    if(docResponse){
      let data = {moduleName: "REGISTRATION",actionName: "UPLOAD",registrationId:"registration1",documentId:documentId,docTypeId:docTypeId,registrationId:id};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
    }else{
      toastr.error("please provide allowable formate documents")
    }


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
       handler: this.downloadDocuments.bind(this)
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
        handler:  this.approveUser.bind(this)
      },
      {
        showAction: true,
        actionName: 'rejectUser',
        handler: this.rejectUser.bind(this)
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
                       <DocumentViewer key={regDoc.documentId} doc={regDoc} selectedDocuments={that.state.selectedFiles} selectedDocType={that.state.selectedDocTypeFiles} onFileUpload={that.onFileUpload.bind(that)} onDocumentSelect={that.onDocumentSelect.bind(that)} onDocumentRemove={that.onDocumentRemove.bind(that)}/>);
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
