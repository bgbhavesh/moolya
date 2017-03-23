import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';

export default class DocumentViewer extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount()
  {
    $('.uploaded_files .upload_file').change(function(){
      /*var FileName = $(this).val().replace(/C:\\fakepath\\/i, '');
      $(this).parents('.uploaded_files').find(".panel-body ul").prepend('<li class="doc_card" data-toggle="tooltip" data-placement="bottom" title="'+FileName+'"><span class="ml ml-minus"></span><img id="preview_file" /></li>');
      $(this).parents('.uploaded_files').find("#preview_file").attr("src", URL.createObjectURL(this.files[0]));*/
      $('[data-toggle="tooltip"]').tooltip({container:'body'});
    });
  }
  onFileUpload(documentId){
    let file=document.getElementById(documentId).files[0];
    this.props.onFileUpload(file,documentId);
  }
  onDocSelect(documentId,event){
    if(event.target.checked){
      this.props.onDocumentSelect(documentId);
    }else{
      this.props.onDocumentSelect(documentId);
    }
  }
  render(){
    let doc=this.props.doc||{};
    let docFiles=doc.docFiles||[];
    let mandatory='';
    let isMandatory=doc.isMandatory||''
    if(isMandatory){
      mandatory='*'
    }
    return (
      <div className="col-lg-4">
           <div className="panel panel-default uploaded_files">
           <div className="panel-heading">
           <div className="input_types"><input id={`check${doc.documentId}`} type="checkbox" name="checkbox" value="1" onChange={this.onDocSelect.bind(this,doc.documentId)}/><label htmlFor="chapter_admin_check"><span></span>{doc.documentName}{mandatory}</label></div>
           <div className="pull-right block_action">
           <div className="fileUpload upload_file_mask">
           <a href="javascript:void(0);"><span className="ml ml-upload"></span>
           <input type="file" className="upload_file upload" name="file_source" id={doc.documentId} ref={doc.documentId} onChange={this.onFileUpload.bind(this,doc.documentId)}/></a>
           </div>
           </div>
           <div className="pull-right block_action">
           <span className="single_icon ml ml-information"></span>
           </div>
           </div>
           <div className="panel-body uploaded_files_swiper">

           <ul className="swiper-wrapper">
           <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
             {docFiles.map((file,fIndex)=>{
                     return (<li key={file.fileId} className="doc_card" data-toggle="tooltip" data-placement="bottom" title={file.fileName}>
                                <span className="ml ml-minus"></span>
                                <img id={file.fileId} src={file.fileUrl} />
                            </li>);
             })}

           </ul>
           </div>
           </div>

           </div>);
  }
};
