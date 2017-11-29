import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { fetchProcessSetupHandler } from '../actions/fetchProcessSetupHandler';
import { updateProcessSetupActionHandler, updateProcessTransaction } from '../actions/updateProcessSetupAction';
import { initalizeFloatLabel, OnToggleSwitch } from '../../../utils/formElemUtil';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MoolyaSelect from '../../../commons/components/MlAdminSelectWrapper';
import { getAdminUserContext } from '../../../../commons/getAdminUserContext'
import _ from 'lodash';
const FontAwesome = require('react-fontawesome');

export default class MlProcessSetupDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: (props.data || {}).status,
      data: props.data || {},
      isGenerateLinkDisable: false,
      stages: [{
        stageId: '',
        isActive: false,
        stageActions: [{
          actionId: '',
          actionType: '',
          isActive: false
        }]
      }]
    }

    if ((props.data || {}).userId) {
      this.findProcessSetupDetails();
    }
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
  }
  componentDidUpdate() {
    initalizeFloatLabel();
    OnToggleSwitch(true, true);
  }

  componentWillReceiveProps(newProps) {
    const userId = newProps.data.userId
    this.setState({ status: newProps.data.status, data: newProps.data })
    if (userId) {
      const resp = this.findProcessSetupDetails()
      return resp;
    }
  }

  addStageComponent(e) {
    this.setState({
      stages: this.state.stages.concat([{ stageId: '', isActive: false, stageActions: [{ actionId: '', actionType: '', isActive: false }] }])
    })
  }
  addActionComponent(sIdx, e) {
    const stages = this.state.stages
    const action = stages[sIdx].stageActions.concat([{ actionId: '', actionType: '', isActive: false }]);
    stages[sIdx].stageActions = action;
    this.setState({ stages })
  }

  removeActionComponent(sIdx, aIdx) {
    const stages = this.state.stages;
    // let action =
    stages[sIdx].stageActions.splice(aIdx, 1);
    // stages[sIdx].stageActions = action;
    this.setState({ stages })
  }

  optionsBySelectStage(sIdx, selectedValue) {
    const stages = this.state.stages;
    const findActionIndex = stages.findIndex((obj) => {
      if (obj.stageId === selectedValue) {
        return obj;
      }
    });
    if (findActionIndex != -1) {
      toastr.error('Stage cannot be duplicate');
    } else {
      stages[sIdx].stageId = selectedValue;
      this.setState({ stages });
    }
  }
  optionsBySelectAction(sIdx, aIdx, selectedValue) {
    const stages = this.state.stages
    const findActionIndex = stages[sIdx].stageActions.findIndex((obj) => {
      if (obj.actionId === selectedValue) {
        return obj;
      }
    });
    if (findActionIndex != -1) {
      toastr.error('Action cannot be duplicate');
    } else {
      stages[sIdx].stageActions[aIdx].actionId = selectedValue;
      this.setState({ stages })
    }
  }
  onStageStatusChange(sIdx, e) {
    const value = e.target.checked
    const stages = this.state.stages;
    const cloneBackUp = _.cloneDeep(stages);
    const specificBackup = cloneBackUp[sIdx];
    specificBackup.isActive = value;
    stages.splice(sIdx, 1);
    stages.splice(sIdx, 0, specificBackup);
    this.setState({ stages });
  }
  onActionStatusChange(sIdx, aIdx, e) {
    const value = e.target.checked
    const stages = this.state.stages
    stages[sIdx].stageActions[aIdx].isActive = value;
    this.setState({ stages })
  }

  async saveProcessSetup() {
    const stages = this.state.stages;
    let data = this.state.data;
    this.loggedUserDetails = getAdminUserContext();
    data = _.omit(data, '__typename')
    const isValid = this.validateDetails(stages)
    if (isValid && isValid.success) { /* attaching login admin user context to query */
      const response = await updateProcessSetupActionHandler(data, isValid.result, this.loggedUserDetails);
      if (response && response.success) {
        toastr.success('Saved successfully');
      }
      return response;
    }
    toastr.error(isValid.result);
  }

  validateDetails(stages) {
    const data = _.clone(stages)
    if (!_.isEmpty(data)) {
      _.remove(data, { stageId: '' })
      if (!_.isEmpty(data)) {
        console.log(data)
        return { success: true, result: data }
      } return { success: false, result: 'Select atleast one stage' }
    } return { success: false, result: 'Please enter all the required details' }
  }
  async findProcessSetupDetails() {
    const id = this.props.data._id
    const response = await fetchProcessSetupHandler(id);
    if (response) {
      if (response.processSteps && response.processSteps.length > 0) {
        this.setState({ stages: response.processSteps })
      }
    }
  }
  updateCost(e) {
    this.setState({ cost: e.currentTarget.value });
  }

  updateTax(e) {
    this.setState({ tax: e.currentTarget.checked });
  }

  updateAbout(e) {
    this.setState({ about: e.currentTarget.value });
  }
  async generateLink() {
    if (this.state.isGenerateLinkDisable) {
      toastr.error('Payment Link is already generated');
      return false;
    }
    this.setState({
      isGenerateLinkDisable: true
    })
    if (!this.state.cost) {
      toastr.error("'Cost' field is required");
      this.setState({
        isGenerateLinkDisable: false
      })
      return false;
    }
    if (this.state.cost < 1) {
      toastr.error('Enter a valid cost');
      this.setState({
        isGenerateLinkDisable: false
      })
      return false;
    }
    const generateLinkInfo = {
      subscriptionName: this.refs.subscriptionName.value,
      cost: this.state.cost,
      isTaxInclusive: this.state.tax,
      about: this.state.about
    }
    const id = this.state.data._id;
    const response = await updateProcessTransaction(id, { paymentDetails: generateLinkInfo });
    if (response.success) {
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
      this.setState({
        isGenerateLinkDisable: false
      })
    }
  }

  async acitvateOffice() {
    if (this.state.officeInfo.isActive) {
      toastr.error('Office already activated');
      return false;
    }
  }


  render() {
    const stageQuery = gql`query{data:fetchProcessStages {value:_id, label:name}}`;
    const actionQuery = gql`query{data:fetchProcessActions {value:_id, label:displayName}}`;
    const that = this;
    const stages = that.state.stages;
    return (
      <div className="ml_tabs">
        <ul className="nav nav-pills">
          <li className="active">
            <a href={`#customerDetails${that.props.data._id}`} data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a href={`#processSetup${that.props.data._id}`} data-toggle="tab">Process Setup</a>
          </li>
          <li>
            <a href={`#paymentDetails${that.props.data._id}`} data-toggle="tab">Payment Details</a>
          </li>
          <li>
            <a href={`#deviceDetails${that.props.data._id}`} data-toggle="tab">Device Details</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`customerDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" value={that.state.data.profileId} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Transaction Id" value={that.state.data.transactionId} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" value={that.state.data.dateTime} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Name" value={that.state.data.name} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email" value={that.state.data.username} className="form-control float-label" readOnly="true"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone Number" value={that.state.data.mobileNumber} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" value={that.state.data.clusterName} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" value={that.state.data.chapterName} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" value={that.state.data.subChapterName} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" value={that.state.data.communityName} className="form-control float-label" readOnly="true"/>
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`processSetup${that.props.data._id}`}>
            <div className="panel panel-default">
              <div className="panel-heading">Add Stages<img className="pull-right" src="/images/add.png" onClick={that.addStageComponent.bind(that)}/></div>
              <div className="panel-body">
                {that.state.stages.map((stage, sIdx) => (
                  <div className="row" key={sIdx}>
                    <div className="col-md-6">
                      <div className="form-group">
                        <MoolyaSelect
                          multiSelect={false} className="form-control float-label"
                          valueKey={'value'}
                          labelKey={'label'} queryType={'graphql'} query={stageQuery} isDynamic={true}
                          onSelect={that.optionsBySelectStage.bind(that, sIdx)}
                          placeholder="Select Stage"
                          selectedValue={stage.stageId}/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group switch_wrap inline_switch small_sw">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" checked={stage.isActive} onChange={that.onStageStatusChange.bind(that, sIdx)}/>
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {stage.stageActions.map((action, aIdx) => (
                        <div className="form_inner_block col-md-4" key={aIdx}>
                          <div className="add_form_block">
                            {
                              aIdx == 0
                                ?
                                <img src="/images/add.png" onClick={that.addActionComponent.bind(that, sIdx)}/>
                                :
                                <img src="/images/remove.png" onClick={that.removeActionComponent.bind(that, sIdx, aIdx)}/>
                            }

                          </div>
                          <div className="form-group">
                            <MoolyaSelect
                              multiSelect={false} className="form-control float-label"
                              valueKey={'value'}
                              labelKey={'label'} queryType={'graphql'} query={actionQuery} isDynamic={true}
                              onSelect={that.optionsBySelectAction.bind(that, sIdx, aIdx)}
                              placeholder="Select Action"
                              selectedValue={action.actionId}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Type" className="form-control float-label" />
                          </div>
                          <div className="form-group switch_wrap inline_switch small_sw">
                            <label>Status</label>
                            <label className="switch">
                              <input type="checkbox" checked={action.isActive} onChange={that.onActionStatusChange.bind(that, sIdx, aIdx)}/>
                              <div className="slider"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <hr/>
              </div>
            </div>
            <a className="fileUpload mlUpload_btn" onClick={this.saveProcessSetup.bind(this)}>Save details</a>
          </div>
          <div className="tab-pane" id={`paymentDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Generate payment link</div>
                  <div className="panel-body">
                    <div className="form-group">
                      <input type="text" placeholder="Subscription Name" className="form-control float-label" ref="subscriptionName"/>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group ">
                      <input type="Number" onChange={e => this.updateCost(e)} value={this.state.cost} placeholder="Cost" min="0" className="form-control float-label"/>
                      <div className="email_notify">
                        <div className="input_types">
                          <input id="checkbox1" onChange={e => this.updateTax(e)} checked={this.state.tax} type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>TAX inclusive</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea onChange={e => this.updateAbout(e)} defaultValue={this.state.about} placeholder="About" className="form-control float-label"></textarea>
                    </div>
                    <a href="#" className="fileUpload mlUpload_btn" onClick={() => this.generateLink()}>Generate Link</a>
                    <a href="#" className="fileUpload mlUpload_btn" onClick={() => this.acitvateOffice()}>Activate office</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Transaction Date & Time" value={that.state.data.paymentDetails && that.state.data.paymentDetails.dateTime ? that.state.data.paymentDetails.dateTime : ''} className="form-control float-label" readOnly={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction ID" value={that.state.data.paymentDetails && that.state.data.paymentDetails.transactionId ? that.state.data.paymentDetails.transactionId : ''} className="form-control float-label" readOnly={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total amount paid" value={that.state.data.paymentDetails && that.state.data.paymentDetails.totalAmountPaid ? that.state.data.paymentDetails.totalAmountPaid : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Payment mode" value={that.state.data.paymentDetails && that.state.data.paymentDetails.paymentMode ? that.state.data.paymentDetails.paymentMode : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card number" value={that.state.data.paymentDetails && that.state.data.paymentDetails.cardNumber ? that.state.data.paymentDetails.cardNumber : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card Holder name" value={that.state.data.paymentDetails && that.state.data.paymentDetails.cardHolderName ? that.state.data.paymentDetails.cardHolderName : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Promotion Code" value={that.state.data.paymentDetails && that.state.data.paymentDetails.promotionCode ? that.state.data.paymentDetails.promotionCode : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Code Amount" value={that.state.data.paymentDetails && that.state.data.paymentDetails.codeAmount ? that.state.data.paymentDetails.codeAmount : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" value={that.state.data.paymentDetails && that.state.data.paymentDetails.promotionStatus ? that.state.data.paymentDetails.promotionStatus : ''} className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Code" value={that.state.data.paymentDetails && that.state.data.paymentDetails.voucherCode ? that.state.data.paymentDetails.voucherCode : ''} className="form-control float-label" />
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`deviceDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device Name" value={that.state.data.deviceDetails && that.state.data.deviceDetails.deviceName ? that.state.data.deviceDetails.deviceName : ''} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Device Id" value={that.state.data.deviceDetails && that.state.data.deviceDetails.deviceId ? that.state.data.deviceDetails.deviceId : ''} className="form-control float-label" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="IP Address" value={that.state.data.deviceDetails && that.state.data.deviceDetails.ipAddress ? that.state.data.deviceDetails.ipAddress : ''} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="IP Location" value={that.state.data.deviceDetails && that.state.data.deviceDetails.location ? that.state.data.deviceDetails.location : ''} className="form-control float-label" readOnly="true"/>
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

