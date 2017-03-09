import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler'
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'
import MlAssignBackendUserList from './MlAssignBackendUserList'
import MlAssignBackednUserRoles from './MlAssignBackendUserRoles'
import {mlClusterConfig} from '../config/mlClusterConfig'
import {multipartFormHandler} from '../../../commons/MlMultipartFormAction'
import {findUserDetails} from '../actions/findUserDetails'
import {findRoles} from '../actions/fetchRoles'
import {findCluster_Roles} from '../actions/findCluster_Roles'
import {findClusterTypeActionHandler} from '../actions/findCluster'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');


class MlAssignBackendUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cluster: {},
      alsoAssignedAs: [],
      selectedBackendUser: '',
      users: [{username: '', _id: ''}],
      userDisplayName: '',
      username: '',
    }

    this.addEventHandler.bind(this);
    this.assignBackendUsers.bind(this);
    this.updateSelectedBackEndUser.bind(this);
    this.findCluster.bind(this);
    // this.enableAssignUser = this.enableAssignUser().bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findCluster();
    return resp;
  }

  async findCluster() {
    let clusterId = this.props.params;
    const response = await findClusterTypeActionHandler(clusterId);
    this.setState({loading: false, cluster: response});
  }

  enableAssignUser() {
  }

  optionsBySelectUser(index, selectedIndex) {
    this.setState({loading: true});
    this.setState({selectedBackendUser: index})
    const resp = this.findUserDetails(index);
    // const assigned = this.findRoleDetails();
  }

  getAssignedRoles(roles) {
    this.setState({'mlroleDetails': roles})
    console.log(this.state.mlroleDetails)
  }

  async addEventHandler() {
    const resp = await this.assignBackendUsers();
    return resp;
  }

  async findUserDetails(userId) {
    const user = await findUserDetails(userId);
    if (userId != "") {
      let that = this;
      this.find_Cluster_Roles(userId, that.props.params);
      this.setState({
        userMoolyaProfile: user.profile.InternalUprofile.moolyaProfile,
        userDisplayName: user.profile.InternalUprofile.moolyaProfile.displayName,
        username: user.profile.InternalUprofile.moolyaProfile.email,
        deActive: user.profile.deActive
      });
      // this.findRoleDetails();
      return user;
    } else {
      this.setState({
        userDisplayName: '',
        username: '',
        alsoAssignedAs: [],
        deActive: false,
        loading: false,
      });
    }
  }

  async find_Cluster_Roles(userId, clusterId) {
    const userProfile = await findCluster_Roles(userId, clusterId);
    if (userProfile){
      var roles = userProfile.userRoles || [];
    }else {
      var roles = [];
    }
    // var roles = userProfile.userRoles || [];
    this.setState({user_Roles: roles, selectedBackendUser: userId, mlroleDetails: roles});
    this.findRoleDetails();
    return roles
  }

  async findRoleDetails() {
    let roleIds = [];
    let that = this;
    if (that.state.user_Roles && that.state.user_Roles.length > 0) {
      that.state.user_Roles.map(function (role) {
        if (that.props.params == role.clusterId) {
          roleIds.push(role.roleId);
        }
      });
    }
    const roles = await findRoles(roleIds);
    this.setState({loading:false,alsoAssignedAs: roles});
    return roles;
  }

  async assignBackendUsers() {
    let userProfile = {};
    userProfile['clusterId'] = this.props.params;
    userProfile['userRoles'] = this.state.mlroleDetails;
    userProfile['displayName'] = this.refs.displayName.value;
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {userProfiles: userProfile}},
        deActive: this.refs.deActive.checked
      }
    }
    let data = {moduleName: "USERS", actionName: "UPDATE", userId: this.state.selectedBackendUser, user: user}
    let response = await multipartFormHandler(data, this.refs.profilePic.files[0])
    console.log("ddd");
    console.log(response);

    return response;
  }

  async handleSuccess() {
    this.resetBackendUers();
  }

  handleError() {

  }

  updateSelectedBackEndUser(userId) {
    // this.setState({"selectedBackendUser":userId});
    this.setState({loading: true});
    const resp = this.findUserDetails(userId);
  }

  resetBackendUers() {
    this.setState({loading: true});
    this.setState({selectedBackendUser: ''})
    this.findUserDetails('');
  }

  render() {
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this),this.handleSuccess.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let that = this;
    let queryOptions = {options: {variables: {clusterId: that.props.params}}};
    let query = gql`query($clusterId:String){data:fetchUsersByClusterDepSubDep(clusterId: $clusterId){label:username,value:_id}}`;
    let userid = this.state.selectedBackendUser || "";
    let userDisplayName = this.state.userDisplayName || "";
    let username = this.state.username || "";
    let alsoAssignedAs = this.state.alsoAssignedAs || [];
    let deActive = that.state.deActive
    const showLoader = this.state.loading;

    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="admin_padding_wrap">
            <h2>Assign internal user to Cluster</h2>
            <div className="col-md-6 nopadding-left">
              <div className="row">
                <div className="left_wrap left_user_blocks">
                  <ScrollArea speed={0.8} className="left_wrap">
                    <div className="col-md-4 col-sm-4" onClick={this.resetBackendUers.bind(that)}>
                      <div className="list_block provider_block">
                        <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                        <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                               src="/images/def_profile.png"/>
                        </div>
                        <h3>Assign <br/> Backend Users</h3>
                      </div>
                    </div>
                    {that.state.cluster.isActive ? <MlAssignBackendUserList clusterId={that.props.params}
                                                                            updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/> :
                      <div></div>}
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="left_wrap">
                <ScrollArea speed={0.8} className="left_wrap">
                  <form>
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                        <input type="file" className="upload" ref="profilePic"/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/def_profile.png"/>
                      </div>
                    </div>
                    <br className="brclear"/>
                    {that.state.cluster.isActive ?
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={query} queryOptions={queryOptions}
                                    isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)}
                                    selectedValue={this.state.selectedBackendUser}/> :
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"}/>}
                    {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query}  queryOptions={queryOptions}  isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)} selectedValue={this.state.selectedBackendUser}/>*/}
                    <div className="form-group">
                      <input type="text" id="AssignedAs" placeholder="Also Assigned As"
                             className="form-control float-label" disabled="true" defaultValue={alsoAssignedAs}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Display Name" ref="displayName" defaultValue={userDisplayName}
                             className="form-control float-label" id="dName"/>
                    </div>
                    <div className="form-group">
                      <input type="text" readOnly="true" placeholder="User Name" className="form-control float-label"
                             id="userName" ref="userName" defaultValue={username}/>
                    </div>

                    {userid ? (<MlAssignBackednUserRoles userId={userid} clusterId={that.props.params}
                                                         assignedRoles={this.state.user_Roles}
                                                         getAssignedRoles={this.getAssignedRoles.bind(this)}/>) :
                      <div></div>}
                    <div className="form-group switch_wrap inline_switch">
                      <label className="">De-Activate User</label>
                      <label className="switch">
                        <input type="checkbox" ref="deActive" checked={deActive}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </form>
                </ScrollArea>
              </div>
            </div>

            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
          )}
      </div>
    )
  }
}

export default MlAssignBackendUsers = formHandler()(MlAssignBackendUsers);
