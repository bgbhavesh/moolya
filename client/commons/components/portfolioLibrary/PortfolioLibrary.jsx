/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the activities basic information
 * JavaScript XML file MlAppActivityBasicInfo.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {multipartASyncFormHandler} from '../../MlMultipartFormAction'
import {createLibrary, fetchLibrary, updateLibraryData, updatePrivacyDetails} from '../../actions/mlLibraryActionHandler'
import MlVideoPlayer from  '../../videoPlayer/MlVideoPlayer'


export default class  PortfolioLibrary extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      uploadedImage: "",
      previewImage:"",
      previewVideo: "",
      responseDataFromDB: "",
      imageDetails: "",
      uploadedVideo: "",
      imageSpecifications: [],
      videoSpecifications: [],
      templateSpecifications: [],
      documentSpecifications: [],
      videoUrl:'',
      fileType:"",
      fileName:"",
      imagesLock : {},
      templatesLock: {},
      videosLock: {},
      documentsLock:{},
      explore: false
    };

    this.toggle = this.toggle.bind(this);
    this.fetchOnlyImages.bind(this);
    this.updateLibrary.bind(this);
    this.dataPrivacyHandler.bind(this);
  }

  /**
   * componentWillMount
   * Desc :: data to be loaded on the mounting
   * @param props :: Object - Parents data
   */

  componentWillMount(){
    let portfolioId = FlowRouter.getRouteName();
    let path = FlowRouter.current().path
    if(path.indexOf("view")>0){
      this.state.explore = true
    }
    if(portfolioId !== "portfolio"){
      this.state.explore = true
    }
    if(portfolioId === "library"){
      this.state.explore = false
    }
    userId =  this.props.portfolioDetailsId?this.props.portfolioDetailsId: "";
    this.getLibraryDetails(userId);
  }

  /**
   * Method :: toggle
   * Desc   :: toggles the Modal component
   * @returns Void
   */

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  /**
   * Method :: ImageUpload
   * Desc   :: Handles the image uploading event
   * @param :: Event Handler
   * @returns Void
   */

  ImageUpload(e){
    let file=document.getElementById("image_upload").files[0];
    this.setState({fileType:file.type,fileName:file.name });
    let fileType = file.type
    let typeShouldBe = _.compact(fileType.split('/'));
    if(file && typeShouldBe && typeShouldBe[0]=="image") {
      let data = {moduleName: "PROFILE", actionName: "UPDATE"}
      let response =  multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "image"));
    }else{
      toastr.error("Please select a Image Format");
    }
  }

  /**
   * Method :: videoUpload
   * Desc   :: Handles the video uploading event
   * @returns Void
   */

  videoUpload() {
    let file = document.getElementById("video_upload").files[0];
    this.setState({fileType:file.type,fileName:file.name });
    let fileType = file.type
    let typeShouldBe = _.compact(fileType.split('/'));
    if (file  && typeShouldBe && typeShouldBe[0]=="video") {
      let data = {moduleName: "PROFILE", actionName: "UPDATE"}
      let response =  multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,"video"));
    }else{
      toastr.error("Please select a Video Format");
    }
  }

  /**
   * Method :: TemplateUpload
   * Desc   :: Handles the template uploading event
   * @returns Void
   */

  TemplateUpload(){
    let file = document.getElementById("template_upload").files[0];
    this.setState({fileType:file.type,fileName:file.name });
    let fileType = file.type
    let typeShouldBe = _.compact(fileType.split('/'));
    if (file  && typeShouldBe && typeShouldBe[0]=="image") {
      let data = {moduleName: "PROFILE", actionName: "UPDATE"}
      let response =  multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,"template"));
    }else{
      toastr.error("Please select a Template Format");
    }
  }

  /**
   * Method :: documentUpload
   * Desc   :: Handles the document uploading event
   * @returns Void
   */

  documentUpload() {
    let file = document.getElementById("document_upload").files[0];
    let fileType = file.type
    let typeShouldBe = _.compact(fileType.split('/'));
    if (file  && typeShouldBe && typeShouldBe[1]==="pdf") {
      let data = {moduleName: "PROFILE", actionName: "UPDATE"}
      let response =  multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this,"document"));
    }else{
      toastr.error("Please select a Document Format")
    }
  }

  /**
   * Method :: fetchOnlyImages
   * Desc   :: Gets the images once its uploaded
   * @returns Void
   */

  fetchOnlyImages(){
    let userId = this.props.portfolioDetailsId;
    this.getLibraryDetails(userId)
  }

  /**
   * Method :: toggleImageLock
   * Desc   :: Handles the image locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */

  toggleImageLock(id){
    let images = this.state.imageSpecifications;
    let imageDetails = {
      index: id,
      element: images[id].isPrivate? false : true,
      type: "image"
    }
    this.dataPrivacyHandler(imageDetails)
    let imageLock = this.state.imagesLock;
    imageLock[id] = imageLock[id] ? false : true;
    this.setState({
      imagesLock: imageLock
    });
  }

  async dataPrivacyHandler(detailsInput) {
    const response = await updatePrivacyDetails(detailsInput, this.props.client)
    return response;
  }


  toggleTemplateLock(id){
    let templates = this.state.templateSpecifications;
    let templatesLock = this.state.templatesLock;
    let templateDetails = {
      index: id,
      element: templates[id].isPrivate? false : true,
      type: "template"
    }
    this.dataPrivacyHandler(templateDetails)
    templateLock[id] = templateLock [id] ? false : true;
    this.setState({
      templatesLock :templatesLock
    });
  }

  toggleVideoLock(id){
    let videos = this.state.videoSpecifications;
    let videoLock = this.state.videosLock;
    let videoDetails = {
      index: id,
      element: videos[id].isPrivate? false : true,
      type: "video"
    }
    this.dataPrivacyHandler(videoDetails)
    videoLock[id] = videoLock [id] ? false : true;
    this.setState({
      videosLock:videoLock
    });
  }

  toggleDocumentLock(id){
    let documents = this.state.documentSpecifications;
    let documentsLock = this.state.documentsLock;
    let documentDetails = {
      index: id,
      element: documents[id].isPrivate? false : true,
      type: "document"
    }
    this.dataPrivacyHandler(documentDetails)
    documentsLock[id] = documentsLock[id] ? false : true;
    this.setState({
      documentsLock:documentsLock
    });
  }

  onFileUploadCallBack(type, resp) {
    if (resp) {
      switch(type){
        case "image":
          this.setState({"uploadedImage": resp});
          var imageLink = $.parseJSON(this.state.uploadedImage).result;
          this.setState({"uploadedImage": imageLink});
          let imageArray = this.state.imageSpecifications
          this.setState({imageSpecifications:imageArray})
          this.storeData(imageLink,"image")
          break;
        case "video":
          this.setState({"uploadedVideo": resp});
          var videoLink = $.parseJSON(this.state.uploadedVideo).result;
          this.setState({"uploadedVideo": videoLink});
          this.storeData(videoLink,"video")
          break;
        case "document":
          this.setState({"uploadedDocuments": resp});
          var documentLink = $.parseJSON(this.state.uploadedDocuments).result;
          this.setState({"uploadedDocuments": documentLink});
          this.storeData(documentLink,"document")
          break;
        case "template":
          this.setState({"uploadedTemplate": resp});
          var templateLink = $.parseJSON(this.state.uploadedTemplate).result;
          this.setState({"uploadedTemplate": imageLink});
          let templateArray = this.state.templateSpecifications
          this.setState({templateSpecifications:templateArray})
          this.storeData(templateLink,"template")
          break;
      }
    }
  }


  async storeData(link,dataType){
    switch(dataType) {
      case "image":
        let  imageDetails = {
          userId: this.props.portfolioDetailsId,
          fileName: this.state.fileName,
          fileUrl: link,
          fileType: this.state.fileType,
          libraryType: dataType
        }
        const resp = await createLibrary(imageDetails, this.props.client)
        this.fetchOnlyImages();
        return resp;
        break;
      case "video":
        let  videoDetails = {
          userId: this.props.portfolioDetailsId,
          fileName: this.state.fileName,
          fileUrl: link,
          fileType: this.state.fileType,
          libraryType: dataType
        }
        const res = await createLibrary(videoDetails, this.props.client)
        this.fetchOnlyImages();
        return res;
        break;
      case "document":
        let  documentDetails = {
          userId: this.props.portfolioDetailsId,
          fileName: this.state.fileName,
          fileUrl: link,
          fileType: this.state.fileType,
          libraryType: dataType

        }
        const res1 = await createLibrary(documentDetails, this.props.client)
        this.fetchOnlyImages();
        return res1;
        break;
      case "template":
        let  templateDetails = {
          userId: this.props.portfolioDetailsId,
          fileName: this.state.fileName,
          fileUrl: link,
          fileType: this.state.fileType,
          libraryType: dataType
        }
        const res2 = await createLibrary(templateDetails, this.props.client)
        this.fetchOnlyImages();
        return res2;
        break;
    }

  }


  async getLibraryDetails(userId) {
    let that = this;
    const resp = await fetchLibrary(userId, this.props.client)
    let images = [];
    let videos = [];
    let templates = [];
    let documents = [];
    resp.map(function (data) {
      if (data.libraryType === "image") {
        images.push(data)
        that.setState({imageSpecifications: images})
      } else if (data.libraryType === "video") {
        videos.push(data)
        that.setState({videoSpecifications: videos})
      } else if (data.libraryType === "template") {
        templates.push(data)
        that.setState({templateSpecifications: templates})
      } else if (data.libraryType === "document") {
        documents.push(data)
        that.setState({documentSpecifications: documents})
      }
    })
  }

  randomVideo(link,index){
    let data = this.state.videoSpecifications || [];
    let videoPreviewUrl;
    videoPreviewUrl = data[index].fileUrl;
    this.setState({previewVideo:videoPreviewUrl,videoUrl:videoPreviewUrl});
  }

  random(link,index){
    let data = this.state.imageSpecifications || [];
    let imagePreviewUrl;
    imagePreviewUrl = data[index].fileUrl;
    this.setState({previewImage:imagePreviewUrl});
  }

  randomDocument(link, index){
    let data = this.state.documentSpecifications|| [];
    let documentPreviewUrl;
    documentPreviewUrl = data[index].fileUrl;
    this.setState({previewDocument:documentPreviewUrl});
  }

  randomTemplate(link,index){
    let data = this.state.templateSpecifications || [];
    let templatePreviewUrl;
    templatePreviewUrl= data[index].fileUrl;
    this.setState({previewTemplate:templatePreviewUrl});
  }

  componentDidMount(){

    (function(a){a.createModal=function(b){defaults={scrollable:false};var b=a.extend({},defaults,b);var c=(b.scrollable===true)?'style="max-height: 420px;overflow-y: auto;"':"";html='<div class="modal fade library-popup" id="myModal">';html+='<div class="modal-dialog">';html+='<div class="modal-content">';html+='<div class="modal-header">';html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã—</button>';if(b.title.length>0){html+='<h4 class="modal-title">'+b.title+"</h4>"}html+="</div>";html+='<div class="modal-body" '+c+">";html+=b.message;html+="</div>";a("body").prepend(html);a("#myModal").modal().on("hidden.bs.modal",function(){a(this).remove()})}})(jQuery);
    $('.view-pdf').on('click',function(){
      var pdf_link = $(this).attr('href');
      var iframe = '<div class="iframe-container"><iframe src="'+pdf_link+'"></iframe></div>'
      $.createModal({
        title:'My Title',
        message: iframe,
        scrollable:false
      });
      return false;
    });
  }

  delete(index, type) {
    switch(type){
      case "image":
        let imageData = this.state.imageSpecifications;
        let initialImageData = imageData[index];
        imageData.splice(index, 1);
        this.setState({
          imageSpecifications: imageData
        });
        this.updateLibrary(initialImageData.fileUrl)
        break;
      case "video":
        let videoData = this.state.videoSpecifications;
        let initialVideoData = videoData[index];
        videoData.splice(index, 1);
        this.setState({
          videoSpecifications: videoData
        });
        this.updateLibrary(initialVideoData.fileUrl)
        break;
      case "template":
        let templateData = this.state.templateSpecifications;
        let initialTemplateData = templateData[index];
        templateData.splice(index, 1);
        this.setState({
          templateSpecifications: templateData
        });
        this.updateLibrary(initialTemplateData.fileUrl)
        break;
      case "document":
        let documentData = this.state.imageSpecifications;
        let initialDocumentData = documentData[index];
        documentData.splice(index, 1);
        this.setState({
          imageSpecifications: documentData
        });
        this.updateLibrary(initialDocumentData.fileUrl)
        break;
    }

  }

  async updateLibrary(files) {
    const response = await updateLibraryData(files, this.props.client)
    return response;
  }

  render(){
    var videoJsOptions = [{
      autoplay: true,
      controls: true,
      sources: [{
        src: this.state.previewVideo,
        type: 'video/mp4'
      }]
    }]

    let imageData = this.state.imageSpecifications||[];
    let that = this;
    const Images = imageData.map(function(show,id) {
      return(
        <div className="thumbnail"key={id}>
          {that.state.explore ||that.props.isAdmin?" ":that.state.imagesLock[id] || show.isPrivate? <FontAwesome onClick={()=>that.toggleImageLock(id)} name='lock' /> : <FontAwesome onClick={()=>that.toggleImageLock(id)} name='unlock'/> }
          {that.state.explore ||that.props.isAdmin?"": <span className="triangle-topright"><FontAwesome name='minus' onClick={()=>that.delete(id, "image")} /></span>}
          <a href="#" data-toggle="modal" data-target=".imagepop" onClick={that.random.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )
    });

    let templateData =  this.state.templateSpecifications || [];
    const Templates = templateData.map(function(show,id) {
      return(
        <div className="thumbnail"key={id}>
          {that.state.explore || that.props.isAdmin?"":that.state.templatesLock[id] || show.isPrivate ? <FontAwesome onClick={()=>that.toggleTemplateLock(id)} name='lock' /> : <FontAwesome onClick={()=>that.toggleTemplateLock(id)} name='unlock'/> }
          {that.state.explore || that.props.isAdmin?"":  <span className="triangle-topright"><FontAwesome name='minus' onClick={()=>that.delete(id, "template")} /></span>}
          <a href="#" data-toggle="modal" data-target=".templatepop" onClick={that.randomTemplate.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="templates" className="title">{show.fileName}</div>
        </div>
      )
    });

    let videodata= this.state.videoSpecifications || [];
    const videos = videodata.map(function(show,id){
      return(
        <div className="thumbnail" key={id}>
          {that.state.explore || that.props.isAdmin?"":that.state.videosLock[id] || show.isPrivate ? <FontAwesome onClick={()=>that.toggleVideoLock(id)} name='lock' /> : <FontAwesome onClick={()=>that.toggleVideoLock(id)} name='unlock'/> }
          {that.state.explore || that.props.isAdmin?"":  <span className="triangle-topright"><FontAwesome name='minus' onClick={()=>that.delete(id, "video")} /></span>}
          <a href="" data-toggle="modal" data-target=".videopop" onClick={that.randomVideo.bind(that,show.fileUrl,id)}>
            <video width="120" height="100" controls>
              <source src={show.fileUrl}type="video/mp4"></source>
            </video>
        </a>
          <div className="title">{show.fileName}</div>
        </div>
      )
    });

    let documentData= this.state.documentSpecifications || [];
    const Documents = documentData.map(function(show,id){
      return(
        <div className="thumbnail"key={id}>
          {that.state.explore || that.props.isAdmin?" ":that.state.documentsLock[id] || show.isPrivate ? <FontAwesome onClick={()=>that.toggleDocumentLock(id)} name='lock' /> : <FontAwesome onClick={()=>that.toggleDocumentLock(id)} name='unlock'/> }
          {that.state.explore || that.props.isAdmin?"": <span className="triangle-topright"><FontAwesome name='minus' onClick={()=>that.delete(id, "document")} /></span>}
          <a href="#" data-toggle="modal" data-target=".documentpop" onClick={that.randomDocument.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )
    });
    return (
      <div>
        <h2>Library</h2>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={'library-popup'}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <img src="/images/video_1.jpg"/>
          </ModalBody>
        </Modal>
        <div className="modal fade bs-example-modal-sm library-popup imagepop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body" >
                <div className="img_scroll"><img src={this.state.previewImage}/></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bs-example-modal-sm library-popup templatepop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body" >
                <div className="img_scroll"><img src={this.state.previewTemplate}/></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bs-example-modal-sm library-popup documentpop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <iframe src={this.state.previewDocument}/>
                {/*{console.log(this.state.previewDocument)}*/}
                {/*{<MlFileViewer/>}*/}
                {/*<div className="img_scroll"><MlDocViewer/></div>*/}
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bs-example-modal-sm library-popup videopop" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body" >
                {this.state.previewVideo ? <MlVideoPlayer  videoAttributes = {videoJsOptions} /> : <div></div>}
              </div>
            </div>
          </div>
        </div>

        {/*<div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">*/}

        {/*<div className="panel panel-default">*/}
        {/*<div className="panel-heading">*/}
        {/*Documents<input type="file" className="upload_file upload" name="file_source" />*/}

        {/*</div>*/}
        {/*<div className="panel-body">*/}
        {/*/!*<div className="thumbnail"><FontAwesome name='unlock'/><a className="view-pdf" href="/images/sample.pdf"><img src="/images/ppt.png"/></a><div className="title">Document</div></div>*!/*/}
        {/*<div className="thumbnail"><FontAwesome name='unlock'/><a data-toggle="modal" data-target=".pdfpop" href="#"><img src="/images/ppt.png"/></a><div className="title">Document</div></div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">
              Images
              <div className="fileUpload upload_file_mask pull-right">
                <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                  {that.state.explore || that.props.isAdmin?"":<input type="file" className="upload_file upload" name="image_source" id="image_upload" onChange={that.ImageUpload.bind(that)} />}
                </a>
              </div>
            </div>
            <ul>
              <li>
                <div className="panel-body">
                  {Images}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
          <div className="panel panel-default">
            <div className="panel-heading">
              Videos
              <div className="fileUpload upload_file_mask pull-right">
                <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                  {that.state.explore || that.props.isAdmin?"":<input type="file" className="upload_file upload" name="video_source" id="video_upload" onChange={that.videoUpload.bind(that)} />}
                </a>
              </div>
            </div>
            <ul>
              <li>
                <div className="panel-body">
                  {videos}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">
              Templates
              <div className="fileUpload upload_file_mask pull-right">
                <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                  {that.state.explore || that.props.isAdmin?"":<input type="file" className="upload_file upload" name="image_source" id="template_upload" onChange={that.TemplateUpload.bind(that)} />}
                </a>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <div className="panel-body">
                {Templates}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">
              Documents
              <div className="fileUpload upload_file_mask pull-right">
                <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                  {that.state.explore || that.props.isAdmin?"":<input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={that.documentUpload.bind(that)} />}
                </a>
              </div>
            </div>
            <ul>
              <li>
                <div className="panel-body">
                  {Documents}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};
