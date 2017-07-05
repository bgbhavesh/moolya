/** ************************************************************
 * Date: 22 Jun, 2017
 * Programmer: Pankaj <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the task basic info
 * JavaScript XML file MlAppTaskCreate.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from "react";
import ScrollArea from "react-scrollbar";
import {findTaskActionHandler} from "../actions/saveCalanderTask";
import MlLoader from "../../../../../commons/components/loader/loader";
import _ from "lodash";
let Select = require('react-select');

export default class MlAppTaskCreate extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {}
    };
    return this;
  }

  /**
   * Component Did Mount
   * Desc :: Initialize js float
   */
  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  /**
   * Component Wil Mount
   * Desc :: Initialize js float
   */
  componentWillMount() {
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    if (taskId) {
      var response = await findTaskActionHandler(taskId);
      if (!_.isEmpty(response)) {
        this.setState({loading: false, data: response});
      }
      return response
    } else {
      this.setState({loading: false});
    }
  }

  onFrequencySelect(val) {
    let details = this.state.data;
    let name = "sessionFrequency";
    details = _.omit(details, [name]);
    if (val) {
      details = _.extend(details, {[name]: val.value});
      this.setState({data: details}, function () {
        this.sendTaskDataToParent()
      })
    } else {
      this.setState({data: details}, function () {
        this.sendTaskDataToParent()
      })
    }
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    let value = e.target.value
    if(e.target.value== 'true'){
      value = e.target.checked
    }
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: value});
    this.setState({data: details}, function () {
      this.sendTaskDataToParent()
    })
  }

  onStatusChange(e) {
    let details = this.state.data;
    let name = 'isActive';
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.currentTarget.checked});
    this.setState({data: details}, function () {
      this.sendTaskDataToParent()
    })
  }

  sendTaskDataToParent() {
    let data = this.state.data;
    this.props.getCreateDetails(data);
  }

  render() {
    let sessionFrequencyOptions = [
      {value: 'weekly', label: 'Weekly'},
      {value: 'monthly', label: 'Monthly'},
      {value: 'daily', label: 'Daily'}
    ]
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {showLoader === true ? ( <MlLoader/>) : (
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Task Name" name="name" defaultValue={this.state.data.name}
                           className="form-control float-label" onBlur={this.handleBlur.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <div className="input_types">
                      <input id="checkbox1" type="checkbox" value={true} name="isInternal"
                             defaultChecked={this.state.data.isInternal}
                             onChange={this.handleBlur.bind(this)}/><label
                      htmlFor="radio1"><span><span></span></span>Internal</label>
                    </div>
                    <div className="input_types">
                      <input id="checkbox1" type="checkbox" name="isExternal" value={true}
                             defaultChecked={this.state.data.isExternal}
                             onChange={this.handleBlur.bind(this)}/><label
                      htmlFor="radio2"><span><span></span></span>External</label>
                    </div>
                    <br className="brclear"/>
                  </div>
                  <div className="form-group">
                    <label>Total number of Sessions Rs. <input className="form-control inline_input medium_in"
                                                               type="Number" min="0"
                                                               defaultValue={this.state.data.noOfSession}
                                                               name="noOfSession" onBlur={this.handleBlur.bind(this)}/>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Duration: &nbsp; <input className="form-control inline_input" type="Number" disabled="true"
                                                   defaultValue={this.state.data.duration ? this.state.data.duration.hours : 0}
                                                  /> Hours <input
                      className="form-control inline_input" disabled="true" type="Number" min="0"
                      defaultValue={this.state.data.duration ? this.state.data.duration.minutes : 0}/>
                      Mins </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label"
                           name="displayName"
                           defaultValue={this.state.data.displayName} onBlur={this.handleBlur.bind(this)}/>
                  </div>
                  <div className="form-group">
                  <textarea placeholder="Notes" className="form-control float-label" defaultValue={this.state.data.note}
                            name="note" id="cl_about" onBlur={this.handleBlur.bind(this)}>
                  </textarea>
                  </div>
                  <span className="placeHolder active">Frequency</span>
                  <Select className="form-control" options={sessionFrequencyOptions}
                          value={this.state.data.sessionFrequency} onChange={this.onFrequencySelect.bind(this)}/>
                  <div className="form-group">
                    <div className="input_types">
                      <input id="checkbox1" type="checkbox" name="isServiceCardEligible" value={true}
                             defaultChecked={this.state.data.isServiceCardEligible}
                             onBlur={this.handleBlur.bind(this)}/>
                      <label htmlFor="radio1"><span><span></span></span>Eligible
                        for service card</label>
                    </div>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label className="">Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data.isActive}
                             onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                </form>
              </div>
            </div>
          </ScrollArea>)}
      </div>
    )
  }
};
// onBlur={this.taskDuration.bind(this)}
