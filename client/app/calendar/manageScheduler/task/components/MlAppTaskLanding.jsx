import React, {Component} from "react";
import {render} from "react-dom";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import formHandler from "../../../../../commons/containers/MlFormHandler";
import {createTaskActionHandler} from '../actions/saveCalanderTask'
import MlAppActionComponent from "../../../../commons/components/MlAppActionComponent";
import MlAccordion from "../../../../commons/components/MlAccordion";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppTaskCreate from "./MlAppTaskCreate";
import MlAppTaskSession from "./MlAppTaskSession";
import MlAppTaskStep3 from "./MlAppTaskStep3";
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
    var response = await createTaskActionHandler(sendData)
    return response
  }

  async handleError(response) {
    console.log('error')
    console.log(response)
  };

  async handleSuccess(response) {
    if(response)
      toastr.success("Saved Successfully");
  };


  getCreateDetails(details) {
    this.setState({createData: details});
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
        actionName: 'golive',
        handler: async(event) => {
          console.log('go live action handler')
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
            resourceDetails={{resourceId: 'sacsdvdsv', resourceType: 'portfolio'}}
            actionOptions={appActionConfig}/>
        }]
    };

    const steps =
      [
        {name: 'Create Task', component: <MlAppTaskCreate getCreateDetails={this.getCreateDetails.bind(this)}/>},
        {name: 'Create Session', component: <MlAppTaskSession />},
        {name: 'T&C', component: <MlAppTaskStep3 />},
        {name: 'Payment', component: <MlAppTaskStep4 />},
        {name: 'History', component: <MlAppTaskStep5 />}
      ]

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="task" />
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