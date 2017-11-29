import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../utils/formElemUtil';
import { findIdeatorAudienceActionHandler } from '../../actions/findPortfolioIdeatorDetails'
import { multipartASyncFormHandler } from '../../../../../commons/MlMultipartFormAction'
import { putDataIntoTheLibrary, removePortfolioFileUrl } from '../../../../../commons/actions/mlLibraryActionHandler'
import generateAbsolutePath from '../../../../../../lib/mlGenerateAbsolutePath';
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'
import Confirm from '../../../../../commons/utils/confirm';

export default class MlIdeatorAudience extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      privateValues: []
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.onAudienceImageFileUpload.bind(this)
    this.fetchPortfolioInfo.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
  }
  componentWillMount() {
    const resp = this.fetchPortfolioInfo();
    return resp
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

  onClick(fieldName, field, e) {
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
  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent() {
    let data = this.state.data;
    data = _.omit(data, 'audienceImages')
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data = _.omit(data, ['privateFields']);
    this.props.getAudience(data, this.state.privateKey)
  }
  async fetchPortfolioInfo() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await findIdeatorAudienceActionHandler(portfoliodetailsId);
    const empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.audience)
    if (empty && response) {
      this.setState({ loading: false, data: response });
      _.each(response.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    } else {
      this.fetchOnlyImages();
      this.setState({ loading: true, data: that.context.ideatorPortfolio.audience });
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

  onAudienceImageFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { audience: { audienceImages: [{ fileUrl: '', fileName }] } }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }

  async fetchOnlyImages() {
    const response = await findIdeatorAudienceActionHandler(this.props.portfolioDetailsId);
    if (response) {
      const dataDetails = this.state.data
      dataDetails.audienceImages = response.audienceImages
      this.setState({ loading: false, data: dataDetails, privateValues: response.privateFields }, () => {
        this.lockPrivateKeys()
      })
    }
  }

  onFileUploadCallBack(name, file, resp) {
    if (resp) {
      console.log(file)
      const result = JSON.parse(resp)

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

      this.fetchOnlyImages();
    }
  }

  async libraryAction(file) {
    console.log(this.props.client)
    const portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId, file, this.props.client)
    if (resp.code === 404) {
      toastr.error(resp.result)
    } else {
      toastr.success(resp.result)
      return resp;
    }
    return resp;
  }
  async removeProblemAndSolutionPic(typeOfImage, fileUrl) {
    if (typeOfImage && fileUrl) {
      const portfolioDetailsId = this.props.portfolioDetailsId;
      const resp = await removePortfolioFileUrl(portfolioDetailsId, fileUrl, 'audience', typeOfImage);
      this.fetchOnlyImages();
    }
  }
  render() {
    const showLoader = this.state.loading;
    const audienceImageArray = this.state.data.audienceImages && this.state.data.audienceImages.length > 0 ? this.state.data.audienceImages : [];
    const that = this;
    const audienceImages = audienceImageArray.map((m, id) => (
      <div className="upload-image" key={id}>
        <FontAwesome className="fa fa-trash-o" onClick={that.removeProblemAndSolutionPic.bind(that, 'audienceImages', m.fileUrl)}/>
        <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
      </div>
    ));
    const description = this.state.data.audienceDescription ? this.state.data.audienceDescription : ''
    const isAudiencePrivate = this.state.data.isAudiencePrivate ? this.state.data.isAudiencePrivate : false
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="requested_input">
            <h2>Audience</h2>
            <div className="col-lg-12">
              <div className="row">
                <div className="panel panel-default panel-form">
                  <div className="panel-heading">
                Audience
                    <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isAudiencePrivate" onClick={this.onClick.bind(this, 'audienceDescription', 'isAudiencePrivate')}/>
                  </div>
                  <div className="panel-body">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description } name="audienceDescription" onBlur={this.handleBlur.bind(this)}></textarea>                </div>
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
}
MlIdeatorAudience.contextTypes = {
  ideatorPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
