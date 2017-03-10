import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {findSubDepartmentActionHandler} from '../actions/findSubDepartmentAction'
import {updateSubDepartmentActionHandler} from '../actions/updateSubDepartmentAction'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlAssignDepartments from './MlAssignDepartments'
import MlMoolyaAssignDepartment from './MlMoolyaAssignDepartment'
import {findDepartmentActionHandler} from '../actions/findDepartmentAction'
import ScrollArea from 'react-scrollbar';
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
class MlEditSubDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {loading:true,data:{id:props.config},departmentdata:{},department:'',subDepatmentAvailable:[]};
    this.addEventHandler.bind(this);
    this.editSubDepartment.bind(this);
    this.findSubDepartment.bind(this);
    return this;
  }
  componentDidMount() {
    if(this.state.data.isAcive){
      $('#status').prop('checked', true);
    }
  }

  componentWillMount() {
    const resp=this.findSubDepartment();
      return resp;
  }

  componentDidUpdate(){
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));

    OnToggleSwitch(true,true);
    initalizeFloatLabel();
  }

  async addEventHandler() {
    const resp=await this.editSubDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/subDepartmentsList");
      else
        toastr.error(response.result);
        FlowRouter.go("/admin/settings/subDepartmentsList");
    }
    //FlowRouter.go("/admin/settings/subDepartmentsList");
  };


  async  editSubDepartment() {
    let subDepartment= {
      subDepartmentName: this.refs.subDepartmentName.value,
      displayName: this.refs.displayName.value,
      aboutSubDepartment: this.refs.aboutSubDepartment.value,
      isActive: this.refs.subDepartmentStatus.checked,
      departmentId:this.state.department,
      isMoolya:this.refs.appType.checked,
    subDepatmentAvailable:this.state.subDepatmentAvailable
    }
    let SubDepartmentDetails={
      subDepartmentId:this.props.config,
      subDepartment:subDepartment
    }
    console.log(SubDepartmentDetails)

    const response = await updateSubDepartmentActionHandler(SubDepartmentDetails)
    if(response){

    }
    return response;

  }

  async  findSubDepartment() {
    let id = this.props.config
    const response = await findSubDepartmentActionHandler(id);
    if(response){
      this.setState({"department":response.departmentId})
      this.setState({loading:false,data:response});
    }


  }
  optionsBySelectDepartment(val){
    this.setState({department:val})
    this.findDepartment(val);

  }
  async findDepartment(val){
    let departmentId=val
    console.log(departmentId)
    const response = await findDepartmentActionHandler(departmentId);
    console.log(response)
    this.setState({departmentdata:response});
  }
  getDepartmentAvailability(details){
    console.log("details->"+details);
    this.setState({'subDepatmentAvailable':details})
  }
  getMoolyaDepartmentAvailability(details){
    this.setState({'subDepatmentAvailable':details})
  }
  onSubDepartmentStatusChange(e){
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
        handler: async(event) => this.props.handler(this.editSubDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    const showLoader=this.state.loading;
    let departmentquery=gql`query{ data:fetchDepartments{value:_id,label:departmentName}}`;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(

            <div className="admin_padding_wrap">
              <h2>Edit Sub Department</h2>
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
                      <input type="text" ref="subDepartmentName" defaultValue={this.state.data&&this.state.data.subDepartmentName} placeholder="Sub Department Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="displayName" defaultValue={this.state.data&&this.state.data.displayName} placeholder="Display Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <textarea ref="aboutSubDepartment" defaultValue={this.state.data&&this.state.data.aboutSubDepartment} placeholder="About" className="form-control float-label" id=""></textarea>
                    </div>
                    <div className="form-group switch_wrap inline_switch">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="subDepartmentStatus" checked={this.state.data&&this.state.data.isActive} onChange={this.onSubDepartmentStatusChange.bind(this)} />
                        <div className="slider"></div>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
                <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                    <form>
                      <div className="form-group">
                        <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} disabled={true} selectedValue={this.state.department} queryType={"graphql"} query={departmentquery}  isDynamic={true} id={'department'} onSelect={this.optionsBySelectDepartment.bind(this)} />
                      </div>
                      {this.state.data!=''&&(<div>
                        <div className="form-group switch_wrap switch_names" disabled="true">
                          <label>Select Type</label><br/>
                          <span className="state_label acLabel">moolya</span><label className="switch">
                          <input type="checkbox" ref="appType" checked={this.state.data&&this.state.data.isMoolya} disabled="true"/>
                          <div className="slider"></div>
                        </label>
                          <span className="state_label">non-moolya</span>
                        </div><br className="brclear"/>
                        {this.state.data&&this.state.data.isMoolya?<MlAssignDepartments getDepartmentAvailability={this.getDepartmentAvailability.bind(this)} nonMoolya={this.state.data&&this.state.data.subDepatmentAvailable} />:<MlMoolyaAssignDepartment getMoolyaDepartmentAvailability={this.getMoolyaDepartmentAvailability.bind(this)} moolya={this.state.data&&this.state.data.subDepatmentAvailable}/>}
                      </div> )}
                    </form>

                </div>


            </div>
                  </ScrollArea>
                </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
        )}
      </div>
    )
  }
};

export default MlEditSubDepartment = formHandler()(MlEditSubDepartment);
