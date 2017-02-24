import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {updateAddressTypeActionHandler} from '../actions/updateAddressTypeAction'
import {findAddressTypeActionHandler} from '../actions/findAddressTypeAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import ScrollArea from 'react-scrollbar';

class MlEditAddressType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateLang.bind(this);
    this.findLang.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }
  componentWillMount() {
    const resp=this.findLang();
    return resp;
  }

  async addEventHandler() {
    const resp=await this.updateLang();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/addressTypeList");
  };
  async findLang(){
    let Id=this.props.config;
    const response = await findAddressTypeActionHandler(Id);
    this.setState({loading:false,data:response});
  }

  async  updateLang() {
    let Details = {
      _id : this.refs.id.value,
      addressName: this.refs.name.value,
      addressDisplayName: this.refs.displayName.value,
      aboutAddress: this.refs.about.value,
      addressUploadIcon : this.refs.upload.value,
      isActive: this.refs.status.checked,
    }
    console.log(Details)

    const response = await updateAddressTypeActionHandler(Details);
    return response;

  }

  onStatusChange(e){
    const data=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"data":{"isActive":true}});
    }else{
      this.setState({"data":{"isActive":false}});
    }
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
        handler: async(event) => this.props.handler(this.updateLang.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Create Address Type</h2>
              <div className="col-md-6 nopadding-left">
                <input type="text" ref="id" defaultValue={this.state.data&&this.state.data._id} hidden="true"/>
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" ref="name" defaultValue={this.state.data&&this.state.data.addressName} placeholder="Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <textarea ref="about" defaultValue={this.state.data&&this.state.data.aboutAddress} placeholder="About" className="form-control float-label" id=""></textarea>
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
                        <input type="text" ref="displayName" defaultValue={this.state.data&&this.state.data.addressDisplayName} placeholder="Display Name" className="form-control float-label" id=""/>
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
                          <input type="checkbox" ref="status" id="status" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                          <div className="slider"></div>
                        </label>
                      </div>
                    </form>
                  </ScrollArea>
                </div>
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
          </div>)}
      </div>
    )
  }
};

export default MlEditAddressType = formHandler()(MlEditAddressType);
