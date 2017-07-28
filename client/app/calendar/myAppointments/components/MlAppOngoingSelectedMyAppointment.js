/**
 * Parent component for selected ongoing my appointment
 * @Author :: Birendra Kumar
 * @Dated :: 24/07/2017
 */

// import NPM module(s)
import React, {Component} from "react";
import Moment from "moment";
import _ from 'lodash';

// import custom method(s) and component(s)
import StepZilla from '../../../../commons/components/stepzilla/StepZilla';
import MlAppOngoingMyAppointmentServiceBasicInfo from './MlAppOngoingMyAppointmentServiceBasicInfo';
import MlAppOngoingMyAppointmentSession from './MlAppOngoingMyAppointmentSession';
import MlAppOngoingMyAppointmentInfo from './MlAppOngoingMyAppointmentInfo';
import {fetchServiceByServiceId} from '../actions/fetchOngoingAppointments';


export default class MlAppOngoingSelectedMyAppointment extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {
      service: {}
    };
    this.serviceId = this.props.appointment.serviceId;
    this.getServiceDetails = this.getServiceDetails.bind(this);
    this.setServiceSteps = this.setServiceSteps.bind(this);
  }

  componentWillMount() {
    this.getServiceDetails();
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
    const {appointment} = this.props;
    const {service, daysRemaining} = this.state;
    const steps = [
      {
        name: 'Services',
        component: <MlAppOngoingMyAppointmentServiceBasicInfo
          service={service}
          daysRemaining={daysRemaining}
          appointment={appointment} />,
        icon: <span className=""></span>
      },
      {
        name: 'Sessions',
        component: <MlAppOngoingMyAppointmentSession
          service={service}
          appointment={appointment}/>,
        icon: <span className=""></span>
      },
      {
        name: 'Info',
        component: <MlAppOngoingMyAppointmentInfo
          service={service}
          appointment={appointment}/>,
        icon: <span className=""></span>
      }

    ];
    return steps;
  }

  /**
   * Method :: getServiceDetails
   * Desc   :: fetch the current service details from server and set in state
   * @returns Void
   */
  async getServiceDetails() {
    if (this.props.appointment.serviceId) {
      let service = await fetchServiceByServiceId(this.serviceId, this.props.appointment.sessionId);
      let validTillDate = Date.parse(service.validTill);
      let currentDate = new Date();
      let remainingDate = Math.floor((validTillDate - currentDate) / (1000 * 60 * 60 * 24));
      remainingDate = isNaN(remainingDate) ? '' : remainingDate;
      this.setState({
        service: service || {},
        daysRemaining: remainingDate
      });
    }
  }

  /**
   * Method :: showResponseMsg
   * Desc :: Show to error(s) or success(es) msg
   * @param response :: server response
   */
  showResponseMsg(response, msg) {
    if (response.success) {
      toastr.success(msg);
    } else {
      toastr.error(response.result);
    }
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
