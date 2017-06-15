
import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import formHandler from "../../../../commons/containers/MlFormHandler";
import {addRoleActionHandler} from "../actions/addRoleAction";
import MlAssignClustersToRoles from "./MlAssignClustersToRoles";
import MlAssignModulesToRoles from "./MlAssignModulesToRoles";
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";
import {OnToggleSwitch, initalizeFloatLabel} from "../../../utils/formElemUtil";
import {mlFieldValidations} from "../../../../commons/validations/mlfieldValidation";
import _ from "lodash";
let Select = require('react-select');

class MlAddRole extends React.Component{
  constructor(props){
    super(props);
    this.state={
      assignRoleToClusters:[],
      assignModulesToRoles:[],
      selectedUserType:'',
      selectedBackendUser:'Internal User',
      selectedSubChapter:'',
      selectedCommunity:''
    }
    this.addEventHandler.bind(this);
    return this;
  }
  componentDidMount()
  {
    initalizeFloatLabel();
    OnToggleSwitch(false,true);
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
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


  async  addRole() {
    let ret = mlFieldValidations(this.refs)
    if (ret) {
      toastr.error(ret);
    } else {
      let roleDetails = {
        roleName: this.refs.roleName.value,
        displayName: this.refs.diplayName.value,
        roleType: this.state.selectedUserType,
        // subChapter: this.state.selectedSubChapter,
        userType: this.state.selectedBackendUser,
        about: this.refs.about.value,
        assignRoles: this.state.assignRoleToClusters,
        modules: this.state.assignModulesToRoles,
        isActive: this.refs.isActive.checked
      };

      var emptyCluster = _.filter(roleDetails.assignRoles, ['cluster', ''])
      var emptyChapter = _.filter(roleDetails.assignRoles, ['chapter', ''])
      var emptySubChapter = _.filter(roleDetails.assignRoles, ['subChapter', ''])
      var emptyCommunity = _.filter(roleDetails.assignRoles, ['community', ''])
      var emptyDepartment = _.filter(roleDetails.assignRoles, ['department', ''])
      var emptySubDepartment = _.filter(roleDetails.assignRoles, ['subDepartment', ''])

      if (_.isEmpty(emptyCluster) && _.isEmpty(emptyChapter) && _.isEmpty(emptySubChapter) && _.isEmpty(emptyCommunity) && _.isEmpty(emptyDepartment) && _.isEmpty(emptySubDepartment)) {
        const response = await addRoleActionHandler(roleDetails)
        toastr.success("Role Created Successfully");
        return response;
      } else {
        toastr.error("All Assign role fields Required");
      }
    }
  }

  getAssignedDepartments(departments){
    this.setState({'mlAssignDepartmentDetails':departments})
  }

  onUserTypeSelect(val){
    if(val)
      this.setState({selectedUserType:val.value})
    else{
      this.setState({selectedUserType:''})
    }
  }
  onBackendUserSelect(val){
    this.setState({selectedBackendUser:val.value})
  }
  // optionsBySelectSubChapter(val){
  //   this.setState({selectedSubChapter:val})
  // }



  render(){
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.addRole.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/rolesList")
        }
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'EcoSystem', clearableValue: true},
      {value: 'non-moolya', label: 'SubChapter', clearableValue: true}
    ];
    let BackendUserOptions = [
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
//     let subChapterQuery=gql` query{
//   data:fetchActiveSubChapters{label:subChapterName,value:_id}
// }
// `;


   return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Roles & Permissions</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
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
                    <div className="form-group mandatory">
                      <input type="text"  ref="roleName" placeholder="Role Name" className="form-control float-label" id="" data-required={true} data-errMsg="Role Name is required"/>

                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="diplayName" placeholder="Display Name" className="form-control float-label" id="" data-required={true} data-errMsg="Display Name is required"/>

                    </div>
                    <div className="form-group mandatory">
                      <Select name="form-field-name" ref="userType" placeholder="Backend User Role Type" options={UserTypeOptions}  value={this.state.selectedUserType}  onChange={this.onUserTypeSelect.bind(this)} className="float-label" data-required={true} data-errMsg=" Backend User Role Type is required"/>
                    </div>
                    {/*{this.state.selectedUserType=='non-moolya'&&(*/}
                      {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Subchapter"  selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterQuery} isDynamic={true}  onSelect={this.optionsBySelectSubChapter.bind(this)} />*/}
                    {/*)}*/}
                    <div className="form-group mandatory">
                      <Select name="form-field-name" placeholder="Role Type"  className="float-label"  options={BackendUserOptions}  value={this.state.selectedBackendUser}  onChange={this.onBackendUserSelect.bind(this)} disabled={true} />
                    </div>
                    <div className="form-group">
                      <textarea placeholder="About" ref="about" className="form-control float-label"></textarea>
                    </div>

                    {/*<MlAssignClustersToRoles getassignRoleToClusters={this.getassignRoleToClusters.bind(this)} selectedBackendUserType={this.state.selectedUserType} selectedSubChapter={this.state.selectedSubChapter}/>*/}
                    <MlAssignClustersToRoles getassignRoleToClusters={this.getassignRoleToClusters.bind(this)} selectedBackendUserType={this.state.selectedUserType} />

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
            </ScrollArea>
          </div>

          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

        </div>


      </div>
    )
  }
};
export default MlAddRole = formHandler()(MlAddRole);

