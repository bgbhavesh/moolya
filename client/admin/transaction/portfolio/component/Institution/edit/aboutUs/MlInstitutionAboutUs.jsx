import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {fetchInstitutionDetailsHandler} from "../../../../actions/findPortfolioInstitutionDetails";
import {multipartASyncFormHandler} from "../../../../../../../commons/MlMultipartFormAction";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../../utils/formElemUtil";
import {putDataIntoTheLibrary} from '../../../../../../../commons/actions/mlLibraryActionHandler';
import generateAbsolutePath from '../../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../../commons/utils/confirm';

var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

const KEY = 'aboutUs'

export default class MlInstitutionAboutUs extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      privateKey:{},
      data:this.props.aboutUsDetails || {},
    }

    this.handleBlur.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
    return this;

  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    this.fetchOnlyImages()
    this.props.getInstitutionAboutUs(this.state.data)
  }
  componentWillMount(){
    let empty = _.isEmpty(this.context.institutionPortfolio && this.context.institutionPortfolio.aboutUs)
    if(!empty){
      this.setState({loading: false, data: this.context.institutionPortfolio.aboutUs});
    }
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
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    data = _.omit(data, ["privateFields"])

    this.props.getInstitutionAboutUs(data, this.state.privateKey)
    this.fetchOnlyImages()
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{aboutUs:{logo:[{fileUrl:'', fileName : fileName}]}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, file));
  }
  onFileUploadCallBack(name,file, resp){
    if(resp){
      let result = JSON.parse(resp)

      Confirm('', "Do you want to add the file into the library", 'Ok', 'Cancel',(ifConfirm)=>{
        if(ifConfirm){
          let fileObjectStructure = {
            fileName: file.name,
            fileType: file.type,
            fileUrl: result.result,
            libraryType: "image"
          }
          this.libraryAction(fileObjectStructure);
        }
      });

      if(result.success){
        this.fetchOnlyImages();
      }
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    if(resp.code === 404) {
      toastr.error(resp.result)
    } else {
      toastr.success(resp.result)
      return resp;
    }  }

  async fetchOnlyImages() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchInstitutionDetailsHandler(portfoliodetailsId, KEY);
    if (response && response.aboutUs) {
      let dataDetails = this.state.data
      dataDetails['logo'] = response.aboutUs.logo
      this.setState({data: dataDetails});
      setTimeout(function () {
        _.each(response.aboutUs.privateFields, function (pf) {
          $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
        })
      }, 10)
    }

    this.setState({loading:false})
  }
  onLockChange(fieldName, field, e){
    var isPrivate = false;
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, tabName:KEY}
    this.setState({privateKey:privateKey})

    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  render(){
    const aboutUsImages = (this.state.data.logo&&this.state.data.logo.map(function (m, id) {
      return (
        <div className="upload-image" key={id}>
          <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
        </div>
      )
    }));

    return(
      <div className="requested_input">
        <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true} >
        <div className="col-lg-12">
          <div className="row">
            <h2>
              About Us
            </h2>
            <div className="panel panel-default panel-form">
              <div className="panel-body">
                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control"  name="institutionDescription" id="description" defaultValue={this.state.data&&this.state.data.institutionDescription} onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "institutionDescription", "isDescriptionPrivate")}/>
                </div>

              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="logo" id="logoFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} multiple />
                  <label htmlFor="logoFileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
                {aboutUsImages}
              </div>
            </div>

          </div> </div>
        </ScrollArea>
      </div>
    )
  }
}
MlInstitutionAboutUs.contextTypes = {
  institutionPortfolio: PropTypes.object,
};
