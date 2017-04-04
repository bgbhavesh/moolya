import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
export default class MlCreatePortfolio extends React.Component{
  componentDidMount()
  { }
  render(){
    const steps =
      [
        {name: 'Basic Info', component: <Step1 />},
        {name: 'Subscriptions', component: <Step2 />},
        {name: 'Payment Gateway', component: <Step3 />},
        {name: 'Templates', component: <Step4 />},
        {name: 'History', component: <Step5 />}
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
