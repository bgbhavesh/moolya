import React, { Component, PropTypes }  from "react";
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {findIdeatorIdeasActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import {putDataIntoTheLibrary} from '../../../../../commons/actions/mlLibraryActionHandler';
import CropperModal from '../../../../../commons/components/cropperModal';

export default class MlIdeatorIdeas extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{},
      privateValues:[],
      showProfileModal: false,
      uploadingAvatar: false,
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.onLogoFileUpload = this.onLogoFileUpload.bind(this);
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    $('#upload_hex').change(function(){
      document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);
    });
  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }
  componentWillMount(){
    const resp = this.fetchPortfolioDetails();
    return resp
  }
  onClick(fieldName, field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
    }else{
      details=_.extend(details,{[key]:false});
    }
    var privateKey = {keyName: fieldName, booleanKey: field, isPrivate: isPrivate, tabName: this.props.tabName}
    // this.setState({privateKey:privateKey})
    this.setState({data: details, privateKey: privateKey}, function () {
      this.sendDataToParent()
    })

  }
  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  async fetchPortfolioDetails() {
    let that = this;
    let ideaId=that.props.ideaId;
    let empty = _.isEmpty(that.context.idea)
    const response = await findIdeatorIdeasActionHandler(ideaId);
    if(empty && response){

        this.setState({loading: false, data: response});
      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.setState({loading: false, data: that.context.idea, privateValues: response.privateFields}, () => {
        this.lockPrivateKeys()
      })

    }
  }

  /**
   * UI creating lock function
   * */
  lockPrivateKeys() {
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, {tabName: this.props.tabName})
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, {tabName: this.props.tabName})
    var finalKeys = _.unionBy(filterPrivateKeys, this.state.privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined || propName === '__typename' || propName === 'privateFields') {
        delete data[propName];
      }
    }

    data=_.omit(data,["privateFields"]);

    this.props.getIdeas(data, this.state.privateKey)
  }
  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  onLogoFileUpload(image,fileInfo){
    // if(e.target.files[0].length ==  0)
    //   return;
    // let file = e.target.files[0];
    //let fileName = e.target.files[0].name;
    //let name = e.target.name;
    let file=image;
    let fileName=fileInfo.name;
    if(file){
      let data ={moduleName: "PORTFOLIO_IDEA_IMG", actionName: "UPDATE", portfolioId:this.props.portfolioDetailsId, ideaId:this.props.ideaId, communityType:"IDE", portfolio:{ideaImage:{fileUrl:"", fileName : fileName}}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, file));
    }this.setState({
      uploadingAvatar: false,
    });

  }
  onFileUploadCallBack(file,resp){
    this.setState({
      uploadingAvatar: false,
      showProfileModal: false
    });
    if(resp){
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if(userOption){
        let fileObjectStructure = {
          fileName: file.name,
          fileType: file.type,
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure)
      }
      if(result.success){
        this.setState({loading:true})
        this.fetchPortfolioDetails();
      }
    }
  }
  toggleModal() {
    const that = this;
    var status = that.state.showProfileModal
    this.setState({
      showProfileModal: !status
    });
  }
  handleUploadAvatar(image,e) {
    this.setState({
      uploadingAvatar: true,
    });
    this.onLogoFileUpload(image,e);
  }
  render(){
    let that = this;
    const showLoader = this.state.loading;
    let ideaDescription = this.state.data.ideaDescription?this.state.data.ideaDescription:''
    let image = that.state.data && that.state.data.ideaImage&&that.state.data.ideaImage.fileUrl?that.state.data.ideaImage.fileUrl:"/images/images.png";
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
      <div>
        <h2>Ideas</h2>
        <div className="col-lg-2 col-lg-offset-5 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4">
          {/*<a href="" >*/}
            <div className="upload_hex">
              {/*<FontAwesome name='unlock' className="req_textarea_icon un_lock" id="isIdeaImagePrivate"/>*/}
              <img src={image} id="blah" width="105" height="auto"/>
              {/* <input className="upload" type="file" id="upload_hex"  onChange={this.onLogoFileUpload.bind(this)}/>*/}
            </div>
          {/*</a>*/}
          <div className="fileUpload mlUpload_btn">
            <span onClick={this.toggleModal}>Upload Pic</span>
          </div>
        </div>
        <CropperModal
          uploadingImage={this.state.uploadingAvatar}
          handleImageUpload={this.handleUploadAvatar}
          cropperStyle="square"
          show={this.state.showProfileModal}
          toggleShow={this.toggleModal}
        />
        <div className="form_bg col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Title" className="form-control float-label" id="cluster_name" defaultValue={this.state.data.title} name="title" onBlur={this.handleBlur.bind(this)}/>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeaTitlePrivate" onClick={this.onClick.bind(this, "title", "isIdeaTitlePrivate")}/>
            </div>
            <div className="form-group">
              <textarea placeholder="Describe..." className="form-control float-label" id="cl_about" defaultValue={ideaDescription} name="ideaDescription" onBlur={this.handleBlur.bind(this)}></textarea>
              <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIdeaPrivate" onClick={this.onClick.bind(this, "ideaDescription", "isIdeaPrivate")}/>
            </div>
          </form>
        </div>
      </div>)}
      </div>
    )}
};
MlIdeatorIdeas.contextTypes = {
  idea: PropTypes.object,
  portfolioKeys: PropTypes.object,
};
