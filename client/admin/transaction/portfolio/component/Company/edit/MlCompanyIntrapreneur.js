import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import Datetime from 'react-datetime';
import { multipartASyncFormHandler } from '../../../../../../commons/MlMultipartFormAction';
import { fetchCompanyDetailsHandler } from '../../../actions/findCompanyPortfolioDetails';
import MlLoader from '../../../../../../commons/components/loader/loader';
import { putDataIntoTheLibrary } from '../../../../../../commons/actions/mlLibraryActionHandler'
import Confirm from '../../../../../../commons/utils/confirm';
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';
const FontAwesome = require('react-fontawesome');

const KEY = 'intrapreneurRecognition'

export default class MlCompanyIntrapreneur extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      institutionIntrapreneur: [],
      popoverOpen: false,
      selectedIndex: -1,
      institutionIntrapreneurList: [],
      selectedVal: null,
      selectedObject: 'default'
    }
    this.curSelectLogo = {}
    this.handleBlur.bind(this);
    this.handleYearChange.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.onSaveAction.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler()
    initalizeFloatLabel();
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    // initalizeFloatLabel();
  }
  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp;
  }
  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.companyPortfolio && that.context.companyPortfolio.intrapreneurRecognition)
    const response = await fetchCompanyDetailsHandler(portfolioDetailsId, KEY);
    if (empty) {
      if (response && response.intrapreneurRecognition) {
        this.setState({ loading: false, institutionIntrapreneur: response.intrapreneurRecognition, institutionIntrapreneurList: response.intrapreneurRecognition });
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false, institutionIntrapreneur: that.context.companyPortfolio.intrapreneurRecognition, institutionIntrapreneurList: that.context.companyPortfolio.intrapreneurRecognition });
    }
    this.CompanyIntrapreneurServer = response && response.intrapreneurRecognition ? response.intrapreneurRecognition : []
  }
  addIntrapreneur() {
    this.setState({ selectedObject: 'default', popoverOpen: !(this.state.popoverOpen), data: {} })
    if (this.state.institutionIntrapreneur) {
      this.setState({ selectedIndex: this.state.institutionIntrapreneur.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onSaveAction(e) {
    this.sendDataToParent(true);
    let setObject = this.state.institutionIntrapreneurList;
    if (this.context && this.context.companyPortfolio && this.context.companyPortfolio.intrapreneurRecognition) {
      setObject = this.context.companyPortfolio.intrapreneurRecognition;
    }
    this.setState({ institutionIntrapreneurList: setObject, popoverOpen: false })
    this.curSelectLogo = {}
  }

  onTileClick(index, uiIndex, e) {
    const cloneArray = _.cloneDeep(this.state.institutionIntrapreneur);
    // let details = cloneArray[index]
    let details = _.find(cloneArray, { index });
    details = _.omit(details, '__typename');
    if (details && details.logo) {
      delete details.logo.__typename;
    }
    this.curSelectLogo = details.logo
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: uiIndex,
      popoverOpen: !(this.state.popoverOpen)
    }, () => {
      this.lockPrivateKeys(index)
    });
    // setTimeout(function () {
    //   _.each(details.privateFields, function (pf) {
    //     $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    //   })
    // }, 10)
  }

  // todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    const privateValues = this.CompanyIntrapreneurServer && this.CompanyIntrapreneurServer[selIndex] ? this.CompanyIntrapreneurServer[selIndex].privateFields : []
    const filterPrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName, index: selIndex })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName, index: selIndex })
    const finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    const keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssss', keys)
    _.each(keys, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onLockChange(fiedName, field, e) {
    let isPrivate = false;
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true
    }
    const privateKey = {
      keyName: fiedName, booleanKey: field, isPrivate, index: this.state.selectedIndex, tabName: this.props.tabName
    }
    this.setState({ privateKey }, function () {
      this.sendDataToParent()
    })
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    const key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, { [key]: true });
    } else {
      updatedData = _.extend(updatedData, { [key]: false });
    }
    this.setState({ data: updatedData }, () => {
      // this.sendDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, () => {
      // this.sendDataToParent()
    })
  }

  handleYearChange(e) {
    let details = this.state.data;
    const name = 'year';
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: this.refs.year.state.inputValue });
    this.setState({ data: details }, () => {
      // this.sendDataToParent()
    })
  }

  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const intrapreneur = this.state.institutionIntrapreneur;
    let institutionIntrapreneur = _.cloneDeep(intrapreneur);
    data.index = this.state.selectedIndex;
    data.logo = this.curSelectLogo;
    if (isSaveClicked) {
      let actualIndex = _.findIndex(institutionIntrapreneur, { index: this.state.selectedIndex });
      actualIndex = actualIndex >= 0 ? actualIndex : this.state.selectedIndex;
      institutionIntrapreneur[actualIndex] = data;
      // institutionIntrapreneur[this.state.selectedIndex] = data;
    }
    const arr = [];
    _.each(institutionIntrapreneur, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined || propName === 'privateFields') {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, '__typename');
      newItem = _.omit(newItem, ['privateFields'])
      arr.push(newItem)
    })
    institutionIntrapreneur = arr;
    this.setState({ institutionIntrapreneur })
    this.props.getIntrapreneurDetails(institutionIntrapreneur, this.state.privateKey);
  }

  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { intrapreneurRecognition: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file));
  }

  onFileUploadCallBack(file, resp) {
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
        this.curSelectLogo = {
          fileName: file && file.name ? file.name : '',
          fileUrl: result.result
        }
        // this.setState({loading: true})
        // this.fetchOnlyImages();
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
    const response = await fetchCompanyDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response && response.intrapreneurRecognition) {
      const dataDetails = this.state.institutionIntrapreneur;
      const cloneBackUp = _.cloneDeep(dataDetails);
      const specificData = cloneBackUp[this.state.selectedIndex];
      if (specificData) {
        const curUpload = response.intrapreneurRecognition[this.state.selectedIndex]
        specificData.logo = curUpload.logo;
        this.setState({ loading: false, institutionIntrapreneur: cloneBackUp });
      } else {
        this.setState({ loading: false })
      }
    }
  }

  render() {
    const yesterday = Datetime.moment().subtract(0, 'day');
    const valid = function (current) {
      return current.isBefore(yesterday);
    };
    // let query=gql`query{
    //   data:fetchActiveIntrapreneur {
    //     label:intrapreneurDisplayName
    //     value:_id
    //   }
    // }`;
    const that = this;
    const showLoader = that.state.loading;
    const institutionIntrapreneurList = that.state.institutionIntrapreneurList || [];
    let displayUploadButton = null;
    if (this.state.selectedObject != 'default') {
      displayUploadButton = true
    } else {
      displayUploadButton = false
    }
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div>
            <h2>Intrapreneur</h2>
            <div className="requested_input main_wrap_scroll">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-3">
                      <a href="" id="create_clientdefault" data-placement="top" data-class="large_popover" >
                        <div className="list_block notrans" onClick={this.addIntrapreneur.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addIntrapreneur.bind(this)}>Add New Intrapreneur</h3>
                        </div>
                      </a>
                    </div>
                    {institutionIntrapreneurList.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-3" key={idx}>
                      <a href="" id={`create_client${idx}`}>
                        <div className="list_block">
                          <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate}/><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate}/>
                          {/* <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div> */}
                          <div className="hex_outer" onClick={that.onTileClick.bind(that, details.index, idx)}><img
                            src={details.logo ? generateAbsolutePath(details.logo.fileUrl) : '/images/def_profile.png'}/></div>
                          <h3>{details.intrapreneurName ? details.intrapreneurName : ''}</h3>
                        </div>
                      </a>
                    </div>))}
                  </div>
                </div>
              </ScrollArea>
              <Popover placement="right" isOpen={this.state.popoverOpen} target={`create_client${this.state.selectedObject}`} toggle={this.toggle}>
                <PopoverTitle>Add Intrapreneur</PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover"><div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" name="intrapreneurName" placeholder="Name" className="form-control float-label" defaultValue={this.state.data.intrapreneurName} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIntrapreneurNamePrivate" defaultValue={this.state.data.isIntrapreneurNamePrivate} onClick={this.onLockChange.bind(this, 'intrapreneurName', 'isIntrapreneurNamePrivate')}/>
                        </div>
                        <div className="form-group">
                          <Datetime
                            dateFormat="YYYY" timeFormat={false} viewMode="years"
                            inputProps={{ placeholder: 'Select Year', className: 'float-label form-control' }} defaultValue={this.state.data.year}
                            closeOnSelect={true} ref="year" onBlur={this.handleYearChange.bind(this)} isValidDate={ valid }/>
                        </div>
                        <div className="form-group">
                          <input type="text" name="intrapreneurDescription" placeholder="About" className="form-control float-label" defaultValue={this.state.data.intrapreneurDescription} onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isIntrapreneurDescriptionPrivate" defaultValue={this.state.data.isIntrapreneurDescriptionPrivate} onClick={this.onLockChange.bind(this, 'intrapreneurDescription', 'isIntrapreneurDescriptionPrivate')}/>
                        </div>
                        {displayUploadButton ? <div className="form-group">
                          <div className="fileUpload mlUpload_btn">
                            <span>Upload Logo</span>
                            <input type="file" name="logo" id="logo" className="upload" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} />
                          </div>
                        </div> : ''}
                        <div className="clearfix"></div>
                        <div className="form-group">
                          <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data && this.state.data.makePrivate} name="checkbox" onChange={this.onStatusChangeNotify.bind(this)}/><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                        </div>
                        <div className="ml_btn" style={{ textAlign: 'center' }}>
                          <a className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                        </div>
                      </div>
                    </div></div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>)}
      </div>
    )
  }
}
MlCompanyIntrapreneur.contextTypes = {
  companyPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
