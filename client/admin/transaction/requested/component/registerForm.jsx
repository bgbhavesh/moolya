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
  getRegistrationDetails(details){
    let data = this.state.registrationDetails;
    data.registrationInfo = details;
    this.setState({'registrationDetails':data})
  }
  getRegistrationContactDetails(details){
    let data = this.state.registrationDetails;
    //refer proper object
    this.setState({'registrationDetails':data})
  }
  getRegistrationSocialLinks(details){
    let data = this.state.registrationDetails;
    //refer proper object
    this.setState({'registrationDetails':data})
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
    console.log(response)
    this.setState({loading: false, registrationDetails: response});
    return response;
  }

  render(){
    let registrationId = this.props.config;
    const steps =
    [
      {name: 'Basic info', component: <Step1 getRegistrationDetails={this.getRegistrationDetails.bind(this)} registrationInfo={this.state.registrationDetails.registrationInfo} registrationId={registrationId}/>},
      {name: 'Additional info', component: <Step2 getRegistrationDetails={this.getRegistrationDetails.bind(this)} registrationInfo={this.state.registrationDetails} registrationId={registrationId} community={'institution'}/>},
      {name: 'Contact details', component: <Step3 getRegistrationContactDetails={this.getRegistrationContactDetails.bind(this)} registrationInfo={this.state.registrationDetails}/>},
      {name: 'Social links', component: <Step4 getRegistrationSocialLinks={this.getRegistrationSocialLinks.bind(this)} registrationInfo={this.state.registrationDetails}/>},
      {name: 'KYC\'s Documents', component: <Step5 getRegistrationKYCDetails={this.getRegistrationKYCDetails.bind(this)} registrationInfo={this.state.registrationDetails}/>},
      {name: 'Payment gateway', component: <Step6 />},
      {name: 'History', component: <Step7 />}
    ]
    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
        <div className="admin_padding_wrap">
      {/*<h2>Registration Process</h2>*/}
    <div className='step-progress' >
                  <div id="root" >
                    <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
                  </div>
               </div>
      </div>)}
      </div>
    )
  }
};
