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
import { fetchTaskActionHandler } from '../../../calendar/myTaskAppointments/actions/MlAppointmentActionHandler'
import Step2 from './Step2'


// import NPM module(s)
import React, {Component} from "react";
import Moment from "moment";
import _ from 'lodash';

// import custom method(s) and component(s)
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import Step1 from './Step1';
import Step3 from './Step3'
import {servicesForAppointmentsActionHandler} from  '../../myAppointments/actions/fetchRequestedAppointments'
import CalenderHead from './calendarHead';
import MlAppTaskAppointmentBasicInfo from './MlAppTaskAppointmentBasicInfo';
import MlAppTaskAppointmentSessions from './MlAppTaskAppointmentSessions';
import MlAppTaskAppointmentTermAndCondition from './MlAppTaskAppointmentTermAndCondition';
import MlAppMyTaskAppointments from '../../myTaskAppointments/containers/MlAppMyTaskAppointments';
export default class MlAppServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {
      isTaskComponent: false,
      serviceBasicInfo: {
        duration:{}
      },
      TaskDetails:[{}],
      task:{},
      selectedTab:""
    };
    this.onChangeSteps = this.onChangeSteps.bind(this);
    this.selectService.bind(this);

  }

  componentWillMount() {
    this.getServiceList()
  }

  async getServiceList() {
    const resp = await servicesForAppointmentsActionHandler();
    console.log(resp)
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
   * Method :: onChangeSteps
   * Desc :: Changed stepzila based on select service or task
   */
  onChangeSteps() {
    const {isTaskComponent} = this.state;
    this.setState({isTaskComponent: !isTaskComponent })
  }

  selectedService(response) {
    this.setState({serviceId: response})
    this.getServiceDetails(response)
  }

  async getServiceDetails(serviceId) {
    let {finalAmount, prevFinalAmount, serviceTask, tasks, serviceTermAndCondition, attachments, servicePayment, taxStatus, facilitationCharge} = this.state;
    if (serviceId) {
      let service = await fetchServiceActionHandler(serviceId);
      if (service) {
        let tasks = [];
        let currentDate = new Date()
        let expiryDate = Date.parse(service.validTill);
        let remainingDate = Math.floor((expiryDate - currentDate) / (1000 * 60 * 60 * 24));
        remainingDate = isNaN(remainingDate) ? '' : remainingDate;
        let duration = {
          hours: service.duration.hours,
          minutes: service.duration.minutes
        }
        let serviceInfo = {
          duration: duration,
          name: service.name,
          noOfSession: service.noOfSession,
          sessionFrequency: service.sessionFrequency,
          status: service.status,
          validTill: service.validTill,
          daysToExpire: remainingDate,
          totalAmount: service.payment.tasksAmount
        };

        if (service.termsAndCondition) {
           var TermAndCondition = _.omit(service.termsAndCondition, '__typename');
        }

        if(service.attachments) {
            var attachmentDetails = _.omit(service.attachments, '__typename');
        }

        this.setState({
          serviceBasicInfo: serviceInfo,
          serviceTermAndCondition: TermAndCondition,
          attachments: attachmentDetails
        })
      }
      //     finalAmount = service.finalAmount;
      //     prevFinalAmount = service.finalAmount;
      //     tasks = _.cloneDeep(service.tasks) || [];
      //     tasks.sessions = _.cloneDeep(service.tasks.sessions) || [];
      //     serviceTask.serviceOptionTasks = [];
      //     let attachmentDetails = [];
      //     serviceTask.tasks = service.tasks || [];
      //     if (serviceTask.serviceTaskDetails && serviceTask.serviceTaskDetails.length > 0) {
      //       serviceTask.tasks = _.intersectionBy(serviceTask.serviceTaskDetails, service.tasks, 'id');
      //       serviceTask.serviceTaskDetails.forEach((task, key) => {
      //         if (service.tasks.map((data) => data.id).indexOf(task.id) === -1) {
      //           serviceTask.serviceOptionTasks.push(task);
      //         }
      //       });
      //       serviceTask.tasks.forEach((task) => {
      //         if (task.attachments && task.attachments.length > 0) {
      //           task.attachments.forEach((attachment) => {
      //             attachmentDetails.push(attachment)
      //           });
      //         }
      //       });
      //     }
      //


      //     if (service.facilitationCharge) {
      //       facilitationCharge = _.cloneDeep(service.facilitationCharge);
      //     }
      // /     if (service.payment) {
      //       servicePayment = _.cloneDeep(service.payment);
      //       servicePayment.isTaxInclusive = servicePayment.isTaxInclusive ? true : false;
      //       taxStatus = servicePayment.isTaxInclusive ? 'taxinclusive' : 'taxexclusive';
      //     }
      //     attachments = _.cloneDeep(attachmentDetails);
      //   }
      //   // this.props.serviceId?this.props.serviceInfo(service):"";
      // }
      // var validTillDate = Date.parse(serviceBasicInfo.validTill);
      // var currentDate = new Date();
      // let remainingDate = Math.floor((validTillDate - currentDate) / (1000 * 60 * 60 * 24));
      // remainingDate = isNaN(remainingDate) ? '' : remainingDate;
      // this.setState({
        // serviceBasicInfo: serviceInfo
        // daysRemaining: remainingDate,
        // clusterData: clusterData,
        // serviceTask: serviceTask,
        // serviceTermAndCondition: serviceTermAndCondition,
        // attachments: attachments
        // service: service,
        // tasks: tasks,
        // facilitationCharge: facilitationCharge,
        // servicePayment: servicePayment,
        // taxStatus: taxStatus,
        // finalAmount: finalAmount,
        // prevFinalAmount: prevFinalAmount
      // });
    }
    this.getTaskDetails()
  }


  async getTaskDetails() {
    const resp = await fetchTaskDetailsForServiceCard(this.state.profileId, this.state.serviceId)
    this.setState({TaskDetails: resp})
    console.log(resp)
  }

  selectService(taskId) {
    this.getTask(taskId)
  }

  async getTask(taskId) {
    const resp = await fetchTaskActionHandler(taskId)
    this.setState({task: resp, selectedTab: taskId})
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
      prevFinalAmount,
      isTaskComponent
    } = this.state;

    let steps = [
      {
        name: 'View',
        component: <Step1
          profileId={this.props.profileId}
          serviceId={this.state.serviceId}
          isTaskComponent={isTaskComponent}
          bookDetails={this.bookDetails.bind(this)}
          onChangeSteps={this.onChangeSteps}
          selectedService={this.selectedService.bind(this)}
          serviceBasicInfo={serviceBasicInfo}
          appointmentDate={this.props.appointmentDate}
        />,
        icon: <span className="ml fa fa-plus-square-o"></span>
      },
      {
        name:'Tasks',
        component: <Step2
          taskDetails={this.state.TaskDetails}
          selectService={this.selectService.bind(this)}
          task={this.state.task}
          selectedTab={this.state.selectedTab}
        />,
        icon: <span className="ml fa fa-users"></span>
      },
      {
        name: 'Terms & Conditions',
        component: <Step3
          serviceTermAndCondition={this.state.serviceTermAndCondition}
          attachments={this.state.attachments}
        />,
        icon: <span className="ml ml-payments"></span>
      },
    ];
    return steps;
  }

  /**
   * Method :: setTaskSteps
   * Desc :: Sets components steps for stepzila to create and update task data
   */
  // setTaskSteps() {
  //   const {isTaskComponent} = this.state;
  //   const steps = [
  //     {
  //       name: 'Service',
  //       component: <MlAppTaskAppointmentBasicInfo
  //         isTaskComponent={isTaskComponent}
  //         onChangeSteps={this.onChangeSteps}
  //       />,
  //       icon: <span className="ml fa fa-plus-square-o"></span>
  //     },
  //     {
  //       name: 'Sessions',
  //       component: <MlAppTaskAppointmentSessions isTaskComponent={isTaskComponent}
  //                                             onChangeSteps={this.onChangeSteps} />,
  //       icon: <span className="ml ml-payments"></span>
  //     },
  //     {
  //       name: 'Terms and conditions',
  //       component: <MlAppTaskAppointmentTermAndCondition isTaskComponent={isTaskComponent}
  //                                             onChangeSteps={this.onChangeSteps} />,
  //       icon: <span className="ml ml-payments"></span>
  //     },
  //     {
  //       name: '',
  //       //component: <MlAppTaskAppointmentSessions isTaskComponent={isTaskComponent} onChangeSteps={this.onChangeSteps} />,
  //       icon: <span className="ml ml-payments"></span>
  //     },
  //     {
  //       name: '',
  //       //component: <MlAppTaskAppointmentTermAndCondition isTaskComponent={isTaskComponent} onChangeSteps={this.onChangeSteps} />,
  //       icon: <span className="ml ml-payments"></span>
  //     }
  //
  //   ];
  //   return steps;
  // }
  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    const {appointmentDate, profileId} = this.props;
    const {isTaskComponent} = this.state;
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                {!isTaskComponent ?
                  <StepZilla steps={this.setServiceSteps()}
                             stepsNavigation={false}
                             prevBtnOnLastStep={true}/>
                  :
                  <MlAppMyTaskAppointments isTaskComponent={isTaskComponent}
                                           appointmentDate={appointmentDate}
                                           onChangeSteps={this.onChangeSteps}
                                           profileId={profileId}
                  />
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
