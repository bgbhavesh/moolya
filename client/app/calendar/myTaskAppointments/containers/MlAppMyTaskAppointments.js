/**
 * Parent component for myTaskAppointment
 * @Author :: Birendra Kumar
 * @Dated :: 04/08/2017
 */

// import NPM module(s)
import React, {Component} from 'react';
import _ from 'lodash';

// import custom modules
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlTaskAppointmentBasicInfo from "../components/MlTaskAppointmentBasicInfo";
import MlTaskAppointmentSession from "../components/MlTaskAppointmentSessions";
import MlTaskAppointmentTermAndCondition from "../components/MlTaskAppointmentTermAndCondition";
import MlAppMyCalendarIdeator from "../components/MlAppMyCalendarIdeator";
import MlAppActionComponent from "../../../commons/components/MlAppActionComponent";
import MlAccordion from "../../../commons/components/MlAccordion";
import formHandler from "../../../../commons/containers/MlFormHandler";
import {
  fetchAllTaskActionHandler,
  fetchTaskActionHandler,
  bookTaskInternalAppointment
} from '../actions/MlAppointmentActionHandler';

class MyTaskAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: {},
      tasks: [],
      selectedTaskId: '',
      selectedSessionId: '',
      extraUsers: []
    };
    this.getAllTaskByProfile = this.getAllTaskByProfile.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.saveDetails = this.saveDetails.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
  }

  componentWillMount() {
    this.getAllTaskByProfile();
  }

  /**
   * Method :: getAllTaskByProfile
   * Desc :: Get all task based on profile
   * @return {Promise.<void>}
   */
  async getAllTaskByProfile() {
    const resp = await fetchAllTaskActionHandler(this.props.profileId);
    if (resp) {
      this.setState({ tasks: resp });
    }
  }

  /**
   * Method :: saveDetails
   * Desc: set the current selected value
   */
  saveDetails(id, data) {
    let {extraUsers, selectedSessionId} = this.state;
    switch (id) {
      case 'session':
        selectedSessionId = data;
        break;
      case 'user':
        extraUsers.push(data);
        break;
      default:
        // do nothing
    }
    this.setState({
      selectedSessionId: selectedSessionId,
      extraUsers: extraUsers
    })
  }
  /**
   * Method :: onSelectTask
   * Desc :: Sets the selected task
   * @param event :: JS event
   */
  async onChangeTask(event) {
    let taskId = event && event.value || '';
    if (taskId) {
      const resp = await fetchTaskActionHandler(taskId);
      if (resp) {
        this.setState({ selectedTask: resp, selectedTaskId: taskId });
      }
    }
  }

  /**
   * Method :: updateTask
   * Desc :: Update the selected task
   */
  async updateTask() {
    const {selectedTaskId, selectedSessionId, extraUsers} = this.state;
    let {appointmentDate} = this.props;
    let date = new Date(appointmentDate);
    if (selectedSessionId && selectedTaskId) {
      let data = {
        taskId: selectedTaskId,
        sessionId: selectedSessionId,
        hours: date && date.getHours(),
        minutes: date && date.getMinutes(),
        day: date && date.getDate(),
        month: date && date.getMonth(),
        year: date && date.getFullYear(),
        extraUsers: extraUsers
      };
      const resp = await bookTaskInternalAppointment(data);
      if (resp && resp.success) {
        toastr.success('Task internal appointment booked successfully');
      }
    } else {
      toastr.error('Please select a session and task');
    }
  }

  onChangeType() {
    this.props.onChangeSteps();
  }
  /**
   * Method :: setMyTaskAppointmentSteps
   * Desc :: Sets the step for different components
   */
  setMyTaskAppointmentSteps() {
    const { tasks, selectedTaskId, selectedTask } = this.state;
    const {isTaskComponent, appointmentDate} = this.props;
    const steps = [
      {
        name: 'Info',
        component: <MlTaskAppointmentBasicInfo tasks={tasks}
                                               isTaskComponent={isTaskComponent}
                                               onChangeType={this.onChangeType}
                                               onChangeTask={this.onChangeTask}
                                               selectedTask={selectedTask}
                                               selectedTaskId={selectedTaskId} />,
        icon: <span className="ml fa fa-plus-square-o"></span>
      },
      {
        name: 'Session',
        component: <MlTaskAppointmentSession selectedTask={selectedTask}
                                             saveDetails={this.saveDetails}
                                             selectedTaskId={selectedTaskId} />,
        icon: <span className="ml fa fa-users"></span>
      },
      {
        name: 'Terms & Conditions',
        component: <MlTaskAppointmentTermAndCondition selectedTask={selectedTask} />,
        icon: <span className="ml ml-payments"></span>
      },
      {
        name: 'Temp',
        component: <MlAppMyCalendarIdeator appointmentDate={appointmentDate} />,
        icon: <span className=""></span>
      }

    ];
    return steps;
  }
  /**
   * Method :: render
   * Desc :: Return view layer
   * @return {XML}
   */
  render() {
    let _this = this;
    let appActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => _this.props.handler(_this.updateTask.bind(this))
      },
      {
        showAction: true,
        actionName: 'exit',
        handler: async(event) => {
         // FlowRouter.go('/app/calendar/manageSchedule/' + _this.profileId + '/serviceList')
        }
      }
    ];
    export const genericPortfolioAccordionConfig = {
      id: 'portfolioAccordion',
      panelItems: [
        {
          'title': 'Actions',
          isText: false,
          style: {'background': '#ef4647'},
          contentComponent: <MlAppActionComponent
            resourceDetails={{resourceId: 'task', resourceType: 'task'}}   //resource id need to be given
            actionOptions={appActionConfig}/>
        }]
    };
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={this.setMyTaskAppointmentSteps()}
                           stepsNavigation={false}
                           prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
          <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
        </div>
      </div>
    )
  }
};

export default MyTaskAppointments = formHandler()(MyTaskAppointments);
