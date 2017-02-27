
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

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');



class MlAssignChapterBackendUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedBackendUser:'',
            users:[{username: '', _id:''}]

        }

        this.addEventHandler.bind(this);
        this.assignBackendUsers.bind(this);
        this.findSubChapter.bind(this);
        // this.enableAssignUser = this.enableAssignUser().bind(this);
        return this;
    }

    componentDidMount() {
      const resp=this.findSubChapter();
    }

    async findSubChapter() {
      let subChapterId = this.props.params;
      const response = await findSubChapterActionHandler(subChapterId);
      this.setState({loading: false, data: response});
    }

    enableAssignUser(){
    }

    optionsBySelectUser(index, selectedIndex){
        this.setState({selectedBackendUser:index})
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

    async assignBackendUsers(){
        let userProfile = {};
        userProfile['userId']   = this.state.selectedBackendUser
        userProfile['clusterId'] = this.state.data.clusterId;
    /*    userProfile['chapterId'] = this.state.data.chapterId;
        userProfile['clusterId'] = this.state.data.clusterId;*/
        userProfile['userRoles'] = this.state.mlroleDetails;
        userProfile['displayName'] = this.refs.displayName.value;
        // alert(JSON.stringify(userProfile))
        let response = await multipartFormHandler(userProfile, Meteor.settings.public.assignUserMultiPartUrl, this.refs.profilePic.files[0]);
        return response;
    }

    handleScuccess(){

    }

    handleError(){

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
        let queryOptions = {options: { variables: {subChapterId:that.props.params}}};
        let query   = gql`query($subChapterId:String){data:fetchUsersBysubChapterDepSubDep(subChapterId: $subChapterId){label:username,value:_id}}`;
        let userid  = this.state.selectedBackendUser||"";
        let clusterId = this.state.data&&this.state.data.clusterId||"";
        let chapterId = this.state.data&&this.state.data.chapterId||"";
        return(
            <div className="admin_main_wrap">
                <div className="admin_padding_wrap">
                    <h2>Assign internal user to Chapter</h2>
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
                                      <MlAssignChapterBackendUserList clusterId={that.props.params}/>
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
                                          <div className="form-group">
                                            <input type="text" placeholder="User Name" className="form-control float-label" id="userName"  ref="userName"/>
                                          </div>
                                          <br className="brclear"/>
                                      </div>

                                      {userid?(<MlAssignChapterBackendUserRoles userId={userid} clusterId={clusterId} chapterId={chapterId} subChapterId={that.props.params} getAssignedRoles={this.getAssignedRoles.bind(this)}/>):<div></div>}

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

export default MlAssignChapterBackendUsers = formHandler()(MlAssignChapterBackendUsers);
