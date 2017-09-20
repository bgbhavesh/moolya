import React, { Component } from 'react';
import SessionAppointmentInfo from './MlAppServiceSessionAppointmentnfo';

export default class MlAppServiceSessionAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: '1'
    };

  }

  componetWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
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
          <li>
            <a href={`#${this.state.orderId}4a`} data-toggle="tab">Device Details</a>
          </li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`${this.state.orderId}1a`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" defaultValue="moo1234" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction Id" defaultValue="Tr12345678" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Name" defaultValue="Varun K" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" defaultValue="varun.k@gmail.com" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Phone no" defaultValue="9848565852" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" defaultValue="India" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Chapter" defaultValue="Hyderabad" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" defaultValue="Moolya" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" defaultValue="Funder" className="form-control float-label" id="" />
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
                  <a href="#" className="fileUpload mlUpload_btn final_cancel">Cancel</a> <a href="#" className="fileUpload mlUpload_btn final_sign">Sign Off</a>
                </div>
              </div>

            </div>
          </div>
          <div className="tab-pane" id={`${this.state.orderId}2a`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Appointment Id" defaultValue="moo1234" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Appointment date & Time" defaultValue="27th May 2016, 10:30:00 AM IST" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction Id" defaultValue="Moo2132" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Appointment With" defaultValue="Varun K" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="User ID" defaultValue="moo1234" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" defaultValue="Service Provider" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" defaultValue="Moolya" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" defaultValue="Hyderabad" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" defaultValue="India" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Contact Number" defaultValue="984826565" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" defaultValue="moolya@gmail.com" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Gender" defaultValue="male" className="form-control float-label" id="" />
                </div>
              </div>

            </div>
          </div>
          <div className="tab-pane active" id={`${this.state.orderId}3a`}>
            <p>Take from this page "appFunderMyAppointment"</p>
          </div>
          <div className="tab-pane active" id={`${this.state.orderId}4a`}>
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
    )
  }
}