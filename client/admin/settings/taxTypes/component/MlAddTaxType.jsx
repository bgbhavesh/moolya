import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addTaxActionHandler} from '../actions/addTaxTypeAction'
let FontAwesome = require('react-fontawesome');
class MlAddTaxType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createTaxType.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp=await this.createTaxType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/taxTypeList");
  };

  async  createTaxType() {
    let TaxTypeDetails = {
      taxName: this.refs.taxName.value,
      taxDisplayName: this.refs.taxDisplayName.value,
      aboutTax: this.refs.aboutTax.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addTaxActionHandler(TaxTypeDetails)
    console.log(response);
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
        handler: async(event) => this.props.handler(this.createTaxType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create TaxType</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="taxName" placeholder="Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <textarea  ref="aboutTax" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="taxDisplayName" placeholder="Display Name" className="form-control float-label" id=""/>
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
export default MlAddTaxType = formHandler()(MlAddTaxType);
