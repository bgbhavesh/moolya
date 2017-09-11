/**
 * Created by pankaj on 29/8/17.
 */

import React, { Component } from 'react';
import {fetchSlotAppointmentsDetailsActionHandler} from './../actions/fetchSlotAppointmentsDetails';
import CDNImage from "../../../../commons/components/CDNImage/CDNImage";

export default class MlAppSlotAppointmentDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      appointmentsInfo: []
    };
    console.log('props', props);
  }
  componentDidMount() {
    $(function() {
      $('.float-label').jvFloat();
    });
    var WinWidth = $(window).width();
    if(WinWidth > 768){
      $(".app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
    }
    this.fetchAppointments();
  }

  async fetchAppointments() {
    let appointmetnIds = this.props.appointmentIds;
    let response = await fetchSlotAppointmentsDetailsActionHandler(appointmetnIds);
    if(response){
      this.setState({
        appointmentsInfo: response
      })
    }
  }

  render(){
    const that = this;
    const props = this.props;
    console.log(that.state.appointmentsInfo);
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12"></div>
          { that.state.appointmentsInfo.map((data, index) => {
            let appointmentType = data.appointmentType === "SERVICE-TASK" ? "External" : "Internal";
            data.attendeeDetails = data.attendeeDetails ? data.attendeeDetails : [];
            let user = data.attendeeDetails.find((attendee) => {
              if(data.appointmentType === "SERVICE-TASK"){
                return attendee.isClient
              } else {
                return attendee.isProvider
              }
            });
            user = user ? user : {};
            return(
              <div className="col-md-6" key={index}>
                <div className="panel panel-default cal_view_task pending">
                  <div className="panel-heading">{data && data.userCommunityName ? data.userCommunityName[0] : ""}<span className="pull-right">Status : <b className="status">{data.status}</b></span></div>
                  <div className="panel-body">
                    <div className="col-md-12 nopadding">
                      <div className="col-md-3 nopadding text-center">
                        {user.profileImage ? <img src={user.profileImage} className="image"/> : <CDNImage src='/images/img2.png' className="image"/> }
                        <div className="">
                          <span>{`${user.firstName} ${user.lastName}`}</span>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <br />
                        <div className="form-group">
                          <input type="text" placeholder="Task Type" defaultValue={appointmentType} className="form-control float-label" id="" disabled/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Task Name" defaultValue={data.taskName} className="form-control float-label" id="" disabled/>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 naopadding att_members" >
                      <ul className="users_list">
                        {data.attendeeDetails?data.attendeeDetails.map(function(info){
                          if( data.appointmentType === "SERVICE-TASK" && info.isClient ) {
                            return;
                          } else if (data.appointmentType !== "SERVICE-TASK" && info.isProvider) {
                            return;
                          }
                          return(
                            <li>
                              <a href="">
                                {info.profileImage ? <img src={info.profileImage} /> : <CDNImage src='/images/img2.png'/> }
                                <br />
                                <div className="tooltiprefer">
                                  <span>{`${info.firstName} ${info.lastName}`}</span>
                                </div>
                              </a>
                            </li>
                          )
                        }):<div></div>}
                      </ul>
                    </div>
                    <div className="col-md-12 nopadding">
                      <div className="ml_btn">
                        <a href="" id="save_contact" className="save_btn">Call</a>
                        {
                          props.isView ?
                            <a href="" onClick={()=>props.viewEvent(data)} className="cancel_btn">View</a>
                          : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
};
