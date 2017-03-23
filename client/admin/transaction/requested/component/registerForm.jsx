import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';
import {findRegistrationActionHandler} from '../actions/findRegistration'
export default class RegisterForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
    loading:true,
    registrationDetails:''
    }
    this.findRegistration.bind(this);
    return this;
  }
  getRegistrationDetails(){
    const resp=this.findRegistration();
    return resp;
  }
  async getRegistrationContactDetails(details){
    const resp=await this.findRegistration();
    this.setState({'registrationDetails':resp})
  }

  async getRegistrationSocialLinks(details){
    //let data = this.state.registrationDetails;
    //refer proper object
    const resp=await this.findRegistration();
    this.setState({'registrationDetails':resp})
  }
  getRegistrationKYCDetails(details){
    let data = this.state.registrationDetails;
    //refer proper object
    this.setState({'registrationDetails':data})

  }
  componentWillMount() {
    const resp=this.findRegistration();
    return resp;
  }

  async findRegistration() {
    const response = await findRegistrationActionHandler(this.props.config);
    this.setState({loading: false, registrationDetails: response});
    return response;
  }

  render(){
    let registrationId = this.props.config;
    const steps =
    [
      {name: 'Basic info','icon':<span className="ml ml-basic-Information"></span>, component: <Step1 getRegistrationDetails={this.getRegistrationDetails.bind(this)} registrationInfo={this.state.registrationDetails.registrationInfo} registrationId={registrationId}/>},
      {name: 'Additional info','icon':<span className="ml ml-additional-Information"></span>,  component: <Step2 registrationId={registrationId} registrationDetails={this.state.registrationDetails.registrationDetails} community={this.state.registrationDetails&&this.state.registrationDetails.registrationInfo.communityName}/>},
      {name: 'Contact details','icon':<span className="ml ml-moolya-symbol"></span>, component: <Step3 getRegistrationContactDetails={this.getRegistrationContactDetails.bind(this)} registrationInfo={this.state.registrationDetails}  registrationId={registrationId}/>},
      {name: 'Social links','icon':<span className="ml ml-social-Links"></span>,  component: <Step4 getRegistrationSocialLinks={this.getRegistrationSocialLinks.bind(this)} registrationInfo={this.state.registrationDetails}  registrationId={registrationId}/>},
      {name: 'KYC\'s Documents','icon':<span className="ml ml-kyc-document"></span>,  component: <Step5 getRegistrationKYCDetails={this.getRegistrationKYCDetails.bind(this)} registrationInfo={this.state.registrationDetails}/>},
      {name: 'Payment gateway','icon':<span className="ml ml-payments"></span>, component: <Step6 />},
      {name: 'History','icon':<span className="ml ml-moolya-symbol"></span>, component: <Step7 />}
    ]
    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
        <div className="admin_padding_wrap">
      {/*<h2>Registration Process</h2>*/}
    <div className='step-progress' >
                  <div id="root" >
                    <StepZilla steps={steps} stepsNavigation={true} prevBtnOnLastStep={true} />
                  </div>
               </div>
      </div>)}
      </div>
    )
  }
};
