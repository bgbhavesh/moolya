import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findDepartmentActionHandler} from '../actions/findDepartmentAction'
class MlEditDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{}};
    this.addEventHandler.bind(this);
    this.editDepartment.bind(this)
    this.findDepartment.bind(this);
    return this;
  }

  componentWillMount() {

    const resp=this.findDepartment();
    return resp;


    //this.setState({departmentName:'manager',displayName:'Manager', about:'moolya manger ', selectCluster:'Select Cluster', email:'manger@moolya', status:true})

  }
  componentDidMount(){
    if(this.state.status){
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

    FlowRouter.go("/admin/dashboard");
  };
  async findDepartment(){
      let departmentId=this.props.config
      console.log(departmentId)
      const response = await findDepartmentActionHandler(departmentId);
    this.setState({loading:false,data:response});
      //return response;
    }
  async  editDepartment() {
    let DepartmentDetails = {
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      about: this.refs.about.value,
      selectCluster: this.refs.selectCluster.value,
      email: this.refs.email.value,
      status: this.refs.status.checked
    }
    console.log(DepartmentDetails)

    //const response = await createClusterActionHandler(clusterDetails)
    return DepartmentDetails;

  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.editDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
      {showLoader===true?( <div className="loader_wrap"></div>):( <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Edit Department</h2>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="departmentName" defaultValue={this.state.data&&this.state.data.departmentName} placeholder="Department Name" className="form-control float-label" id=""/>

              </div>
              <div className="form-group">
                <textarea ref="about" defaultValue={this.state.data&&this.state.data.departmentDesc} placeholder="About" className="form-control float-label" id=""></textarea>

              </div>
              <div className="form-group">
                <input type="text" ref="email" defaultValue={this.state.data&&this.state.data.email} placeholder="Department Email ID" className="form-control float-label" id=""/>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form_bg">
              <div className="form-group">
                <input type="text" ref="displayName" defaultValue={this.state.data&&this.state.data.displayName} placeholder="Display Name" className="form-control float-label" id=""/>

              </div>
              <div className="form-group">
                <select placeholder="Select Cluster" ref="selectCluster" defaultValue={this.state.selectCluster} className="form-control float-label">
                  <option>Select Cluster</option>
                </select>
              </div>

              <div className="form-group switch_wrap">
                <label>Status</label><br/>
                <label className="switch">
                  <input type="checkbox" ref="status" id="status" checked={this.state.data&&this.state.data.isActive}/>
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

export default MlEditDepartment = formHandler()(MlEditDepartment);
