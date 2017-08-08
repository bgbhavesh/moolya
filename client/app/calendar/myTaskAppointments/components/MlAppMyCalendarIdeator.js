/** *************************************************************
 * @Author: Birendra Kr
 * @Dated: 07 Aug, 2017
 * Description : This will manage the task basic info
 * JavaScript XML file MlAppTaskCreate.jsx
 * ****************************************************************/

/**
 * Imports libs and components
 */
import React, {Component} from "react";
import ScrollArea from "react-scrollbar";
import gql from 'graphql-tag'
import _ from "lodash";
import Moolyaselect from  '../../../commons/components/MlAppSelectWrapper'
let Select = require('react-select');
import {
  createInternalAppointmentInfo
} from '../actions/MlAppointmentActionHandler';

export default class MlAppMyCalendarIdeator extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {
      selfInternalAppointmentInfo: {},
      appointmentTaskInfo: {
        profileId: '',
        name: '',
        mode: 'online',
        about: '',
        industries: [],
        conversation: [],
        duration: {hours: '', minutes: ''},
        frequency: '',
        expectedInput: '',
        expectedOutput: ''
      }
    };
    this.sessionFrequencyOptions = [
      {value: 'weekly', label: 'Weekly'},
      {value: 'monthly', label: 'Monthly'},
      {value: 'daily', label: 'Daily'}
    ];
    this.options = [
      {value: 'audio', label: 'Audio'},
      {value: 'video', label: 'Video'},
      {value: 'meetup', label: 'MeetUp'}
    ];
  }

  /**
   * Component Did Mount
   * Desc :: Initialize js float
   */
  componentDidMount() {
    // $('.float-label').jvFloat();
    // var WinHeight = $(window).height();
    // $('.step_form_wrap').height(WinHeight - (240 + $('.app_header').outerHeight(true)));
  }

  onChangeSlider(event) {
    let {appointmentTaskInfo} = this.state;
    if(event.target.checked){
      appointmentTaskInfo.mode = 'offline';
    } else {
      appointmentTaskInfo.mode = 'online';
    }
    this.setState({
      appointmentTaskInfo: appointmentTaskInfo
    });
  }
  /**
   * Method :: selectIndustry
   * Desc   :: update industry data in state
   * @param value :: Object :: Selected industries
   * @returns Void
   */
  selectIndustry(value) {
    let appointmentTaskInfo = this.state.appointmentTaskInfo;
    appointmentTaskInfo.industries = value;
    this.setState({
      appointmentTaskInfo: appointmentTaskInfo
    });
  }

  /**
   * Method :: updateConversation
   * Desc   :: update conversation data in state
   * @param value :: Object :: Selected conversation types
   * @returns Void
   */
  selectConversation(value) {
    let appointmentTaskInfo = this.state.appointmentTaskInfo;
    appointmentTaskInfo.conversation = value.map((data) => {
      return data.value;
    });
    this.setState({
      appointmentTaskInfo: appointmentTaskInfo
    });
  }

  /**
   * Method :: updateDuration
   * Desc   :: update state duration data
   * @param evt  :: Object :: javascript event object
   * @param type :: String :: type of duration hours or minutes
   * @returns Void
   */
  updateDuration(evt, type){
    if(evt.target.value >= 0 ) {
      let appointmentTaskInfo = this.state.appointmentTaskInfo;
      appointmentTaskInfo.duration[type] = evt.target.value;
      this.setState({
        appointmentTaskInfo: appointmentTaskInfo
      });
    }
  }
  onFrequencySelect(val) {
    let appointmentTaskInfo = this.state.appointmentTaskInfo;
    let name = "frequency";
    appointmentTaskInfo = _.omit(appointmentTaskInfo, [name]);
    if (val) {
      appointmentTaskInfo = _.extend(appointmentTaskInfo, {[name]: val.value});
      this.setState({appointmentTaskInfo: appointmentTaskInfo});
    } else {
      this.setState({appointmentTaskInfo: appointmentTaskInfo});
    }
  }
  onChangeFormField(event) {
    const {appointmentTaskInfo} = this.state;
    const {id, value} = event && event.target;
    appointmentTaskInfo[id] = value || '';
    this.setState({appointmentTaskInfo: appointmentTaskInfo});
  }

  async saveInternalAppointmentInfo() {
    let {selfInternalAppointmentInfo, appointmentTaskInfo} = this.state;
    appointmentTaskInfo.profileId = 'MLPRO00000064';
    selfInternalAppointmentInfo = {
      hours: 1,
      minutes: 2,
      day: 4,
      month: 9,
      year: 2017,
      taskDetails: appointmentTaskInfo
    };
    const resp = await createInternalAppointmentInfo(selfInternalAppointmentInfo);
    if (resp && resp.success) {
      toastr.success('Created successfully');
    }
  }
  render() {
    const that = this;
    const {appointmentTaskInfo} = this.state;
    /**
     * fetch industries graphql query
     */
    let industryTypeQuery = gql` query{
                               data:fetchIndustries{label:industryName,value:_id}
                                  }`;
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <label>Create a task</label><br className="brclear" /><br className="brclear" />
                <div className="form-group switch_wrap switch_names">
                  <span className={appointmentTaskInfo.mode === 'online' ? 'state_label acLabel' : 'state_label'}>Online</span>
                  <label className="switch nocolor-switch">
                    <input type="checkbox"
                           value={appointmentTaskInfo.mode}
                           checked={appointmentTaskInfo.mode !== 'online'}
                           onChange={(event) => this.onChangeSlider(event)} />
                    <div className="slider"></div>
                  </label>
                  <span className={appointmentTaskInfo.mode === 'offline' ? 'state_label acLabel' : 'state_label'}>Offline</span>
                </div><br className="brclear"/>
                <div className="form-group">
                  <input type="text"
                         placeholder="Name"
                         className="form-control float-label"
                         id="name"
                         value={appointmentTaskInfo.name}
                         onChange={(event) => this.onChangeFormField(event)} />
                </div>
                <div className="form-group">
                  <label>About<textarea className="form-control float-label"
                                        id="about"
                                        onChange={(event) => this.onChangeFormField(event)}
                                        value={appointmentTaskInfo.about}></textarea>
                  </label>
                </div>
                <div className="form-group">
                  <label>Time: &nbsp;
                    <input type="Number" onChange={(evt)=>that.updateDuration(evt , 'hours')} value={appointmentTaskInfo.duration.hours ? appointmentTaskInfo.duration.hours : '' }  className="form-control inline_input"/>
                    Hours



                    <input type="Number" onChange={(evt)=>that.updateDuration(evt , 'minutes')} value={appointmentTaskInfo.duration.minutes ? appointmentTaskInfo.duration.minutes : '' }  className="form-control inline_input"/>
                    Mins
                  </label>
                </div>
                <div className="form-group">
                  <label>Expected intput<textarea className="form-control float-label"
                                                  id="expectedInput"
                                                  onChange={(event) => this.onChangeFormField(event)}
                                                  value={appointmentTaskInfo.expectedInput}></textarea>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <br className="brclear" />
                <br className="brclear" />
                <Moolyaselect multiSelect={true}
                              className="form-control float-label"
                              valueKey={'value'}
                              labelKey={'label'}
                              queryType={"graphql"}
                              query={industryTypeQuery}
                              isDynamic={true} placeholder="Select Industry Type"
                              onSelect={that.selectIndustry.bind(that)}
                              selectedValue={appointmentTaskInfo.industries}
                />
                <br className="brclear" />
                <div className="form-group">
                  <span className="placeHolder active">Conversation type</span>
                  <div className="form-group">
                    <Select name="form-field-name"
                            multi={true}
                            disabled={false}
                            valueKey={'value'}
                            labelKey={'label'}
                            options={this.options}
                            value={appointmentTaskInfo.conversation}
                            placeholder='Conversation Type'
                            onChange={this.selectConversation.bind(this)} />
                  </div>
                </div>
                <br className="brclear" />
                <div className="form-group">
                  <Select className="form-field-name" options={this.sessionFrequencyOptions} placeholder="Frequency"
                          value={appointmentTaskInfo.frequency} onChange={this.onFrequencySelect.bind(this)}/>
                </div>
                <div className="form-group">
                  <label>Expected output<textarea className="form-control float-label"
                                                  id="expectedOutput"
                                                  onChange={(event) => this.onChangeFormField(event)}
                                                  value={appointmentTaskInfo.expectedOutput}></textarea>
                  </label>
                </div>
                <br className="brclear"/>
              </form>
              <div className="form-group">
                <div className="ml_btn" style={{'textAlign':'center'}}>
                  <button onClick={()=>this.saveInternalAppointmentInfo()} className="save_btn" >Save</button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
// onBlur={this.taskDuration.bind(this)}
