import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../commons/MlMultipartFormAction'
import DocumentViewer from './DocumentViewer';

export default class Step5 extends React.Component{
  constructor(props){
    super(props);
    this.onDocumentSelect.bind(this);
    this.onFileUpload.bind(this);
    this.state={'selectedDocuments':[],'registrationDocuments':[{
      docTypeName:"Self",
      docTypeId:"1",
      kycCategoryId:"1",
      kycCategoryName:"Address",
      documentId:"1",
      documentDisplayName:"Driving License",
      documentName:"Driving License",
      isMandatory:true,
      isActive:true,
      docDefinition:{allowableFormat:[{name:"pdf",id:"1"},{name:"jpg",id:"1"}],allowableSize:5120},
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
        docDefinition:{allowableFormat:[{name:"pdf",id:"3"},{name:"jpg",id:"3"}],allowableSize:5120},
        docFiles:[{fileId:'3',fileUrl:'https://s3.ap-south-1.amazonaws.com/moolya-users/registrationDocuments/Doctor(1).jpg',fileName:'doctor.jpg',fileSize:1365}],
        status:"Approved/Rejected"
      }, {docTypeName:"Process",
      docTypeId:"2",
      kycCategoryId:"2",
      kycCategoryName:"ID",
      documentId:"2",
      documentDisplayName:"ID Proof",
      documentName:"ID Proof",
      isMandatory:true,
      docDefinition:{allowableFormat:[{name:"pdf",id:"2"},{name:"jpg",id:"2"}],allowableSize:5120},
      docFiles:[{fileId:'2',fileUrl:'https://s3.ap-south-1.amazonaws.com/moolya-users/registrationDocuments/next_btn.png',fileName:'next_btn.img',fileSize:1365}],
      status:"Approved/Rejected"
      }
    ]};
       return this;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }

  onDocumentSelect(){

  };

   onFileUpload(file,documentId){
    let data = {moduleName: "REGISTRATION",actionName: "UPLOAD",registrationId:"registration1",documentId:documentId};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }

  onFileUploadCallBack(resp){
        if(resp){
           //refresh the registration data in the parent
        }
  }

  render(){
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
                       <DocumentViewer key={regDoc.documentId} doc={regDoc} onFileUpload={that.onFileUpload.bind(that)}/>);
                    })
                    }<br className="brclear"/></div>
                    )
          })}
         </ScrollArea>
      </div>
    )
  }
};
