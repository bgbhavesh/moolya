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
import {createLibrary, fetchLibrary, updateLibraryData, updatePrivacyDetails, updateLibrary, fetchDataFromCentralLibrary, fetchSharedLibraryHandler} from '../../actions/mlLibraryActionHandler'
import MlVideoPlayer from  '../../videoPlayer/MlVideoPlayer'
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import formHandler from "../../../commons/containers/MlFormHandler";
import MlAccordion from "../../../app/commons/components/MlAccordion";
import MlAppActionComponent from '../../../app/commons/components/MlAppActionComponent'
import PopoverActionIcon from '../../../app/appActions/components/PopoverActionIcon';
import SharePopOver from './sharePopOver'
import MlConnectionHeader from './connectionHeader'
import SharedLibrary from './sharedLibrary'

  class  Library extends React.Component {

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
        sharedFiles: []
      };
      this.toggle = this.toggle.bind(this);
      this.refetchData.bind(this);
      this.updateLibrary.bind(this);
      this.dataPrivacyHandler.bind(this);
      this.portfolioShareHandler.bind(this);
      this.getSharedFiles.bind(this);
      this.showSharedFiles.bind(this);
    }

    /**
     * componentWillMount
     * Desc :: data to be loaded on the mounting
     * @param props :: Object - Parents data
     */

    componentWillMount() {
      this.getCentralLibrary()
      let portfolioId = FlowRouter.getRouteName();
      let path = FlowRouter.current().path
      if (path.indexOf("view") > 0) {
        this.setState({explore: false})
      }
      if (portfolioId !== "portfolio" || path.indexOf("view") > 0) {
        this.setState({explore: true})
      }
      if (portfolioId !== "portfolio" || path.indexOf("edit") > 0) {
        this.setState({deleteOption: true})
      }
      if (portfolioId === "library") {
        this.setState({explore: false, isLibrary: true, hideLock: true, deleteOption: false})
      }
      if (portfolioId === "transaction_portfolio_EditRequests") {
        this.setState({explore: false, isAdminEdit: true})
        this.setState({hideLock: true})
      }
      userId = this.props.portfolioDetailsId ? this.props.portfolioDetailsId : "";
      this.getLibraryDetails(userId);
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
      console.log(this.state.imageDetails)
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

    ImageUpload(e) {
      let file = e.target.files[0];
      this.setState({fileType: file.type, fileName: file.name});
      let fileType = file.type;
      // this.getCentralLibrary();
      let fileExists = this.checkIfFileAlreadyExists(file.name, "image");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "image") {
        console.log('--fileStatus--', fileExists)
        if (!fileExists) {
          let data = {moduleName: "PROFILE", actionName: "UPDATE"}
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "image"));
        } else {
          toastr.error("Image with the same file name already exists");
        }
      } else {
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
      this.setState({fileType: file.type, fileName: file.name});
      let fileType = file.type;
      // this.getCentralLibrary();
      let fileExists = this.checkIfFileAlreadyExists(file.name, "video");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "video") {
        if (!fileExists) {
          let data = {moduleName: "PROFILE", actionName: "UPDATE"}
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "video"));
        } else {
          toastr.error("Video with the same file name already exists");
        }
      } else {
        toastr.error("Please select a Video Format");
      }
    }

    /**
     * Method :: TemplateUpload
     * Desc   :: Handles the template uploading event
     * @returns Void
     */

    TemplateUpload(e) {
      let file = e.target.files[0];
      this.setState({fileType: file.type, fileName: file.name});
      let fileType = file.type;
      // this.getCentralLibrary();
      let fileExists = this.checkIfFileAlreadyExists(file.name, "template");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[0] == "image") {
        if (!fileExists) {
          let data = {moduleName: "PROFILE", actionName: "UPDATE"}
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "template"));
        } else {
          toastr.error("Template with the same file name already exists");
        }
      } else {
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
      this.setState({fileType: file.type, fileName: file.name});
      let fileType = file.type;
      // this.getCentralLibrary();
      let fileExists = this.checkIfFileAlreadyExists(file.name, "document");
      let typeShouldBe = _.compact(fileType.split('/'));
      if (file && typeShouldBe && typeShouldBe[1] === "pdf") {
        if (!fileExists) {
          let data = {moduleName: "PROFILE", actionName: "UPDATE"}
          let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, "document"));
        } else {
          toastr.error("Document with the same file name already exists")
        }
      } else {
        toastr.error("Please select a Document Format")
      }
    }

    /**
     * Method :: refetchData
     * Desc   :: Gets the images once its uploaded
     * @returns Void
     */

    refetchData() {
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

      } else {
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

    toggleTemplateLock(id) {
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
      } else {
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
        templatesLock: templatesLock
      });
    }

    /**
     * Method :: toggleVideoLock
     * Desc   :: Handles the video locking functionality
     * @param :: id - type :: Number
     * @returns Void
     */


    toggleVideoLock(id) {
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
      } else {
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
        videosLock: videoLock
      });
    }

    /**
     * Method :: toggleDocumentLock
     * Desc   :: Handles the document locking functionality
     * @param :: id - type :: Number
     * @returns Void
     */


    toggleDocumentLock(id) {
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
      } else {
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
        documentsLock: documentsLock
      });
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
      if (resp) {
        this.setState({uploadedData: resp});
        var link = $.parseJSON(this.state.uploadedData).result;
        this.setState({uploadedData: link});
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
      }
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

    randomVideo(link, index) {
      let data = this.state.videoSpecifications || [];
      let videoPreviewUrl;
      videoPreviewUrl = data[index].fileUrl;
      this.setState({previewVideo: videoPreviewUrl, videoUrl: videoPreviewUrl});
    }

    random(link, index) {
      let data = this.state.imageSpecifications || [];
      let imagePreviewUrl;
      imagePreviewUrl = data[index].fileUrl;
      this.setState({previewImage: imagePreviewUrl});
    }

    randomDocument(link, index) {
      let data = this.state.documentSpecifications || [];
      let documentPreviewUrl;
      documentPreviewUrl = data[index].fileUrl;
      this.setState({previewDocument: documentPreviewUrl});
    }

    randomTemplate(link, index) {
      let data = this.state.templateSpecifications || [];
      let templatePreviewUrl;
      templatePreviewUrl = data[index].fileUrl;
      this.setState({previewTemplate: templatePreviewUrl});
    }

    ///================================================================================================================

    onFileSelect(index,type, e ) {
      console.log('--index--', index, '==type==', type, '--event--', e.target.checked)
      if(e.target.checked) {
        switch(type){
          case 'image':
            let imageArray = this.state.selectedData || [];
            let images = this.state.imageDetails || [];
            let selectedImage = images[index];
            selectedImage['fileType'] = 'image';
            imageArray.push(selectedImage);
            this.setState({selectedData: imageArray})
                break;
          case 'template':
            let templateArray = this.state.selectedData || [];
            let templates = this.state.templateDetails || [];
            let selectedTemplate = templates[index];
            selectedTemplate.fileType = 'template';
            templateArray.push(selectedTemplate);
            this.setState({selectedData: templateArray})
                break;
          case 'video':
            let videoArray = this.state.selectedData || [];
            let videos = this.state.videoDetails || [];
            let selectedVideo = videos[index];
            selectedVideo.fileType = 'video';
            videoArray.push(selectedVideo);
            this.setState({selectedData: videoArray})
            break;
          case 'document':
            let documentArray = this.state.selectedData || [];
            let documents = this.state.documentDetails || [];
            let selectedDocument = documents[index];
            selectedDocument.fileType = 'document';
            documentArray.push(selectedDocument);
            this.setState({selectedData: documentArray})
            break;
        }
      } else {
        switch(type){
          case 'image':
            let imageArray = this.state.selectedData || [];
            let images = this.state.imageDetails || [];
            let selectedImage = images[index];
            selectedImage.fileType = 'image';
            imageArray.splice( imageArray.indexOf(selectedImage), 1 );
            this.setState({selectedData: imageArray})
            break;
          case 'template':
            let templateArray = this.state.selectedData || [];
            let templates = this.state.templateDetails || [];
            let selectedTemplate = templates[index];
            selectedTemplate.fileType = 'template';
            templateArray.splice( templateArray.indexOf(selectedTemplate), 1 );
            this.setState({selectedData: templateArray})
            break;
          case 'video':
            let videoArray = this.state.selectedData || [];
            let videos = this.state.videoDetails || [];
            let selectedVideo = videos[index];
            selectedVideo.fileType = 'video';
            videoArray.splice( videoArray.indexOf(selectedVideo), 1 );
            this.setState({selectedData: videoArray})
            break;
          case 'document':
            let documentArray = this.state.selectedData || [];
            let documents = this.state.documentDetails || [];
            let selectedDocument = documents[index];
            selectedDocument.fileType = 'document';
            documentArray.splice( documentArray.indexOf(selectedDocument), 1 );
            this.setState({selectedData: documentArray})
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
            {that.state.explore ? " " : that.state.imagesLock[id] ? !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleImageLock(id)} name='lock'/> : "" : !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleImageLock(id)} name='unlock'/> : "" }
            {that.state.explore ? "" :
              <FontAwesome name='trash-o' onClick={() => that.delete(id, "image", "portfolio")}/>
            }
            <a href="#" data-toggle="modal" data-target=".imagepop"
               onClick={that.random.bind(that, show.fileUrl, id)}><img src={show.fileUrl}/></a>
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
                <input id={"checkboxImg"+id} type="checkbox" name={"checkboxImg"+id} value="1" onChange={that.onFileSelect.bind(that, id, 'image')} />
                <label htmlFor={"checkboxImg"+id} ><span></span></label>
              </div>
              {that.state.explore || that.state.deleteOption ? "" :
                <FontAwesome name='trash-o' onClick={() => that.delete(id, "image", "portfolio")}/>}
              <div className="icon_count"> <FontAwesome name='share-alt' /></div>
              <FontAwesome name='times' style={{'display':'none'}}/>
              <div className="show_details" style={{'display':'none'}}>
                <ul className="list-group">
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                </ul>
              </div>
              {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".imagepop"
                                         onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl}/></a> :
                <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                  src={show.fileUrl}/></a>}
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
    // console.log('==shared files==',that.state.sharedFiles);
    const popImages = popImageData.map(function (show, id) {
      // console.log('urls', show.files.url)
      return (
        <div className="thumbnail" key={id}>
          <img src={show.file.url} style={{'width':'200px', 'height':'150px'}}/>
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
            {that.state.explore ? "" : that.state.templatesLock[id] || show.isPrivate ? !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleTemplateLock(id)} name='lock'/> : "" : !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleTemplateLock(id)} name='unlock'/> : "" }
            {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "template")}/>}
            <a href="#" data-toggle="modal" data-target=".templatepop"
               onClick={that.randomTemplate.bind(that, show.fileUrl, id)}><img src={show.fileUrl}/></a>
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
                <input id={"checkboxTemp"+id} type="checkbox" name={"checkboxTemp"+id} value="1" onChange={that.onFileSelect.bind(that, id, 'template')} />
                <label htmlFor={"checkboxImg"+id} ><span></span></label>
              </div>
              {that.state.explore || that.state.deleteOption ? "" :
                <FontAwesome name='trash-o' onClick={() => that.delete(id, "template", "portfolio")}/>}
              <div className="icon_count"> <FontAwesome name='share-alt' />21 </div>
              <FontAwesome name='times' style={{'display':'none'}}/>
              <div className="show_details" style={{'display':'none'}}>
                <ul className="list-group">
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                </ul>
              </div>
              {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".templatepop"
                                         onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl}/></a> :
                <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                  src={show.fileUrl}/></a>}
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
            {that.state.explore ? "" : that.state.videosLock[id] || show.isPrivate ? !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleVideoLock(id)} name='lock'/> : "" : !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleVideoLock(id)} name='unlock'/> : "" }
            {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "video")}/>}
            <a href="" data-toggle="modal" data-target=".videopop"
               onClick={that.randomVideo.bind(that, show.fileUrl, id)}>
              <video width="120" height="100" controls>
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
                <input id={"checkboxTemp"+id} type="checkbox" name={"checkboxTemp"+id} value="1" onChange={that.onFileSelect.bind(that, id, 'video')} />
                <label htmlFor={"checkboxImg"+id} ><span></span></label>
              </div>
              {that.state.explore || that.state.deleteOption ? "" :
                <FontAwesome name='trash-o' onClick={() => that.delete(id, "video")}/>}
              <div className="icon_count"> <FontAwesome name='share-alt' />21 </div>
              <FontAwesome name='times' style={{'display':'none'}}/>
              <div className="show_details" style={{'display':'none'}}>
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
            {that.state.explore ? " " : that.state.documentsLock[id] || show.isPrivate ? !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleDocumentLock(id)} name='lock'/> : "" : !that.state.hideLock ?
              <FontAwesome onClick={() => that.toggleDocumentLock(id)} name='unlock'/> : "" }
            {that.state.explore ? "" : <FontAwesome name='trash-o' onClick={() => that.delete(id, "document")}/>}
            <a href="#" data-toggle="modal" data-target=".documentpop"
               onClick={that.randomDocument.bind(that, show.fileUrl, id)}><img src={show.fileUrl}/></a>
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
                <input id={"checkboxTemp"+id} type="checkbox" name={"checkboxTemp"+id} value="1" onChange={that.onFileSelect.bind(that, id, 'document')} />
                <label htmlFor={"checkboxImg"+id} ><span></span></label>
              </div>
              {that.state.explore || that.state.deleteOption ? "" :
                <FontAwesome name='trash-o' onClick={() => that.delete(id, "document")}/>}
              <div className="icon_count"> <FontAwesome name='share-alt' />21 </div>
              <FontAwesome name='times' style={{'display':'none'}}/>
              <div className="show_details" style={{'display':'none'}}>
                <ul className="list-group">
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_5.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_4.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_9.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                  <li className="list-group-item"><span className="task_with"><img src="/images/p_2.jpg" /></span><b>Task name here</b><span className="task_status act_task">10 Days</span></li>
                </ul>
              </div>
              {that.state.isLibrary ? <a href="#" data-toggle="modal" data-target=".documentpop"
                                         onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                src={show.fileUrl}/></a> :
                <a href="#" data-toggle="modal" onClick={that.sendDataToPortfolioLibrary.bind(that, show, id)}><img
                  src={show.fileUrl}/></a>}
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
      console.log('tempObject', tempObject);
      if (dataDetail.libraryType === "image") {
        if (portfolioId === "library") {
          let data = this.state.imageDetails || [];
          let imagePreviewUrl;
          imagePreviewUrl = data[index].fileUrl;
          this.setState({previewImage: imagePreviewUrl});
        } else {
          let data = this.state.imageSpecifications || [];
          data.push(tempObject);
          this.setState({imageSpecifications: data})
        }
      } else if (dataDetail.libraryType === "video") {
        if (portfolioId === "library") {
          let data = this.state.videoDetails || [];
          let videoPreviewUrl;
          videoPreviewUrl = data[index].fileUrl;
          this.setState({previewVideo: videoPreviewUrl});
        } else {
          let data = this.state.videoSpecifications || [];
          data.push(tempObject);
          this.setState({videoSpecifications: data})
        }
      } else if (dataDetail.libraryType === "template") {
        if (portfolioId === "library") {
          let data = this.state.templateDetails || [];
          let templatePreviewUrl;
          templatePreviewUrl = data[index].fileUrl;
          this.setState({previewTemplate: templatePreviewUrl});
        } else {
          let data = this.state.templateSpecifications || [];
          data.push(tempObject);
          this.setState({templateSpecifications: data})
        }
      } else if (dataDetail.libraryType === "document") {
        if (portfolioId === "library") {
          let data = this.state.documentDetails || [];
          let documentPreviewUrl;
          documentPreviewUrl = data[index].fileUrl;
          this.setState({previewDocument: documentPreviewUrl});
        } else {
          let data = this.state.documentSpecifications || [];
          data.push(tempObject);
          this.setState({documentSpecifications: data})
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
      console.log(resp)
      // if(!resp.success){
      //   toastr.error("Image already Exists in library")
      // }
      return resp;
    }

    componentDidMount() {
      (function (a) {
        a.createModal = function (b) {
          defaults = {scrollable: false};
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
    }

    componentDidUpdate() {
      $(".icon_count").click(function(){
        $(this).parents('.thumbnail').find(".fa-times").show();
        $(this).parents('.thumbnail').find(".show_details").show();
        $(this).parents('.thumbnail').find(".icon_count").hide();
        $(this).parents('.thumbnail').find(".fa-lock").hide();
        $(this).parents('.thumbnail').find(".fa-unlock").hide();
        $(this).parents('.thumbnail').find(".input_types").hide();

      });

      $(".fa-times").click(function(){
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

    portfolioShareHandler(actionConfig,handlerCallback){
      console.log('===handlerCallback===', handlerCallback)
      if(handlerCallback) {//to handle the popover
        handlerCallback({Details: this.state.selectedData});
      }
    }

    connectionManagement(userId) {
      this.getSharedFiles(userId);
    }

    async getSharedFiles(userId) {
      const resp = await fetchSharedLibraryHandler(userId)
      console.log('response from server',resp)
      this.setState({sharedFiles: resp, showSharedFiles: !this.state.showSharedFiles})
    }

    showLibrary(response) {
      this.setState({showSharedFiles: response})
    }

    render() {
      var videoJsOptions = [{
        autoplay: true,
        controls: true,
        sources: [{src: this.state.previewVideo, type: 'video/mp4'}]
      }]
      let that = this;
      let ImageDetails = {
        id: "create_client",
        toDisplay: this.popImages(),
        placement: "bottom",
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
          hasPopOver:true,
          popOverTitle:'Shared Details',
          placement:'top',
          target:'sharedLibrary',
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
            style: {'background': '#ef4647'},
            contentComponent: <MlAppActionComponent
              resourceDetails={{resourceId: 'share', resourceType: 'share'}}   //resource id need to be given
              actionOptions={appActionConfig}/>
          }]
      };


      return (
        <div>
          <h2>Library</h2>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={'library-popup'}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <img src="/images/video_1.jpg"/>
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
                  <div className="img_scroll"><img src={this.state.previewImage}/></div>
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
                  <div className="img_scroll"><img src={this.state.previewTemplate}/></div>
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
                  <iframe src={this.state.previewDocument}/>
                  {/*{console.log(this.state.previewDocument)}*/}
                  {/*{<MlFileViewer/>}*/}
                  {/*<div className="img_scroll"><MlDocViewer/></div>*/}
                </div>
              </div>
            </div>
          </div>
          {that.state.isLibrary?<MlConnectionHeader showLibrary={that.showLibrary.bind(that)} connectionManagement={that.connectionManagement.bind(that)}/>:""}
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
                  {this.state.previewVideo ? <MlVideoPlayer videoAttributes={videoJsOptions}/> : <div></div>}
                </div>
              </div>
            </div>
          </div>
          {!that.state.showSharedFiles?<div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
            <div className="panel panel-default">
              <div className="panel-heading">
                Images
                <div className="fileUpload upload_file_mask pull-right" id="create_client">
                  <a href="javascript:void(0);">
                    {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                      <span className="ml ml-upload"><input type="file" className="upload_file upload"
                                                            name="video_source" id="video_upload"
                                                            onChange={that.ImageUpload.bind(that)}/></span> :
                      <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, ImageDetails)}></span>}
                  </a>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popImages() : this.images()}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
            <div className="panel panel-default">
              <div className="panel-heading">
                Videos
                <div className="fileUpload upload_file_mask pull-right" id="create_video">
                  <a href="javascript:void(0);">
                    {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                      <span className="ml ml-upload"><input type="file" className="upload_file upload"
                                                            name="video_source" id="video_upload"
                                                            onChange={that.videoUpload.bind(that)}/></span> :
                      <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, VideoDetails)}></span>}
                  </a>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popVideos() : this.videos()}
              </div>
            </div>
          </div>
          <br className="brclear"/>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
            <div className="panel panel-default">
              <div className="panel-heading">
                Templates
                <div className="fileUpload upload_file_mask pull-right" id="create_template">
                  <a href="javascript:void(0);">
                    {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                      <span className="ml ml-upload"><input type="file" className="upload_file upload"
                                                            name="image_source" id="template_upload"
                                                            onChange={that.TemplateUpload.bind(that)}/></span> :
                      <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, TemplateDetails)}></span>}
                  </a>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popTemplates() : this.templates()}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
            <div className="panel panel-default">
              <div className="panel-heading">
                Documents
                <div className="fileUpload upload_file_mask pull-right" id="create_document">
                  <a href="javascript:void(0);">
                    {that.state.explore ? "" : this.state.isLibrary || this.state.isAdminEdit ?
                      <span className="ml ml-upload"><input type="file" className="upload_file upload"
                                                            name="image_source" id="document_upload"
                                                            onChange={that.documentUpload.bind(that)}/></span> :
                      <span className="ml ml-upload" onClick={that.PopOverAction.bind(that, DocumentDetails)}></span>}
                  </a>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
                {this.state.isLibrary ? this.popDocuments() : this.documents()}
              </div>
            </div>
          </div>
          </div>:<SharedLibrary data={this.state.sharedFiles}/>}
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
                      <input type="file" className="upload" ref="upload" onChange={this.ImageUpload.bind(this)}/> :
                      this.state.file === "Videos" ?
                        <input type="file" className="upload_file upload" name="video_source" id="video_upload"
                               onChange={that.videoUpload.bind(that)}/> :
                        this.state.file === "Documents" ? <input type="file" className="upload" ref="upload"
                                                                 onChange={this.documentUpload.bind(this)}/> :
                          this.state.file === "Templates" ? <input type="file" className="upload" ref="upload"
                                                                   onChange={this.TemplateUpload.bind(this)}/> : ""}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {this.state.isLibrary ? <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />: ""}
        </div>
      )
    }
  }
  export default PortfolioLibrary = formHandler()(Library);



