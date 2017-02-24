import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addDateAndTimeActionHandler} from '../actions/addDateAndTimeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

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
    }
    this.addEventHandler.bind(this);
    this.createDT.bind(this);
    return this;
  }

  componentDidMount() {

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

  async  createDT() {
    let Details = {
      timeFormat: this.state.timeFormat,
      amSymbol: this.state.amSymbol,
      pmSymbol: this.state.pmSymbol,
      dateFormat: this.state.dateFormat,
      numberOfDaysInWeek: this.state.numberOfDaysInWeek,
      firstDayOfWeek: this.state.firstDayOfWeek,
    }
    console.log(Details)

    const response = await addDateAndTimeActionHandler(Details);
    return response;

  }
  optionsBySelectTimeFormat(val){
    this.setState({timeFormat:val})
  }
  optionsBySelectAmSymbol(val){
    this.setState({amSymbol:val})
  }
  optionsBySelectPmSymbol(val){
    this.setState({pmSymbol:val})
  }
  optionsBySelectDateFormat(val){
    this.setState({dateFormat:val})
  }
  optionsBySelectNumberOfDaysInWeek(val){
    this.setState({numberOfDaysInWeek:val})
  }
  optionsBySelectFirstDayOfWeek(val){
    this.setState({firstDayOfWeek:val})
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createDT.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let clusterquery=gql` query{  
  data:fetchDocumentsType{
    value:_id
    label:docTypeName
  }  
}`;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Date and Time</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <Moolyaselect multiSelect={false}  placeholder={"Date Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.timeFormat} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'clusterquery'}  onSelect={this.optionsBySelectTimeFormat.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false}  placeholder={"AM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.amSymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectAmSymbol.bind(this)} />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false}  placeholder={"PM Symbol"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.pmSymbol} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectPmSymbol.bind(this)} />
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
                    <Moolyaselect multiSelect={false}  placeholder={"Date Format"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.dateFormat} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectDateFormat.bind(this)} />
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false}  placeholder={"Number of Days in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.numberOfDaysInWeek} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectNumberOfDaysInWeek.bind(this)} />
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false}  placeholder={"First Day in Week"}  className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.firstDayOfWeek} queryType={"graphql"} query={clusterquery}  isDynamic={true} id={'query'}  onSelect={this.optionsBySelectFirstDayOfWeek.bind(this)} />
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label>24</label>
                    <label className="switch">
                      <input type="checkbox" ref="status" />
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
