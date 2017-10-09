import React, { Component, PropTypes }  from "react";
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import gql from 'graphql-tag'
import Datetime from "react-datetime";
import _ from 'lodash';
import moment from "moment";
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../../utils/formElemUtil';
import {putDataIntoTheLibrary} from '../../../../../../commons/actions/mlLibraryActionHandler'
import {fetchStartupDetailsHandler} from '../../../actions/findPortfolioStartupDetails'
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import MlLoader from '../../../../../../commons/components/loader/loader'
import Moolyaselect from  '../../../../../commons/components/MlAdminSelectWrapper'
import {fetchPortfolioActionHandler} from '../../../actions/findClusterIdForPortfolio';
import CropperModal from '../../../../../../commons/components/cropperModal';
import {mlFieldValidations} from "../../../../../../commons/validations/mlfieldValidation";

const genderValues = [
  {value: 'male', label: 'Male'},
  {value: 'female', label: 'Female'},
  {value: 'others', label: 'Others'}
];
const KEY = 'management';

export default class MlStartupManagement extends Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      privateKey:{}
,      startupManagement:[],
      startupManagementList:[],
      // indexArray:[],
      selectedIndex:-1,
      title:'',
      clusterId:'',
      // arrIndex:"",
      managementIndex:"",
      responseImage:"",
      showProfileModal: false,
      uploadingAvatar: false,
    }
    this.tabName = this.props.tabName || ""
    this.onClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.addManagement.bind(this);
    this.onSelectUser.bind(this);
    this.imagesDisplay.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.libraryAction.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.onLogoFileUpload = this.onLogoFileUpload.bind(this);
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    $('#testing').click(function(){
      $('#management-form').slideDown();
    });
    this.imagesDisplay()

  }
  componentDidUpdate()
  {
    initalizeFloatLabel();
    OnLockSwitch();
    dataVisibilityHandler();

    var className = this.props.isAdmin?"admin_header":"app_header"
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+120));
    if(WinWidth > 768){
      $(".main_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
    this.fetchClusterId();
  }
  addManagement(){
    this.setState({loading:true})
    if(this.state.startupManagement){
      this.setState({selectedIndex:this.state.startupManagement.length})
    }else{
      this.setState({selectedIndex:0})
    }
    this.setState({data:{}}, function () {
      this.setState({loading:false}, function () {
        $('#management-form').slideDown();
      })
    })
    // this.setState({data:{}})
    // $('#management-form').slideDown();
  }
  onSelectUser(index, e){
    this.setState({loading:true})
    let managmentDetails = this.state.startupManagement[index]
    managmentDetails = _.omit(managmentDetails, "__typename");
    this.setState({selectedIndex:index});
    this.setState({data:managmentDetails}, function () {
      this.setState({loading:false}, function () {
        $('#management-form').slideDown();
      })
    })
    setTimeout(function () {
      _.each(managmentDetails.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }
  optionsBySelectTitle(val){
    let data = _.cloneDeep(this.state.data);
    data.title=val;
    this.setState({data:data}, function () {
      this.sendDataToParent();
    })
  }
  optionsBySelectGender(val) {
    var dataDetails = this.state.data
    dataDetails['gender'] = val.value
    this.setState({data: dataDetails}, function () {
      this.sendDataToParent();
    })
  }


  async fetchClusterId() {
    const response = await fetchPortfolioActionHandler(this.props.portfolioDetailsId);
    if (response) {
      this.setState({loading: false, clusterId: response.clusterId});
    }
  }
  onClick(fieldName, field, e){
    var isPrivate = false
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true;
    }else{
      details=_.extend(details,{[key]:false});
    }


    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate, index:this.state.selectedIndex, tabName:KEY}
    this.setState({privateKey:privateKey})

    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  handleYearsOfExperience(value) {
    let blankSpace = value.indexOf(' ') >= 0;
    let experience = parseInt(value);
    let valuesArray = value.split(".");
    let decimalExperience = valuesArray.length > 0 ?  valuesArray[0] : "";
    if(decimalExperience) {
      experience = parseInt(decimalExperience);
      if(experience > 75){
        toastr.error('Experience cannot be more than 75 years')
        return false;
      }
    }
    if(blankSpace) {
      toastr.error('Blank spaces are not allowed')
      return false;
    } else if(experience > 75 ) {
      toastr.error('Experience cannot be more than 75 years')
      return false;
    } else if (!experience) {
      toastr.error('Experience not valid')
      return false
    } else {return true}
  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    let validExperience;
    if(name === "yearsOfExperience") {
      validExperience = this.handleYearsOfExperience(e.target.value)
      if(validExperience) {
        details = _.omit(details, [name]);
        details = _.extend(details, {[name]: e.target.value});
        this.setState({data: details}, function () {
          this.sendDataToParent()
        })
      }
    } else {
      details = _.omit(details, [name]);
      details = _.extend(details, {[name]: e.target.value});
      this.setState({data: details}, function () {
        this.sendDataToParent()
      })
    }
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.management)
    if(empty){
      const response = await fetchStartupDetailsHandler(portfoliodetailsId, KEY);
      if (response && response.management) {
        this.setState({loading: false, startupManagement: response.management, startupManagementList: response.management});
        this.fetchOnlyImages()

      }else{
        this.setState({loading:false})
      }
    }else{
      this.setState({loading: false, startupManagement: that.context.startupPortfolio.management, startupManagementList:that.context.startupPortfolio.management});
    }
  }
  onDateChange(name, event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      let details =this.state.data;
      details=_.omit(details,[name]);
      details=_.extend(details,{[name]:value});
      this.setState({data:details}, function () {
        this.sendDataToParent()
      })
    }
  }

  getFieldValidations() {
    const ret = mlFieldValidations(this.refs);
    return {tabName: this.tabName, errorMessage: ret, index: this.state.selectedIndex}
  }

  sendDataToParent(){
    const requiredFields = this.getFieldValidations();
    let data = this.state.data;
    let startupManagement1 = this.state.startupManagement;
    let startupManagement = _.cloneDeep(startupManagement1);
    data.index = this.state.selectedIndex;
    startupManagement[this.state.selectedIndex] = data;
    let managementArr = [];
    _.each(startupManagement, function (item) {
      for (var propName in item) {
        if (item[propName] === null || item[propName] === undefined) {
          delete item[propName];
        }
      }
      let newItem = _.omit(item, "__typename")
      newItem = _.omit(newItem, "privateFields")
      if(newItem && newItem.logo){
        // delete item.logo['__typename'];
        newItem = _.omit(newItem, 'logo')
      }
      managementArr.push(newItem)
    })
    startupManagement = managementArr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupManagement:startupManagement})
    // let indexArray = this.state.indexArray;
    this.props.getManagementDetails(startupManagement, this.state.privateKey, requiredFields)
  }
  onLogoFileUpload(image,fileInfo){
    // if(e.target.files[0].length ==  0)
    //   return;
    // let file = e.target.files[0];
    // let name = e.target.name;
    // let fileName = e.target.files[0].name;
    let file=image;
    let name = 'logo';
    let fileName = fileInfo.name;
    if(file){
      let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{management:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
      let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, file));
    }else{
      this.setState({
        uploadingAvatar: false,
      });
    }
  }
  onFileUploadCallBack(name,file, resp){
    let that = this;
    let details =this.state.data;
    this.setState({
      uploadingAvatar: false,
      showProfileModal: false
    });
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
      var temp = $.parseJSON(resp).result;
      details=_.omit(details,[name]);
      details=_.extend(details,{[name]:{fileName: file.fileName,fileUrl: temp}});
      that.setState({data: details,responseImage: temp}, function () {
        that.sendDataToParent()
        that.imagesDisplay()
      })
      // if(result.success){
      //   that.setState({loading:true})
      //   that.fetchOnlyImages();
      // }
    }
  }


  async libraryAction(file) {
    let portfolioDetailsId = this.props.portfolioDetailsId;
    const resp = await putDataIntoTheLibrary(portfolioDetailsId ,file, this.props.client)
    return resp;
  }


  async fetchOnlyImages(){
    const response = await fetchStartupDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response) {
      this.setState({loading:false})
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.startupManagement
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response[thisState]
        specificData['logo']= curUpload['logo']?curUpload['logo']: " "
        this.setState({loading: false, startupManagement:cloneBackUp, data: specificData}, function () {
          $('#management-form').slideDown();
        });
      }else {
        this.setState({loading: false})
      }
    }
  }

  async imagesDisplay(){
    const response = await fetchStartupDetailsHandler(this.props.portfolioDetailsId, KEY);
    if (response) {
      let detailsArray = response.management?response.management:[]
      let dataDetails =this.state.startupManagement
      let cloneBackUp = _.cloneDeep(dataDetails);
      _.each(detailsArray, function (obj,key) {
        cloneBackUp[key]["logo"] = obj.logo;
      })
      // listDetails = this.state.startupManagementList || [];
      let listDetails = cloneBackUp || [];
      let cloneBackUpList = _.cloneDeep(listDetails);
      this.setState({loading: false, startupManagement:cloneBackUp,startupManagementList:cloneBackUpList});
    }
  }

  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal
    });
  }
  handleUploadAvatar(image,e) {
    this.setState({
      uploadingAvatar: true,
    });
    this.onLogoFileUpload(image,e);
  }

  render(){
    let titlequery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let titleOption={options: { variables: {type : "TITLE",hierarchyRefId:this.state.clusterId}}};
    var yesterday = Datetime.moment().subtract(0,'day');
    var valid = function( current ){
      return current.isBefore( yesterday );
    };
    let that = this;
    const showLoader = that.state.loading;
    let managementArr = that.state.startupManagementList || [];

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
                  {managementArr.map(function (user, index) {
                    let genderImage = user.gender==='female'?"/images/female.jpg":"/images/def_profile.png";
                    return (
                      <div className="col-lg-2 col-md-3 col-sm-3" key={index}>
                        <div className="list_block" onClick={that.onSelectUser.bind(that, index)}>
                          <div className="hex_outer"><img src={user.logo ? user.logo.fileUrl : genderImage} className="p_image"/></div>
                          <h3>{user.firstName?user.firstName:""}</h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div id="management-form" className=" management-form-wrap" style={{'display':'none'}}>

                <div className="col-md-6 nopadding-left">
                  <div className="form_bg">
                    <form>
                      {/*<div className="form-group">*/}
                      {/*<input type="text" placeholder="Title" name="title" className="form-control float-label" defaultValue={this.state.data.title}  onBlur={this.handleBlur}/>*/}
                      {/*<FontAwesome name='unlock' className="input_icon un_lock" id="isTitlePrivate" onClick={this.onClick.bind(this, "isTitlePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isTitlePrivate}/>*/}
                      {/*</div>*/}
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} placeholder="Title" className="form-control float-label" valueKey={'value'} labelKey={'label'}
                                      selectedValue={this.state.data.title} queryType={"graphql"} query={titlequery}  queryOptions={titleOption}
                                      onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true}/>

                      </div>
                      <div className="form-group mandatory">
                        <input type="text" placeholder="First Name" name="firstName"
                               defaultValue={this.state.data.firstName} className="form-control float-label"
                               onBlur={this.handleBlur} ref={"firstName"} data-required={true}
                               data-errMsg="First Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate" onClick={this.onClick.bind(this, "firstName", "isFirstNamePrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Middle Name" name="middleName" defaultValue={this.state.data.middleName} className="form-control float-label"   onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isMiddleNamePrivate" onClick={this.onClick.bind(this, "middleName", "isMiddleNamePrivate")}/>
                      </div>

                      <div className="form-group mandatory">
                        <input type="text" placeholder="Last Name" name="lastName"
                               defaultValue={this.state.data.lastName} className="form-control float-label"
                               onBlur={this.handleBlur} ref={"lastName"} data-required={true}
                               data-errMsg="Last Name is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate" onClick={this.onClick.bind(this, "lastName", "isLastNamePrivate")}/>
                      </div>

                      {/*<div className="form-group">*/}
                        {/*<input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label"  onBlur={this.handleBlur}/>*/}
                        {/*<FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "gender", "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>*/}
                      {/*</div>*/}
                      <div className="form-group mandatory">
                        <Select name="form-field-name" placeholder="Select Gender" value={this.state.data.gender}
                                options={genderValues} onChange={this.optionsBySelectGender.bind(this)}
                                className="float-label" ref={"gender"} data-required={true}
                                data-errMsg="Gender is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "gender", "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>
                      </div>

                      <div className="form-group mandatory">
                        <input type="text" placeholder="Designation" name="designation"
                               defaultValue={this.state.data.designation} className="form-control float-label"
                               onBlur={this.handleBlur} ref={"designation"} data-required={true}
                               data-errMsg="Designation is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate" onClick={this.onClick.bind(this, "designation", "isDesignationPrivate")}/>
                      </div>

                      <div className="form-group mandatory">
                        <input type="text" placeholder="Year of Experience" name="yearsOfExperience"
                               defaultValue={this.state.data.yearsOfExperience} className="form-control float-label"
                               onBlur={this.handleBlur} ref={"yearsOfExperience"} data-required={true}
                               data-errMsg="Year of Experience is required"/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isYOFPrivate" onClick={this.onClick.bind(this, "yearsOfExperience", "isYOFPrivate")}/>
                      </div>

                      <div className="form-group date-pick-wrap">
                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                  inputProps={{placeholder: "Joining Date to this Company",className:"float-label form-control",readOnly:true}}
                                  closeOnSelect={true} value={this.state.data.joiningDate}
                                  onChange={this.onDateChange.bind(this, "joiningDate")}  isValidDate={ valid }/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isJoiningDatePrivate" onClick={this.onClick.bind(this, "joiningDate", "isJoiningDatePrivate")}/>
                      </div>

                      <div className="form-group date-pick-wrap">
                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                  inputProps={{placeholder: "First Job Joining Date",className:"float-label form-control",readOnly:true}}
                                  closeOnSelect={true} value={this.state.data.firstJobJoiningDate}
                                  onChange={this.onDateChange.bind(this, "firstJobJoiningDate")}  isValidDate={ valid }/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFJJDPrivate" onClick={this.onClick.bind(this, "firstJobJoiningDate", "isFJJDPrivate")}/>
                      </div>
                    </form>
                  </div>


                </div>
                <div className="col-md-6 nopadding-right">


                  <div className="form_bg">
                    <form>
                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span onClick={this.toggleModal.bind(this)}>Upload Icon</span>
                          {/*<input type="file" name="logo" id="logo" className="upload"  accept="image/!*" onChange={this.onLogoFileUpload.bind(this)}  />*/}
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src={this.state.data && this.state.data.logo?this.state.data.logo.fileUrl:this.state.responseImage?this.state.responseImage:" "}/>
                        </div>
                      </div>
                      <br className="brclear"/>
                      <div className="form-group">
                        <input type="text" placeholder="Qualification" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "qualification", "isQualificationPrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Certification" name="certification" defaultValue={this.state.data.certification} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isCertificationPrivate" onClick={this.onClick.bind(this, "certification", "isCertificationPrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Universities" name="universities" defaultValue={this.state.data.universities} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isUniversitiesPrivate" onClick={this.onClick.bind(this, "universities", "isUniversitiesPrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Awards" name="awards" defaultValue={this.state.data.awards} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAwardsPrivate" onClick={this.onClick.bind(this, "awards", "isAwardsPrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Linkdin URL" name="linkedInUrl" defaultValue={this.state.data.linkedInUrl} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLinkedInUrlPrivate" onClick={this.onClick.bind(this, "linkedInUrl", "isLinkedInUrlPrivate")}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="About" name="managmentAbout" defaultValue={this.state.data.managmentAbout} className="form-control float-label"  onBlur={this.handleBlur}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrivate" onClick={this.onClick.bind(this, "managmentAbout", "isAboutPrivate")}/>
                      </div>


                    </form>
                  </div>

                </div>
                <CropperModal
                  uploadingImage={this.state.uploadingAvatar}
                  handleImageUpload={this.handleUploadAvatar}
                  cropperStyle="square"
                  show={this.state.showProfileModal}
                  toggleShow={this.toggleModal}
                />
                <br className="brclear"/>
              </div>
            </div>
          </div>)}
      </div>
    )
  }
};
MlStartupManagement.contextTypes = {
  startupPortfolio: PropTypes.object
};
