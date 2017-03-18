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
      registrationId:null
    }

    return this;
  }
  componentWillMount() {
    let registrationId = this.props.config;
    this.setState({loading: false, registrationId: registrationId});
  }

componentDidMount()
  { }
  render(){
   /* let registrationId = this.props.config;*/
    const steps =
    [
      {name: 'Basic info', component: <Step1 registrationId={this.state.registrationId}/>},
      {name: 'Additional info', component: <Step2 registrationId={this.state.registrationId}/>},
      {name: 'Contact details', component: <Step3 />},
      {name: 'Social links', component: <Step4 />},
      {name: 'KYC\'s Documents', component: <Step5 />},
      {name: 'Payment gateway', component: <Step6 />},
      {name: 'History', component: <Step7 />}
    ]
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
      {/*<h2>Registration Process</h2>*/}
    <div className='step-progress' >
                  <div id="root" >
                    <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
                  </div>
               </div>
      </div>
      </div>
    )
  }
};
