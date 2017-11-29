import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../utils/formElemUtil';
import { findServiceProviderAboutActionHandler } from '../../../actions/findPortfolioServiceProviderDetails';
import { multipartASyncFormHandler } from '../../../../../../commons/MlMultipartFormAction';
import { putDataIntoTheLibrary } from '../../../../../../commons/actions/mlLibraryActionHandler'
import _ from 'lodash';
import MlLoader from '../../../../../../commons/components/loader/loader';
const FontAwesome = require('react-fontawesome');
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../commons/utils/confirm';

export default class MlServiceProviderAbout extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.onAboutImageFileUpload.bind(this)
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

    const privateKey = { keyName: fieldName, booleanKey: field, isPrivate }
    this.setState({ privateKey })
    this.setState({ data: details }, function () {
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
    data = _.omit(data, 'aboutImages')
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data = _.omit(data, ['privateFields']);
    this.props.getAboutus(data, this.state.privateKey)
  }

  async fetchPortfolioInfo() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.serviceProviderPortfolio && that.context.serviceProviderPortfolio.about)
    if (empty) {
      const response = await findServiceProviderAboutActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({ loading: false, data: response });
      }

      _.each(response.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    } else {
      this.fetchOnlyImages();
      this.setState({ loading: true, data: that.context.serviceProviderPortfolio.about });
    }
  }

  onAboutImageFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO',
      actionName: 'UPLOAD',
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: { about: { aboutImages: [{ fileUrl: '', fileName }] } }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }

  async fetchOnlyImages() {
    const response = await findServiceProviderAboutActionHandler(this.props.portfolioDetailsId);
    if (response) {
      const dataDetails = this.state.data
      dataDetails.aboutImages = response.aboutImages
      this.setState({ loading: false, data: dataDetails });
    }
  }

  onFileUploadCallBack(name, file, resp) {
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

  render() {
    const showLoader = this.state.loading;
    const aboutImageArray = this.state.data.aboutImages && this.state.data.aboutImages.length > 0 ? this.state.data.aboutImages : [];
    const aboutImages = aboutImageArray.map((m, id) => (
      <div className="upload-image" key={id}>
        <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
      </div>
    ));
    const description = this.state.data.aboutDescription ? this.state.data.aboutDescription : ''
    const isDescriptionPrivate = this.state.data.isDescriptionPrivate ? this.state.data.isDescriptionPrivate : false
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="requested_input">
            <h2>About</h2>
            <div className="col-lg-12">
              <div className="row">
                <div className="panel panel-default panel-form">
                  <div className="panel-heading">
                    <div className="form-group nomargin-bottom">
                      <input
                        type="text" placeholder="Title Here..." className="form-control"
                        defaultValue={this.state.data ? this.state.data.aboutTitle : ''}
                        name="aboutTitle" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome
                        name='unlock' className="input_icon req_input_icon un_lock" id="isAboutTitlePrivate"
                        onClick={this.onClick.bind(this, 'aboutTitle', 'isAboutTitlePrivate')}/>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="form-group nomargin-bottom">
                      <textarea
                        placeholder="Describe..." className="form-control" id="cl_about"
                        defaultValue={description} name="aboutDescription"
                        onBlur={this.handleBlur.bind(this)}></textarea>
                      <FontAwesome
                        name='unlock' className="input_icon req_textarea_icon un_lock"
                        id="isDescriptionPrivate"
                        onClick={this.onClick.bind(this, 'aboutDescription', 'isDescriptionPrivate')}/>
                    </div>

                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Add Images</div>
                  <div className="panel-body nopadding">
                    <div className="upload-file-wrap">
                      <input
                        type="file" id="siFileinput" name="aboutImages" className="inputfile inputfile-upload"
                        data-multiple-caption="{count} files selected" accept="image/*"
                        onChange={this.onAboutImageFileUpload.bind(this)} multiple/>
                      <label htmlFor="siFileinput">
                        <figure>
                          <i className="fa fa-upload" aria-hidden="true"></i>
                        </figure>
                      </label>
                    </div>

                    {aboutImages}

                  </div>
                </div>

              </div>
            </div>
          </div>)}
      </div>
    )
  }
}
MlServiceProviderAbout.contextTypes = {
  serviceProviderPortfolio: PropTypes.object
};
