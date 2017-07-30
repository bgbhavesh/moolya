/**
 * Parent component for service
 * @Author :: Mukhil P
 * @Dated :: 20/06/2017
 */

import {
  createServiceActionHandler,
  fetchServiceActionHandler,
  fetchProfileActionHandler,
  updateServiceActionHandler,
  fetchTasksAmountActionHandler,
  fetchTaskDetailsForServiceCard
} from '../../manageScheduler/service/actions/MlServiceActionHandler';
import Step2 from './Step2'


// import NPM module(s)
import React, {Component} from "react";
import Moment from "moment";
import _ from 'lodash';

// import custom method(s) and component(s)
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import Step1 from './Step1';
import Step3 from './Step3'
import CalenderHead from './calendarHead';

// import MlAppServiceSelectTask from './MlAppServiceSelectTask';
// import MlAppServiceTermsAndConditions from './MlAppServiceTermsAndConditions';
// import MlAppServicePayment from './MlAppServicePayment';
// import MlAppServiceHistory from "./MlAppServiceHistory";
// import {
//   createServiceActionHandler,
//   fetchServiceActionHandler,
//   fetchProfileActionHandler,
//   updateServiceActionHandler,
//   fetchTasksAmountActionHandler,
//   fetchTaskDetailsForServiceCard
// } from '../actions/MlServiceActionHandler';
// import {fetchTaskDetailsActionHandler} from '../../task/actions/fetchTaskDetails';

export default class MlAppServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  /**
   * Method :: setServiceSteps
   * Desc :: Sets components steps for stepzila to create and update service data
   */
  setServiceSteps() {
    const {
      serviceBasicInfo,
      daysRemaining,
      clusterCode,
      clusters,
      clusterName,
      serviceTermAndCondition,
      attachments,
      servicePayment,
      facilitationCharge,
      taxStatus,
      serviceTask,
      finalAmount,
      prevFinalAmount
    } = this.state;

    let steps = [
      {
        name: 'View',
        component: <Step1 />,
        icon: <span className="ml fa fa-plus-square-o"></span>
      },
      {
        name:'Tasks',
        component: <Step2/>,
        icon: <span className="ml fa fa-users"></span>
      },
      {
        name: 'Terms & Conditions',
        component: <Step3/>,
        icon: <span className="ml ml-payments"></span>
      },
      {
        name: 'Payment',
        // component: <MlAppServicePayment/>,
        icon: <span className="ml ml-payments"></span>
      },

    ];
    return steps;
  }



  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <CalenderHead/>
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={this.setServiceSteps()}
                           stepsNavigation={false}
                           prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
