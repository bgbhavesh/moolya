import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import MlLoader from '../../../../../commons/components/loader/loader'
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {putDataIntoTheLibrary} from '../../../../../commons/actions/mlLibraryActionHandler'


export default class MlIdeatorProblemsAndSolutions extends React.Component{
  constructor(props, context) {
    super(props);
    this.state =  {loading: true, data:{}, privateKey:{}};
    this.onProblemImageFileUpload.bind(this);
    this.onSolutionImageFileUpload.bind(this);
    this.fetchPortfolioInfo.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentWillMount(){
      this.fetchPortfolioInfo();
  }

  async fetchPortfolioInfo(){
    let empty = _.isEmpty(this.context.ideatorPortfolio && this.context.ideatorPortfolio.problemSolution)
    if(empty){
      const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }
      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.fetchOnlyImages();
      this.setState({loading: true, data: this.context.ideatorPortfolio.problemSolution});
    }
  }

  async fetchOnlyImages(){
    const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let dataDetails =this.state.data
      dataDetails['problemImage'] = response.problemImage
      dataDetails['solutionImage'] =response.solutionImage
      this.setState({loading: false, data: dataDetails});
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

  onLockChange(fieldName, field, e){
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

  onProblemImageFileUpload(e){
      if(e.target.files[0].length ==  0)
          return;
      let file = e.target.files[0];
      let name = e.target.name;
      let fileName = e.target.files[0].name;
      let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{problemSolution:{problemImage:[{fileUrl:'', fileName : fileName}]}}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, file));
  }

  onSolutionImageFileUpload(e){
      if(e.target.files[0].length ==  0)
          return;
      let file = e.target.files[0];
      let name = e.target.name;
      let fileName = e.target.files[0].name;
      let data= {moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{problemSolution:{solutionImage:[{fileUrl:'', fileName : fileName}]}}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, file));
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

    data=_.omit(data,["privateFields"]);
    this.props.getProblemSolution(data, this.state.privateKey);
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  onFileUploadCallBack(file,name, resp){
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
              this.fetchOnlyImages();
          }
      }
  }


  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
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
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
              <div className="row requested_input">
                <div className="col-lg-6">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Problems
                    </div>
                    <div className="panel-body">
                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="problems" onBlur={this.onInputChange.bind(this)} name="problemStatement" defaultValue={problemStatement}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isProblemPrivate" onClick={this.onLockChange.bind(this, "problemStatement", "isProblemPrivate")}/>
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
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isSolutionPrivate" onClick={this.onLockChange.bind(this, "solutionStatement", "isSolutionPrivate")}/>
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


        )}
      </div>
    )
  }
};
MlIdeatorProblemsAndSolutions.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
