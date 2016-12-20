
import React, { Component, PropTypes } from 'react';

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import StepZilla from './main';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

RegistrationLayout = React.createClass({
    render(){
        return <main>{this.props.content}</main>
    }
})


RegistrationContent = React.createClass({

    render(){
        const steps =
            [
                {name: 'Step1', component: <Step1 />},
                {name: 'Step2', component: <Step2 />},
                {name: 'Step3', component: <Step3 />},



            ]
        return(
          <div>

            <AdminHeaderContent/>
          <div style={{width: '100%'}}>
            <AdminLeftNavContent/>

                <div className='step-progress col-md-8 col-sm-8' style={{margin: '70px'}}>
                  <div id="root" >
                    <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true} />
                  </div>

               </div>
          </div>
          </div>




        )
    }
});

