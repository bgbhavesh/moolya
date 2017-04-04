import React from 'react';
import { render } from 'react-dom';
import Company from './Company'
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';

export default class CompanyHardReg extends React.Component{
  constructor(props){
    super(props);
    this.getRegistrationSteps.bind(this);
  }

  getRegistrationSteps(props){
    let hardRegSteps=[
      {name: 'Additional info','icon':<span className="ml ml-additional-Information"></span>,  component: <Company {...props} />},
      {name: 'Contact details','icon':<span className="ml ml-address-book"></span>, component: <Step3 {...props} />},
      {name: 'Social links','icon':<span className="ml ml-social-Links"></span>,  component: <Step4 {...props} />},
      {name: 'KYC\'s Documents','icon':<span className="ml ml-kyc-document"></span>,  component: <Step5 {...props} />},
      {name: 'Payment gateway','icon':<span className="ml ml-payments"></span>, component: <Step6 {...props} />},
      {name: 'History','icon':<span className="ml ml-moolya-symbol"></span>, component: <Step7 {...props} />}];
    return hardRegSteps;
  }
  componentWillMount(){
    this.props.setHardRegistrationSteps(this.getRegistrationSteps(this.props));
  }

  compareQueryOptions(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  componentWillUpdate(nextProps){
    if(!this.compareQueryOptions(this.props,nextProps)){
      this.props.setHardRegistrationSteps(this.getRegistrationSteps(nextProps));
    }
  }

  render(){
    return null;
  }
};
