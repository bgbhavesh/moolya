import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {fetchProcessSetupHandler} from '../actions/fetchProcessSetupHandler'
import {updateProcessSetupActionHandler} from '../actions/updateProcessSetupAction'
import {initalizeFloatLabel} from '../../../utils/formElemUtil'
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import MoolyaSelect from "../../../../commons/components/select/MoolyaSelect";

export default class MlProcessSetupDetailsComponent extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      data: {},
      stages: [{
        stageId: "",
        isActive:false,
        stageActions: [{
          actionId: "",
          actionType:"",
          isActive:false,
        }]
      }]
    }
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
  }

  componentWillReceiveProps(newProps){
    let userId=newProps.data.userId
    this.setState({"status":newProps.data.status, data:newProps.data})
    if(userId){
      const resp=this.findProcessSetupDetails()
      return resp;
    }
  }

  addStageComponent(e){
    this.setState({
      stages: this.state.stages.concat([{stageId: "", isActive:false, stageActions: [{actionId: "",actionType:"",isActive:false,}]}])
    })
  }
  addActionComponent(sIdx, e){
    let stages = this.state.stages
    let action = stages[sIdx].stageActions.concat([{actionId: "",actionType:"",isActive:false,}]);
    stages[sIdx].stageActions = action;
    this.setState({stages:stages})
  }

  optionsBySelectStage(sIdx, selectedValue){
    let stages = this.state.stages;
    stages[sIdx]['stageId'] = selectedValue;
    this.setState({stages: stages});
    this.sendDataToParent();
  }
  optionsBySelectAction(sIdx, aIdx, selectedValue){
    let stages = this.state.stages
    stages[sIdx].stageActions[aIdx]['actionId'] = selectedValue;
    this.setState({stages:stages})
    this.sendDataToParent();
  }
  onStageStatusChange(sIdx, e){
    let value = e.target.checked
    let stages = this.state.stages;
    stages[sIdx]['isActive'] = value;
    this.setState({stages: stages});
    this.sendDataToParent();
  }
  onActionStatusChange(sIdx, aIdx, e){
    let value = e.target.checked
    let stages = this.state.stages
    stages[sIdx].stageActions[aIdx]['isActive'] = value;
    this.setState({stages:stages})
    this.sendDataToParent();
  }

  async sendDataToParent(){
    let stages = this.state.stages;
    let data = this.state.data;
    let response = await updateProcessSetupActionHandler(data, stages);
    return response;
  }

  async findProcessSetupDetails() {
    let id = this.props.data._id
    const response = await fetchProcessSetupHandler(id);
    if(response){
        this.setState({stages:response.processSteps})
    }
  }


  render() {
    let that = this;
    let stages = this.state.stages
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#customerDetails${that.props.data._id}`} data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a href={`#processSetup${that.props.data._id}`} data-toggle="tab">Process Setup</a>
          </li>
          <li>
            <a  href={`#paymentDetails${that.props.data._id}`} data-toggle="tab">Payment Details</a>
          </li>
          <li>
            <a  href={`#deviceDetails${that.props.data._id}`} data-toggle="tab">Device Details</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`customerDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" value={that.state.data.userId} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Transaction Id" value={that.state.data.userId} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" value={that.state.data.dateTime} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Name" value={that.state.data.userId} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email" value={that.state.data.userId} className="form-control float-label" id="" readOnly="true"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone Number" value={that.state.data.mobileNumber} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" value={that.state.data.clusterName} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" value={that.state.data.chapterName} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" value={that.state.data.subChapterName} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" value={that.state.data.communityName} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`processSetup${that.props.data._id}`}>
            <div className="panel panel-default">
              <div className="panel-heading">Add Stages<img src="../images/add.png" onClick={that.addStageComponent.bind(that)}/></div>
              <div className="panel-body">
                {stages.map(function (stage, sIdx) {
                  let stageQuery = gql`query{data:fetchStageOfCompany {value:_id, label:stageOfCompanyName}}`;
                   return(
                     <div className="row" key={sIdx}>
                       <div className="col-md-6">
                         <div className="form-group">
                           <MoolyaSelect multiSelect={false} className="form-control float-label"
                                         valueKey={'value'}
                                         labelKey={'label'} queryType={"graphql"} query={stageQuery} isDynamic={true}
                                         onSelect={that.optionsBySelectStage.bind(that, sIdx)}
                                         placeholder="Select Stage"
                                         selectedValue={stage.stageId}/>
                         </div>
                       </div>
                       <div className="col-md-6">
                         <div className="form-group switch_wrap">
                           <label>Status</label>
                           <label className="switch">
                             <input type="checkbox" checked={stage.isActive} onChange={that.onStageStatusChange.bind(that, sIdx)}/>
                             <div className="slider"></div>
                           </label>
                         </div>
                       </div>
                       <div className="col-md-12">
                         {stage.stageActions.map(function (action, aIdx) {
                           let actionQuery = gql`query{data:fetchStageOfCompany {value:_id, label:stageOfCompanyName}}`;
                           return(
                             <div className="form_inner_block col-md-4" key={aIdx}>
                               <div className="add_form_block"><img src="../images/add.png" onClick={that.addActionComponent.bind(that, sIdx)}/></div>
                               <div className="form-group">
                                 <MoolyaSelect multiSelect={false} className="form-control float-label"
                                               valueKey={'value'}
                                               labelKey={'label'} queryType={"graphql"} query={actionQuery} isDynamic={true}
                                               onSelect={that.optionsBySelectAction.bind(that, sIdx)}
                                               placeholder="Select Action"
                                               selectedValue={sIdx}/>
                               </div>
                               <div className="form-group">
                                 <input type="text" placeholder="Type" className="form-control float-label" id="" />
                               </div>
                               <div className="form-group switch_wrap">
                                 <label>Status</label>
                                 <label className="switch">
                                   <input type="checkbox" checked={action.isActive} onChange={that.onActionStatusChange.bind(that, sIdx, aIdx)}/>
                                   <div className="slider"></div>
                                 </label>
                               </div>
                             </div>
                           )
                         })}
                       </div>
                     </div>
                   )
                  })}
                <hr/>
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`paymentDetails${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Generate payment link</div>
                  <div className="panel-body">
                    <div className="form-group">
                      <input type="text" placeholder="Subscription Name" className="form-control float-label" id="" />
                    </div>
                    <br className="brclear"/>
                    <div className="form-group ">
                      <input type="text" placeholder="Cost" className="form-control float-label"/>
                      <div className="email_notify">
                        <div className="input_types">
                          <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>TAX inclusive</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea placeholder="About" className="form-control float-label" id=""></textarea>
                    </div>
                    <a href="#" className="fileUpload mlUpload_btn">Genrate Link</a> <a href="#" className="fileUpload mlUpload_btn">Activate office</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Transaction Date & Time" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.dateTime?that.state.data.paymentDetails.dateTime:""} className="form-control float-label" id="" readOnly={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction ID" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.transactionId?that.state.data.paymentDetails.transactionId:""} className="form-control float-label" id="" readOnly={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total amount paid" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.totalAmountPaid?that.state.data.paymentDetails.totalAmountPaid:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Payment mode" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.paymentMode?that.state.data.paymentDetails.paymentMode:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card number" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.cardNumber?that.state.data.paymentDetails.cardNumber:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card Holder name" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.cardHolderName?that.state.data.paymentDetails.cardHolderName:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Promotion Code" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.promotionCode?that.state.data.paymentDetails.promotionCode:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Code Amount" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.codeAmount?that.state.data.paymentDetails.codeAmount:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.promotionStatus?that.state.data.paymentDetails.promotionStatus:""} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Code" value={that.state.data.paymentDetails&&that.state.data.paymentDetails.voucherCode?that.state.data.paymentDetails.voucherCode:""} className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`deviceDetails${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device Name" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Device Id" value={this.state.departmentName} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="IP Address" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="IP Location" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
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



