import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import formHandler from "../../../commons/containers/MlFormHandler";
import Moolyaselect from "../../../commons/components/select/MoolyaSelect";
import MlAssignBackendUserList from "./MlAssignBackendUserList";
import MlAssignBackednUserRoles from "./MlAssignBackendUserRoles";
import {mlClusterConfig} from "../config/mlClusterConfig";
import {multipartFormHandler} from "../../../commons/MlMultipartFormAction";
import {findAdminUserDetails} from "../../../commons/findAdminUserDetails";
import {fetchAdminUserRoles} from "../../../commons/fetchAdminUserRoles";
import {findClusterTypeActionHandler} from "../actions/findCluster";
import {OnToggleSwitch} from "../../utils/formElemUtil";
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');


class MlAssignBackendUsers extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          loading: false,
          cluster: {},
          alsoAssignedAs: "",
          selectedBackendUser: '',
          users: [{username: '', _id: ''}],
          userDisplayName: '',
          username: '',
      }

      this.addEventHandler.bind(this);
      this.assignBackendUsers.bind(this);
      this.updateSelectedBackEndUser.bind(this);
      this.filterClusterBasedRoles.bind(this);
      // this.findCluster.bind(this);
      return this;
  }

  componentWillMount() {
      // const resp = this.findCluster();
      // return resp;
  }
  componentDidUpdate(){
      var WinHeight = $(window).height();
      $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
      OnToggleSwitch(true,true);
  }

  // async findCluster() {
  //     let clusterId = this.props.params.clusterId;
  //     const response = await findClusterTypeActionHandler(clusterId);
  //     this.setState({loading: false, cluster: response});
  // }

  enableAssignUser() {
  }

  optionsBySelectUser(index, selectedIndex) {
      this.setState({loading: true});
      this.setState({selectedBackendUser: index})
      const resp = this.findUserDetails(index);
    // const assigned = this.findRoleDetails();
  }

  getAssignedRoles(roles) {
    console.log("parent");
    this.setState({'mlroleDetails': roles})
  }

  async addEventHandler() {
      const resp = await this.assignBackendUsers();
      return resp;
  }

  async findUserDetails(userId)
  {
      const userDetails = await findAdminUserDetails(userId);
      if (userDetails){
          this.setState({selectedBackendUser:userId})
          this.setState({username:userDetails.userName})
          this.setState({userDisplayName:userDetails.displayName})
          let alsoAs = userDetails.alsoAssignedas;
          if(alsoAs){
            let alsoArray = _.compact(alsoAs.split(','));
            this.setState({alsoAssignedAs: alsoArray})
          }else{
            this.setState({alsoAssignedAs: []})
          }
          this.find_Cluster_Roles(userId);
          return userDetails;
      }
  }

  async find_Cluster_Roles(userId)
  {
      let roles = [];
      const userRoles = await fetchAdminUserRoles(userId);
      if (userRoles)
          roles = userRoles || [];
      this.setState({loading:false, user_Roles: roles, selectedBackendUser: userId, mlroleDetails: roles});
      return roles
  }

  async assignBackendUsers() {
      let userProfile = {};
    if(this.state.mlroleDetails.length == 0)
    {
      toastr.error('Please Select Role');
      return;
    }

    let roles = this.filterClusterBasedRoles();

      userProfile['clusterId'] = this.props.params.clusterId;
      userProfile['userRoles'] = roles;
      userProfile['displayName'] = this.refs.displayName.value;
      let user = {
          profile: {
              InternalUprofile: {moolyaProfile: {userProfiles: userProfile}},
              deActive: this.refs.deActive.checked
          }
      }
      let data = {moduleName: "USERS", actionName: "UPDATE", userId: this.state.selectedBackendUser, user: user}
      let response = await multipartFormHandler(data, this.refs.profilePic.files[0])
      return response;
  }

  async handleSuccess() {
      this.resetBackendUers();
  }

  handleError(response) {
    console.log('error handle');
    console.log(response);
  }

  filterClusterBasedRoles(){
    let roles = [];
    let clusterId = this.props.params.clusterId
    let allRoles = this.state.mlroleDetails
    _.each(allRoles, function (item, key) {
      if (item.roleId && item.clusterId == clusterId) {
        roles.push(item)
      }
    })
    return roles;
  }

  updateSelectedBackEndUser(userId) {
      this.setState({loading: true});
      const resp = this.findUserDetails(userId);
  }

  resetBackendUers() {
      this.setState({loading: true});
      this.setState({selectedBackendUser:'', userDisplayName:'', username:'', alsoAssignedAs:"", loading: false});
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
            actionName: 'save',
            handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this),this.handleSuccess.bind(this), this.handleError.bind(this))
          },
          {
            showAction: true,
            actionName: 'cancel',
            handler: null
          }
      ]
      let loggedInUser = getAdminUserContext();
      let that = this;
      let queryOptions = {options: {variables: {clusterId: that.props.params.clusterId}}};
      let query = gql`query($clusterId:String){data:fetchUsersByClusterDepSubDep(clusterId: $clusterId){label:username,value:_id}}`;
      let userid = this.state.selectedBackendUser || "";
      let userDisplayName = this.state.userDisplayName || "";
      let username = this.state.username || "";
      let deActive = that.state.deActive;
      let contextHeader =  "";
      if(that.props.params.communityId){
        contextHeader = "Community"
      } else if (that.props.params.chapterId && that.props.params.subChapterId){
        contextHeader = "Sub Chapter"
      } else{
        contextHeader = "Cluster"
      }

      const alsoUser = this.state.alsoAssignedAs && this.state.alsoAssignedAs.length > 0 ? this.state.alsoAssignedAs : [" "];
      const alsoAssignList = alsoUser.map(function (userAlso, id) {
        return (
          <li key={id}>
            <span className="form-control float-label">{userAlso}</span>
          </li>
        )
      });

      const showLoader = this.state.loading;

    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
          <div className="admin_padding_wrap">
            <h2>Assign Backend User to {contextHeader}</h2>
            <div className="main_wrap_scroll">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
            <div className="col-md-6 nopadding-left">
              <div className="row">
                <div className="left_wrap left_user_blocks">
                  <ScrollArea speed={0.8} className="left_wrap">
                    <div className="col-md-4 col-sm-4" onClick={this.resetBackendUers.bind(that)}>
                      <div className="list_block provider_block">
                        <div className="cluster_status assign_cl"><span className="ml ml-assign"></span></div>
                        <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                               src="/images/def_profile.png"/>
                        </div>
                        <h3>Assign <br/> Backend Users</h3>
                      </div>
                    </div>
                    {/*{that.state.cluster.isActive ? */}
                      <MlAssignBackendUserList clusterId={that.props.params.clusterId} updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/>
                      {/*:*/}
                      {/*<div></div>}*/}
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <h2>Details</h2>
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
                    {/*{that.state.cluster.isActive ?*/}
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={query} queryOptions={queryOptions}
                                    isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)}
                                    selectedValue={this.state.selectedBackendUser}/>
                      {/*:*/}
                      {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}*/}
                                    {/*labelKey={'label'} queryType={"graphql"}/>}*/}
                    {/*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query}  queryOptions={queryOptions}  isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)} selectedValue={this.state.selectedBackendUser}/>*/}
                    <div className="form-group">
                      {/*<input type="text" id="AssignedAs" placeholder="Also Assigned As"*/}
                      Also Assigned As
                      <ul>
                        {alsoAssignList}
                      </ul>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Display Name" ref="displayName" defaultValue={userDisplayName}
                             className="form-control float-label" id="dName"/>
                    </div>
                    <div className="form-group">
                      <input type="text" readOnly="true" placeholder="User Name" className="form-control float-label"
                             id="userName" ref="userName" defaultValue={username}/>
                    </div>

                    {userid ? (<MlAssignBackednUserRoles userId={userid} clusterId={that.props.params.clusterId} chapterId={that.props.params.chapterId} subChapterId={that.props.params.subChapterId} communityId={that.props.params.communityId}
                                                         assignedRoles={this.state.user_Roles}
                                                         getAssignedRoles={this.getAssignedRoles.bind(this)}/>) :
                      <div></div>}
                    <div className="form-group switch_wrap inline_switch">
                      <label className="">De-Activate User</label>
                      <label className="switch">
                        {(loggedInUser.hierarchyCode=="PLATFORM")?<input type="checkbox" ref="deActive" checked={deActive}/>:<input type="checkbox" ref="deActive" checked={deActive} disabled="disabled"/>}
                        <div className="slider"></div>
                      </label>
                    </div>
                  </form>
                </ScrollArea>
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
}

export default MlAssignBackendUsers = formHandler()(MlAssignBackendUsers);
