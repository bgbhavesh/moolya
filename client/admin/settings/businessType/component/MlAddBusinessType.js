import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addBusinessTypeActionHandler} from '../actions/addBusinessTypeAction'
class MlAddBusinessType extends React.Component {
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createBusinessType.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp = await this.createBusinessType();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/businessList");
      else
        toastr.error(response.result);
    }
  };

  async  createBusinessType() {
    let BusinessTypeDetails = {
      businessTypeName: this.refs.businessTypeName.value,
      businessTypeDisplayName: this.refs.businessTypeDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addBusinessTypeActionHandler(BusinessTypeDetails)
    return response;
  }

  render() {
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createBusinessType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    // const showLoader=this.state.loading;
    return (
      <div>
        {/*{showLoader===true?( <div className="loader_wrap"></div>):(*/}
          <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
          <h2>Create Business Type</h2>
          <div className="col-md-6">
          <div className="form_bg">
          <div className="form-group">
          <input type="text" ref="businessTypeName" placeholder="Business Name"
          className="form-control float-label"/>
          </div>
          <div className="form-group">
          <textarea ref="about" placeholder="About" className="form-control float-label"></textarea>
          </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="form_bg">
          <div className="form-group">
          <input type="text" ref="businessTypeDisplayName" placeholder="Display Name"
          className="form-control float-label"/>
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
        {/*)}*/}
      </div>
    )
  }
}
;

export default MlAddBusinessType = formHandler()(MlAddBusinessType);
