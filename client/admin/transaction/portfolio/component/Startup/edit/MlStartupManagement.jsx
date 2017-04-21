import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
// import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlStartupManagement extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{},
      startupManagement:[],
      arrIndex:"",
      managementIndex:""
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.saveManagementDetails.bind(this);
    this.addManagement.bind(this);
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
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  saveManagementDetails(){
    // let data = this.state.data;
    // this.sendDataToParent()
    // // $('#management-form').slideUp();
    // this.setState({loading: false})
  }
  addManagement(){
    if(this.context.startupPortfolio && this.context.startupPortfolio.management){
      this.setState({arrIndex:this.context.startupPortfolio.management.length})
    }else{
      this.setState({arrIndex:0})
    }
    // this.setState({loading: false, data:{}})
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
  //   let that = this;
  //   let portfoliodetailsId=that.props.portfolioDetailsId;
  //   let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.portfolioIdeatorDetails)
  //   if(empty){
  //     const response = await findIdeatorDetailsActionHandler(portfoliodetailsId);
  //     if (response) {
  //       this.setState({loading: false, data: response});
  //     }
  //   }else{
  //     this.setState({loading: false, data: that.context.ideatorPortfolio.portfolioIdeatorDetails});
  //   }
  //
    this.setState({loading: false})
  }

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    let startupManagement = this.state.startupManagement;
    startupManagement[this.state.arrIndex] = data;
    this.setState({startupManagement:startupManagement}, function () {
      this.props.getManagementDetails(startupManagement)
    })
  }
  render(){
    const showLoader = this.state.loading;
    let managementArr =  [];
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap">
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
                    <a href="#" id="testing">
                      <div className="list_block notrans" onClick={this.addManagement.bind(this)}>
                        <div className="hex_outer"><span className="ml ml-plus "></span></div>
                        <h3>Add New</h3>
                      </div>
                    </a>
                  </div>
                  {managementArr.map(function (user) {
                    return (
                      <div className="col-lg-2 col-md-3 col-sm-3">
                        <a href="#">
                          <div className="list_block notrans">
                            <div className="hex_outer"><span className="ml ml-plus "></span></div>
                            <h3>{user.firstName}</h3>
                          </div>
                        </a>
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

                        <div className="form-group">
                          <input type="text" placeholder="Joining Date to this Company" name="joiningDate" defaultValue={this.state.data.joiningDate} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isJoiningDatePrivate" onClick={this.onClick.bind(this, "isJoiningDatePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isJoiningDatePrivate}/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="First Job Joining Date" name="firstJobJoiningDate" defaultValue={this.state.data.firstJobJoiningDate} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
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
                            <input type="file" className="upload" />
                          </div>
                          <div className="previewImg ProfileImg">
                            <img src="/images/ideator_01.png"/>
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
                  <input type="Submit" value="save" onClick={this.saveManagementDetails.bind(this)}/>
                </div>

            </ScrollArea>
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
