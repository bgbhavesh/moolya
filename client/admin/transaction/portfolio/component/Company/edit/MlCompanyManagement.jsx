import React, { Component, PropTypes } from 'react';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
import Datetime from 'react-datetime';
import moment from 'moment';
import gql from 'graphql-tag'
const Select = require('react-select');
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel } from '../../../../../utils/formElemUtil';
import { putDataIntoTheLibrary } from '../../../../../../commons/actions/mlLibraryActionHandler'
import { fetchCompanyDetailsHandler } from '../../../actions/findCompanyPortfolioDetails';
import { multipartASyncFormHandler } from '../../../../../../commons/MlMultipartFormAction'
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from '../../../../../commons/components/MlAdminSelectWrapper'
import { fetchPortfolioActionHandler } from '../../../actions/findClusterIdForPortfolio';
import CropperModal from '../../../../../../commons/components/cropperModal';
import { mlFieldValidations } from '../../../../../../commons/validations/mlfieldValidation';
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';
import Confirm from '../../../../../../commons/utils/confirm';
const KEY = 'management'

const genderValues = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' }
];
export default class MlCompanyManagement extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {},
      management: [],
      managementList: [],
      selectedIndex: -1,
      managementIndex: '',
      responseImage: '',
      title: '',
      clusterId: '',
      fileName: '',
      uploadingAvatar: false,
      showProfileModal: false
    }
    this.tabName = this.props.tabName || ''
    this.curSelectLogo = {};
    this.onSaveAction = this.onSaveAction.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onClick.bind(this);
    this.addManagement.bind(this);
    this.onSelectUser.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.libraryAction.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

    const WinWidth = $(window).width();
    const WinHeight = $(window).height();

    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 120));
    if (WinWidth > 768) {
      $('.tab_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }
  componentWillMount() {
    this.fetchPortfolioDetails();
    this.fetchClusterIdByPortfolio();
  }

  addManagement() {
    this.setState({ loading: true })
    if (this.state.management) {
      this.setState({ selectedIndex: this.state.management.length })
    } else {
      this.setState({ selectedIndex: 0 })
    }
    this.setState({ data: {} }, function () {
      this.setState({ loading: false }, () => {
        $('#management-form').slideDown();
      })
    })
  }

  onSelectUser(index, e) {
    this.setState({ loading: true })
    let managmentDetails = this.state.management[index]
    managmentDetails = _.omit(managmentDetails, '__typename');
    this.curSelectLogo = managmentDetails.logo
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
  }

  optionsBySelectTitle(val) {
    const data = _.cloneDeep(this.state.data);
    data.title = val;
    this.setState({ data }, () => {
      // this.sendDataToParent();
    })
  }
  optionsBySelectGender(val) {
    const dataDetails = this.state.data
    dataDetails.gender = val.value
    this.setState({ data: dataDetails }, () => {
      // this.sendDataToParent();
    })
  }

  async fetchClusterIdByPortfolio() {
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
        toastr.error("'Years of Experience' cannot be more than 75 years")
        return false;
      }
    }
    if (blankSpace) {
      toastr.error('Blank spaces are not allowed')
      return false;
    } else if (experience > 75) {
      toastr.error("'Years of Experience' cannot be more than 75 years")
      return false;
    } else if (!experience) {
      toastr.error("Years of Experience' value is invalid")
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
    const empty = _.isEmpty(that.context.companyPortfolio && that.context.companyPortfolio.management)
    if (empty) {
      const response = await fetchCompanyDetailsHandler(portfoliodetailsId, KEY);
      if (response && response.management) {
        this.setState({ loading: false, management: response.management, managementList: response.management });
        // this.fetchOnlyImages()
      } else {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false, management: that.context.companyPortfolio.management, managementList: that.context.companyPortfolio.management });
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
    let setObject = this.state.managementList
    if (this.context && this.context.companyPortfolio && this.context.companyPortfolio.management) {
      setObject = this.context.companyPortfolio.management
    }
    this.setState({ managementList: setObject }, () => {
      $('#management-form').slideUp();
    })
    this.curSelectLogo = {};
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return { tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex }
  }

  sendDataToParent(isSaveClicked) {
    const data = this.state.data;
    const management1 = this.state.management;
    let management = _.cloneDeep(management1);
    data.index = this.state.selectedIndex;
    data.logo = this.curSelectLogo;
    if (isSaveClicked) {
      management[this.state.selectedIndex] = data;
    }
    const managementArr = [];
    _.each(management, (item) => {
      for (const propName in item) {
        if (item[propName] === null || item[propName] === undefined || propName === 'privateFields' || propName === '__typename') {
          delete item[propName];
        }
      }
      const newItem = _.omit(item, '__typename')
      const newItemValue = _.omit(newItem, 'privateFields')
      managementArr.push(newItemValue)
    })
    management = managementArr;
    this.setState({ management })
    this.props.getManagementDetails(management, this.state.privateKey)
  }

  onLogoFileUpload(image, fileInfo) {
    const file = image;
    const name = 'logo';
    // let fileName = this.state.fileName;
    const fileName = fileInfo && fileInfo.name ? fileInfo.name : 'fileName';
    const data = {
      moduleName: 'PORTFOLIO', actionName: 'UPLOAD', portfolioDetailsId: this.props.portfolioDetailsId, portfolio: { management: [{ logo: { fileUrl: '', fileName }, index: this.state.selectedIndex }] }
    };
    const response = multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, name, file));
  }
  onFileUploadCallBack(name, file, resp) {
    const that = this;
    let details = this.state.data;
    if (resp) {
      const result = JSON.parse(resp);

      Confirm('', 'Do you want to add the file into the library', 'Ok', 'Cancel', (ifConfirm) => {
        if (ifConfirm) {
          const fileObjectStructure = {
            fileName: this.state.fileName,
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
      };
      const temp = $.parseJSON(resp).result;
      details = _.omit(details, [name]);
      details = _.extend(details, { [name]: { fileName: file.fileName, fileUrl: temp } });
      that.setState({ data: details, responseImage: temp }, () => {
        // that.sendDataToParent()
      })
      // if(result.success){
      //   that.setState({loading:true})
      //   that.fetchOnlyImages();
      // }
      this.toggleModal();
      this.setState({ uploadingAvatar: false })
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


  // async fetchOnlyImages() {
  //   const response = await fetchCompanyDetailsHandler(this.props.portfolioDetailsId, KEY);
  //   if (response) {
  //     this.setState({ loading: false })
  //     let thisState = this.state.selectedIndex;
  //     let dataDetails = this.state.management
  //     let cloneBackUp = _.cloneDeep(dataDetails);
  //     let specificData = cloneBackUp[thisState];
  //     if (specificData) {
  //       let curUpload = response.management[thisState]
  //       specificData['logo'] = curUpload['logo'] ? curUpload['logo'] : " "
  //       this.setState({ loading: false, management: cloneBackUp, data: specificData }, function () {
  //         $('#management-form').slideDown();
  //       });
  //     } else {
  //       this.setState({ loading: false })
  //     }
  //   }
  // }

  handleUploadAvatar(image, file) {
    this.setState({
      // uploadingAvatar: true,,
    });
    this.setState({ fileName: file.name })
    this.onLogoFileUpload(image, file);
  }

  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal
    });
  }

  render() {
    let genderActive = ''
    if (this.state.gender) {
      genderActive = 'active'
    }
    const titlequery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    const titleOption = { options: { variables: { type: 'TITLE', hierarchyRefId: this.state.clusterId } } };
    const yesterday = Datetime.moment().subtract(0, 'day');
    const valid = function (current) {
      return current.isBefore(yesterday);
    };
    const that = this;
    const showLoader = that.state.loading;
    const managementArr = that.state.managementList || [];
    const genderImage = this.state.data && this.state.data.gender === 'female' ? '/images/female.jpg' : '/images/def_profile.png';

    return (
      <div>
        {showLoader === true ? (<MlLoader />) : (
          <div>
            <h2>Management</h2>
            <div className="tab_wrap_scroll">

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
                      <div className="list_block notrans" onClick={that.onSelectUser.bind(that, index)}>
                        <div className="hex_outer"><img src={user.logo && user.logo.fileUrl ? generateAbsolutePath(user.logo.fileUrl) : genderImage} /></div>
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
                          onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true} />

                      </div>
                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="First Name" name="firstName"
                          defaultValue={this.state.data.firstName} className="form-control float-label"
                          onBlur={this.handleBlur} ref={'firstName'} data-required={true}
                          data-errMsg="First Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate" onClick={this.onClick.bind(this, 'firstName', 'isFirstNamePrivate')} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Middle Name" name="middleName" defaultValue={this.state.data.middleName} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isMiddleNamePrivate" onClick={this.onClick.bind(this, 'middleName', 'isMiddleNamePrivate')} />
                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Last Name" name="lastName"
                          defaultValue={this.state.data.lastName} className="form-control float-label"
                          onBlur={this.handleBlur} ref={'lastName'} data-required={true}
                          data-errMsg="Last Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate" onClick={this.onClick.bind(this, 'lastName', 'isLastNamePrivate')} />
                      </div>
                      <div className="form-group mandatory">
                        <span className={`placeHolder ${genderActive}`}>Gender</span>
                        <Select
                          name="form-field-name" placeholder="Select Gender" value={this.state.data.gender}
                          options={genderValues} onChange={this.optionsBySelectGender.bind(this)}
                          className="float-label" ref={'gender'} data-required={true}
                          data-errMsg="Gender is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, 'gender', 'isGenderPrivate')} />
                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Designation" name="designation"
                          defaultValue={this.state.data.designation} className="form-control float-label"
                          onBlur={this.handleBlur} ref={'designation'} data-required={true}
                          data-errMsg="Designation is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate" onClick={this.onClick.bind(this, 'designation', 'isDesignationPrivate')} />
                      </div>

                      <div className="form-group mandatory">
                        <input
                          type="text" placeholder="Year of Experience" name="yearsOfExperience"
                          defaultValue={this.state.data.yearsOfExperience} className="form-control float-label"
                          onBlur={this.handleBlur} ref={'yearsOfExperience'} data-required={true}
                          data-errMsg="Year of Experience is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isYOFPrivate" onClick={this.onClick.bind(this, 'yearsOfExperience', 'isYOFPrivate')} />
                      </div>

                      <div className="form-group date-pick-wrap">
                        <Datetime
                          dateFormat="DD-MM-YYYY" timeFormat={false}
                          inputProps={{ placeholder: 'Joining Date to this Company', readOnly: true }}
                          closeOnSelect={true} value={this.state.data.joiningDate}
                          onChange={this.onDateChange.bind(this, 'joiningDate')} isValidDate={valid} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isJoiningDatePrivate" onClick={this.onClick.bind(this, 'joiningDate', 'isJoiningDatePrivate')} />
                      </div>

                      <div className="form-group date-pick-wrap">
                        {/* <input type="text" placeholder="First Job Joining Date" name="firstJobJoiningDate" defaultValue={this.state.data.firstJobJoiningDate} className="form-control float-label"  onBlur={this.handleBlur}/> */}
                        <Datetime
                          dateFormat="DD-MM-YYYY" timeFormat={false}
                          inputProps={{ placeholder: 'First Job Joining Date', readOnly: true }}
                          closeOnSelect={true} value={this.state.data.firstJobJoiningDate}
                          onChange={this.onDateChange.bind(this, 'firstJobJoiningDate')} isValidDate={valid} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFJJDPrivate" onClick={this.onClick.bind(this, 'firstJobJoiningDate', 'isFJJDPrivate')} />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 nopadding-right">
                  <CropperModal
                    uploadingImage={this.state.uploadingAvatar}
                    handleImageUpload={this.handleUploadAvatar}
                    cropperStyle="any"
                    show={this.state.showProfileModal}
                    toggleShow={this.toggleModal}
                  />
                  <div className="form_bg">
                    <form>
                      <div className="form-group" onClick={this.toggleModal.bind(this)}>
                        <div className="fileUpload mlUpload_btn">
                          <span>Upload Icon</span>
                          {/* <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  /> */}
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src={this.state.data && this.state.data.logo ? generateAbsolutePath(this.state.data.logo.fileUrl) : this.state.responseImage ? generateAbsolutePath(this.state.responseImage) : ' '} />
                        </div>
                      </div>
                      <br className="brclear" />
                      <div className="form-group">
                        <input type="text" placeholder="Qualification" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, 'qualification', 'isQualificationPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isQualificationPrivate} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Certification" name="certification" defaultValue={this.state.data.certification} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isCertificationPrivate" onClick={this.onClick.bind(this, 'certification', 'isCertificationPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isCertificationPrivate} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Universities" name="universities" defaultValue={this.state.data.universities} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isUniversitiesPrivate" onClick={this.onClick.bind(this, 'universities', 'isUniversitiesPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isUniversitiesPrivate} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Awards" name="awards" defaultValue={this.state.data.awards} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAwardsPrivate" onClick={this.onClick.bind(this, 'awards', 'isAwardsPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isAwardsPrivate} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Linkdin URL" name="linkedInUrl" defaultValue={this.state.data.linkedInUrl} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLinkedInUrlPrivate" onClick={this.onClick.bind(this, 'linkedInUrl', 'isLinkedInUrlPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isLinkedInUrlPrivate} />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="About" name="about" defaultValue={this.state.data.about} className="form-control float-label" onBlur={this.handleBlur} />
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrivate" onClick={this.onClick.bind(this, 'about', 'isAboutPrivate')} /><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isAboutPrivate} />
                      </div>
                    </form>
                  </div>

                </div>
                <br className="brclear" />
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
MlCompanyManagement.contextTypes = {
  companyPortfolio: PropTypes.object
};
