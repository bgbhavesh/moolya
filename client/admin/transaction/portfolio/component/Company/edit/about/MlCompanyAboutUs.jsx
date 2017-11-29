import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { fetchCompanyDetailsHandler } from '../../../../actions/findCompanyPortfolioDetails';
import { multipartASyncFormHandler } from '../../../../../../../commons/MlMultipartFormAction';
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';
import { putDataIntoTheLibrary } from '../../../../../../../commons/actions/mlLibraryActionHandler'
import generateAbsolutePath from '../../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../../commons/utils/confirm';
const FontAwesome = require('react-fontawesome');
const Select = require('react-select');

const KEY = 'aboutUs'

export default class MlCompanyAboutUs extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      privateKey: {},
      data: this.props.aboutUsDetails || {}
    }

    this.handleBlur.bind(this);
    this.fetchOnlyImages.bind(this);
    this.libraryAction.bind(this);
    return this;
  }
  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    const WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
    this.fetchOnlyImages()
    this.props.getAboutUs(this.state.data)
  }
  componentWillMount() {
    const empty = _.isEmpty(this.context.companyPortfolio && this.context.companyPortfolio.aboutUs)
    if (!empty) {
      this.setState({ loading: false, data: this.context.companyPortfolio.aboutUs });
    }
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
    const data = this.state.data;
    for (const propName in data) {
      if (data[propName] === null || data[propName] === undefined || propName === 'privateFields') {
        delete data[propName];
      }
    }
    // data = _.omit(data, ["privateFields"])

    this.props.getAboutUs(data, this.state.privateKey)
    this.fetchOnlyImages()
  }
  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { aboutUs: { logo: [{ fileUrl: '', fileName }] } }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
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

  async fetchOnlyImages() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await fetchCompanyDetailsHandler(portfoliodetailsId, KEY);
    if (response && response.aboutUs) {
      const dataDetails = this.state.data
      dataDetails.logo = response.aboutUs.logo
      this.setState({ data: dataDetails });
      setTimeout(() => {
        _.each(response.aboutUs.privateFields, (pf) => {
          $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
        })
      }, 10)
    }
    this.setState({ loading: false })
  }
  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let isPrivate = false;
    const key = e.target.id;
    details = _.omit(details, [key]);
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true
    } else {
      details = _.extend(details, { [key]: false });
    }

    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, tabName: KEY
    }
    this.setState({ privateKey })

    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  /*
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      let dataDetails = this.state.data
      dataDetails['logo'] = response.aboutUs.logo
      this.setState({loading: false, data: dataDetails});
    }

  }
*/


  render() {
    const aboutUsImages = (this.state.data.logo && this.state.data.logo.map((m, id) => (
      <div className="upload-image" key={id}>
        <img id="output" src={generateAbsolutePath(m.fileUrl)}/>
      </div>
    )));

    return (
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
                    <textarea placeholder="Describe..." className="form-control" name="companyDescription" id="companyDescription" defaultValue={this.state.data && this.state.data.companyDescription} onBlur={this.handleBlur.bind(this)}></textarea>
                    <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCompanyDescriptionPrivate" onClick={this.onLockChange.bind(this, 'companyDescription', 'isCompanyDescriptionPrivate')}/>
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
MlCompanyAboutUs.contextTypes = {
  companyPortfolio: PropTypes.object
};
