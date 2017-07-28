import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addAccountActionHandler} from '../actions/addAccountTypeAction'
let FontAwesome = require('react-fontawesome');
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';

class MlAddTemplate extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createAccount.bind(this)
    return this;
  }

  componentDidMount() {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
  }

  async addEventHandler() {
    const resp=await this.createAccount();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/accountTypeList");
      else
        toastr.error(response.result);
    }
  };

  async  createAccount() {
    let AccountDetails = {
      accountName: this.refs.accountName.value,
      accountDisplayName: this.refs.accountDisplayName.value,
      accountDescription: this.refs.accountDescription.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addAccountActionHandler(AccountDetails)
    toastr.success("AccountType Created Successfully")
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
        handler: async(event) => this.props.handler(this.createAccount.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/accountTypeList")
        }
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Account Type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
              <div className="form-group">
                <input type="text" ref="accountName" placeholder="Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <textarea  ref="accountDescription" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
                </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
              <div className="form-group">
                <input type="text" ref="accountDisplayName" placeholder="Display Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group switch_wrap inline_switch">
                <label>Status</label>
                <label className="switch">
                  <input type="checkbox" ref="isActive"/>
                  <div className="slider"></div>
                </label>
              </div>
                </form>
            </div>
          </div>

        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />

      </div>
    )
  }
};
export default MlAddTemplate = formHandler()(MlAddTemplate);
