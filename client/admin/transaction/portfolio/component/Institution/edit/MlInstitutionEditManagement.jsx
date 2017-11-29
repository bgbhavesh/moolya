import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag'
import moment from 'moment';
import _ from 'lodash';
import Datetime from 'react-datetime';
const Select = require('react-select');
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import { putDataIntoTheLibrary } from '../../../../../../commons/actions/mlLibraryActionHandler'
import { fetchInstitutionDetailsHandler } from '../../../actions/findPortfolioInstitutionDetails'
import { multipartASyncFormHandler } from '../../../../../../commons/MlMultipartFormAction'
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper'
import { fetchPortfolioActionHandler } from '../../../actions/findClusterIdForPortfolio'
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../commons/utils/confirm';

const KEY = 'management';
export default class MlInstitutionEditManagement extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      institutionManagement: [],
      institutionManagementList: [],
      selectedIndex: -1,
      title: '',
      clusterId: '',
      managementIndex: '',
      responseImage: '',
      gender: null
    };
    this.curSelectLogo = {}
    this.tabName = this.props.tabName || ''
    this.onSaveAction = this.onSaveAction.bind(this);
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.addManagement.bind(this);
    this.onSelectUser.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.libraryAction.bind(this);
    return this;
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    $('#testing').click(() => {
      $('#management-form').slideDown();
    });
  }
  componentDidUpdate() {
    initalizeFloatLabel();
    OnLockSwitch();
    dataVisibilityHandler();

    const className = this.props.isAdmin ? 'admin_header' : 'app_header'
    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    // $('.main_wrap_scroll').height(WinHeight-($('.admin_header').outerHeight(true)+120));
    $('.main_wrap_scroll').height(WinHeight - ($(`.${className}`).outerHeight(true) + 120));
    if (WinWidth > 768) {
      $('.main_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }
  componentWillMount() {
    this.fetchPortfolioDetails();
    this.fetchClusterId();
  }
  addManagement() {
    this.setState({ loading: true })
    if (this.state.institutionManagement) {
      this.setState({ selectedIndex: this.state.institutionManagement.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
    this.setState({ data: {} }, function () {
      this.setState({ loading: false }, () => {
        $('#management-form').slideDown();
      })
    })
    // this.setState({data:{}})
    // $('#management-form').slideDown();
  }
  onSelectUser(index, uiIndex, e) {
    this.setState({ loading: true })
    // let managmentDetails = this.state.institutionManagement[index]
    let managmentDetails = _.find(this.state.institutionManagement, { index });
    managmentDetails = _.omit(managmentDetails, '__typename');
    this.setState({ selectedIndex: index });
    this.setState({ data: managmentDetails }, function () {
      this.setState({ loading: false }, () => {
        $('#management-form').slideDown();
      })
    })
    setTimeout(() => {
      _.each(managmentDetails.privateFields, (pf) => {
        $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
    this.curSelectLogo = managmentDetails.logo
  }
  optionsBySelectTitle(val) {
    const data = _.cloneDeep(this.state.data);
    data.title = val;
    this.setState({ data }, () => {
      // this.sendDataToParent();
    })
  }
  async fetchClusterId() {
    const response = await fetchPortfolioActionHandler(this.props.portfolioDetailsId);
    if (response) {
      this.setState({ loading: false, clusterId: response.clusterId });
    }
  }

  onClick(fieldName, field, e) {
    let isPrivate = false
    const className = e.target.className;
    if (className.indexOf('fa-lock') != -1) {
      isPrivate = true;
    }
    const privateKey = {
      keyName: fieldName,
      booleanKey: field,
      isPrivate,
      index: this.state.selectedIndex,
      tabName: KEY
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
  async fetchPortfolioDetails() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const empty = _.isEmpty(that.context.institutionPortfolio && that.context.institutionPortfolio.management)
    if (empty) {
      const response = await fetchInstitutionDetailsHandler(portfoliodetailsId, KEY);
      if (response && response.management) {
        this.setState({ loading: false, institutionManagement: response.management, institutionManagementList: response.management });
        // this.fetchOnlyImages()
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false, institutionManagement: that.context.institutionPortfolio.management, institutionManagementList: that.context.institutionPortfolio.management });
    }
  }
  onDateChange(name, event) {
    if (event._d) {
      const value = moment(event._d).format('DD-MM-YYYY');
      let details = this.state.data;
      details = _.omit(details, [name]);
      details = _.extend(details, { [name]: value });
      this.setState({ data: details }, () => {
        // this.sendDataToParent()
      })
    }
  }

  onSaveAction() {
    const requiredFields = this.getFieldValidations();
    if (requiredFields && !requiredFields.errorMessage) {
      this.sendDataToParent(true)
    } else {
      toastr.error(requiredFields.errorMessage);
      return
    }
    let setObject = this.state.institutionManagementList
    if (this.context && this.context.institutionPortfolio && this.context.institutionPortfolio.management) {
      setObject = this.context.institutionPortfolio.management
    }
    this.setState({ institutionManagementList: setObject }, () => {
      $('#management-form').slideUp();
    })
    this.curSelectLogo = {}
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return { tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex }
  }
  getActualIndex(dataArray, checkIndex) {
    let response = _.findIndex(dataArray, { index: checkIndex });
    response = response >= 0 ? response : checkIndex;
    return response;
  }
  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const institutionManagement1 = this.state.institutionManagement;
    let institutionManagement = _.cloneDeep(institutionManagement1);
    data.index = this.state.selectedIndex;
    data.logo = this.curSelectLogo;
    if (isSaveClicked) {
      const actualIndex = this.getActualIndex(institutionManagement, this.state.selectedIndex);
      institutionManagement[actualIndex] = data;
    }
    const managementArr = [];
    _.each(institutionManagement, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined || propName === 'privateFields') {
          delete item[propName];
        }
      }
      item = _.omit(item, '__typename');
      const newItem = _.omit(item, 'privateFields');
      // if(item && item.logo){
      //   newItem = _.omit(item, 'logo')
      // }
      managementArr.push(newItem)
    })
    institutionManagement = managementArr;
    this.setState({ institutionManagement })
    this.props.getManagementDetails(institutionManagement, this.state.privateKey)
  }

  onLogoFileUpload(e) {
    if (e.target.files[0].length == 0) { return; }
    const file = e.target.files[0];
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { management: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }
  onFileUploadCallBack(name, file, resp) {
    const that = this;
    let details = this.state.data;
    if (resp) {
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

      this.curSelectLogo = {
        fileName: file && file.name ? file.name : '',
        fileUrl: result.result
      }
      const temp = $.parseJSON(resp).result;
      details = _.omit(details, [name]);
      details = _.extend(details, { [name]: { fileName: file.fileName, fileUrl: temp } });
      that.setState({ data: details, responseImage: temp }, () => {
        that.sendDataToParent()
      })
      // if(result.success){
      //   that.setState({loading:true})
      //   that.fetchOnlyImages();
      // }
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
    const response = await fetchInstitutionDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response) {
      this.setState({ loading: false })
      const thisState = this.state.selectedIndex;
      const dataDetails = this.state.institutionManagement
      const cloneBackUp = _.cloneDeep(dataDetails);
      const specificData = cloneBackUp[thisState];
      if (specificData) {
        const curUpload = response[thisState]
        specificData.logo = curUpload.logo ? curUpload.logo : ' '
        this.setState({ loading: false, institutionManagement: cloneBackUp, data: specificData }, () => {
          $('#management-form').slideDown();
        });
      } else {
        this.setState({ loading: false })
      }
    }
  }
  optionsBySelectGender(val) {
    this.setState({ gender: val.value })
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

    const genderValues = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'others', label: 'Others' }
    ];

    const yesterday = Datetime.moment().subtract(0, 'day');
    const valid = function (current) {
      return current.isBefore(yesterday);
    };
    const that = this;
    const showLoader = that.state.loading;
    const managementArr = that.state.institutionManagementList || [];
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div>
            <h2>Management</h2>
            <div className="main_wrap_scroll">

              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-sm-3">
                    <a href="" id="testing">
                      <div className="list_block notrans" onClick={this.addManagement.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3>Add New</h3>
                      </div>
                    </a>
                  </div>
                  {managementArr.map((user, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-3" key={index}>
                      <div className="list_block notrans" onClick={that.onSelectUser.bind(that, user.index, index)}>
                        <div className="hex_outer"><img src={user.logo ? generateAbsolutePath(user.logo.fileUrl) : '/images/def_profile.png'}/></div>
                        <h3>{user.firstName ? user.firstName : ''}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="management-form" className=" management-form-wrap" style={{ display: 'none' }}>
                <div className="col-md-6 nopadding-left">
                  <div className="form_bg">
                    <form>
                      <div className="form-group">
                        <Moolyaselect
                          multiSelect={false} placeholder="Title" className="form-control float-label" valueKey={'value'} labelKey={'label'}
                          selectedValue={this.state.data.title} queryType={'graphql'} query={titlequery} queryOptions={titleOption}
                          onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true}/>

                      </div>
                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="First Name" name="firstName"
                          defaultValue={this.state.data.firstName} className="form-control float-label"
                          onBlur={this.handleBlur.bind(this)} ref={'firstName'} data-required={true} data-errMsg="First Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate" onClick={this.onClick.bind(this, 'firstName', 'isFirstNamePrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Middle Name" name="middleName" defaultValue={this.state.data.middleName} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isMiddleNamePrivate" onClick={this.onClick.bind(this, 'middleName', 'isMiddleNamePrivate')}/>
                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Last Name" name="lastName"
                          defaultValue={this.state.data.lastName} className="form-control float-label"
                          onBlur={this.handleBlur.bind(this)} ref={'lastName'} data-required={true}
                          data-errMsg="Last Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate" onClick={this.onClick.bind(this, 'lastName', 'isLastNamePrivate')}/>
                      </div>
                      <div className="form-group mandatory">
                        <Select
                          name="form-field-name" ref={'gender'} placeholder="Select Gender"
                          value={this.state.gender} options={genderValues}
                          onChange={this.optionsBySelectGender.bind(this)} className="float-label"
                          data-required={true} data-errMsg="Gender is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, 'gender', 'isGenderPrivate')}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>

                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Designation" name="designation"
                          defaultValue={this.state.data.designation} className="form-control float-label"
                          onBlur={this.handleBlur.bind(this)} ref={'designation'} data-required={true}
                          data-errMsg="Designation is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate" onClick={this.onClick.bind(this, 'designation', 'isDesignationPrivate')}/>
                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Year of Experience" name="yearsOfExperience"
                          defaultValue={this.state.data.yearsOfExperience} className="form-control float-label"
                          onBlur={this.handleBlur.bind(this)} ref={'yearsOfExperience'} data-required={true}
                          data-errMsg="Year of Experience is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isYOFPrivate" onClick={this.onClick.bind(this, 'yearsOfExperience', 'isYOFPrivate')}/>
                      </div>

                      <div className="form-group date-pick-wrap">
                        {/* <input type="text" placeholder="Joining Date to this Company" name="joiningDate" defaultValue={this.state.data.joiningDate} className="form-control float-label"  onBlur={this.handleBlur.bind(this)}/> */}
                        <Datetime
                          dateFormat="DD-MM-YYYY" timeFormat={false}
                          inputProps={{ placeholder: 'Joining Date to this Company', readOnly: true }}
                          closeOnSelect={true} value={this.state.data.joiningDate}
                          onChange={this.onDateChange.bind(this, 'joiningDate')} isValidDate={ valid }/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isJoiningDatePrivate" onClick={this.onClick.bind(this, 'joiningDate', 'isJoiningDatePrivate')}/>
                      </div>

                      <div className="form-group date-pick-wrap">
                        {/* <input type="text" placeholder="First Job Joining Date" name="firstJobJoiningDate" defaultValue={this.state.data.firstJobJoiningDate} className="form-control float-label"  onBlur={this.handleBlur.bind(this)}/> */}
                        <Datetime
                          dateFormat="DD-MM-YYYY" timeFormat={false}
                          inputProps={{ placeholder: 'First Job Joining Date', readOnly: true }}
                          closeOnSelect={true} value={this.state.data.firstJobJoiningDate}
                          onChange={this.onDateChange.bind(this, 'firstJobJoiningDate')} isValidDate={ valid }/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFJJDPrivate" onClick={this.onClick.bind(this, 'firstJobJoiningDate', 'isFJJDPrivate')}/>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 nopadding-right">
                  <div className="form_bg">
                    <form>
                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Upload Icon</span>
                          <input type="file" name="logo" id="logo" className="upload" accept="image/*" onChange={this.onLogoFileUpload.bind(this)} />
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src={this.state.data && this.state.data.logo ? generateAbsolutePath(this.state.data.logo.fileUrl) : this.state.responseImage ? generateAbsolutePath(this.state.responseImage) : ' '}/>
                        </div>
                      </div>
                      <br className="brclear"/>
                      <div className="form-group">
                        <input type="text" placeholder="Qualification" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, 'qualification', 'isQualificationPrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Certification" name="certification" defaultValue={this.state.data.certification} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isCertificationPrivate" onClick={this.onClick.bind(this, 'certification', 'isCertificationPrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Universities" name="universities" defaultValue={this.state.data.universities} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isUniversitiesPrivate" onClick={this.onClick.bind(this, 'universities', 'isUniversitiesPrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Awards" name="awards" defaultValue={this.state.data.awards} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAwardsPrivate" onClick={this.onClick.bind(this, 'awards', 'isAwardsPrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Linkdin URL" name="linkedInUrl" defaultValue={this.state.data.linkedInUrl} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLinkedInUrlPrivate" onClick={this.onClick.bind(this, 'linkedInUrl', 'isLinkedInUrlPrivate')}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="About" name="managmentAbout" defaultValue={this.state.data.managmentAbout} className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrivate" onClick={this.onClick.bind(this, 'managmentAbout', 'isAboutPrivate')}/>
                      </div>
                    </form>
                  </div>
                </div>
                <br className="brclear"/>
                <div className="ml_btn text-center" style={{ textAlign: 'center' }}>
                  <a className="save_btn" onClick={this.onSaveAction}>Save</a>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    )
  }
}
MlInstitutionEditManagement.contextTypes = {
  institutionPortfolio: PropTypes.object
};
