import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addRequestActionHandler} from '../actions/addRequestTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
let FontAwesome = require('react-fontawesome');
class MlAddRequestType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createRequestType.bind(this)
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
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/requestTypeList");
      else
        toastr.error(response.result);
    }
  };

  async  createRequestType() {
    let RequestTypeDetails = {
      requestName: this.refs.requestName.value,
      displayName: this.refs.displayName.value,
      requestDesc: this.refs.requestDesc.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addRequestActionHandler(RequestTypeDetails)
    return response;

  }
  componentDidMount()
  {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
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
        handler: async(event) => this.props.handler(this.createRequestType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/requestTypeList")
        }
      }
    ]


    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Request type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="requestName" placeholder="Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea  ref="requestDesc" placeholder="About" className="form-control float-label" id=""></textarea>
                </div>
              </form>
                </div>

          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
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
export default MlAddRequestType = formHandler()(MlAddRequestType);
