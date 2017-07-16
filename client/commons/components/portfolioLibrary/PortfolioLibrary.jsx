/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the library actions across all the porfolios
 * JavaScript XML file PortfolioLibrary.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */

import React from 'react';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import {multipartASyncFormHandler} from '../../MlMultipartFormAction'
import {createLibrary, fetchLibrary, updateLibraryData, updatePrivacyDetails, updateLibrary, fetchDataFromCentralLibrary} from '../../actions/mlLibraryActionHandler'
import MlVideoPlayer from  '../../videoPlayer/MlVideoPlayer'
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";

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
      explore: false,
      hideLock: false,
      popoverOpen:false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
      myPortfolio: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.refetchData.bind(this);
    this.updateLibrary.bind(this);
    this.dataPrivacyHandler.bind(this);
  }

  /**
   * componentWillMount
   * Desc :: data to be loaded on the mounting
   * @param props :: Object - Parents data
   */

  componentWillMount(){
    this.getCentralLibrary()
    let portfolioId = FlowRouter.getRouteName();
    let path = FlowRouter.current().path
    if(path.indexOf("view")>0){
      this.setState({explore : false})
    }
    if(portfolioId !== "portfolio" || path.indexOf("view")>0){
      this.setState({explore : true, myPortfolio: true})
    }
    if(portfolioId === "library"){
      this.setState({explore : false, isLibrary: true, hideLock: true})
    }
    if(portfolioId === "transaction_portfolio_EditRequests"){
      this.setState({explore : false, isAdminEdit: true})
      this.setState({hideLock: true})
    }
    userId =  this.props.portfolioDetailsId?this.props.portfolioDetailsId: "";
    this.getLibraryDetails(userId);
  }

    async getCentralLibrary(){
    let that = this;
    const resp =  await fetchDataFromCentralLibrary(this.props.client)
      let images = [];
      let videos = [];
      let templates = [];
      let documents = [];
      resp.map(function (data) {
        if (data.libraryType === "image") {
          images.push(data)
          that.setState({imageDetails: images})
        } else if (data.libraryType === "video") {
          videos.push(data)
          that.setState({videoDetails: videos})
        } else if (data.libraryType === "template") {
          templates.push(data)
          that.setState({templateDetails: templates})
        } else if (data.libraryType === "document") {
          documents.push(data)
          that.setState({documentDetails: documents})
        }
      })
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
    let file = e.target.files[0];
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

  videoUpload(e) {
    let file = e.target.files[0];
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

  TemplateUpload(e){
    let file = e.target.files[0];
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

  documentUpload(e) {
    let file = e.target.files[0];
    this.setState({fileType:file.type,fileName:file.name });
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
   * Method :: refetchData
   * Desc   :: Gets the images once its uploaded
   * @returns Void
   */

  refetchData(){
    let userId = this.props.portfolioDetailsId;
    this.getLibraryDetails(userId)
  }

  /**
   * Method :: toggleImageLock
   * Desc   :: Handles the image locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */

  toggleImageLock(id) {
    let currentPath = FlowRouter.current().path.split("/")
    let currentPortfolioId = currentPath[4]
    let images = this.state.imageSpecifications;
    if (images[id].portfolioReference) {
      let privacyState;
      images[id].portfolioReference.map(function (data) {
        if (data.portfolioId === currentPortfolioId) {
          privacyState = data.isPrivate ? false : true
        }
      })
      let imageDetails = {
        index: id,
        element: privacyState,
        type: "image"
      }
      this.dataPrivacyHandler(imageDetails)
      this.refetchData();

    }else{
      let imageDetails = {
        index: id,
        element: true,
        type: "image"
      }
      this.dataPrivacyHandler(imageDetails)
      this.refetchData();
    }
      let imageLock = this.state.imagesLock;
      imageLock[id] = imageLock[id] ? false : true;
      this.setState({
        imagesLock: imageLock
      });

  }

  /**
   * Method :: toggleTemplateLock
   * Desc   :: Handles the template locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */

  toggleTemplateLock(id){
    let currentPath = FlowRouter.current().path.split("/")
    let currentPortfolioId = currentPath[4]
    let templates = this.state.templateSpecifications;
    if (templates[id].portfolioReference) {
      let privacyState;
      templates[id].portfolioReference.map(function (data) {
        if (data.portfolioId === currentPortfolioId) {
          privacyState = data.isPrivate ? false : true
        }
      })
      let templateDetails = {
        index: id,
        element: privacyState,
        type: "template"
      }
      this.dataPrivacyHandler(templateDetails)
      this.refetchData();
    }else{
      let templateDetails = {
        index: id,
        element: true,
        type: "template"
      }
      this.dataPrivacyHandler(templateDetails)
      this.refetchData();
    }
    let templatesLock = this.state.templatesLock;
    templateLock[id] = templateLock [id] ? false : true;
    this.setState({
      templatesLock :templatesLock
    });
  }
  /**
   * Method :: toggleVideoLock
   * Desc   :: Handles the video locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */


  toggleVideoLock(id){
    let currentPath = FlowRouter.current().path.split("/")
    let currentPortfolioId = currentPath[4]
    let videos = this.state.videoSpecifications;
    if (videos[id].portfolioReference) {
      let privacyState;
      videos[id].portfolioReference.map(function (data) {
        if (data.portfolioId === currentPortfolioId) {
          privacyState = data.isPrivate ? false : true
        }
      })
      let videoDetails = {
        index: id,
        element: privacyState,
        type: "video"
      }
      this.dataPrivacyHandler(videoDetails)
      this.refetchData();
    }else{
      let videoDetails = {
        index: id,
        element: true,
        type: "video"
      }
      this.dataPrivacyHandler(videoDetails)
      this.refetchData();
    }
    let videoLock = this.state.videosLock;
    videoLock[id] = videoLock [id] ? false : true;
    this.setState({
         videosLock:videoLock
    });
  }

  /**
   * Method :: toggleDocumentLock
   * Desc   :: Handles the document locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */


  toggleDocumentLock(id){
    let currentPath = FlowRouter.current().path.split("/")
    let currentPortfolioId = currentPath[4]
    let documents = this.state.documentSpecifications;
    if (documents[id].portfolioReference) {
      let privacyState;
      documents[id].portfolioReference.map(function (data) {
        if (data.portfolioId === currentPortfolioId) {
          privacyState = data.isPrivate ? false : true
        }
      })
      let documentDetails = {
        index: id,
        element: privacyState,
        type: "document"
      }
      this.dataPrivacyHandler(documentDetails)
      this.refetchData();
    }else{
      let documentDetails = {
        index: id,
        element: true,
        type: "document"
      }
      this.dataPrivacyHandler(documentDetails)
      this.refetchData();
    }
    let documentsLock = this.state.documentsLock;
    documentsLock[id] = documentsLock[id] ? false : true;
    this.setState({
         documentsLock:documentsLock
    });
  }

  async dataPrivacyHandler(detailsInput) {
    const  response = await updatePrivacyDetails(detailsInput, this.props.client)
    return response;
  }

  /**
   * Method :: onFileUploadCallBack
   * Desc   :: Handles all the file uploads
   * @param :: type - type :: String : resp - type :: Object
   * @returns Void
   */

  onFileUploadCallBack(type, resp) {
    if (resp) {
      this.setState({uploadedData: resp});
      var link = $.parseJSON(this.state.uploadedData).result;
      this.setState({uploadedData: link});
      if(!this.state.isLibrary) {
        let userOption = confirm("Do you want to add the file into the library")
        if (userOption) {
          let addToCentralLibrary = true;
          this.storeData(link, type, addToCentralLibrary)
        } else {
          let addToCentralLibrary = false;
          this.storeData(link, type, addToCentralLibrary)
        }
      }else {
        let addToCentralLibrary = true ;
        this.storeData(link, type, addToCentralLibrary)
      }
    }
  }

  /**
   * Method :: storeData
   * Desc   :: Handles all the data storing activities
   * @param :: link - type :: String : dataType - type :: String
   * @returns resp - type :: Object
   */

  async storeData(link,dataType, addToCentralLibrary){
        let  Details = {
          userId: this.props.portfolioDetailsId,
          fileName: this.state.fileName,
          fileUrl: link,
          fileType: this.state.fileType,
          libraryType: dataType,
          inCentralLibrary: addToCentralLibrary,
        }
        const resp = await createLibrary(Details, this.props.client)
        this.refetchData();
        this.getCentralLibrary();
        return resp;
  }

  /**
   * Method :: getLibraryDetails
   * Desc   :: Handles all the data storing activities
   * @param :: userId - type :: String
   * @returns Void
   */

  async getLibraryDetails(userId) {
    let that = this;
    const resp = await fetchLibrary(userId, this.props.client)
    console.log(resp)
    let images = [];
    let videos = [];
    let templates = [];
    let documents = [];
    resp.map(function (data) {
      if (data.libraryType === "image") {
        images.push(data)
        that.setState({imageSpecifications: images, popImagesSpecifications: images})
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

    toggle1() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }
    toggle2() {
      this.setState({
        popoverOpen: !this.state.popoverOpen1
      });
    }
    toggle3() {
      this.setState({
        popoverOpen: !this.state.popoverOpen2
      });
    }
    toggle4() {
      this.setState({
        popoverOpen: !this.state.popoverOpen3
      });
    }

    sendDataToPortfolioLibrary(dataDetail, e) {
    let tempObject = Object.assign({}, dataDetail);
      if(dataDetail.libraryType === "image") {
        let data = this.state.imageSpecifications || [];
        data.push(tempObject);
        this.setState({imageSpecifications: data})
      }else if(dataDetail.libraryType === "video"){
        let data = this.state.videoSpecifications || [];
        data.push(tempObject);
        this.setState({videoSpecifications : data})
      }else if(dataDetail.libraryType === "template"){
        let data = this.state.templateSpecifications || [];
        data.push(tempObject);
        this.setState({templateSpecifications : data})
      }else if(dataDetail.libraryType === "document"){
        let data = this.state.documentSpecifications || [];
        data.push(tempObject);
        this.setState({documentSpecifications  : data})
      }
      newItem = _.omit(tempObject, "__typename","_id")
      let temp = newItem
      if(newItem.portfolioReference){
        let y = newItem.portfolioReference.map(function(data){
          return _.omit(data,'__typename')
        })
        newItem.portfolioReference = y;
        this.updateLibraryPortfolioLibrary(tempObject._id,newItem)
      }else{
        this.updateLibraryPortfolioLibrary(tempObject._id,newItem)
      }
    }

    async updateLibraryPortfolioLibrary(id,data){
      const resp = await updateLibrary(id,data, this.props.client)
      return resp;
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

  delete(index, type , location) {
    switch(type){
      case "image":
        let imageData = this.state.imageSpecifications;
        let initialImageData = imageData[index];
        imageData.splice(index, 1);
        this.setState({
             imageSpecifications: imageData
        });
        let imageDelete = {
          index:index,
          type:initialImageData.fileUrl,
          libraryType:"image"
        }
        this.updateLibrary(imageDelete)
        break;
      case "video":
        let videoData = this.state.videoSpecifications;
        let initialVideoData = videoData[index];
        videoData.splice(index, 1);
        this.setState({
             videoSpecifications: videoData
        });
        let videoDelete = {
          index:index,
          type:initialVideoData.fileUrl,
          libraryType:"video"
        }
        this.updateLibrary(videoDelete)
        break;
      case "template":
        let templateData = this.state.templateSpecifications;
        let initialTemplateData = templateData[index];
        templateData.splice(index, 1);
        this.setState({
             templateSpecifications: templateData
        });
        let tempDelete = {
          index:index,
          type:initialTemplateData.fileUrl,
          libraryType:"template"
        }
        this.updateLibrary(tempDelete)
        break;
      case "document":
        let documentData = this.state.documentSpecifications;
        let initialDocumentData = documentData[index];
        documentData.splice(index, 1);
        this.setState({
             documentSpecifications: documentData
        });
        let docDelete = {
          index:index,
          type:initialDocumentData.fileUrl,
          libraryType:"document"
        }
        this.updateLibrary(docDelete)
        break;
    }
  }

  async updateLibrary(files) {
    const  response = await updateLibraryData(files, this.props.client)
    this.getCentralLibrary()
    return response;
  }

    PopOverAction(){
      this.setState({popoverOpen : !(this.state.popoverOpen)})
    }
    PopOverAction2(){
      this.setState({popoverOpen2 : !(this.state.popoverOpen2)})
    }
    PopOverAction3(){
      this.setState({popoverOpen3 : !(this.state.popoverOpen3)})
    }
    PopOverAction4(){
      this.setState({popoverOpen4 : !(this.state.popoverOpen4)})
    }

  render(){
    var videoJsOptions = [{
      autoplay: true,
      controls: true,
      sources: [{src: this.state.previewVideo, type: 'video/mp4'}]
    }]
    let that = this;
    let   imageData = this.state.isLibrary?this.state.imageDetails || [] : this.state.imageSpecifications||[];
    const Images = imageData.map(function(show,id) {
      return(
        <div className="thumbnail"key={id}>
          {that.state.explore ?" ":that.state.imagesLock[id]? !that.state.hideLock?<FontAwesome onClick={()=>that.toggleImageLock(id)} name='lock' />:"" :!that.state.hideLock? <FontAwesome onClick={()=>that.toggleImageLock(id)} name='unlock'/>:"" }
          {that.state.explore ?"": <FontAwesome name='trash-o' onClick={()=>that.delete(id, "image", "portfolio")} />}
          <a href="#" data-toggle="modal" data-target=".imagepop" onClick={that.random.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )
    });
    let   popImageData = this.state.imageDetails||[];
    const popImages = popImageData.map(function(show,id) {
      if(show.inCentralLibrary){
      return(
        <div className="thumbnail"key={id}>
          {that.state.explore ?"": <FontAwesome name='trash-o' onClick={()=>that.delete(id, "image")} />}
          <a href="#" data-toggle="modal"  onClick={that.sendDataToPortfolioLibrary.bind(that,show)} ><img src={show.fileUrl}/></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )}
    });

    let   templateData =  this.state.isLibrary?this.state.templateDetails || [] : this.state.templateSpecifications || [];
    const Templates = templateData.map(function(show,id) {
        return(
        <div className="thumbnail"key={id}>
          {that.state.explore ?"":that.state.templatesLock[id] || show.isPrivate ?!that.state.hideLock? <FontAwesome onClick={()=>that.toggleTemplateLock(id)} name='lock' />:"" : !that.state.hideLock?<FontAwesome onClick={()=>that.toggleTemplateLock(id)} name='unlock'/>:"" }
          {that.state.explore ?"":  <FontAwesome name='trash-o' onClick={()=>that.delete(id, "template")} />}
          <a href="#" data-toggle="modal" data-target=".templatepop" onClick={that.randomTemplate.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="templates" className="title">{show.fileName}</div>
        </div>
      )
    });

    let   popTemplateData = this.state.templateDetails||[];
    const popTemplates = popTemplateData.map(function(show,id) {
      if(show.inCentralLibrary){
        return(
          <div className="thumbnail"key={id}>
            <a href="#" data-toggle="modal"  onClick={that.sendDataToPortfolioLibrary.bind(that,show)} ><img src={show.fileUrl}/></a>
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )}
    });

    let   videodata= this.state.isLibrary?this.state.videoDetails || [] : this.state.videoSpecifications || [];
    const videos = videodata.map(function(show,id){
      return(
        <div className="thumbnail" key={id}>
          {that.state.explore ?"":that.state.videosLock[id] || show.isPrivate ? !that.state.hideLock?<FontAwesome onClick={()=>that.toggleVideoLock(id)} name='lock' />:"" : !that.state.hideLock?<FontAwesome onClick={()=>that.toggleVideoLock(id)} name='unlock'/>:"" }
          {that.state.explore ?"": <FontAwesome name='trash-o' onClick={()=>that.delete(id, "video")} />}
          <a href="" data-toggle="modal" data-target=".videopop" onClick={that.randomVideo.bind(that,show.fileUrl,id)}>
            <video width="120" height="100" controls>
              <source src={show.fileUrl}type="video/mp4"></source>
            </video>
        </a>
          <div className="title">{show.fileName}</div>
        </div>
      )
    });

    let   popVideoData = this.state.videoDetails||[];
    const popVideos = popVideoData.map(function(show,id) {
      if(show.inCentralLibrary){
        return(
          <div className="thumbnail"key={id}>
            <a href="#" data-toggle="modal"  onClick={that.sendDataToPortfolioLibrary.bind(that,show)} ><img src={show.fileUrl}/></a>
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )}
    });

    let   documentData= this.state.isLibrary?this.state.documentDetails || [] :  this.state.documentSpecifications || [];
    const Documents = documentData.map(function(show,id){
        return(
        <div className="thumbnail"key={id}>
          {that.state.explore ?" ":that.state.documentsLock[id] || show.isPrivate ?!that.state.hideLock? <FontAwesome onClick={()=>that.toggleDocumentLock(id)} name='lock' />:"" :!that.state.hideLock? <FontAwesome onClick={()=>that.toggleDocumentLock(id)} name='unlock'/>:"" }
          {that.state.explore ?"": <FontAwesome name='trash-o' onClick={()=>that.delete(id, "document")} />}
          <a href="#" data-toggle="modal" data-target=".documentpop" onClick={that.randomDocument.bind(that,show.fileUrl,id)} ><img src={show.fileUrl}/></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )
    });

    let   popDocumentData = this.state.documentDetails||[];
    const popDocuments= popDocumentData.map(function(show,id) {
      if(show.inCentralLibrary){
        return(
          <div className="thumbnail"key={id}>
            <a href="#" data-toggle="modal"  onClick={that.sendDataToPortfolioLibrary.bind(that,show)} ><img src={show.fileUrl}/></a>
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )}
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
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
          <div className="panel panel-default">
            <div className="panel-heading">
              Images
              <div className="fileUpload upload_file_mask pull-right" id="create_client">
                <a href="javascript:void(0);">
                  {that.state.explore ?"":this.state.isLibrary || this.state.isAdminEdit  ?<span className="ml ml-upload"><input type="file" className="upload_file upload" name="video_source" id="video_upload" onChange={that.ImageUpload.bind(that)}/></span>:<span className="ml ml-upload" onClick={that.PopOverAction.bind(that)}></span>}
                </a>
              </div>
            </div>
                <div className="panel-body">
                  {this.state.isLibrary?popImages:Images}
                </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">
              Videos
              <div className="fileUpload upload_file_mask pull-right" id="create_video">
                <a href="javascript:void(0);">
                  {that.state.explore ?"":this.state.isLibrary || this.state.isAdminEdit  ?<span className="ml ml-upload"><input type="file" className="upload_file upload" name="video_source" id="video_upload" onChange={that.videoUpload.bind(that)}/></span>:<span className="ml ml-upload" onClick={that.PopOverAction2.bind(that)}></span>}
                </a>
              </div>
            </div>
            <ul>
              <li>
                <div className="panel-body">
                  {this.state.isLibrary?popVideos:videos}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <br className="brclear"/>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
          <div className="panel panel-default">
            <div className="panel-heading">
              Templates
              <div className="fileUpload upload_file_mask pull-right" id="create_template">
                <a href="javascript:void(0);">
                  {that.state.explore ?"":this.state.isLibrary || this.state.isAdminEdit ?<span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="template_upload" onChange={that.TemplateUpload.bind(that)}/></span>:<span className="ml ml-upload" onClick={that.PopOverAction3.bind(that)}></span>}
                </a>
              </div>
            </div>
              <div className="panel-body">
                {this.state.isLibrary?popTemplates:Templates}
              </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
          <div className="panel panel-default">
            <div className="panel-heading">
              Documents
              <div className="fileUpload upload_file_mask pull-right" id="create_document">
                <a href="javascript:void(0);">
                  {that.state.explore ?"":this.state.isLibrary || this.state.isAdminEdit ?<span className="ml ml-upload"><input type="file" className="upload_file upload" name="image_source" id="document_upload" onChange={that.documentUpload.bind(that)} /></span>:<span className="ml ml-upload" onClick={that.PopOverAction4.bind(that)}></span>}
                </a>
              </div>
            </div>
                <div className="panel-body">
                  {this.state.isLibrary?popDocuments:Documents}
                </div>
          </div>
        </div>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"create_client"} toggle1={this.toggle1}>
          <PopoverTitle>Library</PopoverTitle>
          <PopoverContent>
            <div  className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                 <div className="col-md-12">
                  <div className="form-group">
                    {popImages}
                    <div className="fileUpload mlUpload_btn">
                      <span>Upload</span>
                      <input type="file" className="upload" ref="upload" onChange={this.ImageUpload.bind(this)}/>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="bottom" isOpen={this.state.popoverOpen2} target={"create_video"} toggle2={this.toggle2}>
          <PopoverTitle>Library</PopoverTitle>
          <PopoverContent>
            <div  className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      {popVideos}
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload</span>
                        <input type="file" className="upload_file upload" name="video_source" id="video_upload" onChange={that.videoUpload.bind(that)} />                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="left" isOpen={this.state.popoverOpen3} target={"create_template"} toggle3={this.toggle3}>
          <PopoverTitle>Library</PopoverTitle>
          <PopoverContent>
            <div  className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      {popTemplates}
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload</span>
                        <input type="file" className="upload" ref="upload" onChange={this.TemplateUpload.bind(this)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="left" isOpen={this.state.popoverOpen4} target={"create_document"} toggle4={this.toggle4}>
          <PopoverTitle>Library</PopoverTitle>
          <PopoverContent>
            <div  className="ml_create_client">
              <div className="medium-popover">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      {popDocuments}
                      <div className="fileUpload mlUpload_btn">
                        <span>Upload</span>
                        <input type="file" className="upload" ref="upload" onChange={this.documentUpload.bind(this)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
};
