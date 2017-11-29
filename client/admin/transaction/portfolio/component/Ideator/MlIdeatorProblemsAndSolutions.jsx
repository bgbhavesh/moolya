import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');
import { multipartASyncFormHandler } from '../../../../../commons/MlMultipartFormAction'
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../utils/formElemUtil';
import MlLoader from '../../../../../commons/components/loader/loader'
import { findIdeatorProblemsAndSolutionsActionHandler } from '../../actions/findPortfolioIdeatorDetails'
import { putDataIntoTheLibrary, removePortfolioFileUrl } from '../../../../../commons/actions/mlLibraryActionHandler'
import generateAbsolutePath from '../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../commons/utils/confirm';

export default class MlIdeatorProblemsAndSolutions extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      privateValues: []
    };
    this.onProblemImageFileUpload.bind(this);
    this.onSolutionImageFileUpload.bind(this);
    this.fetchPortfolioInfo.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.fetchPortfolioInfo();
    return resp
  }

  async fetchPortfolioInfo() {
    const empty = _.isEmpty(this.context.ideatorPortfolio && this.context.ideatorPortfolio.problemSolution)
    if (empty) {
      const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
      if (response) {
        this.setState({ loading: false, data: response });
      }
      _.each(response.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    } else {
      this.fetchOnlyImages();
      this.setState({ loading: true, data: this.context.ideatorPortfolio.problemSolution });
    }
  }

  async fetchOnlyImages() {
    const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
    if (response) {
      const dataDetails = this.state.data
      dataDetails.problemImage = response.problemImage
      dataDetails.solutionImage = response.solutionImage
      this.setState({ loading: false, data: dataDetails, privateValues: response.privateFields }, () => {
        this.lockPrivateKeys()
      })
    }
  }

  /**
   * UI creating lock function
   * */
  lockPrivateKeys() {
    const filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName })
    const finalKeys = _.unionBy(filterPrivateKeys, this.state.privateValues, 'booleanKey')
    const keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onInputChange(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    const key = e.target.id;
    let isPrivate = false;
    details = _.omit(details, [key]);
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true;
    } else {
      details = _.extend(details, { [key]: false });
    }

    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, tabName: this.props.tabName
    }
    // this.setState({privateKey:privateKey})
    this.setState({ data: details, privateKey }, function () {
      this.sendDataToParent()
    })
  }

  onProblemImageFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { problemSolution: { problemImage: [{ fileUrl: '', fileName }] } }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }

  onSolutionImageFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { problemSolution: { solutionImage: [{ fileUrl: '', fileName }] } }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }

  sendDataToParent() {
    let data = this.state.data;
    data = _.omit(data, 'problemImage')
    data = _.omit(data, 'solutionImage')
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data = _.omit(data, ['privateFields']);
    this.props.getProblemSolution(data, this.state.privateKey);
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  onFileUploadCallBack(name, file, resp) {
    console.log('file', file)
    if (resp) {
      const result = JSON.parse(resp);
      Confirm('', 'Do you want to add the file into the library', 'Ok', 'Cancel', (ifConfirm) => {
        if (ifConfirm) {
          const fileObjectStructure = {
            fileName: file.name,
            fileType: file.type,
            fileUrl: result.result,
            libraryType: 'image'
          }
          this.libraryAction(fileObjectStructure)
        }
      });

      if (result.success) {
        this.fetchOnlyImages();
      }
    }
  }


  async libraryAction(file) {
    const portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId, file, this.props.client)
    if (resp.code === 404) {
      toastr.error(resp.result)
    } else {
      toastr.success(resp.result)
      return resp;
    }
  }

  async removeProblemAndSolutionPic(typeOfImage, fileUrl) {
    if (typeOfImage && fileUrl) {
      const portfolioDetailsId = this.props.portfolioDetailsId;
      const resp = await removePortfolioFileUrl(portfolioDetailsId, fileUrl, 'problemSolution', typeOfImage);
      this.fetchOnlyImages();
    }
  }

  render() {
    const problemImageArray = this.state.data.problemImage && this.state.data.problemImage.length > 0 ? this.state.data.problemImage : [];
    const that = this;
    const problemImages = problemImageArray.map((m, id) => (
      <div className="upload-image" key={id}>
        <FontAwesome name="trash-o" onClick={that.removeProblemAndSolutionPic.bind(that, 'problemImage', m.fileUrl)}/>
        <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
      </div>
    ));

    const solutionImageArray = this.state.data.solutionImage && this.state.data.solutionImage.length > 0 ? this.state.data.solutionImage : [];
    const solutionImages = solutionImageArray.map((m, id) => (
      <div className="upload-image" key={id}>
        <FontAwesome name="trash-o" onClick={that.removeProblemAndSolutionPic.bind(that, 'solutionImage', m.fileUrl)}/>
        <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
      </div>
    ));
    const problemStatement = this.state.data.problemStatement ? this.state.data.problemStatement : ''
    const solutionStatement = this.state.data.solutionStatement ? this.state.data.solutionStatement : ''
    const problemLockStatus = this.state.data.isProblemPrivate ? this.state.data.isProblemPrivate : false
    const solutionLockStatus = this.state.data.isSolutionPrivate ? this.state.data.isSolutionPrivate : false
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="requested_input">
            <div className="col-md-12 nopadding"><h2>Problems and Solutions</h2></div>
            <div className="col-lg-6 nopadding-left">
              <div className="panel panel-default panel-form">
                <div className="panel-heading">
                      Problems
                  <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isProblemPrivate" onClick={this.onLockChange.bind(this, 'problemStatement', 'isProblemPrivate')}/>
                </div>
                <div className="panel-body">
                  <div className="form-group nomargin-bottom">
                    <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="problems" onBlur={this.onInputChange.bind(this)} name="problemStatement" defaultValue={problemStatement}></textarea>

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
            <div className="col-lg-6 nopadding-right">
              <div className="panel panel-default panel-form">
                <div className="panel-heading">
                      Solutions
                  <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isSolutionPrivate" onClick={this.onLockChange.bind(this, 'solutionStatement', 'isSolutionPrivate')}/>
                </div>
                <div className="panel-body">
                  <div className="form-group nomargin-bottom">
                    <textarea placeholder="Describe..." className="form-control" id="cl_about" ref="solution" onBlur={this.onInputChange.bind(this)} name="solutionStatement" defaultValue={solutionStatement}></textarea>

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
}
MlIdeatorProblemsAndSolutions.contextTypes = {
  ideatorPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
