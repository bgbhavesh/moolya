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
import StepZilla from "../../../../commons/components/stepzilla/StepZilla";
import MlServiceCardStep1 from './MlServiceCardStep1';
import MlServiceCardStep2 from './MlserviceCardStep2';
import MlServiceCardStep3 from './MlServiceCardStep3';
import MlServiceCardStep4 from './MlServiceCardStep4';
import {updateServiceActionHandler} from '../actions/mlFindService';
import {getAdminUserContext} from '../../../../commons/getAdminUserContext'


export default class MlServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || {}
    };
    this.errorMsg = '';
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
    this.setState({ data: data });
  }

  /**
   * Method :: checkChargeStatus
   * Desc :: Check the charges(amount or percent)
   */
  checkChargeStatus(event) {
    let { data } = this.state;
    data.facilitationCharge.type = event.target.id;
    data.facilitationCharge.amount = 0;
    if (data.facilitationCharge.type && data.facilitationCharge.amount <= 0) {
      data.finalAmount = data.servicePayment.tasksDerived;
      if (data.servicePayment.discountValue > 0 ) {
        if (data.servicePayment.discountType === 'amount') {
          data.finalAmount -= parseInt(data.servicePayment.discountValue);
        } else if (data.servicePayment.discountType === 'percent') {
          let prevAmount =  (parseInt(data.servicePayment.tasksDerived) * parseInt(data.servicePayment.discountValue) / 100);
          data.finalAmount -= prevAmount;
        }
      }
    }
    this.setState({data: data});
  }

  /**
   * Method :: calculateCharges
   * Desc :: Calculate the charges as per charge type
   */
  calculateCharges(event) {
    let {data} = this.state;
    data.finalAmount = data.servicePayment.tasksDerived;
    data.facilitationCharge.amount = 0;
    this.errorMsg = '';
    switch (data.facilitationCharge.type) {
      case 'amount':
        if (isNaN(event.target.value)) {
          this.errorMsg = 'Please enter a valid number';
          toastr.error(this.errorMsg);
        } else if (parseInt(event.target.value) >= 0) {
          data.facilitationCharge.amount = event.target.value;
          let facilitationAmount = data.facilitationCharge.amount ? parseInt(data.facilitationCharge.amount) : 0;
          data.finalAmount = parseInt(data.servicePayment.tasksDerived) + parseInt(facilitationAmount);
        }
        break;
      case 'percent':
        if (isNaN(event.target.value)) {
          this.errorMsg = 'Please enter a valid number';
          toastr.error(this.errorMsg);
        } else if (parseFloat(event.target.value) >= 0) {
          data.facilitationCharge.amount = event.target.value;
          let facilitationAmount = data.facilitationCharge.amount ? parseInt(data.facilitationCharge.amount) : 0;
          let percentageAmmount = (parseInt(data.servicePayment.tasksDerived) * parseInt(facilitationAmount)) / 100;
          data.finalAmount = percentageAmmount + parseInt(data.servicePayment.tasksDerived);
        }
        break;
      default:
      // do nothing
    }
    if (data.servicePayment.discountValue > 0 ) {
      if (data.servicePayment.discountType === 'amount') {
        data.finalAmount -= parseInt(data.servicePayment.discountValue);
      } else if (data.servicePayment.discountType === 'percent') {
        let prevAmount =  (parseInt(data.servicePayment.tasksDerived) * parseInt(data.servicePayment.discountValue) / 100);
        data.finalAmount -= prevAmount;
      }
    }
    this.setState({data: data});
  }

  /**
   * Method :: saveServicePaymentDetails
   * Desc :: Save the service
   */
  async saveServicePaymentDetails(type) {
    if (!this.errorMsg) {
      this.errorMsg = '';
      let {data} = this.state;
      let {servicePayment, finalAmount, facilitationCharge} = data;
      if ((facilitationCharge.type && facilitationCharge.amount <= 0) || !facilitationCharge.amount) {
        if (servicePayment.discountValue > 0 ) {
          finalAmount = servicePayment.tasksDerived;
          if (servicePayment.discountType === 'amount') {
            finalAmount -= parseInt(servicePayment.discountValue);
          } else if (servicePayment.discountType === 'percent') {
            let prevAmount =  (parseInt(servicePayment.tasksDerived) * parseInt(servicePayment.discountValue) / 100);
            finalAmount -= prevAmount;
          }
        }
      }
      let service = {};
      if (type === 'approved') {
        service.isApproved = true;
      } else {
        service.isApproved = false;
      }
      service.payment = servicePayment;
      service.finalAmount = finalAmount || 0;
      service.facilitationCharge = facilitationCharge;
      const response = await updateServiceActionHandler(this.props.serviceId, service);
      if (response.success) {
        data.prevFinalAmount = service.finalAmount;
        this.setState({data: data});
      }
      this.showResponseMsg(response, type);
    } else {
      toastr.error(this.errorMsg);
    }
  };

  /**
   * Method :: showResponseMsg
   * Desc :: Show to error(s) or success(es) msg
   * @param response :: server response
   */
  showResponseMsg(response, type) {
    if (response.success) {
      toastr.success(`Service card ${type} successfully`);
    } else {
      toastr.error(response.result);
    }
  }

  /**
   * Method :: setServiceSteps
   * Desc :: Sets components steps for stepzila to create and update service data
   */
  setServiceSteps() {
    const steps = [
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
                                       checkChargeStatus={this.checkChargeStatus}
                                       calculateCharges={this.calculateCharges}
                                       saveServicePaymentDetails={this.saveServicePaymentDetails} />,
        icon: <span className="ml ml-payments"></span>
      }
    ];
    return steps;
  }
  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */
  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
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
