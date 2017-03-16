
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler'
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'
import MlAssignChapterBackendUserList from './MlAssignChapterBackendUserList'
import MlAssignChapterBackendUserRoles from './MlAssignChapterBackendUserRoles'
import {multipartFormHandler} from '../../../commons/MlMultipartFormAction'
import {findSubChapterActionHandler} from '../actions/findSubChapter'
import {findAdminUserDetails} from '../../../commons/findAdminUserDetails'
import {findCluster_Roles} from '../../cluster/actions/findCluster_Roles';
// import {findRoles} from '../actions/fetchRoles'
import {findAllChapter_Roles} from "../actions/fetchRoles";

import {OnToggleSwitch} from '../../utils/formElemUtil'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

class MlAssignChapterBackendUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading: false,
            alsoAssignedAs:"",
            selectedBackendUser:'',
            users:[{username: '', _id:''}],
            chapterAdmin:false,
            userDisplayName: '',
            username: ''
        }

        this.addEventHandler.bind(this);
        this.assignBackendUsers.bind(this);
        this.findSubChapter.bind(this);
        this.updateSelectedBackEndUser.bind(this);
        return this;
    }

    componentWillMount() {
      const resp=this.findSubChapter();
    }

    componentDidUpdate(){
      var WinHeight = $(window).height();
      $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
      OnToggleSwitch(true,true);
    }

    async findSubChapter() {
      let subChapterId = this.props.params.subChaterId;
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
        const userDetails = await findAdminUserDetails(userId);
        if(userDetails){

            this.setState({selectedBackendUser:userId})
            this.setState({username:userDetails.userName})
            this.setState({userDisplayName:userDetails.displayName})
            this.setState({alsoAssignedAs:userDetails.alsoAssignedas})
            // this.find_Cluster_Roles(userId, this.props.params.clusterId);
            this.find_Chapter_Roles(userId, this.props.params.clusterId);
          return userDetails;
        }
    }

    // async find_Cluster_Roles(userId, clusterId)
    async find_Chapter_Roles(userId, clusterId)
    {
        // const userProfile = await findCluster_Roles(userId, clusterId);
        const userProfile = await findAllChapter_Roles(userId, clusterId);
        if (userProfile){
            var roles = userProfile.userRoles || [];
        }else {
           var roles = [];
        }
        let chapterAdmin = userProfile&&userProfile.isChapterAdmin?userProfile.isChapterAdmin:false
        this.setState({loading:false,user_Roles: roles, selectedBackendUser: userId, mlroleDetails: roles, chapterAdmin: chapterAdmin });
        return roles;
    }

    getAssignedRoles(roles){
        this.setState({'mlroleDetails':roles});
    }

    isChapterAdmin(admin){
      this.setState({'chapterAdmin':admin})
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
        let user = {profile:{InternalUprofile:{moolyaProfile:{userProfiles:userProfile}}}, isChapterAdmin:this.state.chapterAdmin}
        let data = {moduleName:"USERS", actionName:"UPDATE", userId:this.state.selectedBackendUser, user:user}
        let response = await multipartFormHandler(data, this.refs.profilePic.files[0]);
        return response;
    }

    handleSuccess(response){
      if (response){
        this.resetBackendUsers();
        // if(response.success)
        //   this.resetBackendUsers();
        // else
        //   toastr.error(response.result);
      }
    }

    handleError(error){
      alert(response)
    }

    updateSelectedBackEndUser(userId){
        this.setState({loading: true});
        const resp = this.findUserDetails(userId);
    }
  resetBackendUsers(){
      this.setState({loading: true});
      this.setState({selectedBackendUser:'', userDisplayName:'',username:'',alsoAssignedAs:"",loading: false});
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
            handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this),this.handleSuccess.bind(this), this.handleError.bind(this))
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
      let query =gql`query ($clusterId:String, $chapterId:String, $subChapterId:String) {
        data: fetchUsersBysubChapterDepSubDep(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId)
        {label:username,value:_id}
      }`
      let userDisplayName = this.state.userDisplayName || "";
      let username = this.state.username || "";
      let alsoAssignedAs = this.state.alsoAssignedAs || "";
      const showLoader = this.state.loading;
        let userid  = this.state.selectedBackendUser||"";
        let clusterId = this.state.data&&this.state.data.clusterId||"";
        let chapterId = this.state.data&&this.state.data.chapterId||"";
        return(
          <div>
             {showLoader === true ? ( <div className="loader_wrap"></div>) : (
            <div className="admin_main_wrap">
                <div className="admin_padding_wrap">
                    <h2>Assign Backend User to Chapter</h2>
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
                                      <div className="col-md-4 col-sm-4" onClick={this.resetBackendUsers.bind(that)}>
                                          <div className="list_block provider_block">
                                              <div className="cluster_status assign_cl"><span className="ml ml-assign"></span></div>
                                              <div className="provider_mask"> <img src="/images/funder_bg.png" />  <img className="user_pic" src="/images/def_profile.png"/> </div>
                                              <h3>Assign <br/> Backend Users</h3>
                                          </div>
                                      </div>
                                      <MlAssignChapterBackendUserList clusterId={that.props.params.clusterId} chapterId={that.props.params.chapterId} subChapterId={that.props.params.subChapterId} subChapterName={that.props.params.subChapterName} updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/>
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
                                      <div className="form-group">
                                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query}  queryOptions={queryOptions}  isDynamic={true} onSelect={that.optionsBySelectUser.bind(that)} selectedValue={this.state.selectedBackendUser}/>
                                      </div>
                                      <div>
                                          <div className="form-group">
                                              <input type="text" id="AssignedAs" placeholder="Also Assigned As" className="form-control float-label" disabled="true"  value={alsoAssignedAs}/>
                                          </div>
                                        <div className="form-group">
                                               <input type="text" placeholder="Display Name" readOnly="true" ref="displayName" value={userDisplayName} className="form-control float-label" id="dName"/>
                                        </div>
                                        <div className="form-group">
                                                <input type="text" placeholder="User Name" readOnly="true" className="form-control float-label" id="userName"  ref="userName" value={username}/>
                                      </div>
                                          <br className="brclear"/>
                                      </div>

                                      {userid?(<MlAssignChapterBackendUserRoles assignedRoles={this.state.user_Roles} userId={userid} clusterId={that.props.params.clusterId} chapterId={that.props.params.chapterId} subChapterId={that.props.params.subChapterId}  getAssignedRoles={this.getAssignedRoles.bind(this)}  getChapterAdmin={this.isChapterAdmin.bind(this)} />):<div></div>}

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
