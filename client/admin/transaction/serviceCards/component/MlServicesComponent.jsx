/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from "react";
import _ from 'lodash';
import MlAppScheduleHead from "../../../../app/calendar/manageScheduler/commons/components/MlAppScheduleHead";
import StepZilla from "../../../../commons/components/stepzilla/StepZilla";
// import MlAppServiceStep1 from "../../../../app/calendar/manageScheduler/service/components/MlAppServiceStep1";
import MlServiceCardStep1 from './MlServiceCardStep1'
import MlServiceCardStep2 from './MlserviceCardStep2'
import MlServiceCardStep3 from './MlServiceCardStep3'
import MlServiceCardStep4 from './MlServiceCardStep4'

export default class MlServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props)
    this.state = {
      chargeType: '',
      data: this.props.data || {}
    };
    this.optionsBySelectService = this.optionsBySelectService.bind(this);
    this.saveServicePaymentDetails = this.saveServicePaymentDetails.bind(this);
    this.checkChargeStatus = this.checkChargeStatus.bind(this);
    this.calculateCharges = this.calculateCharges.bind(this);
    //this.getCreatedId.bind(this)
  }

  /**
   * ComponentDidMount
   * Desc :: Configures the switch
   */

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
   * Method :: getCreatedId
   * Desc   :: State of activityId is set
   * @returns :: void
   */

  // getCreatedId(value) {
  //   this.setState({activityId: value})
  //   console.log(this.state.activityId)
  // }

  /**
   * Method :: optionsBySelectService
   * Desc :: Set the current selected task and tab
   */
  optionsBySelectService(taskId) {
    let {data} = this.state;
    let {serviceTask, service, tasks } = data;
    let task, sequence;
    let session = [];
    if (taskId) {
      serviceTask.selectedTaskId = taskId;
      let selectedTaskDetails = serviceTask.serviceTaskDetails.filter((task) => {
        return task.id === taskId
      });
      selectedTaskDetails = selectedTaskDetails[0];
      if (tasks && tasks.length) {
        task = tasks.filter((task) => {
          return task.id === taskId;
        });
        if (task && task.length > 0) {
          sequence = task[0].sequence;
          task[0].sessions.map((session, index) => {
            selectedTaskDetails.session[index]['sequence'] = selectedTaskDetails.session[index].sequence || _.cloneDeep(session.sequence);
          });
        }
      }
      serviceTask.selectedTaskDetails = {
        id: selectedTaskDetails.id,
        name: selectedTaskDetails.name || '',
        sequence: selectedTaskDetails.sequence || sequence,
        displayName: selectedTaskDetails.displayName || '',
        noOfSession: selectedTaskDetails.noOfSession || '',
        sessionFrequency: selectedTaskDetails.sessionFrequency || '',
        duration: selectedTaskDetails.duration || {},
        session: selectedTaskDetails.session || []
      };
    } else {
      serviceTask.selectedTaskDetails = {
        id: '',
        name: '',
        sequence: '',
        displayName: '',
        noOfSession: '',
        sessionFrequency: '',
        duration: {hours: '', minutes: ''},
        session: []
      };
      serviceTask.selectedTaskId = '';
    }
    data.serviceTask.selectedTaskDetails = serviceTask.selectedTaskDetails;
    data.serviceTask.selectedTaskId = serviceTask.selectedTaskId;
      this.setState({
      data: data
    });
  }

  /**
   * Method :: checkChargeStatus
   * Desc :: Check the charges(amount or percent)
   */
  checkChargeStatus(event) {
    let {servicePayment, facilitationCharge, chargeType } = this.state;
    facilitationCharge[chargeType === 'facilitationamount' ? 'amount' : 'percentage'] = '';
    facilitationCharge.derivedAmount = '';
    chargeType = event.target.id;
    this.setState({
      servicePayment: servicePayment,
      facilitationCharge: facilitationCharge,
      chargeType: chargeType
    });
  }

  /**
   * Method :: calculateCharges
   * Desc :: Calculate the charges as per charge type
   */
  calculateCharges(event) {
    let {servicePayment, facilitationCharge, chargeType} = this.state.data;
    facilitationCharge.derivedAmount = '';
    if (chargeType) {
      switch (chargeType) {
        case 'facilitationamount':
          if (parseFloat(event.target.value) >= 0) {
            facilitationCharge.amount = event.target.value;
            if (facilitationCharge.amount) {
              let facilitationAmount = facilitationCharge.amount ? parseFloat(facilitationCharge.amount) : 0;
              if (facilitationAmount) {
                facilitationCharge.derivedAmount = parseFloat(servicePayment.tasksDerived) + parseFloat(facilitationCharge.amount);
              }
            }
            this.setState({
              servicePayment: servicePayment,
              facilitationCharge: facilitationCharge
            });
          }
          break;
        case 'facilitationpercent':
          if (parseFloat(event.target.value) >= 0) {
            facilitationCharge.percentage = event.target.value;
            if (facilitationCharge.percentage) {
              let facilitationAmount = facilitationCharge.percentage ? parseFloat(facilitationCharge.percentage) : 0;
              if (facilitationAmount) {
                let percentageAmmount = (parseFloat(servicePayment.tasksDerived) * parseFloat(facilitationCharge.percentage)) / 100;
                facilitationCharge.derivedAmount = percentageAmmount + parseFloat(servicePayment.tasksDerived);
              }
            }
            this.setState({
              servicePayment: servicePayment,
              facilitationCharge: facilitationCharge
            });
          }
          break;
        default:
        // do nothing
      }
    }
    this.setState({servicePayment: servicePayment});
  }

  /**
   * Method :: saveServicePaymentDetails
   * Desc ::
   */
  saveServicePaymentDetails() {
    console.log('---hi Save--');
  }
  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render() {
    const steps =
      [
        {
          name: 'Create',
          component: <MlServiceCardStep1 data={this.state.data}/>,
          icon: <span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Select Tasks',
          component: <MlServiceCardStep2 data={this.state.data}
                                         optionsBySelectService={this.optionsBySelectService}
                                         profileId={this.props.profileId}
                                         serviceId={this.props.serviceId} />,
          icon: <span className="ml fa fa-users"></span>
        },
        {name: 'Terms & Conditions',
          component: <MlServiceCardStep3 data={this.state.data} />,
          icon: <span className="ml ml-payments"></span>},
        {name: 'Payment',
          component: <MlServiceCardStep4 data={this.state.data}
                                         chargeType={this.state.chargeType}
                                         checkChargeStatus={this.checkChargeStatus}
                                         calculateCharges={this.calculateCharges}
                                         saveServicePaymentDetails={this.saveServicePaymentDetails} />,
          icon: <span className="ml ml-payments"></span>
        }
      ]
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="clearfix"/>
           <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
