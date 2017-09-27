/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../commons/components/MlAdminSelectWrapper'
import {Popover, PopoverTitle, PopoverContent} from "reactstrap";
import {findSubChapterActionHandler} from '../../actions/findSubChapter';
import MlAnchorUserGrid from '../../../../commons/components/anchorInfo/MlAnchorUserGrid';
import {findBackendUserActionHandler} from '../../../transaction/internalRequests/actions/findUserAction';
import {findAnchorUserActionHandler} from '../../actions/fetchAnchorUsers'
import {fetchUserDetailsHandler} from "../../../../app/commons/actions/fetchUserDetails";
import {registerAsInfo} from '../../../transaction/requested/actions/registrationAs'
import {pick} from 'lodash'

//todo:// this file is to be placed in the commons as it is been used by both admin and app
export default class MlAnchorInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objective: [],
      contactDetails: [],
      data: {userDetails: [], portfolioCounter: []},
      selectedUser: {},
      subChapterImageLink: "/images/startup_default.png",
      popoverOpen: false,
    };
    this.getAnchorUserDetails = this.getAnchorUserDetails.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.getAnchorUsers = this.getAnchorUsers.bind(this)
    this.renderCommunityCount = this.renderCommunityCount.bind(this)
    this.registerAsClick = this.registerAsClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.submitRegisterAs = this.submitRegisterAs.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    this.changePath = this.changePath.bind(this)
    this.optionBySelectRegistrationType = this.optionBySelectRegistrationType.bind(this)
    this.optionsBySelectIdentity = this.optionsBySelectIdentity.bind(this)
    return this;
  }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  componentDidUpdate() {
    var className = this.props.isAdmin ? "admin_header" : "app_header"
    var dHeight = this.props.isAdmin ? 200 : 200
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight - (dHeight + $('.' + className).outerHeight(true)));
  }

  handleUserClick(id) {
    const resp = this.getAnchorUserDetails(id);
    return resp;
  }

  async getAnchorUserDetails(id) {
    var response = await findBackendUserActionHandler(id);
    this.setState({selectedUser: response});
    return response;
  }

  clearSelection() {
    this.setState({selectedUser: {}});
  }

  async getAnchorUsers() {
    var {clusterId, chapterId, subChapterId} = this.props;
    var response = await findAnchorUserActionHandler({clusterId, chapterId, subChapterId})
    this.setState({data: response})
    return response
  }

  async fetchSubChapterDetails() {
    const {clusterId, chapterId, subChapterId} = this.props;
    const response = await findSubChapterActionHandler(clusterId, chapterId, subChapterId);
    const objective = response && response.objective && response.objective.map((ob) => ({
        description: ob.description,
        status: ob.status,
      }));
    const contactDetails = response.contactDetails && response.contactDetails.map((det) => _.omit(det, '__typename'))
    this.setState({
      objective: objective || [],
      contactDetails: contactDetails || [],
      subChapterName: response && response.subChapterName ? response.subChapterName : "SubChapter Name",
      subChapterImageLink: response && response.subChapterImageLink ? response.subChapterImageLink : "/images/startup_default.png"
    })
    this.getAnchorUsers();
  }

  componentWillMount() {
    const resp = this.fetchSubChapterDetails()
    return resp
  }

  cancelForm() {
    this.toggle()
  }

  changePath() {
    var queryParams = this.props.queryParams && this.props.queryParams.viewMode
    queryParams = JSON.parse(queryParams)
    if (this.props.isAdmin)
      FlowRouter.go('/admin/dashboard/' + this.props.clusterId + '/' + this.props.chapterId + '/' + this.props.subChapterId + '/' + 'communities?viewMode=' + queryParams)
    else
      FlowRouter.go('/app/dashboard/' + this.props.clusterId + '/' + this.props.chapterId + '/' + this.props.subChapterId + '/' + 'communities?viewMode=' + queryParams)
  }

  optionBySelectRegistrationType(value) {
    this.setState({registrationType: value})
  }

  toggle() {
    this.setState({popoverOpen: !this.state.popoverOpen});
  }

  async registerAsClick() {
    const response = await fetchUserDetailsHandler()
    if (response) {
      this.isAllowRegisterAs = response.isAllowRegisterAs
      const registrationInfo = response.registrationInfo
      this.setState({
        status: response.status,
        registerId: response._id,
        firstName: registrationInfo.firstName,
        lastName: registrationInfo.lastName,
        contactNumber: registrationInfo.contactNumber,
        email: registrationInfo.email,
        userName: registrationInfo.userName,
        countryId: registrationInfo.countryId
      });
    }
    if (this.isAllowRegisterAs)
      this.toggle()
    else
      toastr.error('complete pending registration')
  }

  optionsBySelectIdentity(val) {
    this.setState({identityType: val})
  }

  async submitRegisterAs() {
    var pickStates = pick(this.state, ['userName', 'firstName', 'lastName', 'contactNumber', 'email', 'registrationType', 'identityType', 'countryId'])
    var propsId = pick(this.props, ['clusterId', 'chapterId', 'subChapterId'])
    let finalRegData = _.extend(pickStates, propsId);
    let registrationId = this.state.registerId
    const response = await registerAsInfo(finalRegData, registrationId);
    if (response && response.success) {
      let reg = JSON.parse(response.result)
      toastr.success("user registered successfully");
      FlowRouter.go("/app/register/" + reg.registrationId);
    } else if (response && !response.success)
      toastr.error(response.result);
  }

  renderCommunityCount() {
    return this.state.data.portfolioCounter.map(function (value, say) {
      return (<li key={say}>
        <a href="">
          <span className="icon_bg">
            <span className={`icon_lg ${value.communityImageLink}`}></span>
          </span>
          <br />
          <div className="tooltiprefer">
            <span><small>{value.communityType}</small> <b>{value.count}</b></span>
          </div>
        </a>
      </li>)
    })
  }

  render() {

    let clusterQuery = gql`query{data:fetchClustersForMap{label:displayName,value:_id}}`;
    let chapterQuery = gql`query($id:String){data:fetchChapters(id:$id) {
        value:_id
        label:chapterName
      }  
    }`;
    let subChapterQuery = gql`query($id:String,$displayAllOption:Boolean){  
      data:fetchSubChaptersSelect(id:$id,displayAllOption:$displayAllOption) {
        value:_id
        label:subChapterName
      }  
    }`;
    let fetchCommunities = gql` query($isRegisterAs: Boolean){
        data:fetchCommunitiesFromDef(isRegisterAs:$isRegisterAs){label:name,value:code}
      } 
    `;
    let fetchIdentity = gql`query($communityId:String){
        data:FetchCommunityBasedIdentity(communityId:$communityId) {
          value: identityTypeName
          label: identityTypeName
        }
      }`;
    let countryQuery = gql`query{
       data:fetchCountries {
          value:_id
          label:country
        }
      }`;
    let chapterOption = {options: {variables: {id: this.props.clusterId}}};
    let subChapterOption = {options: {variables: {id: this.props.chapterId, displayAllOption: false}}};
    let identityOptions = {options: {variables: {communityId: this.state.registrationType}}};
    var communityOptions = {options: {variables: {isRegisterAs: true}}}
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">

          <div className="panel panel-default">
            <div className="panel-heading">{this.state.subChapterName}</div>
            <div className="panel-body nopadding">
              <div className="col-md-2">
                <img src={this.state.subChapterImageLink} className="margintop"
                     style={{'width': '150px', 'height': '45px'}}/>
              </div>
              <div className="col-md-10 nopadding att_members">
                <ul className="users_list">
                  {this.renderCommunityCount()}
                </ul>

              </div>
            </div>
          </div>
          <div className="col-lx-4 col-sm-4 col-md-4 nopadding-left">
            <div className="left_wrap left_user_blocks">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
              >
                {!this.state.selectedUser.profile &&
                <MlAnchorUserGrid users={this.state.data.userDetails} clickHandler={this.handleUserClick}/>}
                {this.state.selectedUser.profile &&
                <div>
                  <h3 style={{'display': 'inline-block'}} onClick={this.clearSelection} alt="Go Back" title="Go Back">
                    <span className="fa fa-angle-left"/> &nbsp;{this.state.selectedUser.profile.firstName}
                  </h3>

                  <p>
                    <br />
                    <b>First Name : </b>{this.state.selectedUser.profile.firstName} <br />
                    <b>Last Name : </b>{this.state.selectedUser.profile.lastName} <br />
                    <b>Email : </b>{this.state.selectedUser.profile.email} <br />
                    <b>Date of Birth : </b>{new Date(this.state.selectedUser.profile.dateOfBirth).toDateString()} <br />
                    <b>Gender : </b>{this.state.selectedUser.profile.genderType} <br />
                    {console.log(this.state.selectedUser)}
                  </p>

                </div>
                }
              </ScrollArea>
            </div>
          </div>
          <div className="col-lx-4 col-sm-4 col-md-4">
            <div className="row">
              {/*<h3>Users List</h3>*/}
              <div className="left_wrap left_user_blocks">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                >
                  <h3>Objectives :</h3>
                  <ul className="list-info">
                    {
                      !this.state.objective.length && <p> No objectives added</p>
                    }
                    {
                      this.state.objective.length !== 0 && this.state.objective.map((ob, index) => {
                        const {status, description} = ob;
                        if (status) {
                          return <li key={`${description}index`}>{description}</li>;
                        }
                        return <span key={index}></span>
                      })
                    }
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </div>

          <div className="col-lx-4 col-sm-4 col-md-4 nopadding-right">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
              >
                <h3>Contact Us:</h3>
                {
                  !this.state.contactDetails.length && <p>No contact details added</p>
                }
                <ul className={'list-info'}>
                {
                  this.state.contactDetails.length !== 0 && this.state.contactDetails.map((cd, index) => {
                    const {emailId, buildingNumber, street, town, area, landmark, countryId, stateId, pincode, contactNumber} = cd;
                    return (
                      <li key={index}>
                        {buildingNumber}, {street}, {area}, {landmark}, {town}, {stateId}, {countryId}-{pincode}`
                        <br />
                        Tel: {contactNumber}
                        <br />
                        Email: {emailId}
                      </li>);
                  })
                }
                </ul>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="col-md-4">
              {/*<a href="#" className="fileUpload mlUpload_btn">Contact Admin</a>*/}
            </div>
            <div className="col-md-4">
              <a onClick={this.changePath} href="" className="fileUpload mlUpload_btn">Enter into
                subchapter</a>
            </div>
            <div className="col-md-4 text-center">
              {!this.props.isAdmin ?
                <span id="default_target" className="fileUpload mlUpload_btn" onClick={this.registerAsClick}>Get
                  invited</span> : <div></div>}
            </div>
          </div>
        </div>

        <Popover placement="top" isOpen={this.state.popoverOpen} target="default_target" toggle={this.toggle}>
          <PopoverTitle>Register As </PopoverTitle>
          <PopoverContent>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Registration Type" className="form-control float-label"
                            valueKey={'value'} labelKey={'label'} selectedValue={this.state.registrationType}
                            queryType={"graphql"} query={fetchCommunities} isDynamic={true}
                            queryOptions={communityOptions}
                            onSelect={this.optionBySelectRegistrationType}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                            labelKey={'label'} placeholder="Identity" selectedValue={this.state.identityType}
                            queryType={"graphql"} query={fetchIdentity} queryOptions={identityOptions} isDynamic={true}
                            onSelect={this.optionsBySelectIdentity}/>
            </div>
            <div className="col-md-6 nopadding-left">
              <div className="form-group ">
                <input type="text" ref="firstName" value={this.state.firstName} placeholder="First Name"
                       className="form-control float-label" disabled="true"/>
              </div>
              <div className="form-group ">
                <input type="text" ref="contactNumber" value={this.state.lastName} placeholder="Contact number"
                       className="form-control float-label" id="" disabled="true"/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                              disabled={true}
                              labelKey={'label'} placeholder="Country of Residence" selectedValue={this.state.countryId}
                              queryType={"graphql"} query={countryQuery} isDynamic={true}/>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="form-group ">
                <input type="text" ref="lastName" value={this.state.contactNumber} placeholder="Last Name"
                       className="form-control float-label" disabled="true"/>
              </div>
              <div className="form-group ">
                <input type="text" ref="email" value={this.state.email} placeholder="Email Id"
                       className="form-control float-label" disabled="true"/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} placeholder="Cluster" selectedValue={this.props.clusterId}
                              queryType={"graphql"} query={clusterQuery} isDynamic={true} disabled={true}/>
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} placeholder="Chapter" selectedValue={this.props.chapterId}
                              queryType={"graphql"} query={chapterQuery} queryOptions={chapterOption} isDynamic={true}
                              disabled={true}/>
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} placeholder="SubChapter" selectedValue={this.props.subChapterId}
                              queryType={"graphql"} query={subChapterQuery} queryOptions={subChapterOption}
                              isDynamic={true} disabled={true}/>
              </div>
            </div>
            <div className="assign-popup">
              <a data-toggle="tooltip" title="Save" data-placement="top" className="hex_btn hex_btn_in"
                 onClick={this.submitRegisterAs}>
                <span className="ml ml-save"></span>
              </a>
              <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in"
                 onClick={this.cancelForm.bind(this)}>
                <span className="ml ml-delete"></span>
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
};
