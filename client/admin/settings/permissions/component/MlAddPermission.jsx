import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addPermissionActionHandler} from '../actions/addPermissionAction'
class MlAddPermission extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createPermission.bind(this)
    return this;
  }


  async addEventHandler() {
    const resp=await this.createPermission();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/permissionList");
  };

  async  createPermission() {
    let PermissionDetails = {
      permissionName: this.refs.permissionName.value,
      displayName: this.refs.displayName.value,
      permissionDesc: this.refs.permissionDesc.value,
      isActive: this.refs.isActive.checked
    }
    console.log(PermissionDetails)
    const response = await addPermissionActionHandler(PermissionDetails)
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
        handler: async(event) => this.props.handler(this.createPermission.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Permission</h2>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="permissionName" placeholder="Permission Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <textarea  ref="permissionDesc" placeholder="About" className="form-control float-label" id=""></textarea>

                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                </div>
               <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="isActive"/>
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

export default MlAddPermission = formHandler()(MlAddPermission);
