import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import ScrollArea from "react-scrollbar";
import Datetime from "react-datetime";
import { Popover, PopoverContent, PopoverTitle } from "reactstrap";
import _ from "lodash";
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from "../../../../../../client/admin/utils/formElemUtil";
import { multipartASyncFormHandler } from "../../../../../../client/commons/MlMultipartFormAction";
import { fetchfunderPortfolioSuccess } from "../../actions/findPortfolioFunderDetails";
import { putDataIntoTheLibrary } from '../../../../../commons/actions/mlLibraryActionHandler'
import MlLoader from '../../../../../commons/components/loader/loader'
import NoData from '../../../../../commons/components/noData/noData'
import CropperModal from '../../../../../commons/components/cropperModal';
var FontAwesome = require('react-fontawesome');

export default class MlFunderSuccessStories extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      funderSuccess: [],
      popoverOpen: false,
      selectedIndex: -1,
      funderSuccessList: [],
      selectedObject: "default",
      privateKey: {},
      uploadingAvatar: false,
      showProfileModal: false,
    }
    this.handleBlur.bind(this);
    this.onSaveAction.bind(this);
    this.dateChange.bind(this)
    this.fetchPortfolioDetails.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.successStories)
    const response = await fetchfunderPortfolioSuccess(portfolioDetailsId);
    if (empty) {
      if (response && response.length)
        this.setState({ loading: false, funderSuccess: response, funderSuccessList: response });
      else
        this.setState({ loading: false })
    } else {
      this.setState({
        loading: false,
        funderSuccess: that.context.funderPortfolio.successStories,
        funderSuccessList: that.context.funderPortfolio.successStories
      });
    }
    this.funderSuccessStoryServer = response
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: e.target.value });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  dateChange(e) {
    let details = this.state.data;
    let name = 'date';
    details = _.omit(details, [name]);
    details = _.extend(details, { [name]: this.refs.date.state.inputValue });
    this.setState({ data: details }, function () {
      this.sendDataToParent()
    })
  }

  onTileClick(index, e) {
    let cloneArray = _.cloneDeep(this.state.funderSuccess);
    let details = cloneArray[index]
    details = _.omit(details, "__typename");
    if (details && details.logo) {
      delete details.logo['__typename'];
    }
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: index,
      popoverOpen: !(this.state.popoverOpen)
    }, () => {
      this.lockPrivateKeys(index)
    });

    /*setTimeout(function () {
     _.each(details.privateFields, function (pf) {
     $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
     })
     }, 10)*/
  }

  //todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex) {
    var privateValues = this.funderSuccessStoryServer && this.funderSuccessStoryServer[selIndex] ? this.funderSuccessStoryServer[selIndex].privateFields : []
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, { tabName: this.props.tabName, index: selIndex })
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, { tabName: this.props.tabName, index: selIndex })
    var finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssss', keys)
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onStatusChangeNotify(e) {
    let updatedData = this.state.data || {};
    let key = e.target.id;
    updatedData = _.omit(updatedData, [key]);
    if (e.currentTarget.checked) {
      updatedData = _.extend(updatedData, { [key]: true });
    } else {
      updatedData = _.extend(updatedData, { [key]: false });
    }
    this.setState({ data: updatedData }, function () {
      this.sendDataToParent()
    })
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

  addSuccess() {
    this.setState({ selectedObject: "default", popoverOpen: !(this.state.popoverOpen), data: {} })
    if (this.state.funderSuccess) {
      this.setState({ selectedIndex: this.state.funderSuccess.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  onLockChange(fieldName, field, e) {
    let details = this.state.data || {};
    let key = field;
    var isPrivate = false;
    details = _.omit(details, [key]);
    let className = e.target.className;
    if (className.indexOf("fa-lock") != -1) {
      details = _.extend(details, { [key]: true });
      isPrivate = true;
    } else {
      details = _.extend(details, { [key]: false });
    }
    /* var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName:"successStories"}
     this.setState({privateKey:privateKey})
     this.setState({data: details}, function () {
     this.sendDataToParent()
     })*/
    var privateKey = { keyName: fieldName, booleanKey: field, isPrivate: isPrivate, index: this.state.selectedIndex, tabName: this.props.tabName }
    // this.setState({privateKey:privateKey})
    this.setState({ data: details, privateKey: privateKey }, function () {
      this.sendDataToParent()
    })
  }

  onSaveAction(e) {
    var isDate = _.findIndex(this.state.funderSuccess, { date: '' })
    var dateKey = _.compact(_.map(this.state.funderSuccess, 'date'));
    if ((isDate > 0) || (dateKey.length != this.state.funderSuccess && this.state.funderSuccess.length))
      toastr.error("Please select Date");
    this.setState({ funderSuccessList: this.state.funderSuccess, popoverOpen: false })
  }

  onLogoFileUpload(fileInfo, image) {

    let file = image;
    let fileName = fileInfo.name;
    let data = {
      moduleName: "PORTFOLIO",
      actionName: "UPLOAD",
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: { successStories: [{ logo: { fileUrl: '', fileName: fileName }, index: this.state.selectedIndex }] }
    };
    let response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file));
  }

  onFileUploadCallBack(file, resp) {
    if (resp) {
      let result = JSON.parse(resp)
      let userOption = confirm("Do you want to add the file into the library")
      if (userOption) {
        let fileObjectStructure = {
          fileName: file.name,
          fileType: file.type,
          fileUrl: result.result,
          libraryType: "image"
        }
        this.libraryAction(fileObjectStructure)
      }
      if (result.success) {
        this.setState({ loading: true })
        this.fetchOnlyImages();
      }
      this.toggleModal();
      this.setState({ uploadingAvatar: false })
    }
  }

  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId, file, this.props.client)
    return resp;
  }


  async fetchOnlyImages() {
    const response = await fetchfunderPortfolioSuccess(this.props.portfolioDetailsId);
    if (response) {
      let thisState = this.state.selectedIndex;
      let dataDetails = this.state.funderSuccess
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if (specificData) {
        let curUpload = response[thisState]
        specificData['logo'] = curUpload['logo']
        this.setState({ loading: false, funderSuccess: cloneBackUp });
      } else {
        this.setState({ loading: false })
      }
    }
  }

  sendDataToParent() {
    let data = this.state.data;
    let success = this.state.funderSuccess;
    let funderSuccess = _.cloneDeep(success);
    data.index = this.state.selectedIndex;
    funderSuccess[this.state.selectedIndex] = data;
    let arr = [];
    _.each(funderSuccess, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename");
      newItem = _.omit(newItem, "privateFields");
      newItem = _.omit(newItem, 'logo');
      arr.push(newItem)
    })
    funderSuccess = arr;
    // funderSuccess=_.omit(funderSuccess,["privateFields"]);
    this.setState({ funderSuccess: funderSuccess })
    this.props.getSuccessStoriesDetails(funderSuccess, this.state.privateKey);
  }

  handleUploadAvatar(image, e) {
    console.log('here');
    this.setState({
      uploadingAvatar: true,
    });
    this.onLogoFileUpload(e, image);
  }

  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal,
    });
  }

  render() {
    var yesterday = Datetime.moment().subtract(0, 'day');
    var valid = function (current) {
      return current.isBefore(yesterday);
    };
    let that = this;
    const showLoader = that.state.loading;
    let funderSuccessList = that.state.funderSuccessList || [];
    return (
      <div>
        {showLoader === true ? (<MlLoader />) : (
          <div className="portfolio-main-wrap">
            <h2>Success Stories</h2>
            <div className="main_wrap_scroll">
              <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-4">
                      <a href="#" id="team_listdefault" data-placement="top" data-class="large_popover">
                        <div className="list_block notrans" onClick={this.addSuccess.bind(this)}>
                          <div className="hex_outer"><span className="ml ml-plus "></span></div>
                          <h3 onClick={this.addSuccess.bind(this)}>Add New</h3>
                        </div>
                      </a>
                    </div>

                    {/*list of stories*/}
                    {funderSuccessList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                          <a href="#" id={"team_list" + idx}>

                            <div className="list_block notrans funding_list">
                              <div className="cluster_status inactive_cl">
                                <FontAwesome name='unlock' id="makePrivate" defaultValue={details.makePrivate} />
                                <input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={details.makePrivate} />
                              </div>
                              {/*<div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>*/}
                              <div className="" onClick={that.onTileClick.bind(that, idx)}><img
                                src={details.logo ? details.logo.fileUrl : "/images/def_profile.png"} /></div>
                              <div><p>{details.storyTitle}</p><p>{details.description}</p></div>
                              <h3>{details.date ? details.date : "Date : "}</h3>
                            </div>

                            {/*<div className="list_block notrans funding_list"*/}
                            {/*onClick={that.onTileClick.bind(that, idx)}>*/}
                            {/*<FontAwesome name='lock'/>*/}
                            {/*<div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>*/}
                            {/*<img src={details.logo ? details.logo.fileUrl : "/images/def_profile.png"}/>*/}
                            {/*<div><p>{details.storyTitle}</p><p>{details.description}</p></div>*/}
                            {/*<h3>{details.date ? details.date : "Date : "}</h3>*/}
                            {/*</div>*/}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>

              {/*popover view*/}
              <Popover placement="right" isOpen={this.state.popoverOpen}
                target={"team_list" + this.state.selectedObject} toggle={this.toggle}>
                <PopoverTitle>Add New Success Story </PopoverTitle>
                <PopoverContent>
                  <div className="team_list-main">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                              inputProps={{ placeholder: "Select Date", className: "float-label form-control" }} ref="date"
                              defaultValue={this.state.data.date ? this.state.data.date : ''}
                              onBlur={this.dateChange.bind(this)}
                              isValidDate={valid} /> {/**/} {/*closeOnSelect={true}*/}
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isDatePrivate"
                              onClick={this.onLockChange.bind(this, "date", "isDatePrivate")} />
                          </div>
                          <div className="clearfix"></div>
                          <CropperModal
                            uploadingImage={this.state.uploadingAvatar}
                            handleImageUpload={this.handleUploadAvatar}
                            cropperStyle="circle"
                            show={this.state.showProfileModal}
                            toggleShow={this.toggleModal}
                          />
                          {this.state.selectedObject != "default" ?
                            <div className="form-group" onClick={this.toggleModal.bind(this)}>
                              <div className="fileUpload mlUpload_btn">
                                <span>Upload Pic</span>
                                {/* <input type="file" className="upload" name="logo" id="logo" accept="image/*"
                                  onChange={this.onLogoFileUpload.bind(this)} /> */}
                              </div>
                              {/*<div className="previewImg ProfileImg">*/}
                              {/*<img src="/images/ideator_01.png"/>*/}
                              {/*</div>*/}
                            </div> : <div></div>
                          }
                          <br />
                          <br className="brclear" />
                          <div className="form-group">
                            <input type="text" placeholder="Enter title of Story" className="form-control float-label"
                              name="storyTitle" defaultValue={this.state.data.storyTitle}
                              onBlur={this.handleBlur.bind(this)} />
                            <FontAwesome id="isStoryTitlePrivate" name='unlock' className="input_icon un_lock"
                              onClick={this.onLockChange.bind(this, "storyTitle", "isStoryTitlePrivate")} />

                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Description" className="form-control float-label"
                              name="description" defaultValue={this.state.data.description}
                              onBlur={this.handleBlur.bind(this)} />
                            <FontAwesome id="isDescPrivate" name='unlock' className="input_icon un_lock"
                              onClick={this.onLockChange.bind(this, "description", "isDescPrivate")} />

                          </div>
                          <div className="form-group">
                            <div className="input_types"><input id="makePrivate" type="checkbox" checked={this.state.data.makePrivate && this.state.data.makePrivate} name="checkbox" onChange={this.onStatusChangeNotify.bind(this)} /><label htmlFor="checkbox1"><span></span>Make Private</label></div>
                          </div>
                          <div className="ml_btn" style={{ 'textAlign': 'center' }}>
                            <a className="save_btn" onClick={this.onSaveAction.bind(this)}>Save</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>)}
      </div>
    )
  }
};
MlFunderSuccessStories.contextTypes = {
  funderPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object,
};
