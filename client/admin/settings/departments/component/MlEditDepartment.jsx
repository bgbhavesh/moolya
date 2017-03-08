import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findDepartmentActionHandler} from '../actions/findDepartmentAction'
import  {updateDepartmentActionHandler} from '../actions/updateDepartmentAction'
import MlAssignDepartments from './MlAssignDepartments'
import MlMoolyaAssignDepartment from './MlMoolyaAssignDepartment'
import ScrollArea from 'react-scrollbar';
class MlEditDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{},departmentAvailability:[],isMoolyaChecked:''};
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

  componentDidUpdate(){
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
  }

  async addEventHandler() {
    const resp=await this.createDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    //FlowRouter.go("/admin/settings/departmentsList");
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/departmentsList");
      else
        toastr.error(response.result);
      FlowRouter.go("/admin/settings/departmentsList");
    }
  };
  async findDepartment(){
      let departmentId=this.props.config
      console.log(departmentId)
      const response = await findDepartmentActionHandler(departmentId);
    this.setState({loading:false,data:response});
    this.setState({'isMoolyaChecked':this.state.data&&this.state.data.isMoolya})
      //return response;
    }
  async  editDepartment() {
    let departmentObject = {
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      departmentDesc: this.refs.aboutDepartment.value,
      isActive: this.refs.departmentStatus.checked,
      isMoolya:this.refs.appType.checked,
      depatmentAvailable:this.state.departmentAvailability
    }
    let DepartmentDetails={
         departmentId:  this.props.config     ,
         department: departmentObject
    }
    console.log(DepartmentDetails)

    const response = await updateDepartmentActionHandler(DepartmentDetails)
    return response;

  }

  getDepartmentAvailability(details){
    console.log("details->"+details);
    this.setState({'departmentAvailability':details})
  }
  getMoolyaDepartmentAvailability(details){
    this.setState({'departmentAvailability':details})
  }

  onSubmit(){
    console.log(this.state.departmentAvailability)
  }


  onStatusChange(e){
          let updatedData = this.state.data||{};
          updatedData=_.omit(updatedData,["isActive"]);
          if (e.currentTarget.checked) {
            var z=_.extend(updatedData,{isActive:true});
            this.setState({data:z,loading:false});
          } else {
            var z=_.extend(updatedData,{isActive:false});
            this.setState({data:z,loading:false});
          }
  }

  onMoolyaChange(e){
    const dataDetails=this.state.data;
    if(e.currentTarget.checked){
      this.setState({"isMoolyaChecked":true});
    }else{
      this.setState({"isMoolyaChecked":false});
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
      <div className="admin_main_wrap">
      {showLoader===true?( <div className="loader_wrap"></div>):(



          <div className="admin_padding_wrap">
            <h2>Edit Department</h2>
            <div className="main_wrap_scroll">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
            <div className="col-md-6 nopadding-left">
              <div className="form_bg">
                <form>
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
                    <input type="checkbox" ref="departmentStatus" checked={this.state.data&&this.state.data.isActive} onChange={this.onStatusChange.bind(this)}/>
                    <div className="slider"></div>
                  </label>
                </div>
                  </form>
              </div>
            </div>

            <div className="col-md-6 nopadding-right">
              <div className="form_bg">
                <form>
                  <div className="form-group switch_wrap switch_names">
                    <label>Select Type</label><br/>
                    <span className="state_label acLabel">moolya</span><label className="switch">
                    <input type="checkbox" ref="appType" disabled="true" checked={this.state.isMoolyaChecked} onChange={this.onMoolyaChange.bind(this)} />
                    <div className="slider"></div>
                  </label>
                    <span className="state_label">non-moolya</span>
                  </div><br className="brclear"/>
                  {this.state.isMoolyaChecked?<MlAssignDepartments getDepartmentAvailability={this.getDepartmentAvailability.bind(this)} nonMoolya={this.state.data&&this.state.data.depatmentAvailable} isSystemDefined={this.state.data&&this.state.data.isSystemDefined}/>:<MlMoolyaAssignDepartment getMoolyaDepartmentAvailability={this.getMoolyaDepartmentAvailability.bind(this)} moolya={this.state.data&&this.state.data.depatmentAvailable}/>}
                </form>
              </div>
            </div>
                </ScrollArea>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>)}
      </div>
    )
  }
};

export default MlEditDepartment = formHandler()(MlEditDepartment);
