import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import MlTaxTable from './MlTaxTable'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addTaxationActionHandler} from '../actions/addTaxationAction'
class MlEditTaxation extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      taxInformation:[]
    }
    this.addEventHandler.bind(this);
    this.createTaxation.bind(this)
    return this;
  }
  getTaxTableDetails(taxTypeInfo){
    console.log(taxTypeInfo)
    this.setState({taxInformation:taxTypeInfo})
  }
  async addEventHandler() {
    const resp=await this.createTaxation();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/taxationList");
  };

  async  createTaxation() {
    let TaxationDetails = {
      taxationName: this.refs.taxationName.value,
      taxationValidityFrom: this.refs.taxationValidityFrom.value,
      taxationValidityTo: this.refs.taxationValidityTo.value,
      aboutTaxation: this.refs.aboutTaxation.value,
      isActive: this.refs.isActive.checked,
      taxInformation: this.state.taxInformation
    }
    const response = await addTaxationActionHandler(TaxationDetails)
    return response;
  }
  onClickDate(event){
    let filedName=event.target.name
    let fieldId=filedName+id
    $("#"+fieldId).datepicker({ format: this.state.dateformate });
    $("#"+fieldId).focus();
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
        handler: async(event) => this.props.handler(this.createTaxation.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Taxation</h2>


          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="taxationName" placeholder="Taxation Name" className="form-control float-label" id="cluster_name"/>

                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  {/* <input type="text" ref="taxationValidityFrom" placeholder="Valid from" className="form-control float-label" id="cluster_name"/>*/}
                  <input type="text" placeholder="Valid from" ref="taxationValidityFrom" onClick={this.onClickDate.bind(this)} className="form-control float-label" name={'validFrom'}   id="#validFrom"/>
                  <FontAwesome name='calendar' className="password_icon" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="taxationValidityTo" placeholder="Valid to" className="form-control float-label" id="cluster_name"/>
                  <FontAwesome name='calendar' className="password_icon"/>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">

                   <textarea ref="aboutTaxation" placeholder="About" className="form-control float-label" id="cl_about">
                    </textarea>
                </div>
              </form>
            </div>
          </div>


          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" ref="isActive"/>
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>


          < MlTaxTable getTaxTableDetails={this.getTaxTableDetails.bind(this)}/>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />

      </div>


    )
  }
};
export default MlEditTaxation = formHandler()(MlEditTaxation);
