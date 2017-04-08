import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {addTitleActionHandler} from '../actions/addTitleAction'
let FontAwesome = require('react-fontawesome');
class MlAddTitle extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createTitle.bind(this)
    return this;
  }

  async addEventHandler() {
    const resp=await this.createTitle();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/titleList");
  }

  async  createTitle() {
    let TitleDetails = {
      titleName: this.refs.titleName.value,
      titleDisplayName: this.refs.titleDisplayName.value,
      aboutTitle: this.refs.aboutTitle.value,
      isActive: this.refs.isActive.checked
    }
    const response = await addTitleActionHandler(TitleDetails)
    return response;
  }
  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'save',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createTitle.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/titleList")
        }
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Title</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="titleName" placeholder="Name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <textarea  ref="aboutTitle" placeholder="About" className="form-control float-label" id=""></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="titleDisplayName" placeholder="Display Name" className="form-control float-label" id=""/>
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
export default MlAddTitle = formHandler()(MlAddTitle);
