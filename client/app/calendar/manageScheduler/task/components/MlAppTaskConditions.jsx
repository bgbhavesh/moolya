import React, {Component} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {findTaskActionHandler} from "../actions/saveCalanderTask";
import MlLoader from "../../../../../commons/components/loader/loader";
var FontAwesome = require('react-fontawesome');
import _ from 'lodash'

export default class MlAppTaskConditions extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {}
    }
    this.findTaskDetails.bind(this);
    this.handleBlur.bind(this);
    this.onSwitchChange.bind(this)
    return this;
  }

  componentWillMount() {
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    if (taskId) {
      var response = await findTaskActionHandler(taskId);
      if (response) {
        this.setState({loading: false, data: response});
      }
      return response
    } else {
      this.setState({loading: false});
    }
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
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

  onSwitchChange(event) {
    let details = this.state.data;
    let name = event.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: event.target.checked});
    this.setState({data: details}, function () {
      this.sendTaskDataToParent()
    })
  }

  sendTaskDataToParent() {
    let data = this.state.data;
    let TAC = _.pick(data, 'isReschedulable', 'noOfReschedulable')
    data = _.omit(data, 'isReschedulable')
    data = _.omit(data, 'noOfReschedulable')
    _.merge(data['termsAndCondition'], TAC)
    this.props.getConditionDetails(data);
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {showLoader === true ? ( <MlLoader/>) : (
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <div className="clearfix"/>
                <br />
                <div className="form-group switch_wrap inline_switch">
                  <label>Is reschedule allowable</label>
                  <label className="switch">
                    <input type="checkbox" name="isReschedulable"
                           defaultChecked={this.state.data.termsAndCondition ? this.state.data.termsAndCondition.isReschedulable : false}
                           onChange={this.onSwitchChange.bind(this)}/>
                    <div className="slider"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <div className="clearfix"/>
                <br />
                <div className="form-group">
                  <label>How many times <input className="form-control inline_input medium_in"
                                               type="Number" min="0"
                                               defaultValue={this.state.data.termsAndCondition ? this.state.data.termsAndCondition.noOfReschedulable : ''}
                                               name="noOfReschedulable" onBlur={this.handleBlur.bind(this)}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-left">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Attachment
                  <span className="see-more pull-right"><a href=""><FontAwesome name='minus'/></a></span>
                </div>
                <div className="panel-body">

                  <div className="form-group">
                    <input type="text" placeholder="Document name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Info" className="form-control float-label"></textarea>
                  </div>
                  <div className="form-group">
                    <div className="input_types">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox"
                                                          value="1"/><label
                        htmlFor="checkbox1"><span></span>Is mandatory ?</label></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-6  nopadding-right">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Attachments
                  <span className="see-more pull-right"><a href=""><FontAwesome name='minus'/></a></span>
                </div>
                <div className="panel-body">

                  <div className="form-group">
                    <input type="text" placeholder="Document name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Info" className="form-control float-label"></textarea>
                  </div>
                  <div className="form-group">
                    <div className="input_types">
                      <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox"
                                                          value="1"/><label
                        htmlFor="checkbox1"><span></span>Is mandatory ?</label></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </ScrollArea>)}
      </div>
    )
  }
};
