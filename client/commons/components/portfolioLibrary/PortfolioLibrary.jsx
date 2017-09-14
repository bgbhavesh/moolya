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
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { multipartASyncFormHandler } from '../../MlMultipartFormAction'
import { createLibrary, fetchLibrary, updateLibraryData, updatePrivacyDetails, fetchLibraryBasedOnPortfolioIdHandler, updateLibrary, fetchDataFromCentralLibrary, fetchSharedLibraryHandler } from '../../actions/mlLibraryActionHandler'
import MlVideoPlayer from '../../videoPlayer/MlVideoPlayer'
import { Popover, PopoverTitle, PopoverContent } from "reactstrap";
import formHandler from "../../../commons/containers/MlFormHandler";
import MlAccordion from "../../../app/commons/components/MlAccordion";
import MlAppActionComponent from '../../../app/commons/components/MlAppActionComponent'
import PopoverActionIcon from '../../../app/appActions/components/PopoverActionIcon';
import SharePopOver from './sharePopOver'
import MlConnectionHeader from './connectionHeader'
import SharedLibrary from './sharedLibrary';
import CropperModal from '../cropperModal';



class Library extends React.Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      uploadedImage: "",
      previewImage: "",
      previewVideo: "",
      responseDataFromDB: "",
      imageDetails: "",
      uploadedVideo: "",
      imageSpecifications: [],
      videoSpecifications: [],
      templateSpecifications: [],
      documentSpecifications: [],
      videoUrl: '',
      fileType: "",
      fileName: "",
      imagesLock: {},
      templatesLock: {},
      videosLock: {},
      documentsLock: {},
      explore: false,
      hideLock: false,
      popoverOpen: false, deleteOption: false,
      selectedData: [],
      showSharedFiles: false,
      sharedFiles: [],
      myPortfolio: false,
      isLibrary: false,
      totalLibrarySize: 0,
      uploadingAvatar: false,
      showProfileModal: false,
      uploadingAvatar1: false,
      showProfileModal1: false,
    };
    this.toggle = this.toggle.bind(this);
    this.refetchData.bind(this);
    this.updateLibrary.bind(this);
    this.dataPrivacyHandler.bind(this);
    this.portfolioShareHandler.bind(this);
    this.getSharedFiles.bind(this);
    this.showSharedFiles.bind(this);
    this.getTotalSpaceLeft.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUploadAvatar1 = this.handleUploadAvatar1.bind(this);
    this.toggleModal1 = this.toggleModal1.bind(this);
  }

  /**
   * componentWillMount
   * Desc :: data to be loaded on the mounting
   * @param props :: Object - Parents data
   */

  componentWillMount() {
    this.getCentralLibrary()
    let userId = this.props.portfolioDetailsId ? this.props.portfolioDetailsId : "";
    let portfolioId = FlowRouter.getRouteName();
    let path = FlowRouter.current().path
    if (path.indexOf("view") > 0) {
      this.setState({ explore: false })
      this.getLibraryDetails(userId);
    }
    if (portfolioId === "explore") {
      this.setState({ explore: true })
      this.getLibraryDetails(userId);
    }

    if (portfolioId !== "portfolio" || path.indexOf("view") > 0) {
      this.setState({ explore: true, myPortfolio: true }, function () {
        if (!this.state.myPortfolio) {
          this.getLibraryDetails(userId);
        }
      }.bind(this));
      this.privacySeggregation();
    }
    if (portfolioId !== "portfolio" || path.indexOf("edit") > 0) {
      this.setState({ deleteOption: true, hideLock: false, myPortfolio: true }, function () {
        if (!this.state.myPortfolio) {
          this.getLibraryDetails(userId);
        }
      }.bind(this));
      this.privacySeggregation();
    }
    if (portfolioId === "library") {
      this.getLibraryDetails(userId);
      this.getTotalSpaceLeft();
      this.setState({ explore: false, isLibrary: true, hideLock: true, deleteOption: false })
    }
    if (portfolioId === "transaction_portfolio_EditRequests") {
      this.getLibraryDetails(userId);
      this.setState({ explore: false, isAdminEdit: true })
      this.setState({ hideLock: true })
    }

    // if(this.state.getLibraryInfo) {
    //   this.getLibraryDetails(userId);
    // }
  }

  getTotalSpaceLeft(response) {
    let totalSize = 0;
    if (response && response.length > 0) {
      response.map(function (data) {
        if (data && data.fileSize) {
          totalSize = totalSize + data.fileSize;
        }
      })
      totalSize = totalSize.toFixed(2);
      this.setState({ totalLibrarySize: totalSize })
    }
  }

  async getCentralLibrary() {
    let that = this;
    const resp = await fetchDataFromCentralLibrary(this.props.client)
    let images = [];
    let videos = [];
    let templates = [];
    let documents = [];
    resp.map(function (data) {
      if (data.libraryType === "image") {
        images.push(data)
        that.setState({ imageDetails: images })
      } else if (data.libraryType === "video") {
        videos.push(data)
        that.setState({ videoDetails: videos })
      } else if (data.libraryType === "template") {
        templates.push(data)
        that.setState({ templateDetails: templates })
      } else if (data.libraryType === "document") {
        documents.push(data)
        that.setState({ documentDetails: documents })
      }
    })
    this.getTotalSpaceLeft(resp)
  }

  async privacySeggregation() {
    let that = this;
    let images = [];
    let videos = [];
    let templates = [];
    let documents = [];
    const response = await fetchLibraryBasedOnPortfolioIdHandler(this.props.portfolioDetailsId, this.props.client)
    response.map(function (data) {
      if (data.libraryType === "image") {
        images.push(data);
        that.setState({ imageSpecifications: images })
      } else if (data.libraryType === "video") {
        videos.push(data)
        that.setState({ videoSpecifications: videos })
      } else if (data.libraryType === "template") {
        templates.push(data)
        that.setState({ templateSpecifications: templates })
      } else if (data.libraryType === "document") {
        documents.push(data)
        that.setState({ documentSpecifications: documents })
      }
    })
    // this.setState({imageSpecifications: images,videoSpecifications: videos, templateSpecifications: templates, documentSpecifications: documents})
    return response;
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

  checkIfFileAlreadyExists(fileName, fileType) {
    switch (fileType) {
      case 'image':
        let currentImages = this.state.imageDetails || [];
        let imageStatus;
        currentImages.map(function (data) {
          if (data.fileName === fileName) {
            imageStatus = true;
          }
        })
        return imageStatus;
        break;
      case 'video':
        let currentVideos = this.state.videoDetails || [];
        let videoStatus;
        currentVideos.map(function (data) {
          if (data.fileName === fileName) {
            videoStatus = true;
          }
        })
        return videoStatus;
        break;
      case 'document':
        let currentDocuments = this.state.documentDetails || [];
        let documentStatus;
        currentDocuments.map(function (data) {
          if (data.fileName === fileName) {
            documentStatus = true;
          }
        })
        return documentStatus;
        break;
      case 'template':
        let currentTemplates = this.state.templateDetails || [];
        let templateStatus;
        currentTemplates.map(function (data) {
          if (data.fileName === fileName) {
            templateStatus = true;
          }
        })
        return templateStatus;
        break


    }
  }


  /**
   * Method :: ImageUpload
   * Desc   :: Handles the image uploading event
   * @param :: Event Handler
   * @returns Void
   */

  ImageUpload(fileInfo, image) {
    let file = image;
    let fileSize = fileInfo.size / 1024 / 1024;
    let fileType = fileInfo.type;
    this.setState({ fileType: fileInfo.type, fileName: fileInfo.name, fileSize: fileSize });
    this.getCentralLibrary();
    if (this.state.totalLibrarySize < 50) {
      let fileExists = this.checkIfFileAlreadyExists(fileInfo.name, "image");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "image") {
        if (!fileExists) {
          let data = { moduleName: "PROFILE", actionName: "UPDATE" }
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "image"));
        } else {
          toastr.error("Image with the same file name already exists");
        }
      } else {
        toastr.error("Please select a Image Format");
      }
    } else {
      toastr.error("Allotted library limit exceeded");
    }
  }

  /**
   * Method :: videoUpload
   * Desc   :: Handles the video uploading event
   * @returns Void
   */

  videoUpload(e) {
    let file = e.target.files[0];
    let fileSize = file.size / 1024 / 1024;
    let fileType = file.type;
    this.setState({ fileType: file.type, fileName: file.name, fileSize: fileSize });
    this.getCentralLibrary();
    if (this.state.totalLibrarySize < 50) {
      let fileExists = this.checkIfFileAlreadyExists(file.name, "video");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "video") {
        if (!fileExists) {
          let data = { moduleName: "PROFILE", actionName: "UPDATE" }
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "video"));
        } else {
          toastr.error("Video with the same file name already exists");
        }
      } else {
        toastr.error("Please select a Video Format");
      }
    } else {
      toastr.error("Allotted library limit exceeded");
    }
  }

  /**
   * Method :: TemplateUpload
   * Desc   :: Handles the template uploading event
   * @returns Void
   */

  TemplateUpload(fileInfo, image) {
    let file = image;
    let fileType = fileInfo.type;
    let fileSize = fileInfo.size / 1024 / 1024;
    this.setState({ fileType: fileInfo.type, fileName: fileInfo.name, fileSize: fileSize });
    this.getCentralLibrary();
    if (this.state.totalLibrarySize < 50) {
      let fileExists = this.checkIfFileAlreadyExists(fileInfo.name, "template");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "image") {
        if (!fileExists) {
          let data = { moduleName: "PROFILE", actionName: "UPDATE" }
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "template"));
        } else {
          toastr.error("Template with the same file name already exists");
        }
      } else {
        toastr.error("Please select a Template Format");
      }
    } else {
      toastr.error("Allotted library limit exceeded");
    }
  }

  /**
   * Method :: documentUpload
   * Desc   :: Handles the document uploading event
   * @returns Void
   */

  documentUpload(e) {
    let file = e.target.files[0];
    let fileSize = file.size / 1024 / 1024;
    let fileType = file.type;
    this.setState({ fileType: file.type, fileName: file.name, fileSize: fileSize });
    this.getCentralLibrary();
    if (this.state.totalLibrarySize < 50) {
      let fileExists = this.checkIfFileAlreadyExists(file.name, "document");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[1] !== "image" && typeShouldBe[1] !== "video") {
        if (!fileExists) {
          let data = { moduleName: "PROFILE", actionName: "UPDATE" }
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "document"));
        } else {
          toastr.error("Document with the same file name already exists")
        }
      } else {
        toastr.error("Please select a Document Format")
      }
    } else {
      toastr.error("Allotted library limit exceeded");
    }
  }

  /**
   * Method :: refetchData
   * Desc   :: Gets the images once its uploaded
   * @returns Void
   */

  refetchData() {
    let userId = this.props.portfolioDetailsId;
    if (!this.state.myPortfolio) {
      this.getLibraryDetails(userId)
    } else {
      this.privacySeggregation();
    }
  }

  /**
   * Method :: toggleImageLock
   * Desc   :: Handles the image locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */

  toggleImageLock(details, id) {
    let images = this.state.imageSpecifications;
    let image = {}
    images.map(function (data) {
      if (details._id === data._id) {
        image = data;
      }
    })
    let privacyState = image.isPrivate ? false : true;
    let imageDetails = {
      id: image._id,
      privacyState: privacyState,
      portfolioId: this.props.portfolioDetailsId
    }
    this.dataPrivacyHandler(imageDetails)
    images[id].isPrivate = privacyState;
    this.setState({ imageSpecifications: images })
    this.privacySeggregation();
  }
  // let imageLock = this.state.imagesLock;
  // // if(Object.keys(imageLock).length === 0) {
  // //   imageLock[id] = true;
  // // }else {
  // //   imageLock[id] = imageLock[id] ? false : true;
  // // }
  // this.setState({
  //   imagesLock: imageLock
  // });



  /**
   * Method :: toggleTemplateLock
   * Desc   :: Handles the template locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */

  toggleTemplateLock(details, id) {
    let templates = this.state.templateSpecifications;
    let template = {}
    templates.map(function (data) {
      if (details._id === data._id) {
        template = data;
      }
    })
    let privacyState = template.isPrivate ? false : true;
    let templateDetails = {
      id: template._id,
      privacyState: privacyState,
      portfolioId: this.props.portfolioDetailsId
    }
    this.dataPrivacyHandler(templateDetails)
    templates[id].isPrivate = privacyState;
    this.setState({ templateSpecifications: templates })
    this.privacySeggregation();
  }

  /**
   * Method :: toggleVideoLock
   * Desc   :: Handles the video locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */


  toggleVideoLock(details, id) {
    let videos = this.state.videoSpecifications;
    let video = {}
    videos.map(function (data) {
      if (details._id === data._id) {
        video = data;
      }
    })
    let privacyState = video.isPrivate ? false : true;
    let videoDetails = {
      id: video._id,
      privacyState: privacyState,
      portfolioId: this.props.portfolioDetailsId
    }
    this.dataPrivacyHandler(videoDetails)
    videos[id].isPrivate = privacyState;
    this.setState({ videoSpecifications: videos })
    this.privacySeggregation();
  }

  /**
   * Method :: toggleDocumentLock
   * Desc   :: Handles the document locking functionality
   * @param :: id - type :: Number
   * @returns Void
   */


  toggleDocumentLock(details, id) {
    let documents = this.state.documentSpecifications;
    let document = {}
    documents.map(function (data) {
      if (details._id === data._id) {
        document = data;
      }
    })
    let privacyState = document.isPrivate ? false : true;
    let documentDetails = {
      id: document._id,
      privacyState: privacyState,
      portfolioId: this.props.portfolioDetailsId
    }
    this.dataPrivacyHandler(documentDetails)
    documents[id].isPrivate = privacyState;
    this.setState({ documentSpecifications: documents })
    this.privacySeggregation();
  }

  async dataPrivacyHandler(detailsInput) {
    const response = await updatePrivacyDetails(detailsInput, this.props.client)
    return response;
  }

  /**
   * Method :: onFileUploadCallBack
   * Desc   :: Handles all the file uploads
   * @param :: type - type :: String : resp - type :: Object
   * @returns Void
   */

  onFileUploadCallBack(type, resp) {
    if (resp !== 'Maximum file size exceeded') {
      this.setState({ uploadedData: resp });
      var link = $.parseJSON(this.state.uploadedData).result;
      this.setState({ uploadedData: link });
      if (!this.state.isLibrary) {
        let userOption = confirm("Do you want to add the file into the library")
        if (userOption) {
          let addToCentralLibrary = true;
          this.storeData(link, type, addToCentralLibrary)
        } else {
          let addToCentralLibrary = false;
          this.storeData(link, type, addToCentralLibrary)
        }
      } else {
        let addToCentralLibrary = true;
        this.storeData(link, type, addToCentralLibrary)
      }
    } else {
      toastr.error(resp)
    }
    this.setState({
      uploadingAvatar: false,
      uploadingAvatar1: false,
      showProfileModal: false,
      showProfileModal1: false
    });
  }

  /**
   * Method :: storeData
   * Desc   :: Handles all the data storing activities
   * @param :: link - type :: String : dataType - type :: String
   * @returns resp - type :: Object
   */

  async storeData(link, dataType, addToCentralLibrary) {
    let Details = {
      userId: this.props.portfolioDetailsId,
      fileName: this.state.fileName,
      fileSize: this.state.fileSize,
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
    let images = [];
    let videos = [];
    let templates = [];
    let documents = [];
    resp.map(function (data) {
      if (data.libraryType === "image") {
        images.push(data);
        that.setState({ imageSpecifications: images, popImagesSpecifications: images })
      } else if (data.libraryType === "video") {
        videos.push(data)
        that.setState({ videoSpecifications: videos })
      } else if (data.libraryType === "template") {
        templates.push(data)
        that.setState({ templateSpecifications: templates })
      } else if (data.libraryType === "document") {
        documents.push(data)
        that.setState({ documentSpecifications: documents })
      }
    })
  }

  randomVideo(link, index) {
    let data = this.state.videoSpecifications || [];
    let videoPreviewUrl;
    videoPreviewUrl = data[index].fileUrl;
    this.setState({ previewVideo: videoPreviewUrl, videoUrl: videoPreviewUrl });
  }

  random(link, index) {
    let data = this.state.imageSpecifications || [];
    let imagePreviewUrl;
    imagePreviewUrl = data[index].fileUrl;
    this.setState({ previewImage: imagePreviewUrl });
  }

  randomDocument(link, index) {
    let data = this.state.documentSpecifications || [];
    let documentPreviewUrl;
    documentPreviewUrl = data[index].fileUrl;
    this.setState({ previewDocument: documentPreviewUrl });
  }

  randomTemplate(link, index) {
    let data = this.state.templateSpecifications || [];
    let templatePreviewUrl;
    templatePreviewUrl = data[index].fileUrl;
    this.setState({ previewTemplate: templatePreviewUrl });
  }

  ///================================================================================================================

  onFileSelect(index, type, e) {
    if (e.target.checked) {
      switch (type) {
        case 'image':
          let imageArray = this.state.selectedData || [];
          let images = this.state.imageDetails || [];
          let selectedImage = images[index];
          selectedImage['fileType'] = 'image';
          imageArray.push(selectedImage);
          this.setState({ selectedData: imageArray })
          break;
        case 'template':
          let templateArray = this.state.selectedData || [];
          let templates = this.state.templateDetails || [];
          let selectedTemplate = templates[index];
          selectedTemplate.fileType = 'template';
          templateArray.push(selectedTemplate);
          this.setState({ selectedData: templateArray })
          break;
        case 'video':
          let videoArray = this.state.selectedData || [];
          let videos = this.state.videoDetails || [];
          let selectedVideo = videos[index];
          selectedVideo.fileType = 'video';
          videoArray.push(selectedVideo);
          this.setState({ selectedData: videoArray })
          break;
        case 'document':
          let documentArray = this.state.selectedData || [];
          let documents = this.state.documentDetails || [];
          let selectedDocument = documents[index];
          selectedDocument.fileType = 'document';
          documentArray.push(selectedDocument);
          this.setState({ selectedData: documentArray })
          break;
      }
    } else {
      switch (type) {
        case 'image':
          let imageArray = this.state.selectedData || [];
          let images = this.state.imageDetails || [];
          let selectedImage = images[index];
          selectedImage.fileType = 'image';
          imageArray.splice(imageArray.indexOf(selectedImage), 1);
          this.setState({ selectedData: imageArray })
          break;
        case 'template':
          let templateArray = this.state.selectedData || [];
          let templates = this.state.templateDetails || [];
          let selectedTemplate = templates[index];
          selectedTemplate.fileType = 'template';
          templateArray.splice(templateArray.indexOf(selectedTemplate), 1);
          this.setState({ selectedData: templateArray })
          break;
        case 'video':
          let videoArray = this.state.selectedData || [];
          let videos = this.state.videoDetails || [];
          let selectedVideo = videos[index];
          selectedVideo.fileType = 'video';
          videoArray.splice(videoArray.indexOf(selectedVideo), 1);
          this.setState({ selectedData: videoArray })
          break;
        case 'document':
          let documentArray = this.state.selectedData || [];
          let documents = this.state.documentDetails || [];
          let selectedDocument = documents[index];
          selectedDocument.fileType = 'document';
          documentArray.splice(documentArray.indexOf(selectedDocument), 1);
          this.setState({ selectedData: documentArray })
          break;
      }
    }
  }

  // deletedData(response) {
  //
  // }


  /**
   * Method :: images
   * Desc   :: Handles all the image looping activities
   * @returns Images - type:: Object
   */

  images() {
    let that = this;
    let imageData = this.state.isLibrary ? this.state.imageDetails || [] : this.state.imageSpecifications || [];
    const Images = imageData.map(function (show, id) {
      return (
        <div className="thumbnail" key={id}>
          {that.state.explore ? " " : show.isPrivate ? !that.state.hideLock ? <FontAwesome onClick={() => that.toggleImageLock(show, id)} name='lock' /> : "" : !that.state.hideLock ? <FontAwesome onClick={() => that.toggleImageLock(show, id)} name='unlock' /> : ""}
          {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "image", "portfolio")} />}
          <a href="#" data-toggle="modal" data-target=".imagepop"
            onClick={that.random.bind(that, show.fileUrl, id)}><img src={show.fileUrl} /></a>
          <div id="images" className="title">{show.fileName}</div>

        </div>
      )
    });
    return Images
  }

  /**
   * Method :: popImages
   * Desc   :: Handles all the image looping activities
   * @returns popImages - type:: Object
   */

  popImages() {
    let that = this;
    let popImageData = this.state.imageDetails || [];
    const popImages = popImageData.map(function (show, id) {
      if (show.inCentralLibrary) {
        return (
          <div className="thumbnail" key={id}>
            <div className="input_types">
              <input id={"checkboxImg" + id} type="checkbox" name={"checkboxImg" + id} value="1" onChange={that.onFileSelect.bind(that, id, 'image')} />
              <label htmlFor={"checkboxImg" + id} ><span></span></label>
            </div>
            {that.state.explore || that.state.deleteOption ? "" :
              <FontAwesome name='trash-o' onClick={() => that.delete(id, "image", "portfolio")} />}
            {/*<div className="icon_count"> <FontAwesome name='share-alt' /></div>*/}
            <FontAwesome name='times' style={{ 'display': 'none' }} />
            <div className="show_details" style={{ 'display': 'none' }}>
              <ul className="list-group">
                <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
              </ul>
            </div>
            {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".imagepop"
              onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl} /></a> :
              <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl} /></a>}
            <div id="images" className="title">{show.fileName}</div>
          </div>
        )
      }
    });
    return popImages
  }

  showSharedFiles() {
    let that = this;
    let popImageData = that.state.sharedFiles || [];
    const popImages = popImageData.map(function (show, id) {
      return (
        <div className="thumbnail" key={id}>
          <img src={show.file.url} style={{ 'width': '200px', 'height': '150px' }} />
          <div id="images" className="title">{show.file.fileName}</div>
        </div>
      )
    });
    return popImages
  }

  /**
   * Method :: templates
   * Desc   :: Handles all the template looping activities
   * @returns Templates - type:: Object
   */

  templates() {
    let that = this;
    let templateData = this.state.isLibrary ? this.state.templateDetails || [] : this.state.templateSpecifications || [];
    const Templates = templateData.map(function (show, id) {
      return (
        <div className="thumbnail" key={id}>
          {that.state.explore ? "" : show.isPrivate ? !that.state.hideLock ? <FontAwesome onClick={() => that.toggleTemplateLock(show, id)} name='lock' /> : "" : !that.state.hideLock ? <FontAwesome onClick={() => that.toggleTemplateLock(show, id)} name='unlock' /> : ""}
          {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "template")} />}
          <a href="#" data-toggle="modal" data-target=".templatepop"
            onClick={that.randomTemplate.bind(that, show.fileUrl, id)}><img src={show.fileUrl} /></a>
          <div id="templates" className="title">{show.fileName}</div>
        </div>
      )
    });
    return Templates
  }

  /**
   * Method :: popTemplates
   * Desc   :: Handles all the template looping activities
   * @returns popTemplates - type:: Object
   */

  popTemplates() {
    let that = this;
    let popTemplateData = this.state.templateDetails || [];
    const popTemplates = popTemplateData.map(function (show, id) {
      if (show.inCentralLibrary) {
        return (
          <div className="thumbnail" key={id}>
            <div className="input_types">
              <input id={"checkboxTemp" + id} type="checkbox" name={"checkboxTemp" + id} value="1" onChange={that.onFileSelect.bind(that, id, 'template')} />
              <label htmlFor={"checkboxImg" + id} ><span></span></label>
            </div>
            {that.state.explore || that.state.deleteOption ? "" :
              <FontAwesome name='trash-o' onClick={() => that.delete(id, "template", "portfolio")} />}
            {/*<div className="icon_count"> <FontAwesome name='share-alt' /></div>*/}
            <FontAwesome name='times' style={{ 'display': 'none' }} />
            <div className="show_details" style={{ 'display': 'none' }}>
              <ul className="list-group">
                <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
              </ul>
            </div>
            {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".templatepop"
              onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl} /></a> :
              <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl} /></a>}
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )
      }
    });
    return popTemplates
  }

  /**
   * Method :: videos
   * Desc   :: Handles all the video looping activities
   * @returns videos - type:: Object
   */

  videos() {
    let that = this;
    let videodata = this.state.isLibrary ? this.state.videoDetails || [] : this.state.videoSpecifications || [];
    const videos = videodata.map(function (show, id) {
      return (
        <div className="thumbnail" key={id}>
          {that.state.explore ? "" : show.isPrivate ? !that.state.hideLock ? <FontAwesome onClick={() => that.toggleVideoLock(show, id)} name='lock' /> : "" : !that.state.hideLock ? <FontAwesome onClick={() => that.toggleVideoLock(show, id)} name='unlock' /> : ""}
          {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "video")} />}
          <a href="" data-toggle="modal" data-target=".videopop" onClick={that.randomVideo.bind(that, show.fileUrl, id)}>
            <video onContextMenu={(e) => e.preventDefault()} width="120" height="100" controls>
              <source src={show.fileUrl} type="video/mp4"></source>
            </video>
          </a>
          <div className="title">{show.fileName}</div>
        </div>
      )
    });
    return videos;
  }

  /**
   * Method :: popVideos
   * Desc   :: Handles all the video looping activities
   * @returns popVideos - type:: Object
   */

  popVideos() {
    let that = this;
    let popVideoData = this.state.videoDetails || [];
    const popVideos = popVideoData.map(function (show, id) {
      if (show.inCentralLibrary) {
        return (
          <div className="thumbnail" key={id}>
            <div className="input_types">
              <input id={"checkboxTemp" + id} type="checkbox" name={"checkboxTemp" + id} value="1" onChange={that.onFileSelect.bind(that, id, 'video')} />
              <label htmlFor={"checkboxImg" + id} ><span></span></label>
            </div>
            {that.state.explore || that.state.deleteOption ? "" :
              <FontAwesome name='trash-o' onClick={() => that.delete(id, "video")} />}
            {/*<div className="icon_count"> <FontAwesome name='share-alt' /> </div>*/}
            <FontAwesome name='times' style={{ 'display': 'none' }} />
            <div className="show_details" style={{ 'display': 'none' }}>
              <ul className="list-group">
                <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
              </ul>
            </div>
            {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".videopop"
              onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}>
              <video width="120" height="100" controls>
                <source src={show.fileUrl} type="video/mp4"></source>
              </video>
            </a> : <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}>
                <video width="120" height="100" controls>
                  <source src={show.fileUrl} type="video/mp4"></source>
                </video>
              </a>}
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )
      }
    });
    return popVideos;
  }

  /**
   * Method :: documents
   * Desc   :: Handles all the documents looping activities
   * @returns Documents - type:: Object
   */

  documents() {
    let that = this;
    let documentData = this.state.isLibrary ? this.state.documentDetails || [] : this.state.documentSpecifications || [];
    const Documents = documentData.map(function (show, id) {
      return (
        <div className="thumbnail" key={id}>
          {that.state.explore ? " " : show.isPrivate ? !that.state.hideLock ? <FontAwesome onClick={() => that.toggleDocumentLock(show, id)} name='lock' /> : "" : !that.state.hideLock ? <FontAwesome onClick={() => that.toggleDocumentLock(show, id)} name='unlock' /> : ""}
          {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "document")} />}
          <a href="" data-toggle="modal" data-target=".documentpop"
            onClick={that.randomDocument.bind(that, show.fileUrl, id)}><img src="/images/doc.png" /></a>
          <div id="images" className="title">{show.fileName}</div>
        </div>
      )
    });
    return Documents;
  }

  /**
   * Method :: popDocuments
   * Desc   :: Handles all the documents looping activities
   * @returns popDocuments - type:: Object
   */

  popDocuments() {
    let that = this;
    let popDocumentData = this.state.documentDetails || [];
    const popDocuments = popDocumentData.map(function (show, id) {
      if (show.inCentralLibrary) {
        return (
          <div className="thumbnail" key={id}>
            <div className="input_types">
              <input id={"checkboxTemp" + id} type="checkbox" name={"checkboxTemp" + id} value="1" onChange={that.onFileSelect.bind(that, id, 'document')} />
              <label htmlFor={"checkboxImg" + id} ><span></span></label>
            </div>
            {that.state.explore || that.state.deleteOption ? "" :
              <FontAwesome name='trash-o' onClick={() => that.delete(id, "document")} />}
            {/*<div className="icon_count"> <FontAwesome name='share-alt' /> </div>*/}
            <FontAwesome name='times' style={{ 'display': 'none' }} />
            <div className="show_details" style={{ 'display': 'none' }}>
              <ul className="list-group">
                <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
              </ul>
            </div>
            {that.state.isLibrary ? <a href="" data-toggle="modal" data-target=".documentpop"
              onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}>
              <img src="/images/doc.png" /></a> :
              <a href="" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl} /></a>}
            <div id="templates" className="title">{show.fileName}</div>
          </div>
        )
      }
    });
    return popDocuments;
  }

  /**
   * Method :: sendDataToPortfolioLibrary
   * Desc   :: Send the data to portfolio library from the user Library
   * @params :: dataDetail : Object :: index : Number
   * @returns Void
   */

  sendDataToPortfolioLibrary(dataDetail, index) {
    let portfolioId = FlowRouter.getRouteName();
    let tempObject = Object.assign({}, dataDetail);
    if (dataDetail.libraryType === "image") {
      if (portfolioId === "library") {
        let data = this.state.imageDetails || [];
        let imagePreviewUrl;
        imagePreviewUrl = data[index].fileUrl;
        this.setState({ previewImage: imagePreviewUrl });
      } else {
        let data = this.state.imageSpecifications || [];
        data.push(tempObject);
        this.setState({ imageSpecifications: data })
      }
    } else if (dataDetail.libraryType === "video") {
      if (portfolioId === "library") {
        let data = this.state.videoDetails || [];
        let videoPreviewUrl;
        videoPreviewUrl = data[index].fileUrl;
        this.setState({ previewVideo: videoPreviewUrl });
      } else {
        let data = this.state.videoSpecifications || [];
        data.push(tempObject);
        this.setState({ videoSpecifications: data })
      }
    } else if (dataDetail.libraryType === "template") {
      if (portfolioId === "library") {
        let data = this.state.templateDetails || [];
        let templatePreviewUrl;
        templatePreviewUrl = data[index].fileUrl;
        this.setState({ previewTemplate: templatePreviewUrl });
      } else {
        let data = this.state.templateSpecifications || [];
        data.push(tempObject);
        this.setState({ templateSpecifications: data })
      }
    } else if (dataDetail.libraryType === "document") {
      if (portfolioId === "library") {
        let data = this.state.documentDetails || [];
        let documentPreviewUrl;
        documentPreviewUrl = data[index].fileUrl;
        this.setState({ previewDocument: documentPreviewUrl });
      } else {
        let data = this.state.documentSpecifications || [];
        data.push(tempObject);
        this.setState({ documentSpecifications: data })
      }
    }
    newItem = _.omit(tempObject, "__typename", "_id")
    let temp = newItem
    if (newItem.portfolioReference) {
      let y = newItem.portfolioReference.map(function (data) {
        return _.omit(data, '__typename')
      })
      newItem.portfolioReference = y;
      this.updateLibraryPortfolioLibrary(tempObject._id, newItem)
    } else {
      this.updateLibraryPortfolioLibrary(tempObject._id, newItem)
    }
  }

  /**
   * Method :: updateLibraryPortfolioLibrary
   * Desc   :: Update the library collection after the data is sent to portfolio Library from user Library
   * @params :: data : Object :: id : Number
   * @returns resp: Object
   */

  async updateLibraryPortfolioLibrary(id, data) {
    const resp = await updateLibrary(id, data, this.props.client)
    // if(!resp.success){
    //   toastr.error("Image already Exists in library")
    // }
    return resp;
  }

  componentDidMount() {
    (function (a) {
      a.createModal = function (b) {
        defaults = { scrollable: false };
        var b = a.extend({}, defaults, b);
        var c = (b.scrollable === true) ? 'style="max-height: 420px;overflow-y: auto;"' : "";
        html = '<div class="modal fade library-popup" id="myModal">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã—</button>';
        if (b.title.length > 0) {
          html += '<h4 class="modal-title">' + b.title + "</h4>"
        }
        html += "</div>";
        html += '<div class="modal-body" ' + c + ">";
        html += b.message;
        html += "</div>";
        a("body").prepend(html);
        a("#myModal").modal().on("hidden.bs.modal", function () {
          a(this).remove()
        })
      }
    })(jQuery);
    $('.view-pdf').on('click', function () {
      var pdf_link = $(this).attr('href');
      var iframe = '<div class="iframe-container"><iframe src="' + pdf_link + '"></iframe></div>'
      $.createModal({
        title: 'My Title',
        message: iframe,
        scrollable: false
      });
      return false;
    });

    $(".information").unbind("click").click(function () {
      if ($(this).hasClass('ml-information')) {
        $(this).removeClass('ml-information').addClass('ml-delete');
      } else {
        $(this).removeClass('ml-delete').addClass('ml-information');
      }
      $(this).parents('.panel').find(".show-information").toggle(200);
    });
  }

  componentDidUpdate() {
    $(".icon_count").click(function () {
      $(this).parents('.thumbnail').find(".fa-times").show();
      $(this).parents('.thumbnail').find(".show_details").show();
      $(this).parents('.thumbnail').find(".icon_count").hide();
      $(this).parents('.thumbnail').find(".fa-lock").hide();
      $(this).parents('.thumbnail').find(".fa-unlock").hide();
      $(this).parents('.thumbnail').find(".input_types").hide();

    });

    $(".fa-times").click(function () {
      $(this).parents('.thumbnail').find(".icon_count").show();
      $(this).parents('.thumbnail').find(".fa-times").hide();
      $(this).parents('.thumbnail').find(".show_details").hide();
      $(this).parents('.thumbnail').find(".fa-lock").show();
      $(this).parents('.thumbnail').find(".fa-unlock").show();
      $(this).parents('.thumbnail').find(".input_types").show();

    });
  }

  /**
   * Method :: delete
   * Desc   :: Perform the deletion operations on data
   * @params :: type : String :: index: Number
   * @returns Void
   */

  delete(index, type) {
    switch (type) {
      case "image":
        let imageData = this.state.imageSpecifications;
        let initialImageData = imageData[index];
        imageData.splice(index, 1);
        this.setState({
          imageSpecifications: imageData
        });
        let imageDelete = {
          index: index,
          type: initialImageData.fileUrl,
          libraryType: "image"
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
          index: index,
          type: initialVideoData.fileUrl,
          libraryType: "video"
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
          index: index,
          type: initialTemplateData.fileUrl,
          libraryType: "template"
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
          index: index,
          type: initialDocumentData.fileUrl,
          libraryType: "document"
        }
        this.updateLibrary(docDelete)
        break;
    }
  }

  /**
   * Method :: updateLibrary
   * Desc   :: Library data is updated
   * @params :: file : Object
   * @returns response : Object
   */

  async updateLibrary(files) {
    const response = await updateLibraryData(files, this.props.client)
    this.getCentralLibrary()
    return response;
  }

  /**
   * Method :: PopOverAction
   * Desc   :: PopOver actions are controlled in this function
   * @params :: type : Object
   */

  PopOverAction(type, e) {
    this.setState({
      popoverOpen: !(this.state.popoverOpen),
      target: type.id,
      toDisplay: type.toDisplay,
      placement: type.placement,
      title: type.title,
      file: type.title
    })
  }

  portfolioShareHandler(actionConfig, handlerCallback) {
    if (handlerCallback) {//to handle the popover
      handlerCallback({ Details: this.state.selectedData });
    }
  }

  connectionManagement(userId) {
    this.getSharedFiles(userId);
  }

  async getSharedFiles(userId) {
    const resp = await fetchSharedLibraryHandler(userId)
    this.setState({ sharedFiles: resp, showSharedFiles: true })
  }

  showLibrary(response) {
    this.setState({ showSharedFiles: response })
  }

  handleUploadAvatar(image, e) {
    console.log('here');
    this.setState({
      uploadingAvatar: true,
    });
    this.ImageUpload(e, image);
  }

  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal,
    });
  }

  handleUploadAvatar1(image, e) {
    console.log('here');
    this.setState({
      uploadingAvatar1: true,
    });
    this.TemplateUpload(e, image);
  }

  toggleModal1() {
    const that = this;
    this.setState({
      showProfileModal1: !that.state.showProfileModal1,
    });
  }

  render() {
    var videoJsOptions = [{
      autoplay: true,
      controls: true,
      sources: [{ src: this.state.previewVideo, type: 'video/mp4' }]
    }]
    let that = this;
    let ImageDetails = {
      id: "create_client",
      toDisplay: this.popImages(),
      placement: "left",
      title: "Images"
    }
    let TemplateDetails = {
      id: "create_template",
      toDisplay: this.popTemplates(),
      placement: "left",
      title: "Templates"
    }
    let VideoDetails = {
      id: "create_video",
      toDisplay: this.popVideos(),
      placement: "left",
      title: "Videos"
    }
    let DocumentDetails = {
      id: "create_document",
      toDisplay: this.popDocuments(),
      placement: "left",
      title: "Documents"
    }

    let _this = this;
    let appActionConfig = [
      {
        showAction: true,
        actionName: 'share',
        hasPopOver: true,
        popOverTitle: 'Shared Details',
        placement: 'top',
        target: 'sharedLibrary',
        popOverComponent: <SharePopOver Details={this.state.selectedData} />,
        actionComponent: PopoverActionIcon,
        handler: this.portfolioShareHandler.bind(this),
      },
      {
        showAction: true,
        actionName: 'exit',
        handler: async (event) => _this.props.handler(_this.props.redirectWithCalendar.bind(this, 'calendar'))
      }
    ];
    export const genericPortfolioAccordionConfig = {
      id: 'portfolioAccordion',
      panelItems: [
        {
          'title': 'Actions',
          isText: false,
          style: { 'background': '#ef4647' },
          contentComponent: <MlAppActionComponent
            resourceDetails={{ resourceId: 'share', resourceType: 'share' }}   //resource id need to be given
            actionOptions={appActionConfig} />
        }]
    };


    return (
      <div>
        <h2>Library</h2>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={'library-popup'}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <img src="/images/video_1.jpg" />
          </ModalBody>
        </Modal>
        <div className="modal fade bs-example-modal-sm library-popup imagepop"
          onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
          aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="img_scroll"><img src={this.state.previewImage} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bs-example-modal-sm library-popup templatepop"
          onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
          aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="img_scroll"><img src={this.state.previewTemplate} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bs-example-modal-sm library-popup documentpop"
          onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
          aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <iframe src={`https://docs.google.com/gview?url=${this.state.previewDocument}&embedded=true`} />
                {/*{<MlFileViewer/>}*/}
                {/*<div className="img_scroll"><MlDocViewer/></div>*/}
              </div>
            </div>
          </div>
        </div>
        {that.state.isLibrary ? <MlConnectionHeader showLibrary={that.showLibrary.bind(that)} connectionManagement={that.connectionManagement.bind(that)} /> : ""}
        <div className="modal fade bs-example-modal-sm library-popup videopop"
          onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
          aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                {this.state.previewVideo ? <MlVideoPlayer videoAttributes={videoJsOptions} /> : <div></div>}
              </div>
            </div>
          </div>
        </div>
        {!that.state.showSharedFiles ? <div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                Images
                <CropperModal
                  uploadingImage={this.state.uploadingAvatar}
                  handleImageUpload={this.handleUploadAvatar}
                  cropperStyle="any"
                  show={this.state.showProfileModal}
                  toggleShow={this.toggleModal}
                />
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask pull-right" id="create_client">
                    <a href="javascript:void(0);">
                      {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                        <span className="ml ml-upload" onClick={this.toggleModal.bind(this)}>
                          {/* <input type="file" className="upload_file upload"
                            name="video_source" id="video_upload"
                            onChange={that.ImageUpload.bind(that)} /> */}
                        </span> :
                        <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, ImageDetails)}></span>}
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popImages() : this.images()}
                <p className="show-information" style={{ 'display': 'none' }}>Document Format : png, jpg, jpeg <br />Document Size : 10 MB <br /> Library Size : {this.state.totalLibrarySize}/50 MB</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                Videos
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask" id="create_video">
                    <a href="javascript:void(0);">
                      {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ? <span className="ml ml-upload"><input type="file" className="upload_file upload" name="video_source" id="video_upload" onChange={that.videoUpload.bind(that)} /></span> : <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, VideoDetails)}></span>}
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popVideos() : this.videos()}
                <p className="show-information" style={{ 'display': 'none' }}>Document Format : mp4 <br />Document Size : 10 MB <br /> Library Size : {this.state.totalLibrarySize}/50 MB</p>
              </div>
            </div>
          </div>
          <br className="brclear" />
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                Templates
                <CropperModal
                  uploadingImage={this.state.uploadingAvatar1}
                  handleImageUpload={this.handleUploadAvatar1}
                  cropperStyle="any"
                  show={this.state.showProfileModal1}
                  toggleShow={this.toggleModal1}
                />
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask pull-right" id="create_template">
                    <a href="javascript:void(0);">
                      {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                        <span className="ml ml-upload" onClick={this.toggleModal1.bind(this)}>
                          {/* <input type="file" className="upload_file upload" name="image_source" 
                          id="template_upload" onChange={that.TemplateUpload.bind(that)} />*/}
                        </span> :
                        <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, TemplateDetails)}></span>}
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popTemplates() : this.templates()}
                <p className="show-information" style={{ 'display': 'none' }}>Document Format :png, jpg, jpeg <br />Document Size : 10 MB <br /> Library Size : {this.state.totalLibrarySize}/50 MB</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                Documents
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask pull-right" id="create_document">
                    <a href="javascript:void(0);">
                      {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                        <span className="ml ml-upload"><input type="file" className="upload_file upload"
                          name="image_source" id="document_upload"
                          onChange={that.documentUpload.bind(that)} /></span> :
                        <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, DocumentDetails)}></span>}
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popDocuments() : this.documents()}
                <p className="show-information" style={{ 'display': 'none' }}>Document Format : docs, docx, xls, xslx, ppt <br />Document Size : 10 MB <br /> Library Size : {this.state.totalLibrarySize}/50 MB</p>
              </div>
            </div>
          </div>
        </div> : <SharedLibrary data={this.state.sharedFiles} />}
        <Popover placement={this.state.placement} isOpen={this.state.popoverOpen} target={this.state.target}>
          <PopoverTitle>{this.state.title}</PopoverTitle>
          <PopoverContent>
            <div className="ml_create_client">
              <div className="medium-popover">
                <div className="form-group popover_thumbnail">
                  {this.state.toDisplay}
                </div>
                <div className="fileUpload mlUpload_btn">
                  <span>Upload</span>
                  {this.state.file === "Images" ?
                    <input type="file" className="upload" ref="upload" onChange={this.ImageUpload.bind(this)} /> :
                    this.state.file === "Videos" ?
                      <input type="file" className="upload_file upload" name="video_source" id="video_upload"
                        onChange={that.videoUpload.bind(that)} /> :
                      this.state.file === "Documents" ? <input type="file" className="upload" ref="upload"
                        onChange={this.documentUpload.bind(this)} /> :
                        this.state.file === "Templates" ? <input type="file" className="upload" ref="upload"
                          onChange={this.TemplateUpload.bind(this)} /> : ""}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {this.state.isLibrary ? <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} /> : ""}
      </div>
    )
  }
}
export default PortfolioLibrary = formHandler()(Library);



