import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findPermissionActionHandler} from '../actions/findPermissionAction'
import {updatePermissionActionHandler} from '../actions/updatePermissionAction'
class MlEditPermission extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.editPermission.bind(this)
    this.findPermission.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findPermission();
    return resp;


    //this.setState({departmentName:'manager',displayName:'Manager', about:'moolya manger ', selectCluster:'Select Cluster', email:'manger@moolya', status:true})

  }
  componentDidMount(){
    if(this.state.data.isActive){
      $('#status').prop('checked', true);
    }
  }

  async addEventHandler() {
    const resp=await this.createDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/permissionList");
  };
  async findPermission(){
    let permissionId=this.props.config
    console.log(permissionId)
    const response = await findPermissionActionHandler(permissionId);
    this.setState({loading:false,data:response});
    //return response;
  }
  async  editPermission() {
    let PermissionDetails = {
      id: this.refs.id.value,
      permissionName: this.refs.permissionName.value,
      displayName: this.refs.displayName.value,
      permissionDesc: this.refs.permissionDesc.value,
      isActive: this.refs.isActive.checked
    }
    console.log(PermissionDetails)

    const response = await updatePermissionActionHandler(PermissionDetails)
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
        handler: async(event) => this.props.handler(this.editPermission.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
          <h2>Edit Permission</h2>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="id" defaultValue={this.state.data&&this.state.data.id} hidden="true"/>
                  <input type="text" ref="permissionName" placeholder="Permission Name" defaultValue={this.state.data&&this.state.data.permissionName} className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <textarea  ref="permissionDesc" placeholder="About" defaultValue={this.state.data&&this.state.data.permissionDesc}className="form-control float-label" id=""></textarea>

                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="displayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.displayName} className="form-control float-label" id=""/>
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

export default MlEditPermission = formHandler()(MlEditPermission);
