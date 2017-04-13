import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlIdeatorDetails extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
        loading: true,
        data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentDidMount()
  {
    // OnLockSwitch();
    // dataVisibilityHandler();
  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
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
    let empty = _.isEmpty(that.context.ideatorPortfolio.portfolioIdeatorDetails)
    if(empty){
      const response = await findIdeatorDetailsActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
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
  render(){
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
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
                      <input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="DOB" name="dateOfBirth" defaultValue={this.state.data.dateOfBirth} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isDateOfBirthPrivate" onClick={this.onClick.bind(this, "isDateOfBirthPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isDateOfBirthPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Education" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "isQualificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isQualificationPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employment Status" name="employmentStatus" defaultValue={this.state.data.employmentStatus} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmploymentStatusPrivate" onClick={this.onClick.bind(this, "isEmploymentStatusPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmploymentStatusPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Sector" name="professionalTag" defaultValue={this.state.data.professionalTag} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionalTagPrivate" onClick={this.onClick.bind(this, "isProfessionalTagPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isProfessionalTagPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employer Name" ref="employerName" defaultValue={this.state.data.employerName} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmployerNamePrivate" onClick={this.onClick.bind(this, "isEmployerNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmployerNamePrivate}/>
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
                        <img src="/images/ideator_01.png"/>
                      </div>
                    </div>
                    <br className="brclear"/>

                    <div className="form-group">
                      <input type="text" placeholder="Phone No" name="mobileNumber" defaultValue={this.state.data.mobileNumber} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isMobileNumberPrivate" onClick={this.onClick.bind(this, "isMobileNumberPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isMobileNumberPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Email Id" name="emailId" defaultValue={this.state.data.emailId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmailIdPrivate" onClick={this.onClick.bind(this, "isEmailIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmailIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Fcebook Id" name="facebookId" defaultValue={this.state.data.facebookId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isfacebookIdPrivate" onClick={this.onClick.bind(this, "isfacebookIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isfacebookIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Linkedin Id" ref="linkedInId" defaultValue={this.state.data.linkedInId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="islinkedInIdPrivate" onClick={this.onClick.bind(this, "islinkedInIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.islinkedInIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Twitter Id" name="twitterId" defaultValue={this.state.data.twitterId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isTwitterIdPrivate" onClick={this.onClick.bind(this, "isTwitterIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isTwitterIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Googleplus Id" name="gplusId" defaultValue={this.state.data.gplusId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isGplusIdPrivate" onClick={this.onClick.bind(this, "isGplusIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGplusIdPrivate}/>
                    </div>


                  </form>
                </div>
              </ScrollArea>
            </div>
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
