import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addDepartmentActionHandler} from '../actions/addDepartmentAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler'
import MlAssignDepartments from './MlAssignDepartments'
import MlMoolyaAssignDepartment from './MlMoolyaAssignDepartment'
import ScrollArea from 'react-scrollbar';
class MlAddDepartment extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      departmentAvailability:[],
      ismoolya:false
    }
    this.addEventHandler.bind(this);
    this.createDepartment.bind(this)
    return this;
  }
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if($(this).parent().hasClass('nocolor-switch')){

        if ($(this).is(':checked')) {
          $('.state_label:nth-of-type(1)').removeClass('acLabel');
          $('.state_label:nth-of-type(2)').addClass('acLabel');
        }else{
          $('.state_label:nth-of-type(2)').removeClass('acLabel');
          $('.state_label:nth-of-type(1)').addClass('acLabel');
        }
      }else{
        if ($(this).is(':checked')) {
          $(this).parent('.switch').addClass('on');
        }else{
          $(this).parent('.switch').removeClass('on');
        }
      }
    });
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

  async  createDepartment() {
    let DepartmentDetails = {
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      aboutDepartment: this.refs.aboutDepartment.value,
      departmentStatus: this.refs.departmentStatus.checked,
      //isSystemDefined: this.refs.isSystemDefined.checked,
      appType:this.refs.appType.checked,
      departmentAvailablity:this.state.departmentAvailability
    }
    console.log(DepartmentDetails)

    const response = await addDepartmentActionHandler(DepartmentDetails)
   return response;

  }
  getMoolyaDepartmentAvailability(details){
    for(var i = 0; i < details.length; i++){
        details[i].clusters;
    }
    this.setState({'departmentAvailability':details})
  }
  getDepartmentAvailability(details){
    console.log(details);
    this.setState({'departmentAvailability':details})
  }
  onSubmit(){
    console.log(this.state.departmentAvailability)
  }
  onStatusChange(e){
    if(e.currentTarget.checked){
      this.setState({"ismoolya":true});
    }else{
      this.setState({"ismoolya":false});
    }
  }

  render(){
    let MlActionConfig = [
      /*{
        actionName: 'edit',
        showAction: true,
        handler: null
      },*/
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.createDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Department</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="departmentName" placeholder="Department Name" className="form-control float-label" id=""/>
                </div>

                <div className="form-group">
                  <input ref="displayName" placeholder="Display Name" className="form-control float-label" id=""></input>
                </div>
                <div className="form-group">
                  <textarea ref="aboutDepartment" placeholder="About Department" className="form-control float-label" id=""></textarea>
                </div>

                <div className="form-group switch_wrap inline_switch">
                  <label>Status</label>
                  <label className="switch">
                    <input type="checkbox" ref="departmentStatus" />
                    <div className="slider"></div>
                  </label>
                </div>

               {/* <div className="form-group switch_wrap inline_switch">
                  <label>Is SystemDefined </label>
                  <label className="switch">
                    <input type="checkbox" ref="isSystemDefined" />
                    <div className="slider"></div>
                  </label>
                </div>*/}
</form>
            </div>
          </div>

          <div className="col-md-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
              <form>
                <div className="form-group switch_wrap switch_names">
                  <label>Select Type</label><br/>
                  <span className="state_label acLabel">moolya</span><label className="switch nocolor-switch">
                  <input type="checkbox" ref="appType" onChange={this.onStatusChange.bind(this)} />
                  <div className="slider"></div>
                </label>
                  <span className="state_label">non-moolya</span>
                </div><br className="brclear"/>

                {this.state.ismoolya?<MlAssignDepartments getDepartmentAvailability={this.getDepartmentAvailability.bind(this)}/>:<MlMoolyaAssignDepartment getMoolyaDepartmentAvailability={this.getMoolyaDepartmentAvailability.bind(this)}/>}


              </form>
              </ScrollArea>
            </div>
          </div>
        </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

      </div>
    )
  }
};

export default MoolyaAddDepartment = formHandler()(MlAddDepartment);
