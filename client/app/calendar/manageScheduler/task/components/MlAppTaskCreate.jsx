import React, {Component} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import _ from "lodash";
let Select = require('react-select');

export default class MlAppTaskCreate extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {}
    }
    this.handleBlur.bind(this);
    this.taskDuration.bind(this)
    return this;
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
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

  taskDuration(e) {
    let details = this.state.data;
    let name = 'duration';
    let duration = {
      hours: this.refs.hours.value,
      minutes: this.refs.minutes.value
    }
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: duration});
    this.setState({data: details}, function () {
      this.sendTaskDataToParent()
    })
  }

  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.target.value});
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
      {value: 'monthly', label: 'Monthly'}
    ]
    return (
      <div className="step_form_wrap step1">
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
                    <input id="radio1" type="radio" value={true} name="isInternal" onBlur={this.handleBlur.bind(this)}/><label
                    htmlFor="radio1"><span><span></span></span>Internal</label>
                  </div>
                  <div className="input_types">
                    <input id="radio2" type="radio" name="isExternal" value={true} onBlur={this.handleBlur.bind(this)}/><label
                    htmlFor="radio2"><span><span></span></span>External</label>
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <label>Total number of Sessions Rs. <input className="form-control inline_input medium_in"
                                                             type="Number" min="0"
                                                             name="noOfSession" onBlur={this.handleBlur.bind(this)}/>
                  </label>
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp; <input className="form-control inline_input" ref="hours" type="Number" min="0"
                                                 onBlur={this.taskDuration.bind(this)}/> Hours <input
                    className="form-control inline_input" ref="minutes" type="Number" min="0"
                    onBlur={this.taskDuration.bind(this)}/>
                    Mins </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Display Name" className="form-control float-label" name="displayName"
                         defaultValue={this.state.data.displayName} onBlur={this.handleBlur.bind(this)}/>
                </div>
                <div className="form-group">
                  <textarea placeholder="Notes" className="form-control float-label" defaultValue={this.state.data.note}
                            name="note" id="cl_about" onBlur={this.handleBlur.bind(this)}>
                  </textarea>
                </div>
                {/*<div className="form-group">*/}
                <span className="placeHolder active">Frequency</span>
                <Select className="form-control" options={sessionFrequencyOptions}
                        value={this.state.data.sessionFrequency} onChange={this.onFrequencySelect.bind(this)}/>
                {/*</div>*/}
                <div className="form-group">
                  <div className="input_types">
                    <input id="radio1" type="radio" name="isServiceCardEligible" value={true}
                           onBlur={this.handleBlur.bind(this)}/>
                    <label htmlFor="radio1"><span><span></span></span>Eligible
                      for service card</label>
                  </div>
                </div>
                <br className="brclear"/>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
