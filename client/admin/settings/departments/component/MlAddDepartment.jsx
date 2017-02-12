import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addDepartmentActionHandler} from '../actions/addDepartmentAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
class MlAddDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createDepartment.bind(this)
    return this;
  }


  async addEventHandler() {
    const resp=await this.createDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/departmentsList");
  };

  async  createDepartment() {
    let DepartmentDetails = {
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      selectCluster: this.refs.selectCluster.value,
      email: this.refs.email.value,
      status: this.refs.status.checked
    }
    console.log(DepartmentDetails)

    const response = await addDepartmentActionHandler(DepartmentDetails)
   return response;

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
        handler: async(event) => this.props.handler(this.createDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Department</h2>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="departmentName" placeholder="Department Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>

                </div>
                <div className="form-group">
                  <input type="text" ref="email" placeholder="Department Email ID" className="form-control float-label" id=""/>

                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <select placeholder="Select Cluster" ref="selectCluster" className="form-control float-label">
                    <option>Select Cluster</option>
                  </select>
                </div>

                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="status" />
                    <div className="slider"></div>
                  </label>
                </div>
            </div>
          </div>
        </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />

      </div>
    )
  }
};

export default MoolyaAddDepartment = formHandler()(MlAddDepartment);
