import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addSocialLinkTypeActionHandler} from '../actions/addSocialLinkTypeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';
import {initalizeFloatLabel} from '../../../utils/formElemUtil';


class MlAddSocialLinkType extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createSocialLinks.bind(this)
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
  }

  async addEventHandler() {
    const resp=await this.createSocialLinks();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    FlowRouter.go("/admin/settings/socialLinkTypeList");
  };

  async  createSocialLinks() {
    let Details = {
      socialName: this.refs.name.value,
      socialDisplayName: this.refs.displayName.value,
      aboutSocial: this.refs.about.value,
      socialUploadIcon : this.refs.upload.value,
      isActive: this.refs.status.checked,
    }
    const response = await addSocialLinkTypeActionHandler(Details);
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
        handler: async(event) => this.props.handler(this.createSocialLinks.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/socialLinkTypeList")
        }
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Social Link Type</h2>
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

export default MlAddSocialLinkType = formHandler()(MlAddSocialLinkType);
