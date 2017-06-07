import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {findBackendUserActionHandler} from '../../internalRequests/actions/findUserAction'
import {initalizeFloatLabel} from '../../../utils/formElemUtil'
import  {updateStusForTransactionActionHandler} from '../../internalRequests/actions/updateStatusRequestsAction'


export default class MlProcessSetupDetailsComponent extends React.Component {
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
    // console.log(this.props.data)
  }
  componentWillReceiveProps(newProps){
   /* let type=newProps.type;
    if(type=="approval"){
      this.setState({"dispalyStatus":true})
    }*/
    let userId=newProps.data.userId
    this.setState({"status":newProps.data.status})
    if(userId){
      const resp=this.findBackendUser()
      return resp;
    }

  }

  async findBackendUser() {
    let userTypeId = this.props.data.userId
    const response = await findBackendUserActionHandler(userTypeId);
    if(response){
      this.setState({userDetais:response, role:response.profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].roleName, firstName:response.profile.InternalUprofile.moolyaProfile.firstName})
      let userDetails=this.state.userDetais
      if(userDetails.profile.isInternaluser){
        let userInternalProfile=userDetails.profile.InternalUprofile.moolyaProfile.userProfiles
        if(userInternalProfile){
          let roleIds=[]
          let hirarichyLevel=[]
          userInternalProfile.map(function (doc,index) {
            if(doc.isDefault) {
              let userRoles = doc && doc.userRoles ? doc.userRoles : [];
              userRoles.map(function (doc, index) {
                hirarichyLevel.push(doc.hierarchyLevel)

              });
              hirarichyLevel.sort(function (a, b) {
                return b - a
              });
              for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].hierarchyLevel == hirarichyLevel[0]) {
                  roleIds.push(userRoles[i]);
                  break
                }
              }
            }
          });

          if(roleIds.length==1){
            this.setState({"role":roleIds[0].roleName})
            this.setState({"departmentName":roleIds[0].departmentName})
            this.setState({"subDepartmentName":roleIds[0].subDepartmentName})
          }

        }
        this.setState({profileImage:userDetails.profile.profileImage})
      }
    }
  }
  async  onStatusSelect(val){
    this.setState({"status":val.value})
    let status=val.value
    let requestId=this.props.data.requestId
    let response = await updateStusForTransactionActionHandler(requestId,status);
    if(response.success){
      toastr.success("transaction status changed successfully")
      if(status=="Approved"){
        FlowRouter.go("/admin/transactions/approvedList");
      }
      else{
        FlowRouter.go("/admin/transactions/requestedList");
      }
    }else{
      toastr.error("User not available in hierarchy")
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
            <a  href={`#customerDetails${this.props.data.requestId}`} data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a href={`#processSetup${this.props.data.requestId}`} data-toggle="tab">Process Setup</a>
          </li>
          <li>
            <a  href={`#paymentDetails${this.props.data.requestId}`} data-toggle="tab">Payment Details</a>
          </li>
          <li>
            <a  href={`#deviceDetails${this.props.data.requestId}`} data-toggle="tab">Device Details</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`customerDetails${this.props.data.requestId}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Transaction Id" value={this.state.departmentName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" value={this.state.subDepartmentName} className="form-control float-label" id=""/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Name" value={this.state.role} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email" value={this.state.role} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone Number" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                {/*<div className="form-group">*/}
                  {/*<Select name="form-field-name" placeholder="Actions"  className="float-label"  options={statusOptions}  value={this.props.data.status}  onChange={this.onStatusSelect.bind(this)} />*/}
                {/*</div>*/}
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`processSetup${this.props.data.requestId}`}>
            <div className="panel panel-default">
              <div className="panel-heading">Add Stages</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group switch_wrap">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" />
                        <div className="slider"></div>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/add.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/remove.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/remove.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group switch_wrap">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" />
                        <div className="slider"></div>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/add.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/remove.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                    <div className="form_inner_block col-md-4">
                      <div className="add_form_block"><img src="../images/remove.png"/></div>
                      <div className="form-group">
                        <Select name="form-field-name" options={options} value='role' onChange={logChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Type" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Status</label>
                        <label className="switch">
                          <input type="checkbox" />
                          <div className="slider"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`paymentDetails${this.props.data.requestId}`}>
            <div className="row">
              <div className="col-md-6">
                <h3>Generate Payment Link</h3>
                <div className="form-group">
                  <input type="text" placeholder="Subscription Name" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Cost" value={this.state.departmentName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="About" value={this.state.subDepartmentName} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Transaction Date & Time" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction Id" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total Amount Paid" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Payment Mode" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card Number" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card Holder Name" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Promotion Code" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Code Amount" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Code" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Amount" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" defaultValue="" className="form-control float-label" id="" readOnly="true"/>
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`deviceDetails${this.props.data.requestId}`}>
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



