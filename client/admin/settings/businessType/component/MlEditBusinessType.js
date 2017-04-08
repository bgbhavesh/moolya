import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findBusinessTypeActionHandler} from '../actions/findBusinessTypeAction'
import {updateBusinessTypeActionHandler} from '../actions/updateBusinessTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditBusinessType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateBusinessType.bind(this)
    this.findBusinessType.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findBusinessType();
    return resp;

  }
  componentDidMount(){
    /*if(this.state.data.isActive){
     $('#status').prop('checked', true);
     }*/
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
        FlowRouter.go("/admin/settings/businessList");
      else
        toastr.error(response.result);
    }
  };
  async findBusinessType(){
    let BusinessTypeId=this.props.config
    const response = await findBusinessTypeActionHandler(BusinessTypeId);
    this.setState({loading:false,data:response});
  }
  async  updateBusinessType() {
    let BusinessType = {
      id: this.refs.id.value,
      businessTypeName: this.refs.businessTypeName.value,
      businessTypeDisplayName: this.refs.businessTypeDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateBusinessTypeActionHandler(BusinessType)
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
  componentDidUpdate()
  {
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }
  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateBusinessType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          this.props.handler(" ");
          FlowRouter.go("/admin/settings/businessList")
        }
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Edit Business Type</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="businessTypeName" placeholder="Name" defaultValue={this.state.data&&this.state.data.businessTypeName} className="form-control float-label" id=""/>

                  </div>
                  <div className="form-group">
                    <textarea  ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about}className="form-control float-label" id=""></textarea>

                  </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="businessTypeDisplayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.businessTypeDisplayName} className="form-control float-label" id=""/>
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

export default MlEditBusinessType = formHandler()(MlEditBusinessType);
