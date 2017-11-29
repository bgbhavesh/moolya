import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag'
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import { Popover, PopoverContent, PopoverTitle } from 'reactstrap';
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../../../client/admin/utils/formElemUtil';
import { multipartASyncFormHandler } from '../../../../../../../client/commons/MlMultipartFormAction';
import { fetchfunderPortfolioPrincipal, fetchfunderPortfolioTeam } from '../../../actions/findPortfolioFunderDetails';
import { fetchPortfolioActionHandler } from '../../../actions/findClusterIdForPortfolio'
import { putDataIntoTheLibrary } from '../../../../../../commons/actions/mlLibraryActionHandler';
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper'
import CropperModal from '../../../../../../commons/components/cropperModal';
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../commons/utils/confirm';

export default class MlFunderPrincipalTeam extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      fileName: '',
      funderPrincipal: [],
      funderTeam: [],
      popoverOpenP: false,
      popoverOpenT: false,
      selectedIndex: -1,
      funderPrincipalList: [],
      funderTeamList: [],
      selectedObject: 'default',
      title: '',
      selectedTab: 'principal',
      clusterId: '',
      privateKeys: [],
      privateKey: {},
      principalContext: 'active',
      teamContext: '',
      uploadingAvatar: false,
      showProfileModal: false,
      uploadingAvatar1: false,
      showProfileModal1: false,
      teamAvatar: false
    }
    this.handleBlur = this.handleBlur.bind(this);
    this.onSavePrincipalAction = this.onSavePrincipalAction.bind(this);
    this.onSaveTeamAction = this.onSaveTeamAction.bind(this);
    this.fetchPrincipalDetails.bind(this);
    this.fetchTeamDetails.bind(this);
    this.libraryAction.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleTeamAvatar = this.handleTeamAvatar.bind(this);
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.optionsBySelectTitle = this.optionsBySelectTitle.bind(this);
    this.onStatusChangeNotify = this.onStatusChangeNotify.bind(this)
    return this;
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

  componentWillMount() {
    this.fetchPortfolioDetails();
    return [this.fetchPrincipalDetails(), this.fetchTeamDetails()];
  }
  async fetchPortfolioDetails() {
    const response = await fetchPortfolioActionHandler(this.props.portfolioDetailsId);
    if (response) {
      this.setState({ loading: false, clusterId: response.clusterId });
    }
  }
  async fetchPrincipalDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.principal)
    const response = await fetchfunderPortfolioPrincipal(portfolioDetailsId);
    if (empty) {
      if (response && response.length) { this.setState({ loading: false, funderPrincipal: response, funderPrincipalList: response }); } else { this.setState({ loading: false }) }
    } else {
      this.setState({
        loading: false,
        funderPrincipal: that.context.funderPortfolio.principal,
        funderPrincipalList: that.context.funderPortfolio.principal
      });
    }
    this.funderPrincipalServer = response
  }
  async fetchTeamDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.team)
    const response = await fetchfunderPortfolioTeam(portfolioDetailsId);
    if (empty) {
      if (response) { this.setState({ loading: false, funderTeam: response, funderTeamList: response }); }
    } else {
      this.setState({
        loading: false,
        funderTeam: that.context.funderPortfolio.team,
        funderTeamList: that.context.funderPortfolio.team
      });
    }
    this.funderTeamServer = response
  }

  onLockChange(fieldName, field, tabName, e) {
    let isPrivate = false;
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true;
    }
    const privateKey = {
      keyName: fieldName, booleanKey: field, isPrivate, index: this.state.selectedIndex, tabName
    }
    this.setState({ privateKey }, function () {
      this.sendDataToParent()
    })
  }

  handleYearsOfExperience(value) {
    const blankSpace = value.indexOf(' ') >= 0;
    let experience = parseInt(value);
    const valuesArray = value.split('.');
    const decimalExperience = valuesArray.length > 0 ? valuesArray[0] : '';
    if (decimalExperience) {
      experience = parseInt(decimalExperience);
      if (experience > 75) {
        toastr.error('Experience cannot be more than 75 years')
        return false;
      }
    }
    if (blankSpace) {
      toastr.error('Blank spaces are not allowed')
      return false;
    } else if (experience > 75) {
      toastr.error('Experience cannot be more than 75 years')
      return false;
    } else if (!experience) {
      toastr.error('Experience not valid')
      return false
    } return true
  }

  handleBlur(e) {
    let details = this.state.data;
    const name = e.target.name;
    let validExperience;
    if (name === 'yearsOfExperience') {
      validExperience = this.handleYearsOfExperience(e.target.value)
      if (validExperience) {
        details = _.omit(details, [name]);
        details = _.extend(details, { [name]: e.target.value });
        this.setState({ data: details }, () => {
          // this.sendDataToParent()
        })
      }
    } else {
      details = _.omit(details, [name]);
      details = _.extend(details, { [name]: e.target.value });
      this.setState({ data: details }, () => {
        // this.sendDataToParent()
      })
    }
  }
  onSavePrincipalAction(e) {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    if (this.context && this.context.funderPortfolio && this.context.funderPortfolio.principal) {
      this.setState({ funderPrincipalList: this.context.funderPortfolio.principal, popoverOpenP: false, selectLogo: {} });
    } else {
      this.setState({ funderPrincipalList: this.state.funderPrincipal, popoverOpenP: false, selectLogo: {} });
    }
  }

  onSaveTeamAction(e) {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    if (this.context && this.context.funderPortfolio && this.context.funderPortfolio.team) {
      this.setState({ funderTeamList: this.context.funderPortfolio.team, popoverOpenT: false, selectLogoTeam: {} });
    } else {
      this.setState({ funderTeamList: this.state.funderTeam, popoverOpenT: false, selectLogoTeam: {} });
    }
  }

  addPrincipal() {
    this.setState({ selectedObject: 'default', popoverOpenP: !(this.state.popoverOpenP), data: {} })
    if (this.state.funderPrincipal) {
      this.setState({ selectedIndex: this.state.funderPrincipal.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }

  addTeam() {
    this.setState({ selectedObject: 'default', popoverOpenT: !(this.state.popoverOpenT), data: {} })
    if (this.state.funderTeam) {
      this.setState({ selectedIndex: this.state.funderTeam.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
  }
  optionsBySelectTitle(val) {
    const data = _.cloneDeep(this.state.data);
    data.title = val;
    this.setState({ data }, () => {
      // this.sendDataToParent();
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

  onPrincipalTileClick(index, uiIndex, e) {
    const cloneArray = _.cloneDeep(this.state.funderPrincipal);
    // let details = cloneArray[index]
    let details = _.find(cloneArray, { index });
    details = _.omit(details, '__typename');
    const imgLogo = details.logo ? details.logo : {};
    this.setState({
      selectedIndex: index,
      data: details,
      selectedObject: uiIndex,
      selectLogo: imgLogo,
      popoverOpenP: !(this.state.popoverOpenP)
    }, () => {
      this.lockPrivateKeys(index, true, 'principal')
    });

    /* setTimeout(function () {
       _.each(details.privateFields, function (pf) {
         $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
       })
     }, 10) */
  }
  // todo:// context data connection first time is not coming have to fix
  lockPrivateKeys(selIndex, isPrincipal, tabName) {
    let privateValues = this.funderPrincipalServer && this.funderPrincipalServer[selIndex] ? this.funderPrincipalServer[selIndex].privateFields : []
    if (!isPrincipal) { privateValues = this.funderTeamServer && this.funderTeamServer[selIndex] ? this.funderTeamServer[selIndex].privateFields : [] }
    const filterPrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.privateKeys, { tabName, index: selIndex })
    const filterRemovePrivateKeys = _.filter(this.context.portfolioKeys && this.context.portfolioKeys.removePrivateKeys, { tabName, index: selIndex })
    const finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    const keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keyssssssssssssssssssssss', keys)
    _.each(keys, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onTeamTileClick(index, uiIndex, e) {
    const cloneArray = _.cloneDeep(this.state.funderTeam);
    // let details = cloneArray[index]
    let details = _.find(cloneArray, { index });
    details = _.omit(details, '__typename');
    const imgLogo = details.logo ? details.logo : {};
    this.setState({
      selectedIndex: index,
      data: details,
      selectLogoTeam: imgLogo,
      selectedObject: uiIndex,
      popoverOpenT: !(this.state.popoverOpenT)
    }, () => {
      this.lockPrivateKeys(index, false, 'team')
    });


    // setTimeout(function () {
    //   _.each(details.privateFields, function (pf) {
    //     $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    //   })
    // }, 10)
  }
  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return { tabName: this.state.selectedTab, errorMessage: ret, index: this.state.selectedIndex }
  }

  getActualIndex(dataArray, checkIndex) {
    let response = _.findIndex(dataArray, { index: checkIndex });
    response = response >= 0 ? response : checkIndex;
    return response;
  }

  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const selectedTab = this.state.selectedTab;
    if (selectedTab == 'principal') {
      const fun = this.state.funderPrincipal;
      let funderPrincipal = _.cloneDeep(fun);
      data.index = this.state.selectedIndex;
      data.logo = this.state.selectLogo;
      if (isSaveClicked) {
        const actualIndex = this.getActualIndex(funderPrincipal, this.state.selectedIndex);
        funderPrincipal[actualIndex] = data;
      }
      const arr = [];
      _.each(funderPrincipal, (item) => {
        for (const propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, '__typename');
        newItem = _.omit(newItem, 'privateFields');
        arr.push(newItem)
      })
      funderPrincipal = arr;
      this.setState({ funderPrincipal })
      this.props.getPrincipalDetails(funderPrincipal, this.state.privateKey);
    } else if (selectedTab == 'team') {
      const fun = this.state.funderTeam;
      let funderTeam = _.cloneDeep(fun);
      data.index = this.state.selectedIndex;
      data.logo = this.state.selectLogoTeam;
      if (isSaveClicked) {
        const actualIndex = this.getActualIndex(funderTeam, this.state.selectedIndex);
        funderTeam[actualIndex] = data;
      }

      const arr = [];
      _.each(funderTeam, (item) => {
        for (const propName in item) {
          if (item[propName] === null || item[propName] === undefined) {
            delete item[propName];
          }
        }
        let newItem = _.omit(item, '__typename');
        newItem = _.omit(newItem, 'privateFields');
        arr.push(newItem)
      })
      funderTeam = arr;
      this.setState({ funderTeam })
      this.props.getTeamDetails(funderTeam, this.state.privateKey);
    }
  }

  onTabSelect(tab, e) {
    this.setState({
      selectedTab: tab,
      popoverOpenP: false,
      popoverOpenT: false
    });
  }
  onPrincipalLogoFileUpload(image, fileInfo) {
    if (fileInfo.length == 0) { return; }
    const file = image;
    const fileName = fileInfo.name;
    const data = {
      moduleName: 'PORTFOLIO',
      actionName: 'UPLOAD',
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: { principal: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file, 'principal'));
  }
  onTeamLogoFileUpload(image, fileInfo) {
    const file = image;
    const fileName = fileInfo.name;
    const data = {
      moduleName: 'PORTFOLIO',
      actionName: 'UPLOAD',
      portfolioDetailsId: this.props.portfolioDetailsId,
      portfolio: { team: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, file, 'team'));
  }

  onFileUploadCallBack(file, type, resp) {
    if (resp) {
      const result = JSON.parse(resp);

      Confirm('', 'Do you want to add the file into the library', 'Ok', 'Cancel', (ifConfirm) => {
        if (ifConfirm) {
          const fileObjectStructure = {
            fileName: this.state.fileName,
            fileType: file && file.type ? file.type : '',
            fileUrl: result.result,
            libraryType: 'image'
          }
          this.libraryAction(fileObjectStructure)
        }
      });

      if (result.success) {
        toastr.success('Photo Updated Successfully');
        // this.setState({
        //   loading: true
        // })
        // this.fetchOnlyImages();
      }
      const logoObj = {
        fileName: file && file.name ? file.name : '',
        fileUrl: result.result
      }
      if (type === 'principal') {
        this.setState({
          selectLogo: logoObj
        })
      } else {
        this.setState({
          selectLogoTeam: logoObj
        })
      }
      this.setState({
        uploadingAvatar: false,
        uploadingAvatar1: false,
        showProfileModal: false,
        showProfileModal1: false
      })
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

  /**
   * @Note: with latest changes @fetchOnlyImages dependency removed
   * @handling logo view on client only
   * */
  async fetchOnlyImages() {
    if (this.state.selectedTab == 'principal') {
      const response = await fetchfunderPortfolioPrincipal(this.props.portfolioDetailsId);
      if (response && !_.isEmpty(response)) {
        const thisState = this.state.selectedIndex;
        const dataDetails = this.state.funderPrincipal
        const cloneBackUp = _.cloneDeep(dataDetails);
        const specificData = cloneBackUp[thisState];
        if (specificData) {
          const curUpload = response[thisState]
          specificData.logo = curUpload.logo
          this.setState({
            loading: false, funderPrincipal: cloneBackUp, principalContext: 'active', teamContext: ''
          });
        } else {
          this.setState({ loading: false, principalContext: 'active', teamContext: '' })
        }
      }
    } else if (this.state.selectedTab == 'team') {
      const response = await fetchfunderPortfolioTeam(this.props.portfolioDetailsId);
      if (response && !_.isEmpty(response)) {
        const thisState = this.state.selectedIndex;
        const dataDetails = this.state.funderTeam
        const cloneBackUp = _.cloneDeep(dataDetails);
        const specificData = cloneBackUp[thisState];
        if (specificData) {
          const curUpload = response[thisState]
          specificData.logo = curUpload.logo
          this.setState({
            loading: false, funderTeam: cloneBackUp, teamContext: 'active', principalContext: ''
          });
        } else {
          this.setState({ loading: false, teamContext: 'active', principalContext: '' })
        }
      }
    }
  }

  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal
    });
  }

  toggleModal1() {
    const that = this;
    this.setState({
      showProfileModal1: !that.state.showProfileModal1
    });
  }

  handleTeamAvatar(image, file) {
    this.setState({
      uploadingAvatar1: true
    });
    this.setState({ fileName: file.name })
    this.onTeamLogoFileUpload(image, file);
  }

  handleUploadAvatar(image, file) {
    this.setState({
      // uploadingAvatar: true,,
    });
    this.setState({ fileName: file.name })
    this.onPrincipalLogoFileUpload(image, file);
  }

  render() {
    const titlequery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    const titleOption = { options: { variables: { type: 'TITLE', hierarchyRefId: this.state.clusterId } } };
    const that = this;
    const showLoader = that.state.loading;
    const funderPrincipalList = that.state.funderPrincipal || [];
    return (
      <div>
        {showLoader === true ? (<MlLoader />) : (
          <div className="portfolio-main-wrap">
            <div className="main_wrap_scroll">
              <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>
                <div className="ml_tabs ml_tabs_large">
                  <ul className="nav nav-pills" id="myTabs">
                    <li
                      id="principal" className={that.state.principalContext}
                      onClick={this.onTabSelect.bind(this, 'principal')}>
                      <a href="#1a" data-toggle="tab">Principal</a>
                    </li>
                    <li id="team" className={that.state.teamContext} onClick={this.onTabSelect.bind(this, 'team')}>
                      <a href="#2a" data-toggle="tab">Team</a>
                    </li>
                  </ul>

                  {/* principle list */}
                  <div className="tab-content clearfix requested_input">
                    {/* <div className="tab-pane active" id="1a"> */}
                    <div id="1a" className={`tab-pane ${that.state.principalContext}`}>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-2 col-md-4 col-sm-4" onClick={this.addPrincipal.bind(this)}>
                            <a href="" id="create_clientPdefault" data-placement="top" data-class="large_popover">
                              <div className="list_block notrans">
                                <div className="hex_outer"><span className="ml ml-plus "></span></div>
                                <h3>Add New Principal</h3>
                              </div>
                            </a>
                          </div>
                          {funderPrincipalList.map((principal, idx) => (
                            <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                              <a href="" id={`create_clientP${idx}`}>
                                <div
                                  className="list_block notrans funding_list"
                                  onClick={that.onPrincipalTileClick.bind(that, principal.index, idx)}>
                                  <FontAwesome name='unlock' id="makePrivate" defaultValue={principal.makePrivate} /><input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={principal.makePrivate} />
                                  {/* <div className="cluster_status"><FontAwesome name='trash-o' /></div> */}
                                  <img src={principal.logo && principal.logo.fileUrl ? generateAbsolutePath(principal.logo.fileUrl) : '/images/def_profile.png'} />
                                  <div>
                                    <p>{principal.firstName}</p><p className="small">{principal.designation}</p>
                                  </div>
                                  {/* <div className="ml_icon_btn"> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='facebook'/></a> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='twitter'/></a> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='linkedin'/></a> */}
                                  {/* </div> */}
                                </div>
                              </a>
                            </div>
                          ))}

                        </div>
                      </div>
                    </div>

                    {/* team list view */}
                    {/* <div className="tab-pane" id="2a"> */}
                    <div id="2a" className={`tab-pane ${that.state.teamContext}`}>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-2 col-md-4 col-sm-4" onClick={this.addTeam.bind(this)}>
                            <a href="" id="create_clientTdefault" data-placement="top" data-class="large_popover">
                              <div className="list_block notrans">
                                <div className="hex_outer"><span className="ml ml-plus "></span></div>
                                <h3>Add New</h3>
                              </div>
                            </a>
                          </div>
                          {that.state.funderTeamList.map((team, idx) => (
                            <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
                              <a href="" id={`create_clientT${idx}`}>
                                <div
                                  className="list_block notrans funding_list"
                                  onClick={that.onTeamTileClick.bind(that, team.index, idx)}>
                                  <FontAwesome name='unlock' id="makePrivate" defaultValue={team.makePrivate} />
                                  <input type="checkbox" className="lock_input" id="isAssetTypePrivate" checked={team.makePrivate} />
                                  {/* <div className="cluster_status"><FontAwesome name='trash-o' /></div> */}
                                  <img src={team.logo && team.logo.fileUrl ? generateAbsolutePath(team.logo.fileUrl) : '/images/def_profile.png'} />
                                  <div><p>{team.firstName}</p><p
                                    className="small">{team.designation}</p></div>
                                  {/* <div className="ml_icon_btn"> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='facebook'/></a> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='twitter'/></a> */}
                                  {/* <a href="" className="save_btn"><FontAwesome name='linkedin'/></a> */}
                                  {/* </div> */}
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollArea>
              <CropperModal
                uploadingImage={this.state.uploadingAvatar}
                handleImageUpload={this.handleUploadAvatar}
                cropperStyle="circle"
                show={this.state.showProfileModal}
                toggleShow={this.toggleModal}
              />
              {/* principle popover */}
              <Popover
                placement="right" isOpen={this.state.popoverOpenP}
                target={`create_clientP${this.state.selectedObject}`} toggle={this.toggle}>
                <PopoverTitle> Add New Member </PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          {this.state.selectedObject != 'default' ?
                            <div className="form-group" onClick={this.toggleModal.bind(this)}>
                              <div className="fileUpload mlUpload_btn">
                                <span>Upload Pic</span>
                                {/* <input type="file" className="upload"
                                         onChange={this.onPrincipalLogoFileUpload.bind(this)}/> */}
                              </div>
                              <div className="previewImg ProfileImg">
                                <img
                                  src={this.state.selectLogo && generateAbsolutePath(this.state.selectLogo.fileUrl)} />
                              </div>
                            </div> : <div></div>
                          }

                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Title" name="title" */}
                          {/* defaultValue={this.state.data.title} */}
                          {/* className="form-control float-label" onBlur={this.handleBlur}/> */}
                          {/* /!*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*!/ */}
                          {/* /!*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*!/ */}
                          {/* /!*<input type="checkbox" className="lock_input"*!/ */}
                          {/* /!*checked={this.state.data.isCompanyNamePrivate}/>*!/ */}
                          {/* </div> */}
                          <div className="clearfix"></div>
                          <div className="form-group">
                            <Moolyaselect
                              multiSelect={false} placeholder="Title" className="form-control float-label"
                              valueKey={'value'} labelKey={'label'} selectedValue={this.state.data.title}
                              queryType={'graphql'} query={titlequery} queryOptions={titleOption}
                              onSelect={that.optionsBySelectTitle} isDynamic={true} />

                          </div>
                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="First Name" name="firstName" ref={'firstName'}
                              defaultValue={this.state.data.firstName} className="form-control float-label"
                              onBlur={this.handleBlur} data-required={true}
                              data-errMsg="First name is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                              onClick={this.onLockChange.bind(this, 'firstName', 'isFirstNamePrivate', 'principal')} />
                          </div>

                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="Last Name" name="lastName" ref={'lastName'}
                              defaultValue={this.state.data.lastName} className="form-control float-label"
                              onBlur={this.handleBlur} data-required={true}
                              data-errMsg="Last name is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                              onClick={this.onLockChange.bind(this, 'lastName', 'isLastNamePrivate', 'principal')} />
                          </div>
                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="Designation" name="designation"
                              defaultValue={this.state.data.designation} ref={'designation'}
                              className="form-control float-label" onBlur={this.handleBlur} data-required={true}
                              data-errMsg="Designation is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isDesignationPrivate"
                              onClick={this.onLockChange.bind(this, 'designation', 'isDesignationPrivate', 'principal')} />
                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Company Name" name="principalcompanyName"
                              defaultValue={this.state.data.principalcompanyName}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isCompanyNamePrivate"
                              onClick={this.onLockChange.bind(this, 'principalcompanyName', 'isCompanyNamePrivate', 'principal')} />

                          </div>

                          <div className="form-group">
                            <input
                              type="text" placeholder="Duration" name="duration"
                              defaultValue={this.state.data.duration}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isDurationPrivate"
                              onClick={this.onLockChange.bind(this, 'duration', 'isDurationPrivate', 'principal')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Years of Experience" name="yearsOfExperience"
                              defaultValue={this.state.data.yearsOfExperience}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isYearsOfExperiencePrivate"
                              onClick={this.onLockChange.bind(this, 'yearsOfExperience', 'isYearsOfExperiencePrivate', 'principal')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Qualification" name="qualification"
                              defaultValue={this.state.data.qualification}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isQualificationPrivate"
                              onClick={this.onLockChange.bind(this, 'qualification', 'isQualificationPrivate', 'principal')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="About" name="aboutPrincipal"
                              defaultValue={this.state.data.aboutPrincipal}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isAboutPrincipalPrivate"
                              onClick={this.onLockChange.bind(this, 'aboutPrincipal', 'isAboutPrincipalPrivate', 'principal')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="LinkedIn" name="linkedinUrl"
                              defaultValue={this.state.data.linkedinUrl}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isLinkedinUrlPrivate"
                              onClick={this.onLockChange.bind(this, 'linkedinUrl', 'isLinkedinUrlPrivate', 'principal')} />

                          </div>

                          <div className="input_types">
                            <input
                              id="makePrivate" type="checkbox"
                              checked={this.state.data.makePrivate && this.state.data.makePrivate}
                              name="checkbox"
                              onChange={this.onStatusChangeNotify} />
                            <label htmlFor="checkbox1"><span></span>Make Private</label></div>
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Facebook" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="facebook-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="twitter" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="twitter-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Youtube" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="youtube-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Google plus" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="google-plus-square" className="password_icon"/> */}
                          {/* </div> */}
                          <div className="ml_btn" style={{ textAlign: 'center' }}>
                            <a className="save_btn" onClick={this.onSavePrincipalAction}>Save</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <CropperModal
                uploadingImage={this.state.teamAvatar}
                handleImageUpload={this.handleTeamAvatar}
                cropperStyle="circle"
                show={this.state.showProfileModal1}
                toggleShow={this.toggleModal1}
              />
              {/* team popover */}
              <Popover
                placement="right" isOpen={this.state.popoverOpenT}
                target={`create_clientT${this.state.selectedObject}`} toggle={this.toggle}>
                <PopoverTitle> Add New Member </PopoverTitle>
                <PopoverContent>
                  <div className="ml_create_client">
                    <div className="medium-popover">
                      <div className="row">
                        <div className="col-md-12">
                          {this.state.selectedObject != 'default' ?
                            <div className="form-group" onClick={this.toggleModal1}>
                              <div className="fileUpload mlUpload_btn">
                                <span>Upload Pic</span>
                                {/* <input type="file" className="upload"
                                         onChange={this.onTeamLogoFileUpload.bind(this)}/> */}
                              </div>
                              <div className="previewImg ProfileImg">
                                <img
                                  src={this.state.selectLogoTeam && generateAbsolutePath(this.state.selectLogoTeam.fileUrl) } />
                              </div>
                            </div> : <div></div>
                          }
                          <div className="clearfix"></div>
                          <div className="form-group">
                            <Moolyaselect
                              multiSelect={false} placeholder="Title" className="form-control float-label"
                              valueKey={'value'} labelKey={'label'} selectedValue={this.state.data.title}
                              queryType={'graphql'} query={titlequery} queryOptions={titleOption}
                              onSelect={that.optionsBySelectTitle} isDynamic={true} />

                          </div>
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Title" name="title" */}
                          {/* defaultValue={this.state.data.title} */}
                          {/* className="form-control float-label" onBlur={this.handleBlur}/> */}
                          {/* /!*<FontAwesome name='unlock' className="input_icon" id="isCompanyNamePrivate"*!/ */}
                          {/* /!*onClick={this.onLockChange.bind(this, "isCompanyNamePrivate")}/>*!/ */}
                          {/* /!*<input type="checkbox" className="lock_input"*!/ */}
                          {/* /!*checked={this.state.data.isCompanyNamePrivate}/>*!/ */}
                          {/* </div> */}

                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="First Name" name="firstName" ref={'firstName'}
                              defaultValue={this.state.data.firstName} className="form-control float-label"
                              onBlur={this.handleBlur} data-required={true}
                              data-errMsg="First name is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"
                              onClick={this.onLockChange.bind(this, 'firstName', 'isFirstNamePrivate', 'team')} />
                          </div>

                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="Last Name" name="lastName" ref={'lastName'}
                              defaultValue={this.state.data.lastName} className="form-control float-label"
                              onBlur={this.handleBlur} data-required={true}
                              data-errMsg="Last name is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isLastNamePrivate"
                              onClick={this.onLockChange.bind(this, 'lastName', 'isLastNamePrivate', 'team')} />
                          </div>

                          <div className="form-group mandatory">
                            <input
                              type="text" placeholder="Designation" name="designation" ref={'designation'}
                              defaultValue={this.state.data.designation}
                              className="form-control float-label" onBlur={this.handleBlur} data-required={true}
                              data-errMsg="Designation is required"/>
                            <FontAwesome
                              name='unlock' className="input_icon" id="isDesignationPrivate"
                              onClick={this.onLockChange.bind(this, 'designation', 'isDesignationPrivate', 'team')} />
                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Company Name" name="teamcompanyName"
                              defaultValue={this.state.data.teamcompanyName}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isCompanyNamePrivate"
                              onClick={this.onLockChange.bind(this, 'teamcompanyName', 'isCompanyNamePrivate', 'team')} />

                          </div>

                          <div className="form-group">
                            <input
                              type="text" placeholder="Duration" name="duration"
                              defaultValue={this.state.data.duration}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isDurationPrivate"
                              onClick={this.onLockChange.bind(this, 'duration', 'isDurationPrivate', 'team')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Years of Experience" name="yearsOfExperience"
                              defaultValue={this.state.data.yearsOfExperience}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isYearsOfExperiencePrivate"
                              onClick={this.onLockChange.bind(this, 'yearsOfExperience', 'isYearsOfExperiencePrivate', 'team')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="Qualification" name="qualification"
                              defaultValue={this.state.data.qualification}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isQualificationPrivate"
                              onClick={this.onLockChange.bind(this, 'qualification', 'isQualificationPrivate', 'team')} />

                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="About" name="aboutTeam"
                              defaultValue={this.state.data.aboutTeam}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon" id="isAboutTeamPrivate"
                              onClick={this.onLockChange.bind(this, 'aboutTeam', 'isAboutTeamPrivate', 'team')} />
                          </div>
                          <div className="form-group">
                            <input
                              type="text" placeholder="LinkedIn" name="linkedinUrl"
                              defaultValue={this.state.data.linkedinUrl}
                              className="form-control float-label" onBlur={this.handleBlur} />
                            <FontAwesome
                              name='unlock' className="input_icon un_lock" id="isLinkedinUrlPrivate"
                              onClick={this.onLockChange.bind(this, 'linkedinUrl', 'isLinkedinUrlPrivate', 'team')} />

                          </div>

                          <div className="input_types">
                            <input
                              id="makePrivate" type="checkbox"
                              checked={this.state.data.makePrivate && this.state.data.makePrivate}
                              name="checkbox"
                              onChange={this.onStatusChangeNotify} />
                            <label htmlFor="checkbox1"><span></span>Make Private</label></div>
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Facebook" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="facebook-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="twitter" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="twitter-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Youtube" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="youtube-square" className="password_icon"/> */}
                          {/* </div> */}
                          {/* <div className="form-group"> */}
                          {/* <input type="text" placeholder="Google plus" className="form-control float-label"  /> */}
                          {/* <FontAwesome name="google-plus-square" className="password_icon"/> */}
                          {/* </div> */}
                          <div className="ml_btn" style={{ textAlign: 'center' }}>
                            <a className="save_btn" onClick={this.onSaveTeamAction}>Save</a>
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
}
MlFunderPrincipalTeam.contextTypes = {
  funderPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
