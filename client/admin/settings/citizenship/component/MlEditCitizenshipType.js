import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findCitizenshipActionHandler} from '../actions/findCitizenshipTypeAction'
import {updateCitizenshipTypeActionHandler} from '../actions/updateCitizenshipTypeAction'
class MlEditCitizenshipType extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.updateCitizenshipType.bind(this)
    this.findCitizenshipType.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findCitizenshipType();
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
    FlowRouter.go("/admin/settings/citizenshipList");
  };
  async findCitizenshipType(){
    let CitizenshipTypeId=this.props.config
    const response = await findCitizenshipActionHandler(CitizenshipTypeId);
    this.setState({loading:false,data:response});
  }
  async  updateCitizenshipType() {
    let CitizenshipType = {
      id: this.refs.id.value,
      citizenshipTypeName: this.refs.citizenshipTypeName.value,
      citizenshipTypeDisplayName: this.refs.citizenshipTypeDisplayName.value,
      about: this.refs.about.value,
      isActive: this.refs.isActive.checked
    }
    const response = await updateCitizenshipTypeActionHandler(CitizenshipType)
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
        handler: async(event) => this.props.handler(this.updateCitizenshipType.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
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
              <h2>Edit Citizenship Type</h2>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                    <input type="text" ref="citizenshipTypeName" placeholder="Name" defaultValue={this.state.data&&this.state.data.citizenshipTypeName} className="form-control float-label"/>

                  </div>
                  <div className="form-group">
                    <textarea  ref="about" placeholder="About" defaultValue={this.state.data&&this.state.data.about}className="form-control float-label"></textarea>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="citizenshipTypeDisplayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.citizenshipTypeDisplayName} className="form-control float-label"/>
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

export default MlEditCitizenshipType = formHandler()(MlEditCitizenshipType);
