import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addEmployeeTypeActionHandler} from '../actions/addEmployeeTypeAction.js'
let FontAwesome = require('react-fontawesome');
class MlAddEmployeeType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createEmpType.bind(this)
    return this;
  }


  async addEventHandler() {
    const resp=await this.createEmpType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/employeeTypesList");
  };

  async  createEmpType() {
    let EmpTypeDetails = {
      employmentName: this.refs.employmentName.value,
      employmentDisplayName: this.refs.employmentDisplayName.value,
      aboutEmployment: this.refs.aboutEmployment.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addEmployeeTypeActionHandler(EmpTypeDetails)
    return response;

  }
  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createEmpType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/employeeTypesList")
        }
      }
    ]


    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Employee type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="employmentName" placeholder="Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <textarea  ref="aboutEmployment" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="employmentDisplayName" placeholder="Display Name" className="form-control float-label" id=""/>
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
export default MlAddEmployeeType = formHandler()(MlAddEmployeeType);
