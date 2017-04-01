import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addCompanyTypeActionHandler} from '../actions/addCompanyTypeAction'
let FontAwesome = require('react-fontawesome');
class MlAddCompanyType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createCompanyType.bind(this)
    return this;
  }


  async addEventHandler() {
    const resp=await this.createCompanyType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/companyTypesList");
  };

  async  createCompanyType() {
    let CompanyTypeDetails = {
      companyName: this.refs.companyName.value,
      companyDisplayName: this.refs.companyDisplayName.value,
      aboutCompany: this.refs.aboutCompany.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addCompanyTypeActionHandler(CompanyTypeDetails)
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
        handler: async(event) => this.props.handler(this.createCompanyType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Company type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="companyName" placeholder="Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <textarea  ref="aboutCompany" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="companyDisplayName" placeholder="Display Name" className="form-control float-label" id=""/>
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
export default MlAddCompanyType = formHandler()(MlAddCompanyType);
