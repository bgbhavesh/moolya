/**
 * Created by Mukhil on 20/6/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import Datetime from "react-datetime";
import moment from "moment";
import ScrollArea from 'react-scrollbar';
import {createServiceActionHandler, fetchServiceActionHandler} from '../actions/MlServiceActionHandler'
var Select = require('react-select');



var options = [
  {value: 'Weekly', label: 'Weekly'},
  {value: 'Daily', label: 'Daily'},
  {value: 'Monthly', label: 'Monthly'}
];

export default class MlAppServiceStep1 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      displayName:"",serviceName:"",frequencyType:"",validTillDate:"",status:""

    }
    this.getDetails.bind(this)
  }

  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }
componentWillMount() {
    this.getDetails()
}

async getDetails() {
    let id = FlowRouter.getQueryParam('id')
  if(id) {
    const resp = await fetchServiceActionHandler(id)
    this.setState({
      serviceName: resp.name, displayName: resp.displayName, sessionsCost: resp.noOfSession,
      frequencyType: resp.sessionFrequency, hour: resp.duration.hours, minute: resp.duration.minutes,
      status: resp.status, validTill: resp.validTill
    })
  }
}

  async saveDetails() {
    let profileId = FlowRouter.getParam('profileId')
    let services = {
      profileId: profileId,
      userId:"",
      name: this.state.serviceName,
      displayName:this.state.displayName,
      noOfSession:this.state.sessionsCost,
      sessionFrequency:this.state.frequencyType,
      duration: {
        hours:this.state.hour,
        minutes:this.state.minute
      },
      status:this.state.status,
      // validTill: this.state.validTillDate
   }
    const resp = await createServiceActionHandler(services)
    let id = resp.result;
    console.log(id)
    FlowRouter.setQueryParams({id:id})
    this.getDetails();
  }

  noOfSessions(e) {
    if(e.currentTarget.value >= 0) {
      this.setState({"sessionsCost":e.currentTarget.value});
    } else {
      this.setState({"sessionsCost":0});
    }
  }

  serviceExpires(e) {
    if(e.currentTarget.value >= 0) {
      this.setState({"serviceExpiral":e.currentTarget.value});
    } else {
      this.setState({"serviceExpiral":0});
    }
  }

  textFieldSaves(type,e){
    switch(type){
      case "ServiceName":
        let serviceNameValue = e.target.value;
        this.setState({serviceName:serviceNameValue })
        break;
      case "DisplayName":
        let displayNameValue = e.target.value;
        this.setState({displayName:displayNameValue})
        break;
    }
  }
  frequency(value) {
    this.setState({frequencyType:value.value})
  }

  updateHours(e){
    if(e.currentTarget.value >= 0) {
      this.setState({"hour":e.currentTarget.value});
    } else {
      this.setState({"hour":0});
    }
  }
  updateMinutes(e){
    if(e.currentTarget.value >= 0) {
      this.setState({"minute":e.currentTarget.value});
    } else {
      this.setState({"minute":0});
    }
  }

  validTillToggle(){
    $('#date-time').toggleClass('rdtOpen')
  }

  validTill(event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({validTillDate: value});
    }
  }
  checkBoxHandler(e){
    let value = e.target.checked;
    this.setState({status:value})
  }

  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Service Name" className="form-control float-label" id="" value={this.state.serviceName} onChange={this.textFieldSaves.bind(this,"ServiceName")}/>
                </div>
                <div className="form-group">
                  <label>Total number of Sessions Rs. <input type="text"className="form-control inline_input" onChange={(e)=>this.noOfSessions(e)} value={this.state.sessionsCost}  /> </label>
                  {/*<input type="number" className="form-control "/>*/}
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp; <input type="text" className="form-control inline_input" onChange={(e)=>this.updateHours(e)} value={this.state.hour}  /> Hours <input type="text" className="form-control inline_input" onChange={(e)=>this.updateMinutes(e)} value={this.state.minute}  /> Mins </label>
                </div>
                <div className="form-group" id="date-time">
                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "Valid Till"}}   closeOnSelect={true} value={moment(this.state.validTillDate).format('DD-MM-YYY')} onChange={this.validTill.bind(this)}/>
                  <FontAwesome name="calendar" className="password_icon"  onClick={this.validTillToggle.bind(this)}/>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Display Name" className="form-control float-label" value={this.state.displayName} onChange={this.textFieldSaves.bind(this,"DisplayName")} id=""/>
                </div>
                <span className="placeHolder active">Frequency type</span>
                <div className="form-group">
                  <Select name="form-field-name"   options={options} value={this.state.frequencyType} placeholder='Frequency Type' onChange={this.frequency.bind(this)} />
                </div>
                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" checked={this.state.status} onChange={this.checkBoxHandler.bind(this)}/>
                    <div className="slider"></div>
                  </label>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>Service expires &nbsp; <input type="text" className="form-control inline_input" onChange={(e)=>this.serviceExpires(e)} value={this.state.serviceExpiral}  /> days from the date of purchase</label>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
