import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';
import _underscore from 'underscore'
import {multipartASyncFormHandler} from '../../../../commons/MlMultipartFormAction'
import DocumentViewer from './DocumentViewer';
import {findProcessDocumentForRegistrationActionHandler} from '../actions/findProcessDocumentForRegistration'
import {addRegistrationStep3Details} from '../actions/addRegistrationStep3DetailsAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
export default class Step5 extends React.Component{
  constructor(props){
    super(props);
    this.onDocumentSelect.bind(this);
    this.onFileUpload.bind(this);
    this.state={'selectedDocuments':[]}/*'registrationDocuments':[{
      docTypeName:"Self",
      docTypeId:"1",
      kycCategoryId:"1",
      kycCategoryName:"Address",
      documentId:"1",
      documentDisplayName:"Driving License",
      documentName:"Driving License",
      isMandatory:true,
      isActive:true,
      allowableFormat:[{name:"pdf",id:"1"},{name:"jpg",id:"1"}],
      allowableSize:5120,
      docFiles:[{fileId:'1',fileUrl:'https://s3.ap-south-1.amazonaws.com/moolya-users/registrationDocuments/Doctor(1).jpg',fileName:'doctor.jpg',fileSize:1365}],
      status:"Approved/Rejected"
    },
      {
        docTypeName:"Self",
        docTypeId:"3",
        kycCategoryId:"3",
        kycCategoryName:"Pan Address",
        documentId:"3",
        documentDisplayName:"UAN",
        documentName:"UAN",
        isMandatory:true,
        isActive:true,
        allowableFormat:[{name:"pdf",id:"3"},{name:"jpg",id:"3"}],
        allowableSize:5120,
        docFiles:[{fileId:'3',fileUrl:'https://s3.ap-south-1.amazonaws.com/moolya-users/registrationDocuments/Doctor(1).jpg',fileName:'doctor.jpg',fileSize:1365}],
        status:"Approved/Rejected"
      },
      {docTypeName:"Process",
      docTypeId:"2",
      kycCategoryId:"2",
      kycCategoryName:"ID",
      documentId:"2",
      documentDisplayName:"ID Proof",
      documentName:"ID Proof",
      isMandatory:true,
      allowableFormat:[{name:"pdf",id:"2"},{name:"jpg",id:"2"}],
        allowableSize:5120,
      docFiles:[{fileId:'2',fileUrl:'https://s3.ap-south-1.amazonaws.com/moolya-users/registrationDocuments/next_btn.png',fileName:'next_btn.img',fileSize:1365}],
      status:"Approved/Rejected"
      }
    ]}*/;
       return this;
  }
  componentWillUpdate(nextProps) {
    let registrtionInfo = nextProps.registrationInfo
    let kycInfo = registrtionInfo && registrtionInfo.kycDocuments ? registrtionInfo.kycDocuments : []
    this.setState({"registrationDocuments": kycInfo})
  }
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    this.props.getRegistrationKYCDetails()
  }
  componentWillMount(){
    const resp=this.findProcessDocuments();
    return resp;
  }
  async findProcessDocuments() {
    let kycDocuments=this.props.registrationInfo&&this.props.registrationInfo.kycDocuments?this.props.registrationInfo.kycDocuments:[];
    if(kycDocuments.length<1) {
      let clusterId = this.props.registrationInfo && this.props.registrationInfo.registrationInfo.clusterId ? this.props.registrationInfo.registrationInfo.clusterId : '';
      const response = await  findProcessDocumentForRegistrationActionHandler(clusterId);
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
          return regResponse;
        }
      }
    }
    else{
      this.setState({registrationDocuments:kycDocuments})
    }
  }
  onDocumentSelect(doucmentId){
    console.log(doucmentId)
  };

   onFileUpload(file,documentId){
    let id=this.props.registrationInfo&&this.props.registrationInfo._id?this.props.registrationInfo._id:'';
    let data = {moduleName: "REGISTRATION",actionName: "UPLOAD",registrationId:"registration1",documentId:documentId,registrationId:id};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));

   }

  onFileUploadCallBack(resp){
        if(resp){
         // this.setState({registrationDocuments:resp})
           //refresh the registration data in the pare
          this.props.getRegistrationKYCDetails();
        }
   }

  render(){
    let MlActionConfig = [
      {
       actionName: 'download',
       showAction: true,
       handler: null
       },
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
    console.log(this.props.registrationInfo);
    let registrationDocuments=this.state.registrationDocuments||[];
    let registrationDocumentsGroup=_.groupBy(registrationDocuments,'docTypeName')||{};
    let that=this;
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          {Object.keys(registrationDocumentsGroup).map(function(key) {
            return (<div key={key}>
                     <h3>{key}</h3>
                    {registrationDocumentsGroup[key].map(function (regDoc,id) {

                      return(
                       <DocumentViewer key={regDoc.documentId} doc={regDoc} onFileUpload={that.onFileUpload.bind(that)} onDocumentSelect={that.onDocumentSelect.bind(that)}/>);
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
