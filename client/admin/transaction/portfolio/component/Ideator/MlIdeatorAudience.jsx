import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorAudienceActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import _ from 'lodash';

export default class MlIdeatorAudience extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.onAudienceImageFileUpload.bind(this)
    this.fetchPortfolioInfo.bind(this);
  }
  componentWillMount(){
    this.fetchPortfolioInfo();
  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  onClick(field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
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
    this.props.getAudience(data)
  }
  async fetchPortfolioInfo() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.ideatorPortfolio.audience)
    if(empty){
      const response = await findIdeatorAudienceActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }
    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.audience});
    }
  }
  onAudienceImageFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{audience:{audienceImages:[{fileUrl:'', fileName : fileName}]}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.fetchPortfolioInfo();
      }
    }
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
    let description =this.state.data.description?this.state.data.description:''
    let isAudiencePrivate = this.state.data.isAudiencePrivate?this.state.data.isAudiencePrivate:false
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div className="requested_input">
        <h2>Audience</h2>
        <div className="col-lg-12">
          <div className="row">
            <div className="panel panel-default panel-form">
              <div className="panel-heading">
                Object
              </div>
              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description } name="description" onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isAudiencePrivate" onClick={this.onClick.bind(this, "isAudiencePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={isAudiencePrivate}/>
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
