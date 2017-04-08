import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findTemplateTypeActionHandler} from '../actions/findTemplateTypeAction'
import {updateTemplateTypeActionHandler} from '../actions/updateTemplateTypeAction'
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditTransactionType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.updateTemplateType.bind(this)
    this.findTemplateType.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findTemplateType();
    return resp;
  }

  componentDidMount(){
    /*if(this.state.data.isActive){
     $('#status').prop('checked', true);
     }*/
  }

  componentDidUpdate(){
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/templateTypeList");
      else
        toastr.error(response.result);
    }
  };

  async findTemplateType(){
    let TemplateTypeId=this.props.config
    const response = await findTemplateTypeActionHandler(TemplateTypeId);
    this.setState({loading:false,data:response});
  }
  async  updateTemplateType() {
    let TemplateType = {
      id: this.refs.id.value,
      templateName: this.refs.templateName.value,
      templateDisplayName: this.refs.templateDisplayName.value,
      templateDescription: this.refs.templateDescription.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateTemplateTypeActionHandler(TemplateType)
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
        handler: async(event) => this.props.handler(this.updateTemplateType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          FlowRouter.go("/admin/settings/templateTypeList")
        }
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
            <div className="admin_padding_wrap">
              <h2>Edit Template Type</h2>
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="templateName" placeholder="Name" defaultValue={this.state.data&&this.state.data.templateName} className="form-control float-label" id=""/>

                  </div>
                  <div className="form-group">
                    <textarea  ref="templateDescription" placeholder="About" defaultValue={this.state.data&&this.state.data.templateDescription}className="form-control float-label" id=""></textarea>

                  </div>
                    </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="templateDisplayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.templateDisplayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Status</label><br/>
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

export default MlEditTransactionType = formHandler()(MlEditTransactionType);
