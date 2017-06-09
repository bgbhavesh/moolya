import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
import {findStartupManagementActionHandler} from '../../../actions/findPortfolioStartupDetails'
import {multipartASyncFormHandler} from '../../../../../../commons/MlMultipartFormAction'
import _ from 'lodash';
import Datetime from "react-datetime";
import moment from "moment";
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

export default class MlStartupManagement extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupManagement:[],
      startupManagementList:[],
      // indexArray:[],
      selectedIndex:-1,
      // arrIndex:"",
      managementIndex:""
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.addManagement.bind(this);
    this.onSelectUser.bind(this);
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    $('#testing').click(function(){
      $('#management-form').slideDown();
    });
  }
  componentDidUpdate()
  {
    initalizeFloatLabel();
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
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
    // let indexes = this.state.indexArray;
    // let indexArray = _.cloneDeep(indexes)
    // indexArray.push(index);
    // indexArray = _.uniq(indexArray);
    // this.setState({indexArray: indexArray})
  }

  onClick(field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })

  }
  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.management)
    if(empty){
      const response = await findStartupManagementActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, startupManagement: response, startupManagementList: response});
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

  sendDataToParent(){
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
      newItem = _.omit(item, "__typename")
      if(item && item.logo){
        // delete item.logo['__typename'];
        newItem = _.omit(item, 'logo')
      }
      managementArr.push(newItem)
    })
    startupManagement = managementArr;
    // startupManagement=_.extend(startupManagement[this.state.arrIndex],data);
    this.setState({startupManagement:startupManagement})
    // let indexArray = this.state.indexArray;
    this.props.getManagementDetails(startupManagement)
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{management:[{logo:{fileUrl:'', fileName : fileName}, index:this.state.selectedIndex}]}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
      }
    }
  }
  async fetchOnlyImages(){
    const response = await findStartupManagementActionHandler(this.props.portfolioDetailsId);
    if (response) {
      let thisState=this.state.selectedIndex;
      let dataDetails =this.state.startupManagement
      let cloneBackUp = _.cloneDeep(dataDetails);
      let specificData = cloneBackUp[thisState];
      if(specificData){
        let curUpload=response[thisState]
        specificData['logo']= curUpload['logo']
        this.setState({loading: false, startupManagement:cloneBackUp, data: specificData}, function () {
          $('#management-form').slideDown();
        });
      }else {
        this.setState({loading: false})
      }
    }
  }

  render(){
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
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
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
                    return (
                      <div className="col-lg-2 col-md-3 col-sm-3" key={index}>
                          <div className="list_block notrans" onClick={that.onSelectUser.bind(that, index)}>
                            <div className="hex_outer"><img src={user.logo ? user.logo.fileUrl : "/images/def_profile.png"}/></div>
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
                        <div className="form-group">
                          <input type="text" placeholder="Title" name="title" className="form-control float-label" defaultValue={this.state.data.title} id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isTitlePrivate" onClick={this.onClick.bind(this, "isTitlePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isTitlePrivate}/>
                        </div>

                        <div className="form-group">
                        <input type="text" placeholder="First Name" name="firstName" defaultValue={this.state.data.firstName} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate" onClick={this.onClick.bind(this, "isFirstNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isFirstNamePrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Middle Name" name="middleName" defaultValue={this.state.data.middleName} className="form-control float-label" id="cluster_name"  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isMiddleNamePrivate" onClick={this.onClick.bind(this, "isMiddleNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isMiddleNamePrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Last Name" name="lastName" defaultValue={this.state.data.lastName} className="form-control float-label" id="cluster_name"  onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate" onClick={this.onClick.bind(this, "isLastNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isLastNamePrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Designation" name="designation" defaultValue={this.state.data.designation} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate" onClick={this.onClick.bind(this, "isDesignationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDesignationPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Year of Experience" name="yearsOfExperience" defaultValue={this.state.data.yearsOfExperience} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isYOFPrivate" onClick={this.onClick.bind(this, "isYOFPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isYOFPrivate}/>
                        </div>

                        <div className="form-group date-pick-wrap">
                          {/*<input type="text" placeholder="Joining Date to this Company" name="joiningDate" defaultValue={this.state.data.joiningDate} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>*/}
                          <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                    inputProps={{placeholder: "Joining Date to this Company"}}
                                    closeOnSelect={true} value={this.state.data.joiningDate}
                                    onChange={this.onDateChange.bind(this, "joiningDate")}  isValidDate={ valid }/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isJoiningDatePrivate" onClick={this.onClick.bind(this, "isJoiningDatePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isJoiningDatePrivate}/>
                        </div>

                        <div className="form-group date-pick-wrap">
                          {/*<input type="text" placeholder="First Job Joining Date" name="firstJobJoiningDate" defaultValue={this.state.data.firstJobJoiningDate} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>*/}
                          <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}
                                    inputProps={{placeholder: "First Job Joining Date"}}
                                    closeOnSelect={true} value={this.state.data.firstJobJoiningDate}
                                    onChange={this.onDateChange.bind(this, "firstJobJoiningDate")}  isValidDate={ valid }/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isFJJDPrivate" onClick={this.onClick.bind(this, "isFJJDPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isFJJDPrivate}/>
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
                            <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                          </div>
                          <div className="previewImg ProfileImg">
                            <img src={this.state.data && this.state.data.logo && this.state.data.logo.fileUrl?this.state.data.logo.fileUrl:""}/>
                          </div>
                        </div>


                        <br className="brclear"/>

                        <div className="form-group">
                          <input type="text" placeholder="Qualification" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "isQualificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isQualificationPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Certification" name="certification" defaultValue={this.state.data.certification} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isCertificationPrivate" onClick={this.onClick.bind(this, "isCertificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isCertificationPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Universities" name="universities" defaultValue={this.state.data.universities} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isUniversitiesPrivate" onClick={this.onClick.bind(this, "isUniversitiesPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isUniversitiesPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Awards" name="awards" defaultValue={this.state.data.awards} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isAwardsPrivate" onClick={this.onClick.bind(this, "isAwardsPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isAwardsPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Linkdin URL" name="linkedInUrl" defaultValue={this.state.data.linkedInUrl} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isLinkedInUrlPrivate" onClick={this.onClick.bind(this, "isLinkedInUrlPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isLinkedInUrlPrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="About" name="about" defaultValue={this.state.data.about} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrivate" onClick={this.onClick.bind(this, "isAboutPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isAboutPrivate}/>
                        </div>


                      </form>
                    </div>

                  </div>
                  <br className="brclear"/>
                </div>
            </ScrollArea>
          </div>
      </div>)}
      </div>
    )
  }
};
MlStartupManagement.contextTypes = {
  startupPortfolio: PropTypes.object
};
