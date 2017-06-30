/**
 * Created by pankaj on 29/6/17.
 */
import React from 'react';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import moment from 'moment';
import Datetime from "react-datetime";
import {initalizeFloatLabel} from '../../../../../admin/utils/formElemUtil';

export default class MlAppSetCalendarTimmingSettings extends React.Component{

  constructor(props) {
    super(props);
    props.timingInfo = props.timingInfo ? props.timingInfo : {};
    this.state = {
      dayName: props.timingInfo.dayName ? props.timingInfo.dayName : 0,
      isActive: (typeof props.timingInfo.isActive == undefined) ? props.timingInfo.isActive : true,
      slots: props.timingInfo.slots ? props.timingInfo.slots.map(function (data) {
        let start = data.start ? moment(data.start, 'HH:mm') : '';
        let end = data.end ?  moment(data.end, 'HH:mm') : '';
        return {
          isActive : data.isActive,
          start    : start,
          end      : end
        };
      }) : [{},{}],
      lunch: props.timingInfo.lunch ? props.timingInfo.lunch.map(function (data) {
        let start = data.start ? moment(data.start, 'HH:mm') : '';
        let end = data.end ?  moment(data.end, 'HH:mm') : '';
        return {
          isActive : data.isActive,
          start    : start,
          end      : end
        };
      }) : [{}]
    };
    console.log(props.timingInfo, this.state);
  }

  addBreak(index){
    let lunch = this.state.lunch;
    let slots = this.state.slots;
    lunch.splice(index+1, 0, {});
    slots.splice(index+2, 0, {});
    this.setState({
      lunch: lunch,
      slots: slots
    });
  }

  updateBreakIsActive(evt, index){
    let lunch = this.state.lunch;
    lunch[index]['isActive'] = evt.target.checked;
    this.setState({
      lunch: lunch
    });
  }

  updateBreakStartTime(value, index) {
    let lunch = this.state.lunch;
    lunch[index]['start'] = value;
    this.setState({
      lunch: lunch
    });
  };

  updateBreakEndTime(value, index) {
    let lunch = this.state.lunch;
    lunch[index]['end'] = value;
    this.setState({
      lunch: lunch
    });
  };

  updateSlotStartTime(value, index) {
    let slots = this.state.slots;
    slots[index]['start'] = value;
    this.setState({
      slots: slots
    });
  };

  updateSlotEndTime(value, index) {
    let slots = this.state.slots;
    slots[index]['end'] = value;
    this.setState({
      slots: slots
    });
  };

  componentDidMount() {
    initalizeFloatLabel();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }
  render(){
    const that = this;
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <br/>
          <div className="wrap_left">
            { that.state.lunch.map(function (data, index) {
              return (
                <div key={index}>
                  <div className="col-md-6 nopadding-left">
                    <div className="panel panel-default">
                      <div className="panel-heading">Selected work timings</div>
                      <div className="panel-body">
                        <div className="form-group col-md-6 nopadding-left">
                          <Datetime dateFormat={false} timeFormat={"HH:mm"}
                                    value={ that.state.slots[index].start ? ( index == 0 ? that.state.slots[index].start : that.state.slots[index].end ) : '' }
                                    onChange={(evt)=>that.updateSlotStartTime(evt, index)}
                                    inputProps={{ placeholder: 'Start time', className:"form-control float-label"}}/>
                        </div>
                        <div className="form-group col-md-6 nopadding-right">
                          <Datetime dateFormat={false} timeFormat={"HH:mm"}
                                    value={ that.state.slots[index+1] && that.state.slots[index+1].end ? that.state.slots[index+1].end : '' }
                                    onChange={(evt)=>that.updateSlotEndTime(evt, index+1)}
                                    inputProps={{ placeholder: 'End time', className:"form-control float-label"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 nopadding-right">
                    <div className="panel panel-default input_head">
                      <div className="panel-heading">
                        <div className="form-group pull-left nomargin-bottom">
                          <div className="input_types">
                            <input onChange={(evt)=>that.updateBreakIsActive(evt, index)} type="checkbox" name="check1" value="1" checked={data.isActive}/>
                            <label htmlFor="check1">
                        <span>
                          <span></span>
                        </span>
                              Set break time
                            </label>
                          </div>
                          <br className="brclear"/>
                        </div>
                        <span className="see-more pull-right"><a href="" onClick={()=>that.addBreak(index)}><FontAwesome name='plus'/></a></span>
                      </div>
                      <div className="panel-body">
                        <div className="form-group col-md-6 nopadding-left">
                          <Datetime dateFormat={false} timeFormat={"HH:mm"} value={data.start ? data.start : ''}
                                    onChange={(evt)=>that.updateBreakStartTime(evt, index)}
                                    inputProps={{ placeholder: 'Start time', className:"form-control float-label"}}/>
                        </div>
                        <div className="form-group col-md-6 nopadding-right">
                          <Datetime dateFormat={false} timeFormat={"HH:mm"} value={data.end ? data.end : ''}
                                    onChange={(evt, value)=>that.updateBreakEndTime(evt, index)}
                                    inputProps={{ placeholder: 'End time', className:"form-control float-label"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <br className="brclear"/>
            <div className="panel panel-default input_head">
              <div className="panel-heading">
                <div className="form-group pull-left nomargin-bottom">
                  <div className="input_types">
                    <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Clone the work timings</label>
                  </div>
                  <br className="brclear"/>
                </div>
              </div>
              <div className="panel-body checkbox_group">
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-primary active">
                      Monday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-success active">
                      Tuesday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-info active">
                      Wednesday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-warning active">
                      Thursday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-danger active">
                      Friday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-info active">
                      Saturday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-primary active">
                      Sunday
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group">
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default cus_btn">
                      <div className="input_types">
                        <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span></label>
                      </div>
                    </label>
                    <label htmlFor="fancy-checkbox-default" className="btn btn-default active">
                      All Days
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap_right">
            <ul>
              <li className="active">Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
              <li>Sun</li>
            </ul>
          </div>
        </ScrollArea>
      </div>
    )
  }
};

