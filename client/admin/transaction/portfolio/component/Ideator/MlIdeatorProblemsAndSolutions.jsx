import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'


export default class MlIdeatorProblemsAndSolutions extends React.Component{
  constructor(props, context) {
    super(props);
    this.state =  {loading: true, data:{}};
    this.onProblemImageFileUpload.bind(this);
    this.onSolutionImageFileUpload.bind(this);
    this.fetchPortfolioInfo.bind(this);
    this.fetchOnlyImages.bind(this);
    return this;
  }

  componentWillMount(){
      this.fetchPortfolioInfo();
  }

  async fetchPortfolioInfo(){
    let empty = _.isEmpty(this.context.ideatorPortfolio.problemSolution)
    if(empty){
      const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }
    }else{
      this.fetchOnlyImages();
      this.setState({loading: false, data: this.context.ideatorPortfolio.problemSolution});
    }
  }

  async fetchOnlyImages(){
    const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let problemImage = response.problemImage
      let solutionImage = response.solutionImage
      this.setState({loading: false, data: {problemImage: problemImage, solutionImage:solutionImage}});
    }
  }


  onInputChange(e){
      let details =this.state.data;
      let name  = e.target.name;
      details=_.omit(details,[name]);
      details=_.extend(details,{[name]:e.target.value});
      this.setState({data:details}, function () {
        this.sendDataToParent()
      })
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

  onProblemImageFileUpload(e){
      if(e.target.files[0].length ==  0)
          return;
      let file = e.target.files[0];
      let name = e.target.name;
      let fileName = e.target.files[0].name;
      let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{problemSolution:{problemImage:[{fileUrl:'', fileName : fileName}]}}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }

  onSolutionImageFileUpload(e){
      if(e.target.files[0].length ==  0)
          return;
      let file = e.target.files[0];
      let name = e.target.name;
      let fileName = e.target.files[0].name;
      let data= {moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{problemSolution:{solutionImage:[{fileUrl:'', fileName : fileName}]}}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }

  sendDataToParent() {
    let data = this.state.data;
    data = _.omit(data, 'problemImage')
    data = _.omit(data, 'solutionImage')
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getProblemSolution(data);
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  onFileUploadCallBack(name,fileName, resp){
      if(resp){
          let result = JSON.parse(resp)
          if(result.success){
              this.fetchOnlyImages();
          }
      }
  }

  render(){
    const problemImageArray = this.state.data.problemImage && this.state.data.problemImage.length > 0 ? this.state.data.problemImage : [];
    const problemImages = problemImageArray.map(function (m, id) {
      return (
        <div className="upload-image" key={id}>
          <img id="output" src={m.fileUrl}/>
        </div>
      )
    });

    const solutionImageArray = this.state.data.solutionImage && this.state.data.solutionImage.length > 0 ? this.state.data.solutionImage : [];
    const solutionImages = solutionImageArray.map(function (m, id) {
      return (
        <div className="upload-image" key={id}>
          <img id="output" src={m.fileUrl}/>
        </div>
      )
    });
    let problemStatement = this.state.data.problemStatement?this.state.data.problemStatement:''
    let solutionStatement =   this.state.data.solutionStatement?this.state.data.solutionStatement:''
    let problemLockStatus =  this.state.data.isProblemPrivate?this.state.data.isProblemPrivate:false
    let solutionLockStatus =  this.state.data.isSolutionPrivate?this.state.data.isSolutionPrivate:false
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
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
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="problems" onBlur={this.onInputChange.bind(this)} name="problemStatement" defaultValue={problemStatement}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isProblemPrivate" onClick={this.onLockChange.bind(this, "isProblemPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={problemLockStatus}/>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">Add Images</div>
                    <div className="panel-body nopadding">
                      <div className="upload-file-wrap">
                        <input type="file" name="problemImage" id="piFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onProblemImageFileUpload.bind(this)} multiple />
                        <label htmlFor="piFileinput">
                          <figure>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                          </figure>
                        </label>
                      </div>

                      {problemImages}

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
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="solution" onBlur={this.onInputChange.bind(this)} name="solutionStatement" defaultValue={solutionStatement}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isSolutionPrivate" onClick={this.onLockChange.bind(this, "isSolutionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={solutionLockStatus}/>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">Add Images</div>
                    <div className="panel-body nopadding">
                      <div className="upload-file-wrap">
                        <input type="file" id="siFileinput" name="solutionImage" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={this.onSolutionImageFileUpload.bind(this)} multiple />
                        <label htmlFor="siFileinput">
                          <figure>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                          </figure>
                        </label>
                      </div>

                      {solutionImages}

                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>)}
      </div>
    )
  }
};
MlIdeatorProblemsAndSolutions.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
