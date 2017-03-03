
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import formHandler from '../../../commons/containers/MlFormHandler'
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'
import MlAssignBackendUserList from './MlAssignBackendUserList'
import MlAssignBackednUserRoles from './MlAssignBackendUserRoles'
import {mlClusterConfig } from '../config/mlClusterConfig'
import {multipartFormHandler} from '../../../commons/MlMultipartFormAction'
import {findUserDetails} from '../actions/findUserDetails'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');



class MlAssignBackendUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedBackendUser:'',
            users:[{username: '', _id:''}]
        }

        this.addEventHandler.bind(this);
        this.assignBackendUsers.bind(this);
        this.updateSelectedBackEndUser.bind(this);
        // this.enableAssignUser = this.enableAssignUser().bind(this);
        return this;
    }

    componentDidMount(){

    }

    enableAssignUser(){
    }

    optionsBySelectUser(index, selectedIndex){
        this.setState({selectedBackendUser:index})
        const resp= this.findUserDetails(index);
    }

    getAssignedRoles(roles){
        console.log(roles)
        this.setState({'mlroleDetails':roles})
        console.log(this.state.mlroleDetails)
    }

    async addEventHandler() {
      const resp = await this.assignBackendUsers();
      return resp;
    }

    async findUserDetails(userId){
      const user = await findUserDetails(userId);
      var roles = [];
      if (user && user.profile && user.profile.isInternaluser == true) {
        let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
        // let user_roles;
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
      return user;
    }

    async assignBackendUsers(){
        let userProfile = {};
        userProfile['userId']   = this.state.selectedBackendUser
        userProfile['clusterId'] = this.props.params;
        userProfile['userRoles'] = this.state.mlroleDetails;
        userProfile['displayName'] = this.refs.displayName.value;
        let response = await multipartFormHandler(userProfile, this.refs.profilePic.files[0]);
        return response;
    }

    handleScuccess(){

    }

    handleError(){

    }

  updateSelectedBackEndUser(userId){
   // this.setState({"selectedBackendUser":userId});
    const resp= this.findUserDetails(userId);
    //console.log(resp);
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
            handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this))
          },
          {
            showAction: true,
            actionName: 'logout',
            handler: null
          }
        ]
        let that    = this;
        let queryOptions = {options: { variables: {clusterId:that.props.params}}};
        let query   = gql`query($clusterId:String){data:fetchUsersByClusterDepSubDep(clusterId: $clusterId){label:username,value:_id}}`;
        let userid  = this.state.selectedBackendUser||"";
        return(
            <div className="admin_main_wrap">
                <div className="admin_padding_wrap">
                    <h2>Assign internal user to Cluster</h2>
                    <div className="col-md-6 nopadding-left">
                          <div className="row">
                              <div className="left_wrap left_user_blocks">
                                  <ScrollArea speed={0.8} className="left_wrap">
                                      <div className="col-md-4 col-sm-4">
                                          <div className="list_block provider_block">
                                              <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                                              <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/def_profile.png" /> </div>
                                              <h3>Assign <br/> Backend Users</h3>
                                          </div>
                                      </div>
                                      <MlAssignBackendUserList clusterId={that.props.params} updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/>
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
                                              <input type="text" id="AssignedAs" placeholder="Also Assigned As" className="form-control float-label" disabled="true"/>
                                          </div>
                                          <div className="form-group">
                                              <input type="text" placeholder="Display Name" className="form-control float-label" id="dName"  ref="displayName"/>
                                          </div>
                                          <br className="brclear"/>
                                      </div>

                                      {userid?(<MlAssignBackednUserRoles userId={userid} clusterId={that.props.params} assignedRoles={this.state.user_Roles} getAssignedRoles={this.getAssignedRoles.bind(this)}/>):<div></div>}

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
                </div>
              <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
            </div>
        )
    }
}

export default MlAssignBackendUsers = formHandler()(MlAssignBackendUsers);
