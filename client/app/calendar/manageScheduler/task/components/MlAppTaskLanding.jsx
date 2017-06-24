import React, {Component} from "react";
import {render} from "react-dom";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import formHandler from "../../../../../commons/containers/MlFormHandler";
import {createTaskActionHandler, createSessionActionHandler} from "../actions/saveCalanderTask";
import MlAppActionComponent from "../../../../commons/components/MlAppActionComponent";
import MlAccordion from "../../../../commons/components/MlAccordion";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppTaskCreate from "./MlAppTaskCreate";
import MlAppTaskSession from "./MlAppTaskSession";
import MlAppTaskConditions from "./MlAppTaskConditions";
import MlAppTaskStep4 from "./MlAppTaskStep4";
import MlAppTaskStep5 from "./MlAppTaskStep5";

class MlAppTaskLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    return this;
  }

  async saveTaskDetails() {
    let sendData = this.state.createData
    console.log(sendData)
    let taskId = this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id')
    var response;
    switch (this.state.saveType) {
      case 'taskCreate': {
        response = await createTaskActionHandler(sendData)
        return response
      }
        break;
      case 'taskUpdate': {
        if (taskId)
          response = await createSessionActionHandler(taskId, sendData)
        else
          toastr.error("Invalid Request");
        return response
      }
        break;
      default :
        console.log('save type required')
    }
  }

  async handleError(response) {
    console.log('error')
    console.log(response)
  };

  async handleSuccess(response) {
    console.log(response)
    if (response && response.success) {
      if (this.state.saveType == 'taskCreate')
        FlowRouter.setQueryParams({id: response.result})
      toastr.success("Saved Successfully move to next step");
    } else if (response && !response.success) {
      toastr.error(response.result);
    }
  }


  getCreateDetails(details) {
    details['profileId'] = this.props.profileId
    let taskId = this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id')
    let typeHandel = taskId ? "taskUpdate" : "taskCreate"
    // let typeHandel = this.props.editMode ? "taskUpdate" : "taskCreate"
    this.setState({createData: details, saveType: typeHandel});
  }

  getSessionDetails(details) {
    let obj = {session: details}
    console.log(obj)
    this.setState({createData: obj, saveType: 'taskUpdate'});
  }

  getConditionDetails(details) {
    console.log(details)
    this.setState({createData: details, saveType: 'taskUpdate'});
  }

  render() {
    let that = this;
    let appActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.saveTaskDetails.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'exit',
        handler: async(event) => {
          FlowRouter.go('/app/calendar/manageSchedule/'+this.props.profileId+'/taskList')
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
            resourceDetails={{resourceId: 'sacsdvdsv', resourceType: 'task'}}   //resource id need to be given
            actionOptions={appActionConfig}/>
        }]
    };

    const steps =
      [
        {
          name: 'Create Task',
          component: <MlAppTaskCreate getCreateDetails={this.getCreateDetails.bind(this)}
                                      taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id')}/>
        },
        {
          name: 'Create Session',
          component: <MlAppTaskSession getSessionDetails={this.getSessionDetails.bind(this)}
                                       taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id') }
                                       editMode={this.props.editMode}
                                       profileId={this.props.profileId}/>
        },
        {name: 'T&C',
          component: <MlAppTaskConditions getConditionDetails={this.getConditionDetails.bind(this) }
                                          taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id') }/>
        },
        {name: 'Payment', component: <MlAppTaskStep4 />},
        {name: 'History', component: <MlAppTaskStep5 />}
      ]

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="task"/>
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
          <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
        </div>
      </div>
    )
  }
}
;
export default MlAppTaskLanding = formHandler()(MlAppTaskLanding);
