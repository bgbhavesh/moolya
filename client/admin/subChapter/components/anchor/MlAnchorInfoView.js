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
    // $('.main_wrap_scroll').height(WinHeight-($('.admin_header').outerHeight(true)+120));
    $('.left_wrap').height(WinHeight - (dHeight + $('.' + className).outerHeight(true)));
    // var WinHeight = $(window).height();
    // $('.left_wrap').height(WinHeight-(200+$('.app_header').outerHeight(true)));
  }

  handleUserClick(id) {
    const resp = this.getAnchorUserDetails(id);
    return resp;

  }


  PopOverAction(type, e) {
    this.setState({
      popoverOpen: !(this.state.popoverOpen),
      // target: type.id,
      // // toDisplay: type.toDisplay,
      // placement: type.placement,
      // title: type.title,
      // file: type.title
    })
  }

  async getAnchorUserDetails(id) {
    var response = await findBackendUserActionHandler(id);
    this.setState({selectedUser: response});
    console.log(response);
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

  optionBySelectRegistrationType(value, calback, selObject) {
    this.setState({registrationType: value, coummunityName: selObject.label})
  }

  toggle() {
    this.setState({popoverOpen: !this.state.popoverOpen});
  }

  registerAsClick() {
    //open popover
    this.toggle()
    console.log('open the popover')
  }

  optionsBySelectIdentity(val) {
    this.setState({identity: val})
  }

  async submitRegisterAs() {
    console.log('save register as')
    // let registrationInfo={
    //   userName:this.state.userName,
    //   firstName:this.state.firstName,
    //   lastName:this.state.lastName,
    //   contactNumber:this.state.contactNumber,
    //   email:this.state.email,
    //   registrationType:this.state.selectedCommunity,
    //   identityType:this.state.identity,
    //   clusterId:this.props.clusterId,
    //   chapterId:this.props.chapterId,
    //   subChapterId:this.props.subChapterId,
    //   cityId:this.state.selectedCity,
    //   countryId:this.state.country
    // }
    // let registrationId=this.state.registerId
    // const response = await registerAsInfo(registrationInfo,registrationId);
    // if(response.success){
    //   let registrtionId=response.result
    //   let registrtion= JSON.parse(registrtionId)
    //   toastr.success("user registered successfully");
    //   FlowRouter.go("/app/register/"+registrtion.registrationId);
    // }else{
    //   this.toggle()
    //   toastr.error(response.result);
    //   FlowRouter.go("/app/myProfile/registerAs");
    // }
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
    let fetchCommunities = gql` query{
      data:fetchCommunityDefinition{label:name,value:code}
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
    let identityOptions = {options: {variables: {communityId: this.state.selectedCommunity}}};
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
                    <b>Email : </b>{this.state.selectedUser.profile.email}
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
                {
                  this.state.contactDetails.length !== 0 && this.state.contactDetails.map((cd, index) => {
                    const {emailId, buildingNumber, street, town, area, landmark, countryId, stateId, pincode, contactNumber} = cd;
                    return (
                      <p key={index}>
                        {buildingNumber}, {street}, {area}, {landmark}, {town}, {stateId}, {countryId}-{pincode}`
                        <br />
                        Tel: {contactNumber}
                        <br />
                        Email: {emailId}
                      </p>);
                  })
                }
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="col-md-4">
              {/*<a href="#" className="fileUpload mlUpload_btn">Contact Admin</a>*/}
            </div>
            <div className="col-md-4">
              <a onClick={this.changePath.bind(this)} href="" className="fileUpload mlUpload_btn">Enter into
                subchapter</a>
            </div>
            <div className="col-md-4" >
              <a href="" id="create_document" className="fileUpload mlUpload_btn" onClick={this.PopOverAction.bind(this)}>Get invited</a>
            </div>
          </div>
        </div>

        <Popover placement='top' isOpen={this.state.popoverOpen} target='create_document'>
          <PopoverTitle>ABC</PopoverTitle>
          <PopoverContent>
            {/*<div className="ml_create_client">*/}
              {/*<div className="medium-popover">*/}
                {/*<div className="form-group popover_thumbnail">*/}
                  Hello
                {/*</div>*/}
                {/*<div className="fileUpload mlUpload_btn">*/}
                  {/*<span>Upload</span>*/}
                  {/*{this.state.file === "Images" ?*/}
                    {/*<input type="file" className="upload" ref="upload" onChange={this.ImageUpload.bind(this)} /> :*/}
                    {/*this.state.file === "Videos" ?*/}
                      {/*<input type="file" className="upload_file upload" name="video_source" id="video_upload"*/}
                             {/*onChange={that.videoUpload.bind(that)} /> :*/}
                      {/*this.state.file === "Documents" ? <input type="file" className="upload" ref="upload"*/}
                                                               {/*onChange={this.documentUpload.bind(this)} /> :*/}
                        {/*this.state.file === "Templates" ? <input type="file" className="upload" ref="upload"*/}
                                                                 {/*onChange={this.TemplateUpload.bind(this)} /> : ""}*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          </PopoverContent>
        </Popover>

      </div>
    )
  }
};
