import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {initalizeFloatLabel} from '../../../utils/formElemUtil'
import  {updateStusForTransactionActionHandler} from '../actions/updateStatusRequestsAction'


export default class MlInternalRequestDetailsComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      role:'',
      departmentName:'',
      subDepartmentName:'',
      profileImage:'',
      firstName: " ",
      status:null,
      dispalyStatus:false
    }
    return this;
  }
  componentDidMount() {
    initalizeFloatLabel();
  }
  async  onStatusSelect(val){
    this.setState({"status":val.value})
    let status=val.value
    let requestId=this.props.data.requestId
    let response = await updateStusForTransactionActionHandler(requestId,status);
    if(response){
      toastr.success("transaction status changed successfully")
      if(status=="Approved"){
        FlowRouter.go("/admin/transactions/approvedList");
      }
      else{
        FlowRouter.go("/admin/transactions/requestedList");
      }
    }else{
      toastr.error(response.error)
    }
  }

  render() {
    let statusOptions = [
      {value: 'WIP', label: 'WIP' , clearableValue: true},
      {value: 'Approved', label: 'Approved',clearableValue: true}
    ];
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#details${this.props.data.requestId}`} data-toggle="tab">Details</a>
          </li>
          <li><a href={`#notes${this.props.data.requestId}`} data-toggle="tab">Notes</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`details${this.props.data.requestId}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Approval for" defaultValue={this.props.data.requestTypeName} className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group col-md-6 nopadding-left">
                  <input type="text" placeholder="Department" value={this.props.data.requestTypeName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group col-md-6 nopadding-right">
                  <input type="text" placeholder="Sub-Department" value={this.props.data.requestTypeName} className="form-control float-label" id=""/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Role" value={this.props.data.requestTypeName} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device name" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device ID" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Actions"  className="float-label"  options={statusOptions}  value={this.state.status}  onChange={this.onStatusSelect.bind(this)} />
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`notes${this.props.data.requestId}`}>
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <textarea placeholder="Notes" defaultValue={this.props.data.requestDescription} className="form-control float-label" id=""></textarea>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="profile_block">
                  <img src={this.state.profileImage} />
                  <span>
                    {this.state.firstName}<br />{this.state.role}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}



