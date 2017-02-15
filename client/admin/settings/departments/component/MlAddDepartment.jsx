import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addDepartmentActionHandler} from '../actions/addDepartmentAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler'
import MlAssignDepartments from './MlAssignDepartments'
class MlAddDepartment extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      departmentAvailability:[]
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
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
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

    FlowRouter.go("/admin/settings/departmentsList");
  };

  async  createDepartment() {
    let DepartmentDetails = {
      departmentName: this.refs.departmentName.value,
      displayName: this.refs.displayName.value,
      aboutDepartment: this.refs.aboutDepartment.value,
      departmentStatus: this.refs.departmentStatus.checked,
      appType:this.refs.appType.checked,
      departmentAvailablity:this.state.departmentAvailability
    }
    console.log(DepartmentDetails)

    const response = await addDepartmentActionHandler(DepartmentDetails)
   return response;

  }

  getDepartmentAvailability(details){
    console.log("details->"+details);
    this.setState({'departmentAvailability':details})
  }
  onSubmit(){
    console.log(this.state.departmentAvailability)
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
        handler: async(event) => this.props.handler(this.createDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Department</h2>
          <div className="col-md-6">
            <div className="form_bg">
                <div className="form-group">
                  <input type="text" ref="departmentName" placeholder="Department Name" className="form-control float-label" id=""/>
                </div>

                <div className="form-group">
                  <input ref="displayName" placeholder="diplay Name" className="form-control float-label" id=""></input>
                </div>
                <div className="form-group">
                  <textarea ref="aboutDepartment" placeholder="about Depatment" className="form-control float-label" id=""></textarea>
                </div>

                <div className="form-group switch_wrap">
                  <label>Status</label><br/>
                  <label className="switch">
                    <input type="checkbox" ref="departmentStatus" />
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
                  <input type="checkbox" ref="appType" />
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

      </div>




    )
  }
};

export default MoolyaAddDepartment = formHandler()(MlAddDepartment);
