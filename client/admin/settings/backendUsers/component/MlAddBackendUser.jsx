import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlAssignDepartmentComponent from './MlAssignDepartmentComponent'
import MlContactFormComponent from './MlContactFormComponent'

let Select = require('react-select');


class MlAddBackendUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mlAssignDepartmentDetails:[],
      mlAssignContactDetails:[],
      password:'',
      confirmPassword:'',
      selectedBackendUserType:'',
      selectedBackendUser:''
    }
    this.addEventHandler.bind(this);
    this.createBackendUser.bind(this)
    this.onBackendUserTypeSelect.bind(this)
    this.onBackendUserSelect.bind(this)

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
    const resp=await this.createBackendUser();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/addBackendUser");
  };

  async  createBackendUser() {
    let backendUserDetails = {

    }
   // const response = await addTemplateActionHandler(TemplateDetails)
   // return response;

  }
  getAssignedDepartments(departments){
    this.setState({'mlAssignDepartmentDetails':departments})
  }
  getAssignedContacts(contacts){
    this.setState({'mlAssignContactDetails':contacts})
  }

  onBackendUserTypeSelect(val){
    this.setState({selectedBackendUserType:val.value})
  }
  onBackendUserSelect(val){
    this.setState({selectedBackendUser:val})
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
        handler: async(event) => this.props.handler(this.createBackendUser.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya'},
      {value: 'non-moolya', label: 'non-moolya'}
    ];
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Backend User</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
              >
                <div className="form_bg">
                    <div className="form-group">
                      <input type="text" ref="firstName" placeholder="First Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="middleName" placeholder="middle Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="lastName" placeholder="Last Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <Select name="form-field-name"  className="float-label"  options={UserTypeOptions}  value={this.state.selectedBackendUserType}  onChange={this.onBackendUserTypeSelect.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                    {/*  <Select name="form-field-name" value="select" options={options1} className="float-label"/>*/}
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedBackendUser} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onBackendUserSelect.bind(this)} />
                    </div>
                    <div className="form-group">
                      <input type="Password" ref="password" defaultValue={this.state.password} placeholder="Create Password" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="Password" ref="confirmPassword" defaultValue={this.state.confirmPassword} placeholder="Confirm Password" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group"> <a href="" className="mlUpload_btn">Reset Password</a> <a href="#" className="mlUpload_btn">Send Notification</a> </div>

                    <MlAssignDepartmentComponent getAssignedDepartments={this.getAssignedDepartments.bind(this)} />
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                >
                    <div className="form-group">
                      <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="email" placeholder="Email id" className="form-control float-label" id=""/>
                    </div>
                    <MlContactFormComponent getAssignedContacts={this.getAssignedContacts.bind(this)}/>

                    <div className="form-group switch_wrap inline_switch">
                      <label>Global Assignment Availability</label>
                      <label className="switch">
                        <input type="checkbox" ref="globalAssignment"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group switch_wrap inline_switch">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="isActive"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    <div className="panel panel-default">
                      <div className="panel-heading">Assigned Cluster Details</div>
                      <div className="panel-body">

                        <div className="form-group">
                          <input type="text" placeholder="Cluster" className="form-control float-label" id=""/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Chapter" className="form-control float-label" id=""/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Department" className="form-control float-label" id=""/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Sub Department" className="form-control float-label" id=""/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Role" className="form-control float-label" id=""/>
                        </div>
                        <div className="form-group">
                          <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                        </div>
                      </div>
                    </div>
                </ScrollArea>
              </div>
            </div>
          </div>

        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>

    )
  }
};
export default MlAddBackendUser = formHandler()(MlAddBackendUser);
