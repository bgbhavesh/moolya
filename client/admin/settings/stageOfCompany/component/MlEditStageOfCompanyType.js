import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findStageOfCompanyTypeActionHandler} from '../actions/findStageOfCompanyTypeAction'
import {updateStageOfCompanyTypeActionHandler} from '../actions/updateStageOfCompanyTypeAction'
class MlEditStageOfCompanyType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateStageOfCompanyType.bind(this)
    this.findStageOfCompanyType.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findStageOfCompanyType();
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
    FlowRouter.go("/admin/settings/stageOfCompanyList");
  };
  async findStageOfCompanyType(){
    let StageOfCompanyTypeId=this.props.config
    const response = await findStageOfCompanyTypeActionHandler(StageOfCompanyTypeId);
    this.setState({loading:false,data:response});
  }
  async  updateStageOfCompanyType() {
    let StageOfCompanyType = {
      id: this.refs.id.value,
      stageOfCompanyName: this.refs.stageOfCompanyName.value,
      stageOfCompanyDisplayName: this.refs.stageOfCompanyDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateStageOfCompanyTypeActionHandler(StageOfCompanyType)
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
        handler: async(event) => this.props.handler(this.updateStageOfCompanyType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'add',
        handler: null
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ];

    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Edit Stage Of Company Type</h2>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="stageOfCompanyName" placeholder="Name" defaultValue={this.state.data&&this.state.data.stageOfCompanyName} className="form-control float-label" id=""/>

                  </div>
                  <div className="form-group">
                    <textarea  ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about} className="form-control float-label"></textarea>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="stageOfCompanyDisplayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.stageOfCompanyDisplayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Status</label><br/>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                      <div className="slider"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
            />

          </div>)}
      </div>

    )
  }
};

export default MlEditStageOfCompanyType = formHandler()(MlEditStageOfCompanyType);
