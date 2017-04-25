import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';

var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlPortfolioIdeatorBasicDetailsView extends React.Component{
  constructor(props,context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
  }

  componentWillMount(){
    this.fetchPortfolioDetails();
  }


  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findIdeatorDetailsActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, data: response});
    }
  }


  render(){
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
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
                          <input type="text" placeholder="First Name" name="firstName" defaultValue={this.state.data.firstName} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isfirstNamePrivate"/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Last Name" name="lastName" defaultValue={this.state.data.lastName} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="islastNamePrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Education" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Employment Status" name="employmentStatus" defaultValue={this.state.data.employmentStatus} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isEmploymentStatusPrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Professional Tag" name="professionalTag" defaultValue={this.state.data.professionalTag} className="form-control float-label" disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionalTagPrivate"/>
                        </div>


                        <div className="form-group">
                          <input type="text" placeholder="Years of Experience" name="yearsofExperience" defaultValue={this.state.data.yearsofExperience} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isYoePrivate"/>
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
                          <input type="text" placeholder="Industry" ref="industry" defaultValue={this.state.data.industry} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isIndustryPrivate"/>
                        </div>


                        <div className="form-group">
                          <input type="text" placeholder="Profession" ref="profession" defaultValue={this.state.data.profession} className="form-control float-label" disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isprofessionPrivate"/>
                        </div>


                        <div className="form-group">
                          <input type="text" placeholder="Employer Name" ref="employerName" defaultValue={this.state.data.employerName} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isEmployerNamePrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Phone No" name="mobileNumber" defaultValue={this.state.data.mobileNumber} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isMobileNumberPrivate"/>
                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Email Id" name="emailId" defaultValue={this.state.data.emailId} className="form-control float-label"  disabled="disabled"/>
                          <FontAwesome name='unlock' className="input_icon un_lock" id="isEmailIdPrivate"/>
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
