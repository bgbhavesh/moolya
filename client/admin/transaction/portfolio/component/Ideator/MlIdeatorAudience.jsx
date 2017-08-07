import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorAudienceActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import {putDataIntoTheLibrary} from '../../../../../commons/actions/mlLibraryActionHandler'
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'

export default class MlIdeatorAudience extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.onAudienceImageFileUpload.bind(this)
    this.fetchPortfolioInfo.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
  }
  componentWillMount(){
    this.fetchPortfolioInfo();
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  onClick(fieldName, field, e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true;
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate}
    this.setState({privateKey:privateKey})

    this.setState({data:details}, function () {
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

  sendDataToParent(){
    let data = this.state.data;
    data = _.omit(data, 'audienceImages')
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data=_.omit(data,["privateFields"]);
    this.props.getAudience(data, this.state.privateKey)
  }
  async fetchPortfolioInfo() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.audience)
    if(empty){
      const response = await findIdeatorAudienceActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }

      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.fetchOnlyImages();
      this.setState({loading: true, data: that.context.ideatorPortfolio.audience});
    }
  }
  onAudienceImageFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{audience:{audienceImages:[{fileUrl:'', fileName : fileName}]}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, file));
  }

  async fetchOnlyImages(){
    const response = await findIdeatorAudienceActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let dataDetails =this.state.data
      dataDetails['audienceImages'] = response.audienceImages
      this.setState({loading: false, data: dataDetails});
    }
  }

  onFileUploadCallBack(name,file, resp){
    if(resp){
      console.log(file)
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
    }
  }

  async libraryAction(file) {
    console.log(this.props.client)
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }

  render(){
    const showLoader = this.state.loading;
    const audienceImageArray = this.state.data.audienceImages && this.state.data.audienceImages.length > 0 ? this.state.data.audienceImages : [];
    const audienceImages = audienceImageArray.map(function (m, id) {
      return (
        <div className="upload-image" key={id}>
          <img id="output" src={m.fileUrl}/>
        </div>
      )
    });
    let description =this.state.data.audienceDescription?this.state.data.audienceDescription:''
    let isAudiencePrivate = this.state.data.isAudiencePrivate?this.state.data.isAudiencePrivate:false
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
      <div className="requested_input">
        <h2>Audience</h2>
        <div className="col-lg-12">
          <div className="row">
            <div className="panel panel-default panel-form">
              <div className="panel-heading">
                Audience
              </div>
              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description } name="audienceDescription" onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAudiencePrivate" onClick={this.onClick.bind(this, "audienceDescription", "isAudiencePrivate")}/>
                </div>

              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" id="siFileinput" name="audienceImages" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onAudienceImageFileUpload.bind(this)} multiple />
                  <label htmlFor="siFileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>

                {audienceImages}

              </div>
            </div>

          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
MlIdeatorAudience.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
