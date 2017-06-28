import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import MlLoader from '../../../../../commons/components/loader/loader'
import _ from 'lodash';
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlIdeatorDetails extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
        loading: true,
        data:{},
      profilePic: " ",
      defaultProfilePic: "/images/def_profile.png"
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();

  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }
  componentWillMount(){
    this.fetchPortfolioDetails();

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
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.portfolioIdeatorDetails)
    if(empty){
      const response = await findIdeatorDetailsActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response,profilePic:response.profilePic});
      }
    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.portfolioIdeatorDetails});
    }

  }

  sendDataToParent(){
    let data = this.state.data;
      for (var propName in data) {
        if (data[propName] === null || data[propName] === undefined) {
          delete data[propName];
        }
      }
      this.props.getIdeatorDetails(data)
  }

  onFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    // let name = e.target.name;
    // let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO_PROFILE_IMG", actionName: "UPDATE", portfolioId:this.props.portfolioDetailsId,communityType:"IDE", portfolio:{portfolioIdeatorDetails:{profilePic:" "}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this));
  }
  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({profilePic:result.result})
        this.setState({loading:true})
        this.fetchPortfolioDetails();
      }
    }
  }
  render(){
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (

        <div>
          <h2>Ideator</h2>

          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>

                    <div className="form-group">
                      <input type="text" placeholder="First Name" name="firstName" defaultValue={this.state.data.firstName} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isfirstNamePrivate" onClick={this.onClick.bind(this, "isfirstNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isfirstNamePrivate}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" name="lastName" defaultValue={this.state.data.lastName} className="form-control float-label" id="cluster_name"  onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="islastNamePrivate" onClick={this.onClick.bind(this, "islastNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.islastNamePrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" disabled="true" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Education" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "isQualificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isQualificationPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employment Status" name="employmentStatus" defaultValue={this.state.data.employmentStatus} className="form-control float-label" disabled="true" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmploymentStatusPrivate" onClick={this.onClick.bind(this, "isEmploymentStatusPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmploymentStatusPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Professional Tag" name="professionalTag" defaultValue={this.state.data.professionalTag} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionalTagPrivate" onClick={this.onClick.bind(this, "isProfessionalTagPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isProfessionalTagPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Years of Experience" name="yearsofExperience" defaultValue={this.state.data.yearsofExperience} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isYoePrivate" onClick={this.onClick.bind(this, "isYoePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isYoePrivate}/>
                    </div>
                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="col-md-6 nopadding-right">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>

                    <div className="form-group steps_pic_upload">
                      <div className="previewImg ProfileImg">
                        <img src={this.state.profilePic?this.state.profilePic:this.state.defaultProfilePic}/>
                      </div>
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                        <input type="file" className="upload" id="profilePic" onChange={this.onFileUpload.bind(this)}/>
                      </div>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group">
                      <input type="text" placeholder="Industry" name="industry" defaultValue={this.state.data.industry} className="form-control float-label" disabled="true" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isIndustryPrivate" onClick={this.onClick.bind(this, "isIndustryPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isIndustryPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Profession" name="profession" defaultValue={this.state.data.profession} className="form-control float-label" disabled="true" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionPrivate" onClick={this.onClick.bind(this, "isProfessionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isProfessionPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employer Name" ref="employerName" defaultValue={this.state.data.employerName} disabled="true" className="form-control float-label"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmployerNamePrivate"/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Phone No" name="mobileNumber" defaultValue={this.state.data.mobileNumber} disabled="true" className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isMobileNumberPrivate" onClick={this.onClick.bind(this, "isMobileNumberPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isMobileNumberPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Email Id" name="emailId" defaultValue={this.state.data.emailId} disabled="true" className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmailIdPrivate" onClick={this.onClick.bind(this, "isEmailIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmailIdPrivate}/>
                    </div>

                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>

      </div>)}
      </div>
    )
  }
};
MlIdeatorDetails.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
