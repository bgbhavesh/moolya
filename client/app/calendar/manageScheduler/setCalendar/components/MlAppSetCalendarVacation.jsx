/**
 * Created by pankaj on 5/7/17.
 */

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import ScrollArea from 'react-scrollbar';
import Datetime from "react-datetime";
import Moment from 'moment';
import { isEmpty } from 'lodash';
import { updateCalendarVacationActionHandler } from '../actions/updateCalendarVacationSettings';

export default class MlAppSetCalendarVacation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacationData: {
        startTime: '',
        startDate: '',
        endTime: '',
        endDate: '',
        note: '',
        type: 'holiday'
      }
    };
    this.breakTypes = [
      {name: 'holiday'},
      {name: 'travel'}
    ];
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }

  /**
   * selectDate() --> set the selected date
   * @param dateValue --> current changed value
   * @param isStartDate --> checked for start or end
   */
  selectDate(dateValue, isStartDate) {
    let vacationData = this.state.vacationData;
    if (isStartDate) {
      vacationData.startDate = new Moment(dateValue, 'DD-MM-YYYY').format('DD-MM-YYYY');
    } else {
      vacationData.endDate = new Moment(dateValue, 'DD-MM-YYYY').format('DD-MM-YYYY');
    }
    this.setState({ vacationData: vacationData })
  }

  /**
   * selectTime() --> set the selected time
   * @param timeValue --> current changed value
   * @param isStartTime --> checked for start or end
   */
  selectTime(timeValue, isStartTime) {
    let vacationData = this.state.vacationData;
    if (isStartTime) {
      vacationData.startTime = new Moment(timeValue).format('HH:mm:ss');
    } else {
      vacationData.endTime = new Moment(timeValue).format('HH:mm:ss');
    }
    this.setState({ vacationData: vacationData })
  }

  /**
   * showResponseMsg() --> error(s) or success(es) msg(s) to show
   * @param response --> error(s) or success(es) msg(s), getting from server or client
   */
  showResponseMsg(response) {
    if(response.success){
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
    }
  }

  /**
   * loadBreakTypes() --> load break types
   * @returns {Array} --> list of load break types
   */
  loadBreakTypes() {
    let breakTypesOption = [];
    this.breakTypes.map((breakType, index) => {
      return (
        breakTypesOption.push(
          <option key={index} value={breakType.name}>
            {breakType.name}
          </option>
        )
      )
    });
    return breakTypesOption;
  }

  /**
   * onChangeFieldValue() --> set current changed values in form
   * @param event --> get the changed value
   */
  onChangeFieldValue(event) {
    const { id, value } = event.target;
    let { vacationData } = this.state;
    if (id === 'note') {
      vacationData.note = value;
    } else {
      vacationData.type = value;
    }
    this.setState({ vacationData: vacationData });
  }

  /**
   * validateFormFields() --> validate input and datetime fields
   */
  validateFormFields() {
    let { vacationData } = this.state;
    let errorFields = [];
    Object.keys(vacationData).forEach((field) => {
      if (isEmpty(vacationData[field])) {
        errorFields.push(field);
        this.isValid = false;
      }
    });
    let errorMsg = errorFields[0];
    if (errorFields && errorFields.length > 1) {
      errorFields.forEach((errorField, index) => {
        if (index !== 0) {
          errorMsg += ', ' + errorField;
        }
      });
      toastr.error(`${errorMsg} are required`);
      return;
    }
    if (this.isValid) {
      let start = new Moment(vacationData.startDate + ' ' + vacationData.startTime, 'DD-MM-YYYY HH:mm:ss');
      let end = new Moment(vacationData.endDate + ' ' + vacationData.endTime, 'DD-MM-YYYY HH:mm:ss');
      this.isValidTime = new Moment(end, 'DD-MM-YYYY HH:mm:ss').isAfter(new Moment(start, 'DD-MM-YYYY HH:mm:ss'));
      if (!this.isValidTime) {
        toastr.error('Start datetime must be less than end datetime');
        this.isValid = false;
        return;
      } else {
        this.validVacationData.start = start;
        this.validVacationData.end = end;
        this.validVacationData.isActive = true;
        this.validVacationData.type = vacationData.type;
        this.validVacationData.note = vacationData.note;
      }
    }

  }

  /**
   * updateCalendarVacation() --> updated data to save in db
   * @param event --> control the form data in view layer
   * @returns {Promise.<void>}
   */
  async updateCalendarVacation(event) {
    event.preventDefault();
    this.isValid = true;
    this.validVacationData = {};
    this.validateFormFields();
    if (this.isValid) {
      let response = await updateCalendarVacationActionHandler(this.validVacationData);
      this.showResponseMsg(response);
    }
  }
  render(){
    const { vacationData } = this.state;
    return (
      <div className="step_form_wrap step3">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <form>
              <div className="form-group">
                <span className="placeHolder active">Choose break type</span>
                <select id="breaktype" className="form-control" onChange={(event) => this.onChangeFieldValue(event)}>
                  {this.breakTypes && this.loadBreakTypes()}
                </select>
              </div>
              <div className="form-group">
                <Datetime dateFormat={'DD-MM-YYYY'} timeFormat={false}
                          value={vacationData.startDate}
                          onChange={(event) => this.selectDate(event, true)}
                          inputProps={{ placeholder: 'Start date', className:"form-control float-label"}}/>
              </div>
              <div className="form-group">
                <Datetime dateFormat={false} timeFormat={'HH:mm:ss'}
                          value={vacationData.startTime}
                          onChange={(event) => this.selectTime(event, true)}
                          inputProps={{ placeholder: 'Start time', className:"form-control float-label"}}/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Allow booking on start date & end date</label>
                </div>
                <br className="brclear"/>
              </div>
            </form>
          </div>
          <div className="col-md-6 nopadding-right">
            <form>
              <div className="form-group">
                <input className="form-control float-label"
                       id="note"
                       placeholder="Vacation name"
                       value={vacationData.note}
                       onChange={(event) => this.onChangeFieldValue(event)}/>
              </div>
              <div className="form-group">
                <Datetime dateFormat={'DD-MM-YYYY'} timeFormat={false}
                          value={vacationData.endDate}
                          onChange={(event) => this.selectDate(event, false)}
                          inputProps={{ placeholder: 'End date', className:"form-control float-label"}}/>
              </div>
              <div className="form-group">
                <Datetime dateFormat={false} timeFormat={'HH:mm:ss'}
                          value={vacationData.endTime}
                          onChange={(event) => this.selectTime(event, false)}
                          inputProps={{ placeholder: 'end time', className:"form-control float-label"}}/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="check1" type="checkbox" name="check1" value="1"/><label htmlFor="check1"><span><span></span></span>Auto cancel all the appointments</label>
                </div>
                <br className="brclear"/>
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className="form-group">
          <div className="ml_btn" style={{'textAlign':'center'}}>
            <button onClick={(event)=>this.updateCalendarVacation(event)} className="save_btn" >Save</button>
          </div>
        </div>
      </div>
    )
  }
};
