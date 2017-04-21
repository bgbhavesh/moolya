import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';

export default class MlStartupAboutUs extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.handleBlur.bind(this);
    return this;
  }
  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
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
    this.props.getStartupAboutUs(data)
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{aboutUs:{logo:[{fileUrl:'', fileName : fileName}]}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.fetchOnlyImages();
      }
    }
  }
  onLockChange(field, e){
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


  render(){
    return(
      <div className="requested_input">
        <div className="col-lg-12">
          <div className="row">
            <h2>
              About Us
            </h2>
            <div className="panel panel-default panel-form">

              <div className="panel-body">

                <div className="form-group nomargin-bottom">
                  <textarea placeholder="Describe..." className="form-control"  name="description" id="description"  onBlur={this.handleBlur.bind(this)}></textarea>
                  <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "isDescriptionPrivate")}/>
                </div>

              </div>
            </div>
           {/* <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="aboutUsLogo" id="aboutUsFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} multiple />
                  <label for="fileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
                <div className="upload-image"><img id="output"/></div>
                <div className="upload-image"></div>
                <div className="upload-image"></div>
              </div>
            </div>*/}
            <div className="panel panel-default">
              <div className="panel-heading">Add Images</div>
              <div className="panel-body nopadding">
                <div className="upload-file-wrap">
                  <input type="file" name="aboutusLogo" id="logoFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} multiple />
                  <label htmlFor="logoFileinput">
                    <figure>
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </figure>
                  </label>
                </div>
              </div>
            </div>

          </div> </div>
      </div>




    )
  }
}
