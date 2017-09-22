import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class DocumentViewer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      displayModal:false,
      previewImage:"",
      modal: false,
      removeModal:true
    }
    return this;
  }

  componentDidMount()
  {
    $('[data-toggle="tooltip"]').tooltip({
      container:'body',
      trigger:"hover"
    });
    $('.uploaded_files .upload_file').change(function(){
      /*var FileName = $(this).val().replace(/C:\\fakepath\\/i, '');
      $(this).parents('.uploaded_files').find(".panel-body ul").prepend('<li class="doc_card" data-toggle="tooltip" data-placement="bottom" title="'+FileName+'"><span class="ml ml-minus"></span><img id="preview_file" /></li>');
      $(this).parents('.uploaded_files').find("#preview_file").attr("src", URL.createObjectURL(this.files[0]));*/
      /*$('[data-toggle="tooltip"]').tooltip({
        container:'body',
        trigger:"hover"
      });*/
    });
    $(".information").unbind("click").click(function(){
      if($(this).hasClass('ml-information')){
        $(this).removeClass('ml-information').addClass('ml-delete');
      }else{
        $(this).removeClass('ml-delete').addClass('ml-information');
      }
      $(this).parents('.panel').find(".show-information").toggle(200);
    });

  }

  onFileUpload(documentId,docTypeId,status){
    if(status!='Approved'){
      let file=document.getElementById(docTypeId+documentId).files[0];
      this.props.onFileUpload(file,documentId,docTypeId);
    }else{
      toastr.error("documents can not allowed to upload once approved!!!!")
    }

  }
  onDocSelect(documentId,docTypeId,event){
    if(event.target.checked){
      let selectedDocs=this.props.selectedDocuments
      selectedDocs.push(documentId);
      let selectedDocType=this.props.selectedDocType
      selectedDocType.push(docTypeId);
      this.props.onDocumentSelect(selectedDocs,selectedDocType);
    }else{
    let selectedDocs=this.props.selectedDocuments
      var index = selectedDocs.indexOf(documentId);
      if (index > -1) {
        selectedDocs.splice(index, 1);
      }
      let selectedDocType=this.props.selectedDocType
      var index = selectedDocType.indexOf(docTypeId);
      if (index > -1) {
        selectedDocType.splice(index, 1);
      }
      this.props.onDocumentSelect(selectedDocs,selectedDocType);
    }
  }
  OnFileRemove(docTypeId,documentId,fileId){
    this.setState({removeModal:false})
    this.props.onDocumentRemove(docTypeId,documentId,fileId)
  }

  showModal(index) {
    let data = this.props.doc&&this.props.doc.docFiles?this.props.doc.docFiles:[]
    let imagePreviewUrl;
    imagePreviewUrl = data[index].fileUrl;
    this.setState({previewImage:imagePreviewUrl,modal: !this.state.modal})
    let removeModal=this.state.removeModal
    if(!removeModal){
      this.setState({removeModal:true,modal: true})
    }

  }

  closeModal(tabId) {
    this.setState({
      [tabId]: false
    });
  }

  render(){
    let selectedDocs=this.props.selectedDocuments
    if(selectedDocs.length==0){
      $('.DocCheckBox').attr('checked', false)
    }
    let doc=this.props.doc||{};
    let docFiles=doc.docFiles||[];
    let mandatory='';
    let isMandatory=doc.isMandatory||''
    if(isMandatory){
      mandatory='*'
    }
    /*  let allowFormat  = doc&&doc.allowableFormat&&doc.allowableFormat.toString();*/
    return (

      <div className="col-lg-4">
        {this.state.removeModal?(
          <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this, 'modal')}>
            {/* <ModalHeader toggle={this.closeModal.bind(this, 'modal')}>

             </ModalHeader>*/}
            <ModalBody>
              <div className="img_scroll"><img src={this.state.previewImage}/></div>
            </ModalBody>
          </Modal>
        ):""}

        <div className="panel panel-default uploaded_files">
           <div className="panel-heading">
             <div className="input_types"><input id={`check${doc.documentId}`} type="checkbox" className="DocCheckBox" name="checkbox" value="1" onChange={this.onDocSelect.bind(this,doc.documentId,doc.docTypeId)}/><label htmlFor="chapter_admin_check"><span></span>{doc.documentName}<text style={{'color':'red'}}>{mandatory}</text></label></div>
           <div className="pull-right block_action">
           <div className="fileUpload upload_file_mask">
           <a href="javascript:void(0);"><span className="ml ml-upload"></span>
           <input type="file" className="upload_file upload" name="file_source" id={doc.docTypeId+doc.documentId} ref={doc.documentId} onChange={this.onFileUpload.bind(this,doc.documentId,doc.docTypeId,doc.status)}/></a>
           </div>
           </div>
           <div className="pull-right block_action">
           <span className="single_icon ml ml-information information"></span>
           </div>
           </div>
           <div className="panel-body uploaded_files_swiper">

           <ul className="swiper-wrapper">
           <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
             {docFiles.map((file,fIndex)=>{
                     return (<li key={file.fileId} className="doc_card" data-toggle="modal"  data-placement="bottom" title={file.fileName}
                                 onClick={this.showModal.bind(this,fIndex)}>
                                <span className="ml ml-minus" onClick={this.OnFileRemove.bind(this,doc.docTypeId,doc.documentId,file.fileId)}></span>
                                <img id={file.fileId} src={file.fileUrl} />
                            </li>);
             })}

           </ul>
             <div><center>{doc.status}</center></div>
             <p className="show-information" style={{'display':'none'}}>Document Format : {doc.allowableFormat[0]}<br />Document Size : {doc.allowableMaxSize}</p>
           </div>
           </div>





        {/*<div className="col-lg-4 nopadding-right">
          <div className="panel panel-default uploaded_files">
            <div className="panel-heading">
              <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Passport</label></div>
              <div className="pull-right block_action">
                <div className="fileUpload upload_file_mask">
                  <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                    <input type="file" className="upload_file upload" name="file_source" /></a>
                </div>
              </div>
              <div className="pull-right block_action">
                <span className="single_icon ml ml-information"></span>
              </div>
            </div>
            <div className="panel-body uploaded_files_swiper" onClick={this.addDocument.bind(this)}>
              <ul className="swiper-wrapper">
                <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><a id="createDocument" data-placement="top" data-class="large_popover" onClick={this.addDocument.bind(this)}><img src="/images/sub_default.jpg" onClick={this.addDocument.bind(this)}/></a></li>
              </ul>
            </div>
          </div>
        </div>*/}


               {/* <div className="col-lg-12">
          <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-3">
          <a href="#" id="createDocument" data-placement="right" data-class="large_popover" >
            <div className="list_block notrans" onClick={this.addDocument.bind(this)}>
              <div className="hex_outer"><span className="ml ml-plus "></span></div>
              <h3 onClick={this.addDocument.bind(this)}>Add New Document</h3>
            </div>
          </a>
        </div>
          </div>
        </div>*/}

      </div>);
  }
};
