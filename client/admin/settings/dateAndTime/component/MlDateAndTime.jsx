import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {upsertDateAndTimeActionHandler} from '../actions/upsertDateAndTimeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {findDateAndTimeActionHandler} from '../actions/findDateAndTimeAction'
import {initalizeFloatLabel,OnToggleSwitch} from '../../../utils/formElemUtil';
let Select = require('react-select');

class MlAddDateAndTime extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      timeFormat: '',
      amSymbol: '',
      pmSymbol: '',
      dateFormat: '',
      numberOfDaysInWeek: '',
      firstDayOfWeek: '',
      hoursFormat:''
    }
    this.addEventHandler.bind(this);
    this.createDT.bind(this);
    this.findDateAndTime.bind(this);
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
    OnToggleSwitch(true,true);
    var WinHeight = $(window).height();
    $('.admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));
  }

  componentWillMount() {
    const resp=this.findDateAndTime();
    return resp;
  }

  onHoursFormatChange(e){
    const dataDetails=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"hoursFormat":true});
    }else{
      this.setState({"hoursFormat":false});
    }
  }


  async addEventHandler() {
    const resp=await this.createDT();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/dateAndTimeList");
  };

  async findDateAndTime(){
    let Id=this.props.config;
    const response = await findDateAndTimeActionHandler(Id);

    if(response.length > 0) {
      this.setState({loading:false,data:response[0].dateAndTimeInfo});
      // this.setState({documentId: this.state.data.documentId});
      // this.setState({id: this.state.data._id});
      if (this.state.data.timeFormat) {
        this.setState({timeFormat: this.state.data.timeFormat});
      }
      if (this.state.data.amSymbol) {
        this.setState({amSymbol: this.state.data.amSymbol});
      }
      if (this.state.data.pmSymbol) {
        this.setState({pmSymbol: this.state.data.pmSymbol});
      }
      if (this.state.data.dateFormat) {
        this.setState({dateFormat: this.state.data.dateFormat});
      }
      if (this.state.data.numberOfDaysInWeek) {
        this.setState({numberOfDaysInWeek: this.state.data.numberOfDaysInWeek});
      }
      if (this.state.data.firstDayOfWeek) {
        this.setState({firstDayOfWeek: this.state.data.firstDayOfWeek});
      }
      if (this.state.data.hoursFormat) {
        this.setState({hoursFormat: this.state.data.hoursFormat});
      }
    }
    this.setState({loading:false,data:response});
  }

  async  createDT() {
    let Details = {
      timeFormat: this.state.timeFormat,
      amSymbol: this.state.amSymbol,
      pmSymbol: this.state.pmSymbol,
      dateFormat: this.state.dateFormat,
      numberOfDaysInWeek: this.state.numberOfDaysInWeek,
      firstDayOfWeek: this.state.firstDayOfWeek,
      hoursFormat: this.state.hoursFormat,
    }
    const response = await upsertDateAndTimeActionHandler(Details);
    return response;

  }
  optionsBySelectTimeFormat(val){
    this.setState({timeFormat:val})
  }
  optionsBySelectAmSymbol(data){
    this.setState({amSymbol:data.value})
  }
  optionsBySelectPmSymbol(data){
    this.setState({pmSymbol:data.value})
  }
  optionsBySelectDateFormat(val){
    this.setState({dateFormat:val})
  }
  optionsBySelectNumberOfDaysInWeek(data){
    this.setState({numberOfDaysInWeek:data.value});
  }
  optionsBySelectFirstDayOfWeek(val){
    this.setState({firstDayOfWeek:val})
  }

  render(){
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createDT.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/dateAndTimeList");
        }
      }
    ]

    let dateFormatquery=gql` query{  
      data:findDateFormat{
        value:_id
        label:dateFormatDisplayName
      }  
    }`;
    let timeFormatquery=gql` query{  
      data:findTimeFormat{
        value:_id
        label:timeFormatDisplayName
      }  
    }`;
    let weekDaysquery=gql` query{  
      data:findWeekDays{
        value:_id
        label:displayName
      }  
    }`;

    let numberOfDays  = [
      {value: 'One', label: 'One'},
      {value: 'Two', label: 'Two'},
      {value: 'Three', label: 'Three'},
      {value: 'Four', label: 'Four'},
      {value: 'Five', label: 'Five'},
      {value: 'Six', label: 'Six'},
      {value: 'Seven', label: 'Seven'},
    ]

    let amSymbol  = [
      {value: 'One', label: 'One'},
      {value: 'Two', label: 'Two'},
      {value: 'Three', label: 'Three'},
      {value: 'Four', label: 'Four'},
      {value: 'Five', label: 'Five'},
      {value: 'Six', label: 'Six'},
      {value: 'Seven', label: 'Seven'},
    ]
    let amSymbols  = [
      {value: 'AM', label: 'AM'},
      {value: 'Am', label: 'Am'},
      {value: 'am', label: 'am'},
      {value: 'a.m', label: 'a.m'}
    ]
    let pmSymbols  = [
      {value: 'PM', label: 'PM'},
      {value: 'Pm', label: 'Pm'},
      {value: 'pm', label: 'pm'},
      {value: 'p.m', label: 'p.m'}
    ]
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Date and Time</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <Moolyaselect multiSelect={false}  placeholder={"Time Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.timeFormat} queryType={"graphql"} query={timeFormatquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectTimeFormat.bind(this)} />
                </div>
                <div className="form-group">
                  {/*<Moolyaselect multiSelect={false}  placeholder={"AM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.amSymbol} queryType={"graphql"} query={timeFormatquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectAmSymbol.bind(this)} />*/}
                  <Select
                    name="form-field-name"  options={amSymbols} placeholder={"AM Symbol"}
                    value={this.state.amSymbol} onChange={this.optionsBySelectAmSymbol.bind(this)}
                    className="float-label"/>
                </div>
                <div className="form-group">
                  {/*<Moolyaselect multiSelect={false}  placeholder={"PM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.pmSymbol} queryType={"graphql"} query={timeFormatquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectPmSymbol.bind(this)} />*/}
                  <Select
                    name="form-field-name"  options={pmSymbols} placeholder={"PM Symbol"}
                    value={this.state.pmSymbol} onChange={this.optionsBySelectPmSymbol.bind(this)}
                    className="float-label"/>
                </div>
                {/*<div className="form-group">*/}
                  {/*<textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>*/}
                {/*</div>*/}
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <form>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false}  placeholder={"Date Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.dateFormat} queryType={"graphql"} query={dateFormatquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectDateFormat.bind(this)} />
                  </div>
                  <div className="form-group">
                    {/*<Moolyaselect multiSelect={false}  placeholder={"Number of Days in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.numberOfDaysInWeek} queryType={"graphql"} query={timeFormatquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectNumberOfDaysInWeek.bind(this)} />*/}
                    <Select
                      name="form-field-name"  options={numberOfDays} placeholder={"Number of Days in Week"}
                      value={this.state.numberOfDaysInWeek} onChange={this.optionsBySelectNumberOfDaysInWeek.bind(this)}
                      className="float-label"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false}  placeholder={"First Day in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.firstDayOfWeek} queryType={"graphql"} query={weekDaysquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectFirstDayOfWeek.bind(this)} />
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>24</label>
                    <label className="switch">
                      <input type="checkbox" ref="status" checked={this.state.hoursFormat} onChange={this.onHoursFormatChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                    <label>12</label>
                  </div>
                  <br className="brclear"/>
                </form>
              </ScrollArea>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>
    )
  }
};

export default MlAddDateAndTime = formHandler()(MlAddDateAndTime);
