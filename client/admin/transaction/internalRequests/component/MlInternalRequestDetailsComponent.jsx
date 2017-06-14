import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {findBackendUserActionHandler} from '../actions/findUserAction'
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
      status:props.data.status,
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
        FlowRouter.reload();
        //FlowRouter.go("/admin/transactions/requestedList");
      }
    }else{
      toastr.error("User doesn't have privileges to act on this request")
      FlowRouter.reload();
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
                  <input type="text" placeholder="Department" value={this.state.departmentName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group col-md-6 nopadding-right">
                  <input type="text" placeholder="Sub-Department" value={this.state.subDepartmentName} className="form-control float-label" id=""/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Role" value={this.state.role} className="form-control float-label" id=""/>
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



