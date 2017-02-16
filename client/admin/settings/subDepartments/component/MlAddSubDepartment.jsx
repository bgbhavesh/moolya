import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {addSubDepartmentActionHandler} from '../actions/addSubDepartmentAction'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import MlAssignSubDepartments from './MlAssignSubDepartments'
import ScrollArea from 'react-scrollbar';

class MlAddSubDepartment extends React.Component{
  constructor(props) {
    super(props);
    this.addEventHandler.bind(this);
    this.createSubDepartment.bind(this)
    return this;
  }

  componentDidMount() {

  }

  async addEventHandler() {
    const resp=await this.createSubDepartment();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/subDepartmentsList");
  };

  async  createSubDepartment() {
    let SubDepartmentDetails = {
        subDepartmentName: this.refs.subDepartmentName.value,
        displayName: this.refs.displayName.value,
        aboutSubDepartment: this.refs.about.value,
        isActive: this.refs.subDepartmentStatus.checked,
        departmentId: this.refs.departmentName.value,
        isMoolya: this.refs.subDeptype.value,
        subDepatmentAvailable:this.state.subdepartmentAvailability
    }
    console.log(SubDepartmentDetails)

    const response = await addSubDepartmentActionHandler(SubDepartmentDetails);
    return response;

  }

  getSubDepartmentAvailability(details){
    console.log("details->"+details);
    this.setState({'subdepartmentAvailability':details})
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
          handler: async(event) => this.props.handler(this.createSubDepartment.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
                  <h2>Create Sub Department</h2>
                  <div className="col-md-6 nopadding-left">
                      <div className="form_bg">
                          <form>
                              <div className="form-group">
                                  <input type="text" ref="subDepartmentName" placeholder="Sub Department Name" className="form-control float-label" id=""/>
                              </div>
                              <div className="form-group">
                                  <input type="text" ref="displayName" placeholder="Displayname" className="form-control float-label" id=""/>
                              </div>

                              <div className="form-group">
                                  <input type="text" ref="email" placeholder="Sub Department Email ID" className="form-control float-label" id=""/>
                              </div>
                              <div className="form-group">
                                  <textarea ref="about" placeholder="About" className="form-control float-label" id=""></textarea>
                              </div>
                              <div className="form-group switch_wrap inline_switch">
                                  <label>Status</label>
                                  <label className="switch">
                                     <input type="checkbox" ref="subDepartmentStatus" />
                                    <div className="slider"></div>
                                  </label>
                              </div>
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
                                  <div className="form-group">
                                      <input type="text" ref="departmentName" placeholder="Department Name" className="form-control float-label" id=""/>
                                  </div>
                                  <div className="form-group switch_wrap switch_names">
                                      <span className="state_label acLabel">moolya</span>
                                      <label className="switch">
                                          <input type="checkbox" ref="subDeptype"/>
                                          <div className="slider"></div>
                                      </label>
                                      <span className="state_label">non-moolya</span>
                                  </div>
                                  <br className="brclear"/>
                                  <div className="panel panel-default">
                                      <div className="panel-body">
                                          <MlAssignSubDepartments getSubDepartmentAvailability={this.getSubDepartmentAvailability.bind(this)}/>
                                      </div>
                                  </div>
                              </form>
                          </ScrollArea>
                      </div>
                  </div>
                <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
              </div>
          </div>
      )
  }
};

export default MoolyaAddSubDepartment = formHandler()(MlAddSubDepartment);
