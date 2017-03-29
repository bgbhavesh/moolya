import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findRequestTypeActionHandler} from '../actions/findRequestTypeAction'
import {updateRequestTypeActionHandler} from '../actions/updateRequestTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditRequestType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateRequestType.bind(this)
    this.findRequestType.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findRequestType();
    return resp;

  }
  componentDidMount(){
    if(this.state.data.isActive){
      $('#status').prop('checked', true);
    }
  }
  componentDidUpdate(){
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async addEventHandler() {
   // const resp=await this.findRequestType
  //  return resp;
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
  async findRequestType(){
    let requestTypeId=this.props.config;
    const response = await findRequestTypeActionHandler(requestTypeId);
    this.setState({loading:false,data:response});
  }

  async  updateRequestType() {
    let RequestTypeDetails = {
      id: this.refs.id.value,
      requestName: this.refs.requestName.value,
      displayName: this.refs.displayName.value,
      requestDesc: this.refs.requestDesc.value,
      isActive: this.refs.isActive.checked
    };
    const response = await updateRequestTypeActionHandler(RequestTypeDetails)
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
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateRequestType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

        <div className="admin_padding_wrap">
          <h2>Edit RequestType</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                  <input type="text" ref="requestName" placeholder="Request Name" defaultValue={this.state.data&&this.state.data.requestName} className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <textarea  ref="requestDesc" placeholder="About" defaultValue={this.state.data&&this.state.data.requestDesc}className="form-control float-label" id=""></textarea>

                </div>
                </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.displayName} className="form-control float-label" id=""/>
                </div>
               <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" ref="isActive" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                    <div className="slider"></div>
                  </label>
                </div>
                </form>
            </div>
          </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />

      </div>)}
      </div>

    )
  }
};

export default MlEditRequestType = formHandler()(MlEditRequestType);
