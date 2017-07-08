import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import formHandler from "../../../commons/containers/MlFormHandler";
import Moolyaselect from "../../../commons/components/select/MoolyaSelect";
import MlAssignChapterBackendUserList from "./MlAssignChapterBackendUserList";
import MlAssignChapterBackendUserRoles from "./MlAssignChapterBackendUserRoles";
import {multipartFormHandler} from "../../../commons/MlMultipartFormAction";
import {findSubChapterActionHandler} from "../../../../client/admin/subChapter/actions/findSubChapter";
import {findAdminUserDetails} from "../../../commons/findAdminUserDetails";
import {fetchAdminUserRoles} from "../../../commons/fetchAdminUserRoles";
import {OnToggleSwitch} from "../../utils/formElemUtil";
import {getAdminUserContext} from "../../../commons/getAdminUserContext";
import MlLoader from "../../../commons/components/loader/loader";
import {client} from '../../core/apolloConnection';
var _ = require('lodash');


let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

class MlAssignChapterBackendUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alsoAssignedAs: "",
      selectedBackendUser: '',
      users: [{username: '', _id: ''}],
      chapterAdmin: false,
      userDisplayName: '',
      username: ''
    }

    this.addEventHandler.bind(this);
    this.assignBackendUsers.bind(this);
    this.findSubChapterDetails.bind(this);
    this.updateSelectedBackEndUser.bind(this);
    this.filterClusterBasedRoles.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findSubChapterDetails();
    return resp;
  }

  componentDidUpdate() {
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    OnToggleSwitch(true, true);
  }

    async findSubChapterDetails() {
      let clusterId = this.props.params.clusterId;
      let chapterId = this.props.params.chapterId;
      let subChapterId = this.props.params.subChapterId;
      const response = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
      if(response){
        let isDefaultSubChapter= response.isDefaultSubChapter
        this.setState({isDefaultSubChapter: isDefaultSubChapter});
      }
  }

  optionsBySelectUser(index, selectedIndex) {
    this.setState({loading: true, selectedBackendUser: index})
    const resp = this.findUserDetails(index);
  }

  async findUserDetails(userId) {
    const userDetails = await findAdminUserDetails(userId,client);
    if (userDetails) {
      this.setState({
        selectedBackendUser: userId,
        username: userDetails.userName,
        userDisplayName: userDetails.displayName,
        isActive: userDetails.deActive
      })
      // this.setState({alsoAssignedAs: userDetails.alsoAssignedas})
      let alsoAs = userDetails.alsoAssignedas;
      if (alsoAs) {
        let alsoArray = _.compact(alsoAs.split(','));
        this.setState({alsoAssignedAs: alsoArray})
      } else {
        this.setState({alsoAssignedAs: []})
      }
      this.find_Chapter_Roles(userId);
      return userDetails;
    }
  }

  async find_Chapter_Roles(userId) {
      const userRoles = await fetchAdminUserRoles(userId,client);
      var roles = userRoles && userRoles.length > 0 ? userRoles : [];
      this.setState({
          loading: false,
          user_Roles: roles,
          selectedBackendUser: userId,
          mlroleDetails: roles
      });
      return roles;
  }

  getAssignedRoles(roles) {
    console.log("parent")
    this.setState({'mlroleDetails': roles});
  }

  isChapterAdmin(admin) {
    this.setState({'chapterAdmin': admin})
  }

  async addEventHandler() {
    const resp = await this.assignBackendUsers();
    return resp;
  }

  async assignBackendUsers() {
    let userProfile = {};
    if(this.state.mlroleDetails.length == 0)
    {
      toastr.error('Please Select Role');
      return;
    }

    let roles = this.filterClusterBasedRoles();

    userProfile['userId'] = this.state.selectedBackendUser
    userProfile['clusterId'] = this.props.params.clusterId;
    userProfile['userRoles'] = roles;
    userProfile['displayName'] = this.refs.displayName.value;
    let user = {
      profile: {InternalUprofile: {moolyaProfile: {userProfiles: userProfile}}},
      isChapterAdmin: this.state.chapterAdmin
    }
    let data = {moduleName: "USERS", actionName: "UPDATE", userId: this.state.selectedBackendUser, user: user}
    let response = await multipartFormHandler(data, this.refs.profilePic.files[0]);
    return response;
  }

  handleSuccess(response) {
      if (response) {
         this.resetBackendUsers();
      }
  }

  handleError(response) {
    console.log('error handle');
    console.log(response);
  }

  updateSelectedBackEndUser(userId) {
    this.setState({loading: true});
    const resp = this.findUserDetails(userId);
  }

  filterClusterBasedRoles(){
    let roles = [];
    let clusterId = this.props.params.clusterId;
    let allRoles = this.state.mlroleDetails;
    _.each(allRoles, function (item, key) {
      if (item.roleId && item.clusterId == clusterId) {
        roles.push(item)
      }
    })
    return roles;
  }

  resetBackendUsers() {
    this.setState({loading: true});
    this.setState({selectedBackendUser: '', userDisplayName: '', username: '', alsoAssignedAs: "", loading: false});
  }

  render() {
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) => this.props.handler(this.assignBackendUsers.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          let pararms = FlowRouter._current.params;
          FlowRouter.go("/admin/chapters/"+
            pararms.clusterId+"/"+pararms.chapterId+"/"+
            pararms.subChapterId+"/"+pararms.subChapterName+"/subChapterDetails");
        }
      }
    ]
    let that = this;
    let queryOptions = {
      options: {
        variables: {
          clusterId: that.props.params.clusterId,
          chapterId: that.props.params.chapterId,
          subChapterId: that.props.params.subChapterId,
          communityId: '',
          subChapterName: that.props.params.subChapterName
        }
      }
    };
    let query = gql`query ($clusterId:String, $chapterId:String, $subChapterId:String) {
        data: fetchUsersBysubChapterDepSubDep(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId)
        {label:username,value:_id}
      }`
    let userDisplayName = this.state.userDisplayName || "";
    let username = this.state.username || "";
    const showLoader = this.state.loading;
    let userid = this.state.selectedBackendUser || "";
    // let clusterId = this.state.data && this.state.data.clusterId || "";
    // let chapterId = this.state.data && this.state.data.chapterId || "";
    // let loggedInUser = getAdminUserContext();
    const alsoUser = this.state.alsoAssignedAs && this.state.alsoAssignedAs.length > 0 ? this.state.alsoAssignedAs : [" "];
    const alsoAssignList = alsoUser.map(function (userAlso, id) {
      return (
        <li key={id}>
          <span className="form-control float-label">{userAlso}</span>
        </li>
      )
    });

    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="admin_main_wrap">
            <div className="admin_padding_wrap">
              <h2>Assign Backend Users to Sub Chapter</h2>

                  <div className="col-md-6 nopadding-left">
                    <div className="row">
                      <div className="left_wrap left_user_blocks">
                        <ScrollArea speed={0.8} className="left_wrap">
                          <div className="col-lg-4 col-md-6 col-sm-4" onClick={this.resetBackendUsers.bind(that)}>
                            <div className="list_block provider_block">
                              <div className="cluster_status assign_cl">{/*<span className="ml ml-assign"></span>*/}</div>
                              <div className="provider_mask"><img src="/images/funder_bg.png"/> <img
                                className="user_pic" src="/images/def_profile.png"/></div>
                              <h3>Assign <br/> Backend Users</h3>
                            </div>
                          </div>
                          <MlAssignChapterBackendUserList clusterId={that.props.params.clusterId}
                                                          chapterId={that.props.params.chapterId}
                                                          subChapterId={that.props.params.subChapterId}
                                                          subChapterName={that.props.params.subChapterName}
                                                          communityId={that.props.params.communityId}
                                                          updateSelectedBackEndUser={this.updateSelectedBackEndUser.bind(this)}/>
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
                            <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                                          labelKey={'label'} queryType={"graphql"} query={query}
                                          queryOptions={queryOptions} isDynamic={true}
                                          onSelect={that.optionsBySelectUser.bind(that)}
                                          selectedValue={this.state.selectedBackendUser}/>
                          </div>
                          <div>
                            <div className="form-group">
                              {/*<input type="text" id="AssignedAs" placeholder="Also Assigned As"*/}
                                     {/*className="form-control float-label" disabled="true" value={alsoAssignedAs}/>*/}
                               Also Assigned As
                              <ul>
                                {alsoAssignList}
                              </ul>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Display Name" readOnly="true" ref="displayName"
                                     defaultValue={userDisplayName} className="form-control float-label" id="dName"/>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="User Name" readOnly="true"
                                     className="form-control float-label" id="userName" ref="userName"
                                     defaultValue={username}/>
                            </div>
                            <br className="brclear"/>
                          </div>

                          {userid ? (<MlAssignChapterBackendUserRoles assignedRoles={this.state.user_Roles}
                                                                      userId={userid}
                                                                      clusterId={that.props.params.clusterId}
                                                                      chapterId={that.props.params.chapterId}
                                                                      subChapterId={that.props.params.subChapterId}
                                                                      communityId={that.props.params.communityId}
                                                                      isActive={that.state.isActive}
                                                                      isDefaultSubChapter={this.state.isDefaultSubChapter}
                                                                      getAssignedRoles={this.getAssignedRoles.bind(this)}
                                                                      getChapterAdmin={this.isChapterAdmin.bind(this)}/>) :
                            <div></div>}

                          <br className="brclear"/>
                          <div className="form-group switch_wrap inline_switch">
                            <label className="">De-Activate User</label>
                            <label className="switch">
                              <input type="checkbox" disabled="disabled" checked={this.state.isActive}/>
                              {/*{(loggedInUser.hierarchyCode=="PLATFORM")?<input type="checkbox"/>:<input type="checkbox" disabled="disabled"/>}*/}
                              <div className="slider"></div>
                            </label>
                          </div>
                        </form>
                      </ScrollArea>
                    </div>
                  </div>

            </div>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>)}
      </div>
    )
  }
}

export default MlAssignChapterBackendUsers = formHandler()(MlAssignChapterBackendUsers);
