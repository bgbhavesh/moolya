
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
// import {findRoleActionHandler} from '../actions/findRoleAction'
import {addRoleActionHandler} from '../actions/addRoleAction'
import MlAssignClustersToRoles from './MlAssignClustersToRoles'
import MlAssignModulesToRoles from './MlAssignModulesToRoles'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

let Select = require('react-select');

class MlAddRole extends React.Component{
  constructor(props){
    super(props);
    this.state={
      assignRoleToClusters:[],
      assignModulesToRoles:[],
      selectedUserType:'',
      selectedBackendUser:'Internal User',
      selectedSubChapter:''
    }
    this.addEventHandler.bind(this);
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
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/rolesList");
      else
        toastr.error(response.result);
    }
  };

  getassignRoleToClusters(details){
    this.setState({'assignRoleToClusters':details})
  }

  getassignModulesToRoles(details){
    this.setState({'assignModulesToRoles':details})
  }
  onSubmit(){
    console.log(this.state.assignRoleToClusters)
  }

  // async findRole(){
  //   let roleId=this.props.config;
  //   const response = await findRoleActionHandler(roleId);
  //   this.setState({loading:false,data:response});
  // }

  async  addRole() {
    let roleDetails = {
      roleName: this.refs.roleName.value,
      displayName:this.refs.diplayName.value,
      roleType:this.state.selectedUserType,
      subChapter:this.state.selectedSubChapter,
      userType:this.state.selectedBackendUser,
      about:this.refs.about.value,
      assignRoles:this.state.assignRoleToClusters,
      modules:this.state.assignModulesToRoles,
      isActive:this.refs.isActive.checked
    };
    if(!this.refs.diplayName.value || (this.refs.diplayName.value == "")){
      alert("Display Name is required")
    }else{
      const response = await addRoleActionHandler(roleDetails)
      return response;
    }
  }

  getAssignedDepartments(departments){
    this.setState({'mlAssignDepartmentDetails':departments})
  }

  onUserTypeSelect(val){
    this.setState({selectedUserType:val.value})
  }
  onBackendUserSelect(val){
    this.setState({selectedBackendUser:val.value})
  }
  optionsBySelectSubChapter(val){
    this.setState({selectedSubChapter:val})
  }



  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.addRole.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya' , clearableValue: true},
      {value: 'non-moolya', label: 'non-moolya',clearableValue: true}
    ];
    let BackendUserOptions=[
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    let subChapterQuery=gql` query{
  data:fetchActiveSubChapters{label:subChapterName,value:_id}
}
`;

   return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Roles & Permissions</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text"  ref="roleName" placeholder="Role Name" className="form-control float-label" id=""/>

                    </div>
                    <div className="form-group">
                      <input type="text" ref="diplayName" placeholder="Display Name" className="form-control float-label" id=""/>

                    </div>
                    <div className="form-group">
                      <Select name="form-field-name" ref="userType" placeholder="Backend User Role Type" options={UserTypeOptions}  value={this.state.selectedUserType}  onChange={this.onUserTypeSelect.bind(this)} className="float-label"/>
                    </div>
                    {this.state.selectedUserType=='non-moolya'&&(<div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Subchapter"  selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterQuery} isDynamic={true}  onSelect={this.optionsBySelectSubChapter.bind(this)} />
                    </div>)}
                    <div className="form-group">
                      <Select name="form-field-name" placeholder="Role Type"  className="float-label"  options={BackendUserOptions}  value={this.state.selectedBackendUser}  onChange={this.onBackendUserSelect.bind(this)} disabled={true} />
                    </div>
                    <div className="form-group">
                      <textarea placeholder="About" ref="about" className="form-control float-label"></textarea>
                    </div>

                    <MlAssignClustersToRoles getassignRoleToClusters={this.getassignRoleToClusters.bind(this)} selectedBackendUserType={this.state.selectedUserType} selectedSubChapter={this.state.selectedSubChapter}/>

                    <div className="form-group switch_wrap inline_switch">
                      <label className="">Overall Role Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="isActive" />
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right"  >
          <MlAssignModulesToRoles getassignModulesToRoles={this.getassignModulesToRoles.bind(this)}/>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
};
export default MlAddRole = formHandler()(MlAddRole);

