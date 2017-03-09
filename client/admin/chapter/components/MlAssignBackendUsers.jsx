
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler'
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'
import MlAssignChapterBackendUserList from './MlAssignBackendUserList'
import MlAssignChapterBackendUserRoles from './MlAssignBackendUserRoles'
import {multipartFormHandler} from '../../../commons/MlMultipartFormAction'
import {findSubChapterActionHandler} from '../actions/findSubChapter'
import {findUserDetails} from '../actions/findUserDetails'
import {findRoles} from '../actions/fetchRoles'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');



class MlAssignChapterBackendUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading: false,
            alsoAssignedAs:[],
            selectedBackendUser:'',
            users:[{username: '', _id:''}],
            isClusterAdmin:false,
            userDisplayName: '',
            username: ''
        }

        this.addEventHandler.bind(this);
        this.assignBackendUsers.bind(this);
        this.findSubChapter.bind(this);
        this.updateSelectedBackEndUser.bind(this);
        // this.enableAssignUser = this.enableAssignUser().bind(this);
        return this;
    }

    componentWillMount() {
      const resp=this.findSubChapter();
    }
  componentDidUpdate(){
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    // OnToggleSwitch(true,true);
  }
    async findSubChapter() {
      let subChapterId = this.props.params;
      const response = await findSubChapterActionHandler(subChapterId);
      this.setState({loading: false, data: response});
    }

    enableAssignUser(){
    }

    optionsBySelectUser(index, selectedIndex){
      this.setState({loading: true});
      this.setState({selectedBackendUser:index})
      const resp= this.findUserDetails(index);
    }


    async findUserDetails(userId){
           const user = await findUserDetails(userId);
      var roles = [];
      if(user){
        if (user && user.profile && user.profile.isInternaluser == true) {
          let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
          // get user_roles;
          // Selecting Default Profile
          for (var i = 0; i < user_profiles.length; i++) {
            let user_roles = user_profiles[i].userRoles;
            if (user_profiles[i].userRoles && user_profiles[i].userRoles.length > 0) {
              for (var j = 0; j < user_roles.length; j++) {
                roles.push(user_roles[j]);
              }
            }
          }
        }
        this.setState({user_Roles:roles,selectedBackendUser:userId});
        this.setState({loading: false,
          userMoolyaProfile:user.profile.InternalUprofile.moolyaProfile,
          userDisplayName:user.profile.InternalUprofile.moolyaProfile.displayName,
          username:user.profile.InternalUprofile.moolyaProfile.email,
        });
        this.findRoleDetails();
        return user;
      }else {
        this.setState({
          userDisplayName:'',
          username:'',
          alsoAssignedAs:[],
          // deActive:false,
          loading: false,
        });
      }

    }

    async findRoleDetails(){
         let roleIds = [];
         if(this.state.user_Roles && this.state.user_Roles.length>0){
             this.state.user_Roles.map(function (role) {
                  roleIds.push(role.roleId);
                });
           }
          const roles= await findRoles(roleIds);
          this.setState({alsoAssignedAs: roles});
          return roles;
    }

    getAssignedRoles(roles){
        console.log(roles)
        this.setState({'mlroleDetails':roles})
        console.log(this.state.mlroleDetails)
    }

    isClusterAdmin(admin){
      this.setState({'isClusterAdmin':admin})
    }

    async addEventHandler() {
      const resp = await this.assignBackendUsers();
      return resp;
    }

    async assignBackendUsers(){
        let userProfile = {};
        userProfile['userId']   = this.state.selectedBackendUser
        userProfile['clusterId'] = this.props.params.clusterId;
        userProfile['userRoles'] = this.state.mlroleDetails;
        userProfile['displayName'] = this.refs.displayName.value;
        let user = {profile:{InternalUprofile:{moolyaProfile:{userProfiles:userProfile}}}}
        let data = {moduleName:"USERS", actionName:"UPDATE", userId:this.state.selectedBackendUser, user:user}
        let response = await multipartFormHandler(data, this.refs.profilePic.files[0]);
        return response;
    }

    handleSuccess(){
      this.resetBackendUers();
    }

    handleError(){

    }


    updateSelectedBackEndUser(userId){
      this.setState({loading: true});
      const resp= this.findUserDetails(userId);
      //const resp= this.findUserDetails(userId);
    }
    resetBackendUers(){
      this.setState({loading: true});
      this.setState({selectedBackendUser: ''})
      this.findUserDetails('');
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
            handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this),this.handleSuccess.bind(this))
          },
          {
            showAction: true,
            actionName: 'logout',
            handler: null
          }
        ]
        let that    = this;
        let queryOptions = {options: { variables: {clusterId:that.props.params.clusterId,chapterId:that.props.params.chapterId,subChapterId:that.props.params.subChapterId,communityId:'',subChapterName:that.props.params.subChapterName}}};
        //let query   = gql`query($subChapterId:String){data:fetchUsersBysubChapterDepSubDep(subChapterId: $subChapterId){label:username,value:_id}}`;
      let query =gql`query ($clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String, $subChapterName:String) {
        data: fetchAssignedAndUnAssignedUsers(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,subChapterName:$subChapterName )
        {label:username,value:_id}
      }`
      let userDisplayName = this.state.userDisplayName || "";
      let username = this.state.username || "";
      let alsoAssignedAs = this.state.alsoAssignedAs || [];
      const showLoader = this.state.loading;
      let userid  = this.state.selectedBackendUser||"";
        let clusterId = this.state.data&&this.state.data.clusterId||"";
        let chapterId = this.state.data&&this.state.data.chapterId||"";
        return(
          <div>
             {showLoader === true ? ( <div className="loader_wrap"></div>) : (
            <div className="admin_main_wrap">
                <div className="admin_padding_wrap">
                    <h2>Assign internal user to Chapter</h2>
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
                                              <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                                              <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/def_profile.png" /> </div>
                                              <h3>Assign <br/> Backend Users</h3>
                                          </div>
                                      </div>
                                      <MlAssignChapterBackendUserList clusterId={that.props.params.clusterId} chapterId={that.props.params.chapterId} subChapterId={that.props.params.subChapterId} subChapterName={that.props.params.subChapterName} updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/>
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
                                              <img src="/images/ideator_01.png"/>
                                          </div>
                                      </div>
                                      <br className="brclear"/>
                                      <div className="form-group">
                                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query}  queryOptions={queryOptions}  isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)} selectedValue={this.state.selectedBackendUser}/>
                                      </div>
                                      <div>
                                          <div className="form-group">
                                              <input type="text" id="AssignedAs" placeholder="Also Assigned As" className="form-control float-label" disabled="true"  defaultValue={alsoAssignedAs}/>
                                          </div>
                                        <div className="form-group">
                                               <input type="text" placeholder="Display Name" readOnly="true" ref="displayName" defaultValue={userDisplayName} className="form-control float-label" id="dName"/>
                                        </div>
                                        <div className="form-group">
                                                <input type="text" placeholder="User Name" readOnly="true" className="form-control float-label" id="userName"  ref="userName" defaultValue={username}/>
                                      </div>
                                          <br className="brclear"/>
                                      </div>

                                      {userid?(<MlAssignChapterBackendUserRoles assignedRoles={this.state.user_Roles} userId={userid} clusterId={that.props.params.clusterId} chapterId={that.props.params.chapterId} subChapterId={that.props.params.subChapterId}  getAssignedRoles={this.getAssignedRoles.bind(this)}  getClusterAdmin={this.isClusterAdmin.bind(this)} />):<div></div>}

                                      <br className="brclear"/>
                                      <div className="form-group switch_wrap inline_switch">
                                          <label className="">De-Activate User</label>
                                          <label className="switch">
                                              <input type="checkbox" />
                                              <div className="slider"></div>
                                          </label>
                                      </div>
                                  </form>
                            </ScrollArea>
                        </div>
                    </div>
                      </ScrollArea>
                    </div>
                </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
           </div>)}
          </div>
        )
    }
}

export default MlAssignChapterBackendUsers = formHandler()(MlAssignChapterBackendUsers);
