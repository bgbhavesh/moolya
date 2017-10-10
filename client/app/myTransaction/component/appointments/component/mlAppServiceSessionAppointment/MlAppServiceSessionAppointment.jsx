import React, { Component } from 'react';
import { fetchAppAppointmentByTransactionId } from '../../action/fetchAppointment';
import MlAppSelectedTaskMyAppointment from '../../../../../calendar/myAppointments/components/mlAppInternalTaskAppointment/MlAppSelectedTaskMyAppointment';
import AppointmentSes from './../mlAppServicePurchasedDetail/appointmentSession';
import { getSessionDayAvailable } from './../../action/getSessionDayAvailable';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import moment from "moment";
import { rescheduleUserServiceCardAppointment } from '../../action/rescheduleSessionAppointment';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';


class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedSlot: {}
    }
  }

  showAlert(slot) {
    this.setState({
      showModal: true,
      selectedSlot: slot
    })
    // const shouldAllow = confirm(`Do you want to book a slot at ${slot.slotTime}`);
    // if (shouldAllow) {
    //   this.props.updateSession(slot);
    // }
  }

  render() {
    let slots = [];
    let slotIndex = -1;
    this.props.availableSlots.forEach((slot, index) => {
      if (index % 4 === 0) {
        slotIndex++;
        if (!slots[slotIndex])
          slots[slotIndex] = [];
      }
      slots[slotIndex].push(slot);
    });
    const currentDateString = new Date().toLocaleDateString();
    return (
      <div>
        <Modal isOpen={this.state.showModal} onHide={this.onClose}>
          <ModalBody>
            <div>Are you sure to reschedule the session?</div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.props.updateSession(this.state.selectedSlot); this.setState({ showModal: false, selectedSlot: {} }); }}>Ok</Button>{' '}
            <Button color="secondary" onClick={() => this.setState({ showModal: false, selectedSlot: {} })}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div>
          {
            !this.props.showLoading &&
            <div>
              <table className="table table-bordered">
                <tbody>
                  {
                    slots.map((list, index) => {
                      return (
                        <tr key={index}>
                          {
                            list.map((slot, i) => {
                              return (
                                <td key={i} onClick={() => { this.showAlert(slot) }}>
                                  {currentDateString} <br />
                                  {slot.slotTime}
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

            </div>
          }
          {
            this.props.showLoading && <span> Loading...</span>
          }
        </div>
      </div>
    )
  }
}

export default class MlAppServiceSessionAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: props.orderId,
      docId: props.docId,
      selectedDate: moment(),
      showSession: false,
      loadingSlots: false,
      data: {
        appointmentInfo: {},
        client: {},
        service: {},
        owner: {},
        sessionInfo: [],
        availableSlots: []
      }
    };
    this.fetchServiceSessionAppointments = this.fetchServiceSessionAppointments.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.updateSession = this.updateSession.bind(this);
  }

  componentWillReceiveProps({ orderId, docId }) {
    this.setState({ orderId, docId }, () => {
      this.fetchServiceSessionAppointments();
    })
  }

  componentWillMount() {
    this.fetchServiceSessionAppointments();
  }

  async updateSession(slot) {
    const startTime = slot.slotTime.split('-')[0];
    const startHour = Number(startTime.split(':')[0]);
    const startMinutes = Number(startTime.split(':')[1]);
    let response = await rescheduleUserServiceCardAppointment(this.state.docId, {
      orderId: this.state.data.appointmentInfo.serviceOrderId,
      sessionId: this.state.data.appointmentInfo.sessionId,
      hours: startHour,
      minutes: startMinutes,
      day: this.state.selectedDate.get('date'),
      month: this.state.selectedDate.get('month'),
      year: this.state.selectedDate.get('year')
    });
    if (response && response.success) {
      toastr.success(response.result);
      this.setState({
        showSession: false
      })
    } else {
      toastr.error(response.result);
    }
  }

  async changeDate(event) {
    const that = this;
    if (event._d) {
      let value = new moment(event._d);
      this.setState({ selectedDate: value, loadingSlots: true });
      const availableSlots = await getSessionDayAvailable(
        this.state.data.appointmentInfo.serviceOrderId,
        this.state.data.appointmentInfo.sessionId,
        value.get('date'),
        value.get('month'),
        value.get('year')
      );
      let stateCopy = this.state;
      stateCopy.data.availableSlots = availableSlots ? availableSlots : [];
      stateCopy.loadingSlots = false;
      this.setState(stateCopy);
    }
  }

  async fetchServiceSessionAppointments() {
    if (this.state.orderId) {
      let response = await fetchAppAppointmentByTransactionId(this.state.orderId);

      if (response && response.success) {
        let data = JSON.parse(response.result);
        data = data[0] ? data[0] : {};
        data.client = data.client ? data.client : {};
        data.owner = data.owner ? data.owner : {};
        data.sessionInfo = data.sessionInfo ? data.sessionInfo : [];
        data.service = data.service ? data.service : {};
        data.appointmentInfo = data.appointmentInfo || {};
        let availableSlots = await getSessionDayAvailable(
          data.appointmentInfo.serviceOrderId,
          data.appointmentInfo.sessionId,
          new Date().getDate(),
          new Date().getMonth(),
          new Date().getFullYear()
        )
        data.availableSlots = availableSlots ? availableSlots : [];
        this.setState({
          data,
          loadingSlots: false
        });
      }
    }
  }

  render() {
    return (
      <div>
        {!this.state.showSession &&
          <div className="ml_tabs">
            <ul className="nav nav-pills">
              <li className="active">
                <a href={`#${this.state.orderId}1a`} data-toggle="tab">Details</a>
              </li>
              <li>
                <a href={`#${this.state.orderId}2a`} data-toggle="tab">Activity Log</a>
              </li>
              <li>
                <a href={`#${this.state.orderId}3a`} data-toggle="tab">Service Details</a>
              </li>
              {/*<li>*/}
              {/*<a href={`#${this.state.orderId}4a`} data-toggle="tab">Device Details</a>*/}
              {/*</li>*/}
            </ul>
            <div className="tab-content clearfix">
              <div className="tab-pane active" id={`${this.state.orderId}1a`}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="User Id" value={this.state.data.client.userId} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Transaction Id" value={this.state.data.service.transactionId} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Date & Time" value={this.state.data.createdAt} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Name" value={this.state.data.client.name} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Email ID" value={this.state.data.client.email} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Phone no" value={this.state.data.client.phoneNo} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Cluster" value={this.state.data.client.cluster} defaultValue="" className="form-control float-label" id="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="Chapter" value={this.state.data.client.chapter} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Sub Chapter" value={this.state.data.client.subChapter} defaultValue="Moolya" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Community" value={this.state.data.client.community} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="panel panel-default cancel_app" style={{ 'display': 'none' }}>
                      <div className="panel-heading">Cancel an appointment</div>
                      <div className="panel-body">
                        <h4 className="text-center">Ae you sure do you want to cancel an<br /> appointment?</h4>
                        <div className="form-group">
                          <textarea placeholder="Enter he reason" className="form-control float-label" id=""></textarea>
                        </div>
                        <br className="brclear" />
                        <div className="form-group ">
                          <div className="input_types">
                            <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>I agree to the Tearms & Conitions </label>
                          </div>
                        </div>
                        <a href="#" className="fileUpload mlUpload_btn cancel_send">Send</a> <a href="#" className="fileUpload mlUpload_btn cancel_cancel">Cancel</a>
                      </div>
                    </div>
                    <div className="panel panel-default release_pay" style={{ 'display': 'none' }}>
                      <div className="panel-heading">Release Payment</div>
                      <div className="panel-body">
                        <h4>Total amount paid : <b>5,700 INR</b></h4>
                        <div className="form-group">
                          <div className="input_types">
                            <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Release Payment </label>
                          </div>
                        </div>
                        <br className="brclear" />
                        <h4 className="text-left">Select Release type</h4>
                        <div className="form-group">
                          <div className="input_types">
                            <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Full</label>
                          </div>
                          <div className="input_types">
                            <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Partial</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Enter Units" defaultValue="Hyderabad" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <textarea placeholder="Reason" className="form-control float-label" id=""></textarea>
                        </div>

                        <a href="#" className="fileUpload mlUpload_btn release_send">Send</a> <a href="#" className="fileUpload mlUpload_btn release_cancel">Cancel</a>
                      </div>
                    </div>
                    <div className="final_btns">
                      <a href="#" className="fileUpload mlUpload_btn final_cancel">Cancel</a>
                      <a onClick={() => { this.setState({ showSession: true }) }} className="fileUpload mlUpload_btn final_sign">Modify</a>
                    </div>
                  </div>

                </div>
              </div>
              <div className="tab-pane" id={`${this.state.orderId}2a`}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="Appointment Id" value={this.state.orderId} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Appointment date & Time" value={this.state.data.createdAt} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Transaction Id" value={this.state.data.service.transactionId} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Appointment With" value={this.state.data.owner.name} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="User ID" value={this.state.data.owner.profileId} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Community" value={this.state.data.owner.community} defaultValue="" className="form-control float-label" id="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="Sub Chapter" value={this.state.data.owner.subChapter} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Chapter" value={this.state.data.owner.chapter} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Cluster" value={this.state.data.owner.cluster} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Contact Number" value={this.state.data.owner.phoneNo} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Email ID" value={this.state.data.owner.email} defaultValue="" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Gender" value={this.state.data.owner.gender} defaultValue="" className="form-control float-label" id="" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="tab-pane" id={`${this.state.orderId}3a`}>
                {/* <p>Take from this page "appFunderMyAppointment"</p> */}
                <MlAppSelectedTaskMyAppointment appointment={{
                  appointmentId: this.state.orderId,
                  resourceId: this.state.data.appointmentInfo.taskId,
                  sessionId: this.state.data.appointmentInfo.sessionId
                }} />
              </div>
              <div className="tab-pane" id={`${this.state.orderId}4a`}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="Device name" defaultValue="Ipad air 2" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device ID" defaultValue="L8125#585" className="form-control float-label" id="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" placeholder="Device IP" defaultValue="10.20.1.6" className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="IP Location" defaultValue="Hyderabad" className="form-control float-label" id="" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        }
        {
          this.state.showSession &&
          <div>
            <div className="col-md-4">
              <Datetime
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                inputProps={{ placeholder: "Selected date", readOnly: true }}
                value={this.state.selectedDate
                  ? moment(this.state.selectedDate).format('DD-MM-YY')
                  : ''}
                onChange={(event) => this.changeDate(event)}
              />
              <FontAwesome name="calendar" className="password_icon" />
            </div>
            <a href
              onClick={() => { this.setState({ showSession: false }) }}
              className="fileUpload mlUpload_btn cancel_send">
              Cancel</a>
            <SessionTable
              showLoading={this.state.loadingSlots}
              availableSlots={this.state.data.availableSlots}
              updateSession={this.updateSession} />
          </div>
        }
      </div>
    )
  }
}
