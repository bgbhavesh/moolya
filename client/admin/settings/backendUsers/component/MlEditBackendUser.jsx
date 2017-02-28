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
import {findBackendUserActionHandler} from '../actions/findBackendUserAction'
import {updateBackendUserActionHandler} from '../actions/updateBackendUserAction'
let Select = require('react-select');


class MlEditBackendUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:{},
      mlAssignDepartmentDetails:[],
      mlAssignContactDetails:[],
      password:'',
      confirmPassword:'',
      selectedBackendUserType:'',
      selectedBackendUser:'',
     /* selectedCluster:'',
      selectedChapter:'',
      selectedDepartment:'',
      selectedSubDepartment:'',
      selectedRole:''*/
    }
    this.addEventHandler.bind(this);
    this.updateBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this);
    this.onGlobalStatusChanged = this.onGlobalStatusChanged.bind(this);
    this.onisActiveChanged= this.onisActiveChanged.bind(this);
    // this.onisDefultChanged=this.onisDefultChanged.bind(this);
    /*this.onClusterSelect.bind(this);
    this.onChapterSelect.bind(this);
    this.onDepartmentSelect.bind(this);
    this.onSubDepartmentSelect.bind(this);
    this.onROleSelect.bind(this);*/
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

    FlowRouter.go("/admin/settings/backendUserList");
  };
  componentWillMount() {

    const resp=this.findBackendUser();
    return resp;

  }
  async findBackendUser(){
    let userTypeId=this.props.config
    //console.log(userTypeId)
    const response = await findBackendUserActionHandler(userTypeId);
    console.log(response)

   if(response){
     this.setState({loading:false,data:response});
      this.setState({selectedBackendUserType:this.state.data.profile.InternalUprofile.moolyaProfile.userType})
      this.setState({selectedBackendUser:this.state.data.profile.InternalUprofile.moolyaProfile.roleType})
    }
  }



  onGlobalStatusChanged(e){
    let updatedData = this.state.data||{};
    updatedData=_.omit(updatedData,["profile.InternalUprofile.moolyaProfile.globalAssignment"]);
    if (e.currentTarget.checked) {
      var z=_.extend(updatedData,{globalAssignment:true});
      this.setState({data:z,loading:false});
    } else {
      var z=_.extend(updatedData,{globalAssignment:false});
      this.setState({data:z,loading:false});
    }
  }

  onisActiveChanged(event){
    const data=this.state.data;
    if(event.currentTarget.checked){
      this.setState({"data":{"profile":{"InternalUprofile":{"moolyaProfile":{"isActive":true}}}}});
    }else{
      this.setState({"data":{"profile":{"InternalUprofile":{"moolyaProfile":{"isActive":false}}}}});
    }
  }

  async  updateBackendUser() {

    let userroles=[{
      roleId:this.refs.role.value,
      clusterId:this.refs.cluster.value,
      chapterId:this.refs.chapter.value,
      subChapterId:'',
      communityId:'',
      isActive: this.refs.isActive.checked,
      hierarchyLevel:''

    }]
    let userprofiles=[{
      isDefault: this.refs.isDefault.checked,
      clusterId: this.refs.cluster.value,
      userRoles:userroles
    }]

    let moolyaProfile = {
      firstName: this.refs.firstName.value,
      middleName: this.refs.middleName.value,
      lastName: this.refs.lastName.value,
      userType:this.state.selectedBackendUserType,
      roleType:this.state.selectedBackendUser,
      assignedDepartment:this.state.mlAssignDepartmentDetails,
      displayName:this.refs.displayName.value,
      email:this.refs.email.value,
      contact:this.state.mlAssignContactDetails,
      globalAssignment:this.refs.globalAssignment.checked,
      isActive:this.refs.isActive.checked,
      userProfiles:[]
    }
    let InternalUprofile={
      moolyaProfile: moolyaProfile
    }
    let profile={
      isInternaluser: true,
      isExternaluser: false,
      email: this.refs.email.value,
      InternalUprofile: InternalUprofile
    }
    let userObject={
      username: moolyaProfile.email,
      password: this.refs.password.value,
      profile:profile
    }

    console.log(userObject)

    console.log(userObject)
    let updateUserObject={
      userId:this.refs.id.value,
      userObject:userObject

    }
    const response = await updateBackendUserActionHandler(updateUserObject)
    return response;

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
    this.setState({selectedBackendUser:val.value})
  }
  /*onClusterSelect(val){
    this.setState({selectedCluster:val})
  }
  onChapterSelect(val){
    this.setState({selectedChapter:val})
  }
  onDepartmentSelect(val){
    this.setState({selectedDepartment:val})
  }
  onSubDepartmentSelect(val){
    this.setState({selectedSubDepartment:val})
  }
  onROleSelect(val){
    this.setState({selectedRole:val})
  }*/

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
        handler: async(event) => this.props.handler(this.updateBackendUser.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
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
    let BackendUserOptions=[
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]

    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    let rolequery=gql` query{
    data:fetchActiveRoles{label:roleName,value:_id}
    }
`;
    const showLoader=this.state.loading;
    return (
      <div>
        {showLoader===true?( <div className="loader_container"><div className="loader_wrap"></div></div>):(
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Edit Backend User</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
              >
                <div className="form_bg">
                  <div className="form-group">
                    <input type="text" ref="id" value={this.state.data&&this.state.data._id} hidden="true"/>
                    <input type="text" ref="firstName" placeholder="First Name" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.firstName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="middleName" placeholder="middle Name" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.middleName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="lastName" placeholder="Last Name" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.lastName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <Select name="form-field-name"  className="float-label"  options={UserTypeOptions}  value={this.state.selectedBackendUserType}  onChange={this.onBackendUserTypeSelect.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    {/*  <Select name="form-field-name" value="select" options={options1} className="float-label"/>*/}
                    <Select name="form-field-name" placeholder="Select Role"  className="float-label"  options={BackendUserOptions}  value={this.state.selectedBackendUser}  onChange={this.onBackendUserSelect.bind(this)}
                    />
                   {/* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedBackendUser} queryType={"graphql"} query={rolequery}  isDynamic={true}  onSelect={this.onBackendUserSelect.bind(this)} />*/}
                  </div>
                  <div className="form-group">
                    <input type="Password" ref="password" placeholder="Create Password" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.password} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="Password" ref="confirmPassword"  placeholder="Confirm Password" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.password} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group"> <a href="" className="mlUpload_btn">Reset Password</a> <a href="#" className="mlUpload_btn">Send Notification</a> </div>

                  <MlAssignDepartmentComponent getAssignedDepartments={this.getAssignedDepartments.bind(this)} departments={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.assignedDepartment} />

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
                    <input type="text" ref="displayName" placeholder="Display Name" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.displayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="email" placeholder="Email id" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.email} className="form-control float-label" id=""/>
                  </div>

                  <MlContactFormComponent getAssignedContacts={this.getAssignedContacts.bind(this)} contacts={this.state.data && this.state.data.profile.InternalUprofile.moolyaProfile.contact}/>

                  <div className="form-group switch_wrap inline_switch">
                    <label>Global Assignment Availability</label>
                    <label className="switch">
                      <input type="checkbox" ref="globalAssignment" checked={this.state.data && this.state.data.profile.InternalUprofile.moolyaProfile.globalAssignment}  onChange={this.onGlobalStatusChanged.bind(this)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" checked={this.state.data && this.state.data.profile.InternalUprofile.moolyaProfile.isActive}  onChange={this.onisActiveChanged.bind(this)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                  <div className="panel panel-default">
                    <div className="panel-heading">Assigned Cluster Details</div>
                    <div className="panel-body">

                      <div className="form-group">
                        <input type="text" ref="cluster"  placeholder="Cluster" className="form-control float-label" id="" disabled="true"/>
                        {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedCluster} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onClusterSelect.bind(this)} />*/}
                      </div>
                      <div className="form-group">
                        <input type="text" ref="chapter" placeholder="Chapter" className="form-control float-label" id="" disabled="true"/>
                        {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onChapterSelect.bind(this)} />*/}
                      </div>
                      <div className="form-group">
                        <input type="text" ref="department" placeholder="Department" className="form-control float-label" id="" disabled="true"/>
                        {/* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onDepartmentSelect.bind(this)} />*/}
                      </div>
                      <div className="form-group">
                        <input type="text" ref="subDepartment" placeholder="Sub Department" className="form-control float-label" id="" disabled="true"/>
                        {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onSubDepartmentSelect.bind(this)} />*/}
                      </div>
                      <div className="form-group">
                        <input type="text" ref="role" placeholder="Role" className="form-control float-label" id="" disabled="true"/>
                        {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onROleSelect.bind(this)} />*/}
                      </div>
                      <div className="form-group">
                        <div className="input_types"><input  ref="isDefault" id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
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
        )}
      </div>

    )
  }
};
export default MlEditBackendUser = formHandler()(MlEditBackendUser);
