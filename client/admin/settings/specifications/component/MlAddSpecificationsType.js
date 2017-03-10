import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addSpecificationActionHandler} from '../actions/addSpecificationsTypeAction'
let FontAwesome = require('react-fontawesome');
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlAddSpecification extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createSpecification.bind(this)
    return this;
  }
  componentDidMount()
  {
    OnToggleSwitch(false,true);
    initalizeFloatLabel();
  }
  async addEventHandler() {
    const resp=await this.createSpecification();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/specificationList");
      else
        toastr.error(response.result);
    }
  };

  async  createSpecification() {
    let SpecificationDetails = {
      specificationName: this.refs.specificationName.value,
      specificationDisplayName: this.refs.specificationDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addSpecificationActionHandler(SpecificationDetails)
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
        handler: async(event) => this.props.handler(this.createSpecification.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Specification</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
              <div className="form-group">
                <input type="text" ref="specificationName" placeholder="Specification Name" className="form-control float-label"/>
              </div>
              <div className="form-group">
                <textarea ref="about" placeholder="About" className="form-control float-label"></textarea>
              </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
              <div className="form-group">
                <input type="text" ref="specificationDisplayName" placeholder="Display Name" className="form-control float-label"/>
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
export default MlAddSpecification = formHandler()(MlAddSpecification);
