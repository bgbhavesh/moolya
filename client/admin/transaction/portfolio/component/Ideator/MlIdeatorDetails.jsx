import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/

var FontAwesome = require('react-fontawesome');
var Select = require('react-select');



export default class MlIdeatorDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isfirstNamePrivate:true,
      islastNamePrivate:true,
      isGenderPrivate:true,
      isDateOfBirthPrivate:true,
      isQualificationPrivate:true,
      isEmploymentStatusPrivate:true,
      isProfessionalTagPrivate:true,
      isYoePrivate:true,
      isIndustryPrivate:true,
      isProfessionPrivate:true,
      isEmployerNamePrivate:true,
      isMobileNumberPrivate:true,
      isEmailIdPrivate:true,
      isfacebookIdPrivate:true,
      islinkedInIdPrivate:true,
      isTwitterIdPrivate:true,
      isGplusIdPrivate:true,
    }
    this.onClick.bind(this);
  }

  componentDidMount()
  {
    OnLockSwitch();
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
      // FlowRouter.go('/admin/portfolio/about')
      // return (
      //     <MlIdeatorPortfolioAbout />
      // )
    });
    dataVisibilityHandler();
  }

  onClick(field,e){
      let className = e.target.className;
      if(className.indexOf("fa-lock") != -1){
        this.setState({[e.target.id]:true});
      }else{
        this.setState({[e.target.id]:false});
      }
      this.props.getIdeatorDetails(this.state)
  }

  render(){
    return (
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
                      <input type="text" placeholder="First Name" ref="firstName" className="form-control float-label" id="cluster_name" defaultValue="Ravi"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isfirstNamePrivate" onClick={this.onClick.bind(this, "isfirstNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isfirstNamePrivate}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" ref="lastName" className="form-control float-label" id="cluster_name" defaultValue="Kapoor"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="islastNamePrivate" onClick={this.onClick.bind(this, "islastNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.islastNamePrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Gender" ref="gender" className="form-control float-label" id="cluster_name" defaultValue="Male"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isGenderPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="DOB" ref="dateOfBirth" className="form-control float-label" id="cluster_name" defaultValue="26-06-1980"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isDateOfBirthPrivate" onClick={this.onClick.bind(this, "isDateOfBirthPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isDateOfBirthPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Education" ref="qualification" className="form-control float-label" id="cluster_name" defaultValue="MSC, Mcom, Bcom"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "isQualificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isQualificationPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employment Status" ref="employmentStatus" className="form-control float-label" id="cluster_name" defaultValue="Employeed"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmploymentStatusPrivate" onClick={this.onClick.bind(this, "isEmploymentStatusPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isEmploymentStatusPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Sector" ref="professionalTag" className="form-control float-label" id="cluster_name" defaultValue="IT"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionalTagPrivate" onClick={this.onClick.bind(this, "isProfessionalTagPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isProfessionalTagPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Employer Name" ref="employerName" className="form-control float-label" id="cluster_name" defaultValue="Mobiletech Solutions"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmployerNamePrivate" onClick={this.onClick.bind(this, "isEmployerNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isEmployerNamePrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Years of Experience" ref="yearsofExperience" className="form-control float-label" id="cluster_name" defaultValue="12"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isYoePrivate" onClick={this.onClick.bind(this, "isYoePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isYoePrivate}/>
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
                      <input type="text" placeholder="Phone No" ref="mobileNumber" className="form-control float-label" id="cluster_name" defaultValue="9028728282"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isMobileNumberPrivate" onClick={this.onClick.bind(this, "isMobileNumberPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isMobileNumberPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Email Id" ref="emailId" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isEmailIdPrivate" onClick={this.onClick.bind(this, "isEmailIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isEmailIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Fcebook Id" ref="facebookId" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isfacebookIdPrivate" onClick={this.onClick.bind(this, "isfacebookIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isfacebookIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Linkedin Id" ref="linkedInId" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="islinkedInIdPrivate" onClick={this.onClick.bind(this, "islinkedInIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.islinkedInIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Twitter Id" ref="twitterId" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isTwitterIdPrivate" onClick={this.onClick.bind(this, "isTwitterIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isTwitterIdPrivate}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="Googleplus Id" ref="gplusId" className="form-control float-label" id="cluster_name" defaultValue="abc@gmail.com"/>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isGplusIdPrivate" onClick={this.onClick.bind(this, "isGplusIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.isGplusIdPrivate}/>
                    </div>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>




        </div>


      </div>
    )
  }
};
