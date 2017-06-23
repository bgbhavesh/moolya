import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import _ from 'lodash';
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {createKYCDocument} from '../actions/createKYCDocumentAction'

export default class DocumentViewer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      popoverOpen:false,
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
    this.props.onDocumentRemove(docTypeId,documentId,fileId)
  }
  addDocument(){
    this.setState({popoverOpen : !(this.state.popoverOpen)})
  }


  optionsBySelectClusters(val){
    /* let clusters=this.state.clusters
     clusters[0]['id']=val;*/
    this.setState({clusters:val})
  }

  optionsBySelectChapters(val){
    /* let chapters=this.state.chapters
     chapters[0]['id']=val;*/
    this.setState({chapters:val})
  }

  optionsBySelectSubChapters(val){
    /*let subChapters=this.state.subChapters
     subChapters[0]['id']=val;*/
    this.setState({subChapters:val})
  }


  optionsByKycCategories(val){
    /*let kycCategory=this.state.kycCategory
     kycCategory[0]['id']=val;*/
    this.setState({kycCategory:val})
  }


  optionsBySelectCommunities(val){
    this.setState({communities:val})
  }

  optionsBySelectDocumentType(val){
    /* let documentType=this.state.documentType
     documentType[0]['id']=val;*/
    this.setState({documentType:val})
  }
  optionsBySelectKYCDocument(val){
    this.setState({kycDocument:val})
  }
  async onSaveAction(){
    let documentID = this.state.kycDocument?this.state.kycDocument:null;
    let kycDocID = this.state.kycCategory?this.state.kycCategory:null;
    let docTypeID = this.state.documentType?this.state.documentType:null;
    let registrationId = this.props.registrationId?this.props.registrationId:null;


    const response = await createKYCDocument(registrationId,documentID,kycDocID,docTypeID);
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

    let clusterquery=gql`  query{
      data:fetchActiveClusters{label:countryName,value:_id}
    }`;
        let chapterquery=gql`query($clusters:[String],$displayAllOption:Boolean){  
            data:fetchActiveClusterChapters(clusters:$clusters,displayAllOption:$displayAllOption) {
              value:_id
              label:chapterName
            }  
        }`;
        let subChapterquery=gql`query($chapters:[String],$clusters:[String],$displayAllOption:Boolean){  
            data:fetchActiveChaptersSubChapters(chapters:$chapters,clusters:$clusters,displayAllOption:$displayAllOption) {
              value:_id
              label:subChapterName
            }  
        }`;
        let kycCategoryquery=gql`query{  
      data:fetchKYCCategories{
        value:_id
        label:docCategoryName
      }  
    }`;
        let documentTypequery=gql`query{  
      data:fetchDocumentsType{
        value:_id
        label:docTypeName
      }  
    }`;
        let documentFormatquery=gql`query{  
      data:fetchDocumentsFormat{
        value:_id
        label:docFormatName
      }  
    }`;

        let fetchcommunities = gql` query{
      data:fetchCommunityDefinitionForProcessMapping{label:name,value:code}
    }
    `;
    let kycDocuments=gql`query($chapters:[String],$clusters:[String],$subChapters:[String],$community:String,$kyc:String,$documentType:String,$displayAllOption:Boolean){  
        data:fetchKYCDocuments(chapters:$chapters,clusters:$clusters,subChapters:$subChapters,community:$community,kyc:$kyc,documentType:$documentType,displayAllOption:$displayAllOption) {
          value:_id
          label:documentDisplayName
        }  
    }`;

    let chapterOption={options: { variables: {clusters:this.state.clusters,displayAllOption:true}}};
    let subChapterOption={options: { variables: {chapters:this.state.chapters,clusters:this.state.clusters,displayAllOption:true}}};
    let documentsOption ={options: { variables: {chapters:this.state.chapters,clusters:this.state.clusters,subChapters:this.state.subChapters,community:this.state.communities,kyc:this.state.kycCategory,documentType:this.state.documentType,displayAllOption:false}}};
    return (
      <div className="row">
      <div className="col-lg-4">
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
                     return (<li key={file.fileId} className="doc_card" data-toggle="tooltip" data-placement="bottom" title={file.fileName}>
                                <span className="ml ml-minus" onClick={this.OnFileRemove.bind(this,doc.docTypeId,doc.documentId,file.fileId)}></span>
                                <img id={file.fileId} src={file.fileUrl} />
                            </li>);
             })}

           </ul>
             <div><center>{doc.status}</center></div>
             <p className="show-information" style={{'display':'none'}}>Document Format : {doc.allowableFormat[0]}<br />Document Size : {doc.allowableMaxSize}</p>
           </div>
           </div>




           </div>
        {/*<div className="col-lg-12">
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
        </div>
        <Popover placement="right" isOpen={this.state.popoverOpen} target="createDocument">
          <PopoverTitle>Add New Document</PopoverTitle>
          <PopoverContent>
            <div  className="ml_create_client">
              <div className="medium-popover"><div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <Moolyaselect ref="cluster" multiSelect={true} mandatory={true} placeholder={"Cluster"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.clusters} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectClusters.bind(this)} data-required={true} data-errMsg="Cluster is required"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect ref="chapter" multiSelect={true} mandatory={true} placeholder={"Chapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapters} queryType={"graphql"} query={chapterquery} queryOptions={chapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectChapters.bind(this)}  data-required={true} data-errMsg="Chapter is required"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect ref="subChapter" multiSelect={true} mandatory={true} placeholder={"SubChapter"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.subChapters} queryType={"graphql"} query={subChapterquery} queryOptions={subChapterOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectSubChapters.bind(this)}  data-required={true} data-errMsg="SubChapter is required"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect ref="communities" multiSelect={false} mandatory={true} placeholder={"Communities"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.communities} queryType={"graphql"} query={fetchcommunities}  isDynamic={true} id={'fetchcommunities'} onSelect={this.optionsBySelectCommunities.bind(this)} data-required={true} data-errMsg="Community Needed" />
                  </div>
                  <div className="form-group">
                    <Moolyaselect  ref="kycCategory"multiSelect={false}  mandatory={true} placeholder={"KYC Categories"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycCategory} queryType={"graphql"} query={kycCategoryquery}  isDynamic={true} id={'query'} onSelect={this.optionsByKycCategories.bind(this)}  data-required={true} data-errMsg="KYC Category is required"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect ref="documentType" multiSelect={false} mandatory={true} placeholder={"Type of Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.documentType} queryType={"graphql"} query={documentTypequery}  isDynamic={true} id={'query'} onSelect={this.optionsBySelectDocumentType.bind(this)} data-required={true} data-errMsg="Document Type is required" />
                  </div>
                  <div className="form-group">
                    <Moolyaselect ref="document" multiSelect={false} mandatory={true} placeholder={"Select Document"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.kycDocument} queryType={"graphql"} query={kycDocuments} queryOptions={documentsOption} isDynamic={true} id={'query'} onSelect={this.optionsBySelectKYCDocument.bind(this)} data-required={true} data-errMsg="Document Type is required" />
                  </div>
                  <div className="clearfix"></div>
                  <div className="ml_btn" style={{'textAlign': 'center'}}>
                    <a className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                  </div>

                </div>
              </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>*/}
      </div>);
  }
};
