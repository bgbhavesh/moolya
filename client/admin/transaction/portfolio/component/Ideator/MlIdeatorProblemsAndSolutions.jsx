import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import {dataVisibilityHandler} from '../../../../utils/formElemUtil';

export default class MlIdeatorProblemsAndSolutions extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {data:{}};
    this.addEventHandler.bind(this);
    return this;
  }

  async addEventHandler() {
    // const resp=await this.createProblemAndSolution();
    // return resp;
  }

  onInputChange(event){
    let name  = event.target.name
    this.state.data[name] = event.target.value;
    this.sendDataToParent();
  }

  onLockChange(field,e){
    let data =this.state.data;
    let className = e.target.className;
    // let key = e.target.fieldName;
    let key = e.target.id;
    if(className.indexOf("fa-lock") != -1){
      this.state.data[key] = true;
      data[key] = true;
      // this.setState({key:true})
    }else{
      this.state.data[key] = false;
      // this.setState({key:false})
    }
    this.sendDataToParent();
  }

  onFileUpload(value){
    // let file=document.getElementById("profilePic").files[0];
    // let data = {moduleName: "REGISTRATION",actionName: "UPLOAD",documentId:null,registrationId:this.props.registrationId};
    // let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
    //this.props.onFileUpload(file,documentId);
  }

  sendDataToParent() {
    this.props.getProblemSolution(this.state.data);
  }

  componentDidMount(){
    dataVisibilityHandler();
  }


  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="col-lg-6">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Problems
                    </div>
                    <div className="panel-body">
                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="problems" onBlur={this.onInputChange.bind(this)} name="problemStatement"></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isProblemPrivate" onClick={this.onLockChange.bind(this, "isProblemPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isProblemPrivate}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Solutions
                    </div>
                    <div className="panel-body">
                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="solution" onBlur={this.onInputChange.bind(this)} name="solutionStatement"></textarea>
                        <FontAwesome name='lock' className="input_icon req_textarea_icon un_lock" id="isSolutionPrivate" onClick={this.onLockChange.bind(this, "isSolutionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isSolutionPrivate}/>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">Add Images</div>
                    <div className="panel-body nopadding">
                      <div className="upload-file-wrap">
                        <input type="file" name="fileinput" id="fileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onFileUpload.bind(this)} multiple />
                        <label htmlFor="fileinput">
                          <figure>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                          </figure>
                        </label>
                      </div>
                      <div className="upload-image"><img id="output"/></div>
                      <div className="upload-image"></div>
                      <div className="upload-image"></div>
                    </div>
                  </div>
                </div>
                {/*<submit onClick={this.handleClick.bind(this)}>Click</submit>*/}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
