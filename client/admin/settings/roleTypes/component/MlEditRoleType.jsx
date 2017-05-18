  import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {updateRoleActionHandler} from '../actions/updateRoleAction'
import {findRoleActionHandler} from '../actions/findRoleAction'
import MlAssignClustersToRoles from './MlAssignClustersToRoles'
import MlAssignModulesToRoles from './MlAssignModulesToRoles'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
let Select = require('react-select');
import {OnToggleSwitch,initalizeFloatLabel} from '../../../utils/formElemUtil';
  import MlLoader from '../../../../commons/components/loader/loader'

class MlEditRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      assignRoleToClusters: [],
      assignModulesToRoles: [],
      selectedUserType: '',
      selectedBackendUser: '',
      selectedSubChapter: ''
    }
    this.onStatusChange.bind(this);
    this.addEventHandler.bind(this);
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
  }
  componentDidUpdate() {
    OnToggleSwitch(true,true);
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    $('.admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
  }
  async addEventHandler() {
    const resp = await this.createBackendUser();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response) {
      if (response.success)
        FlowRouter.go("/admin/settings/rolesList");
      else
        toastr.error(response.result);
    }
  };

  getassignRoleToClusters(details) {
    this.setState({'assignRoleToClusters': details})
  }

  getassignModulesToRoles(details) {
    this.setState({'assignModulesToRoles': details})
  }

  onSubmit() {
    console.log(this.state.assignRoleToClusters)
  }

  onStatusChange(e) {
    if (e.currentTarget.checked) {
      this.setState({"isActive": true})
    } else {
      this.setState({"isActive": false})
    }
  }

  async  updateRole() {
    let roleObject = {
      roleName: this.refs.roleName.value,
      displayName: this.refs.diplayName.value,
      roleType: this.state.selectedUserType,
      userType: this.state.selectedBackendUser,
      about: this.refs.about.value,
      assignRoles: this.state.assignRoleToClusters,
      modules: this.state.assignModulesToRoles,
      isActive: this.refs.isActive.checked
    }
    let roleDetails = {
      id: this.props.config,
      roleObject: roleObject
    }
    const response = await updateRoleActionHandler(roleDetails)
    return response;

  }

  getAssignedDepartments(departments) {
    this.setState({'mlAssignDepartmentDetails': departments})
  }

  onUserTypeSelect(val) {
    this.setState({selectedUserType: val.value})
  }

  onBackendUserSelect(val) {
    this.setState({selectedBackendUser: val.value})
  }

  optionsBySelectSubChapter(val) {
    this.setState({selectedSubChapter: val})
  }

  async findRole() {
    let roleid = this.props.config;
    const response = await findRoleActionHandler(roleid);
    this.setState({loading: false, data: response});
    if (response) {
      this.setState({isActive: this.state.data.isActive})
      this.setState({selectedUserType: this.state.data.roleType})
      this.setState({selectedBackendUser: this.state.data.userType})
      this.setState({selectedSubChapter: this.state.data.subChapter})
    }
  }

  componentWillMount() {
    const resp = this.findRole();
    return resp;
  }

  render() {
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateRole.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      // {
      //   showAction: true,
      //   actionName: 'add',
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/rolesList")
        }
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya', clearableValue: true},
      {value: 'non-moolya', label: 'non-moolya', clearableValue: true}
    ];
    let BackendUserOptions = [
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]
    let query = gql` query{
      data:fetchCountriesSearch{label:country,value:countryCode}
    }
    `;
    let subChapterQuery = gql` query{
      data:fetchActiveSubChapters{label:subChapterName,value:_id}
    }
    `;
    const showLoader = this.state.loading;

    return (
      <div>
        {showLoader === true ? (<div className="loader_container">
          <MlLoader/>
        </div>) : (
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Edit Roles & Permissions</h2>
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
                        <div className="form-group">
                          <input type="text" ref="roleName" placeholder="Role Name"
                                 defaultValue={this.state.data && this.state.data.roleName}
                                 className="form-control float-label"/>

                        </div>
                        <div className="form-group">
                          <input type="text" ref="diplayName" placeholder="Display Name"
                                 defaultValue={this.state.data && this.state.data.displayName}
                                 className="form-control float-label"/>

                        </div>
                        <div className="form-group">
                          <Select name="form-field-name" ref="userType" options={UserTypeOptions}
                                  value={this.state.selectedUserType} onChange={this.onUserTypeSelect.bind(this)}
                                  className="float-label"/>
                        </div>
                        {this.state.selectedUserType == 'non-moolya' && (<div className="form-group">
                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                        labelKey={'label'} placeholder="Select Subchapter"
                                        selectedValue={this.state.selectedSubChapter} queryType={"graphql"}
                                        query={subChapterQuery} isDynamic={true}
                                        onSelect={this.optionsBySelectSubChapter.bind(this)}/>
                        </div>)}
                        <div className="form-group">
                          <Select
                            name="form-field-name" ref="roleType" options={BackendUserOptions}
                            value={this.state.selectedBackendUser} onChange={this.onBackendUserSelect.bind(this)}
                            className="float-label" disabled={true}/>
                        </div>
                        <div className="form-group">
                          <textarea placeholder="About" ref="about"
                                    defaultValue={this.state.data && this.state.data.about}
                                    className="form-control float-label"></textarea>
                        </div>

                        {this.state.data && this.state.data.assignRoles ? (
                          <MlAssignClustersToRoles getassignRoleToClusters={this.getassignRoleToClusters.bind(this)}
                                                   selectedBackendUserType={this.state.data && this.state.selectedUserType}
                                                   selectedSubChapter={this.state.data && this.state.selectedSubChapter}
                                                   assignedClusterDetails={this.state.data && this.state.data.assignRoles}/>) : ""}

                        <div className="form-group switch_wrap inline_switch">
                          <label className="">Overall Role Status</label>
                          <label className="switch">
                            <input type="checkbox" ref="isActive" checked={this.state.isActive}
                                   onChange={this.onStatusChange.bind(this)}/>
                            <div className="slider"></div>
                          </label>
                        </div>
                        <br className="brclear"/>
                      </form>
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
                      default={true}
                    >
                      <form style={{marginTop: '0px'}}>

                        {this.state.data && this.state.data.modules ? (
                          <MlAssignModulesToRoles getassignModulesToRoles={this.getassignModulesToRoles.bind(this)}
                                                  assignModulesToRolesData={this.state.data && this.state.data.modules}/>) : ""}
                      </form>
                    </ScrollArea>
                  </div>
                </div>
              </div>
                </ScrollArea>
              </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>

            </div>
          </div>)}
      </div>
    )
  }
}
;
export default MlEditRole = formHandler()(MlEditRole);

