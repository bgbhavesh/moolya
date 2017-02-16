import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findDepartmentActionHandler} from '../actions/findDepartmentAction'
import  {updateDepartmentActionHandler} from '../actions/updateDepartmentAction'
import MlAssignDepartments from './MlAssignDepartments'
class MlEditDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{},departmentAvailability:[]};
    this.addEventHandler.bind(this);
    this.editDepartment.bind(this)
    this.findDepartment.bind(this);
    return this;
  }

  componentWillMount() {
    const resp=this.findDepartment();
    return resp;
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

    FlowRouter.go("/admin/settings/departmentsList");
  };
  async findDepartment(){
      let departmentId=this.props.config
      console.log(departmentId)
      const response = await findDepartmentActionHandler(departmentId);
    this.setState({loading:false,data:response,departmentAvailability:response.depatmentAvailable});
      //return response;
    }
  async  editDepartment() {
    let DepartmentDetails = {
      id: this.refs.id.value,
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      aboutDepartment: this.refs.aboutDepartment.value,
      departmentStatus: this.refs.departmentStatus.checked,
      appType:this.refs.appType.checked,
      departmentAvailablity:this.state.departmentAvailability
    }
    console.log(DepartmentDetails)

    const response = await updateDepartmentActionHandler(DepartmentDetails)
    return response;

  }

  getDepartmentAvailability(details){
    console.log("details->"+details);
    this.setState({'departmentAvailability':details})
  }
  onSubmit(){
    console.log(this.state.departmentAvailability)
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
      {showLoader===true?( <div className="loader_wrap"></div>):(


        <div className="admin_main_wrap">
          <div className="admin_padding_wrap">
            <h2>Edit Department</h2>
            <div className="col-md-6">
              <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="departmentName" defaultValue={this.state.data&&this.state.data.departmentName} placeholder="Department Name" className="form-control float-label" id=""/>
                </div>

                <div className="form-group">
                  <input ref="displayName" defaultValue={this.state.data&&this.state.data.displayName} placeholder="diplay Name" className="form-control float-label" id=""></input>
                </div>
                <div className="form-group">
                  <textarea ref="aboutDepartment" defaultValue={this.state.data&&this.state.data.departmentDesc} placeholder="about Depatment" className="form-control float-label" id=""></textarea>
                </div>

                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="departmentStatus" checked={this.state.data&&this.state.data.isActive}/>
                    <div className="slider"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group switch_wrap switch_names">
                    <label>Select Type</label><br/>
                    <span className="state_label acLabel">moolya</span><label className="switch">
                    <input type="checkbox" ref="appType" checked={this.state.data&&this.state.data.isMoolya}/>
                    <div className="slider"></div>
                  </label>
                    <span className="state_label">non-moolya</span>
                  </div><br className="brclear"/>


                  <MlAssignDepartments getDepartmentAvailability={this.getDepartmentAvailability.bind(this)}/>

                </form>
              </div>
            </div>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>)}
      </div>
    )
  }
};

export default MlEditDepartment = formHandler()(MlEditDepartment);
