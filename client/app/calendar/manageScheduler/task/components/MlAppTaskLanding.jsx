

import React, {Component} from "react";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import formHandler from "../../../../../commons/containers/MlFormHandler";
import {createTaskActionHandler, updateTaskActionHandler} from "../actions/saveCalanderTask";
import MlAppActionComponent from "../../../../commons/components/MlAppActionComponent";
import MlAccordion from "../../../../commons/components/MlAccordion";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppTaskCreate from "./MlAppTaskCreate";
import MlAppTaskSession from "./MlAppTaskSession";
import MlAppTaskConditions from "./MlAppTaskConditions";
import MlAppTaskPayment from "./MlAppTaskPayment";
import MlAppTaskStep5 from "./MlAppTaskStep5";
import _ from "lodash";

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
    let isExternal = this.state.isExternal;
    let taskId = this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id')
    var response;
    this.errorMsg = '';
    if (sendData && sendData.payment && sendData.payment.isDiscount) {
      if(sendData.payment.activitiesDerived === '' || typeof sendData.payment.activitiesDerived === 'undefined' || sendData.payment.activitiesDerived === null ){
        this.errorMsg = 'Payable amount is required';
        toastr.error(this.errorMsg);
        return false;
      }
      switch (sendData.payment.discountType) {
        case 'amount':
          if(isNaN(sendData.payment.discountValue)) {
            this.errorMsg = 'Please enter a valid number';
          } else if (parseFloat(sendData.payment.discountValue) > parseFloat(sendData.payment.activitiesDerived)) {
            this.errorMsg = 'Amount must be equal or less than the payable amount'
          }
          break;
        case 'percent':
          if(isNaN(sendData.payment.discountValue)) {
            this.errorMsg = 'Please enter a valid number';
          } else if (parseFloat(sendData.payment.discountValue) > 100) {
            this.errorMsg = 'Percent must be equal or less than 100'
          }
          break;
        default:
          this.errorMsg = '';
      }
    }
    /*if (sendData && isExternal) {
      let {activities} = this.state;
      if (sendData.session && sendData.session.length > 0 && activities && activities.length> 0) {
        sendData.session.map((sessionData, index) => {
          let isOnline = false;
          if (sessionData.activities && sessionData.activities.length > 0) {
            sessionData.activities.map((activityId) => {
              let activity = activities.filter((activityData) => { return activityData._id === activityId});
              if (activity && activity.length > 0) {
                if (activity[0].mode === 'online' && !isOnline) {
                  isOnline = true;
                }
              }
            })
          } else {
            isOnline = true;
          }
          if(!isOnline) {
            this.errorMsg = 'Activity must be at least one online mode for external task in Session ' + (1 + index);
            return false;
          }
        })
      }
    }*/
    if (!this.errorMsg) {
      switch (this.state.saveType) {
        case 'taskCreate': {
          response = await createTaskActionHandler(sendData)
          return response
        }
          break;
        case 'taskUpdate': {
          if (taskId)
            response = await updateTaskActionHandler(taskId, sendData)
          else
            toastr.error("Invalid Request");
          return response
        }
          break;
        default :
          console.log('save type required')
      }
    } else {
      toastr.error(this.errorMsg);
      return false;
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

  getSessionDetails(details, activities, isExternal) {
    let totalMinutes = details.reduce(function(sum, value) {
      let duration = value.duration ? value.duration : {};
      return sum + (duration.hours ? duration.hours : 0)*60 + ( duration.minutes ? duration.minutes : 0 ) ;
    }, 0);
    let obj = {
      duration: {
        hours: parseInt(totalMinutes/60),
        minutes: totalMinutes % 60
      },
      session: details
    }
    console.log(obj);
    this.setState({createData: obj, saveType: 'taskUpdate', activities: activities, isExternal: isExternal});
  }

  getPaymentDetails(details) {
    console.log(details)
    this.setState({createData: details, saveType: 'taskUpdate'});
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
          FlowRouter.go('/app/calendar/manageSchedule/' + this.props.profileId + '/taskList')
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
                                      taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id')}/>,
          icon:<span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Create Session',
          component: <MlAppTaskSession getSessionDetails={this.getSessionDetails.bind(this)}
                                       taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id') }
                                       editMode={this.props.editMode}
                                       profileId={this.props.profileId}/>,
          icon:<span className="ml flaticon-ml-file-1"></span>
        },
        {
          name: 'Terms and Conditions',
          component: <MlAppTaskConditions getConditionDetails={this.getConditionDetails.bind(this) }
                                          taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id') }/>,
          icon:<span className="ml flaticon-ml-interface-2"></span>
        },
        {name: 'Payment',
          component: <MlAppTaskPayment getPaymentDetails={this.getPaymentDetails.bind(this)}
                                       taskId={this.props.editMode ? this.props.taskId : FlowRouter.getQueryParam('id') }/>,
          icon:<span className="ml ml-payments"></span>
        },
        {name: 'History', component: <MlAppTaskStep5 />,
          icon:<span className="ml my-ml-history"></span>
        }
      ]

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="task"/>
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={steps} stepsNavigation={true} prevBtnOnLastStep={true}/>
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
