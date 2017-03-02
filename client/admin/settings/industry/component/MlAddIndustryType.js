import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addIndustryActionHandler} from '../actions/addIndustryTypeAction'
let FontAwesome = require('react-fontawesome');
class MlAddIndustry extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createIndustry.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp=await this.createIndustry();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/industryList");
      else
        toastr.error(response.result);
    }
  };

  async  createIndustry() {
    let IndustryDetails = {
      industryName: this.refs.industryName.value,
      industryDisplayName: this.refs.industryDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addIndustryActionHandler(IndustryDetails)
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
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createIndustry.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Industry</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="industryName" placeholder="Industry Name" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <textarea ref="about" placeholder="About" className="form-control float-label"></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="industryDisplayName" placeholder="Display Name" className="form-control float-label"/>
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
export default MlAddIndustry = formHandler()(MlAddIndustry);
