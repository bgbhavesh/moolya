/**
 * Parent component for myTaskAppointment
 * @Author :: Birendra Kumar
 * @Dated :: 04/08/2017
 */

// import NPM module(s)
import React, {Component} from 'react';

// import custom modules
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlTaskAppointmentBasicInfo from "../components/MlTaskAppointmentBasicInfo";
import MlTaskAppointmentSession from "../components/MlTaskAppointmentSessions";
import MlTaskAppointmentTermAndCondition from "../components/MlTaskAppointmentTermAndCondition";
import MlAppActionComponent from "../../../commons/components/MlAppActionComponent";
import MlAccordion from "../../../commons/components/MlAccordion";
import formHandler from "../../../../commons/containers/MlFormHandler";
import {
  fetchAllTaskActionHandler,
  fetchTaskActionHandler
} from '../actions/MlAppointmentActionHandler';

class MyTaskAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: {},
      tasks: [],
      selectedTaskId: ''
    };
    this.getAllTaskByProfile = this.getAllTaskByProfile.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
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
    const resp = await fetchAllTaskActionHandler('MLPRO00000002');
    if (resp) {
      this.setState({ tasks: resp });
    }
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
  updateTask() {
    console.log('----Hi--');
  }

  /**
   * Method :: setMyTaskAppointmentSteps
   * Desc :: Sets the step for different components
   */
  setMyTaskAppointmentSteps() {
    const { tasks, selectedTaskId, selectedTask } = this.state;
    const steps = [
      {
        name: 'Info',
        component: <MlTaskAppointmentBasicInfo tasks={tasks}
                                               onChangeTask={this.onChangeTask}
                                               selectedTask={selectedTask}
                                               selectedTaskId={selectedTaskId} />,
        icon: <span className="ml fa fa-plus-square-o"></span>
      },
      {
        name: 'Session',
        component: <MlTaskAppointmentSession selectedTask={selectedTask}
                                             selectedTaskId={selectedTaskId} />,
        icon: <span className="ml fa fa-users"></span>
      },
      {
        name: 'Terms & Conditions',
        component: <MlTaskAppointmentTermAndCondition />,
        icon: <span className="ml ml-payments"></span>
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
          FlowRouter.go('/app/calendar/manageSchedule/' + _this.profileId + '/serviceList')
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
