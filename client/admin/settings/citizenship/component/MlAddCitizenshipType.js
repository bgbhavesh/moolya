import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addCitizenshipActionHandler} from '../actions/addCitizenshipTypeAction'
class MlAddCitizenship extends React.Component {
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createCitizenship.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp = await this.createCitizenship();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/citizenshipList");
  };

  async  createCitizenship() {
    let CitizenshipDetails = {
      citizenshipTypeName: this.refs.citizenshipTypeName.value,
      citizenshipTypeDisplayName: this.refs.citizenshipTypeDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }

    const response = await addCitizenshipActionHandler(CitizenshipDetails)
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
        handler: async(event) => this.props.handler(this.createCitizenship.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Citizenship</h2>
          <div className="col-md-6">
          <div className="form_bg">
          <div className="form-group">
          <input type="text" ref="citizenshipTypeName" placeholder="Citizenship Name"
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
          <input type="text" ref="citizenshipTypeDisplayName" placeholder="Display Name"
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

export default MlAddCitizenship = formHandler()(MlAddCitizenship);
