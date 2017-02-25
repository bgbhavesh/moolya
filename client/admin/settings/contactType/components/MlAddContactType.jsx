import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addContactTypeActionHandler} from '../actions/addContactTypeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlAddContactType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createContactType.bind(this)
    return this;
  }

  componentDidMount() {

  }

  async addEventHandler() {
    const resp=await this.createLanguage();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/contactTypesList");
  };

  async  createContactType() {
    let Details = {
      contactName: this.refs.name.value,
      contactDisplayName: this.refs.displayName.value,
      aboutContact: this.refs.about.value,
      contactUploadIcon : this.refs.upload.value,
      isActive: this.refs.status.checked,
    }
    console.log(Details)

    const response = await addContactTypeActionHandler(Details);
    return response;

  }

  // getSubDepartmentAvailability(details){
  //   console.log("details->"+details);
  //   this.setState({'subdepartmentAvailability':details})
  // }

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
        handler: async(event) => this.props.handler(this.createContactType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Create Contact Type</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="name" placeholder="Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <form>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group ">
                    <div className="fileUpload mlUpload_btn">
                      <span>Upload Icon</span>
                      <input type="file" className="upload" ref="upload"/>
                    </div>
                  </div>
                  <br className="brclear"/>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="status" id="status"/>
                      <div className="slider"></div>
                    </label>
                  </div>
                </form>
              </ScrollArea>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
      </div>
    )
  }
};

export default MlAddContactType = formHandler()(MlAddContactType);
