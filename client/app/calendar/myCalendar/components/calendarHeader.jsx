import React, {Component} from "react";
import {render} from "react-dom";
import {getUserProfileActionHandler} from "../../manageScheduler/activity/actions/activityActionHandler";

export default class MlCalendarHead extends Component {
  constructor(props) {
    super(props);
    let profileId = FlowRouter.getQueryParam('profile');
    this.state = {
      profile: [],
      profilePic: "",
      displayName: "",
      profileDisplay: false,
      subMenu: false,
      isAll: profileId ? false : true,
      selectedProfileId: profileId ? profileId : ''
    };
    if(profileId){
      let communityName = FlowRouter.getQueryParam("community");
      props.headerManagement(profileId, communityName);
    }
    this.getUserProfiles.bind(this)
  }


  componentDidMount() {
    $('.users_list li').click(function () {
      if ($(this).next('li').hasClass('sub_list_wrap')) {
        $(this).toggleClass('active_user')
        $(this).next('.sub_list_wrap').toggleClass('hidden_list');
      }
    });
  }

  componentWillMount() {
    const resp = this.getUserProfiles()
    return resp
  }

  resetWithAll() {
    FlowRouter.setQueryParams({
      profile: null,
      community: null
    });
    this.setState({selectedProfileId: '', isAll: true});
    this.props.componentToLoad('calendar');
    this.props.getAllAppointments(true);
  }

  changeProfile(profileId, communityName){
    FlowRouter.setQueryParams({profile:profileId, community: communityName});
    this.props.headerManagement(profileId, communityName);
    this.setState({selectedProfileId: profileId, isAll: false});
  };


  async getUserProfiles() {
    let that = this;
    const resp = await getUserProfileActionHandler();
    // this.setState({profile: resp})
    let name = resp[0].displayName;
    let profileImage = resp[0].profileImage;
    this.setState({profile: resp, displayName: name, profilePic: profileImage})
    return resp;
  }


  render() {
    let profiles = this.state.profile || [];
    let selectedProfileId = this.state.selectedProfileId || FlowRouter.getParam('profileId');
    let that = this;
    let type = this.props.type;
    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li className={that.state.isAll ? 'active_user' : ''}>
            <a href="" onClick={()=>that.resetWithAll()}>
              <img src={that.state.profilePic ? that.state.profilePic : "/images/def_profile.png"}/><br />
              <div className="tooltiprefer">
                {/*Need to show only first name*/}
                <span ref={(node) => {
                  if (node) {
                    node.style.setProperty("width", "106%", "important");
                  }}} >
                  {/*{that.state.displayName ? that.state.displayName.split(' ')[0] + " Consolidated" : "Consolidated"} */}
                  Consolidated View
                </span>
              </div>
            </a>
          </li>
          {profiles.map(function (profile, idx) {
            return (
              <span key={idx}>
                <li className={selectedProfileId === profile.profileId ? 'active_user' : ''}>
                  <div>
                    <a href="" onClick={()=>that.changeProfile(profile.profileId, profile.communityName)}>
                      {profile.communityName === "Investors" ? <span className="icon_bg"> <span className="icon_lg ml my-ml-Investors"></span></span>:
                        profile.communityName === "Startups" ?<span className="icon_bg"><span className="icon_lg ml my-ml-Startups"></span></span>:
                          profile.communityName === "Ideators" ?<span className="icon_bg"><span className="icon_lg ml my-ml-Ideator"></span></span>:
                            profile.communityName === "Institutions" ?<span className="icon_bg"><span className="icon_lg ml my-ml-Institutions"></span></span>:
                              profile.communityName === "Service Providers" ? <span className="icon_bg"><span className="icon_lg ml my-ml-Service-Providers"></span></span>:
                                profile.communityName === "Office Bearer" ? <span className="icon_bg"><span className="icon_lg ml my-ml-team-members"></span></span>:""}
                     <br />
                      <div className="tooltiprefer">
                        <span>{profile.communityName}</span>
                      </div>
                    </a>
                  </div>
                </li>
                {/*<li className={"sub_list_wrap "+ ( selectedProfileId == profile.profileId ? "" :"hidden_list" )}>*/}
                  {/*<ul className="sub_list">*/}
                    {/*<li className={ type == "activity" ? "active_user" : ""}>*/}
                      {/*<a onClick={()=>that.changeType("activity")} href="">*/}
                        {/*<span className="icon_bg"><span className="icon_lg fa fa-file-text-o"></span></span><br />*/}
                        {/*<div className="tooltiprefer">*/}
                          {/*<span>Activity</span>*/}
                        {/*</div>*/}
                      {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className={ type == "task" ? "active_user" : ""}>*/}
                      {/*<a onClick={()=>that.changeType("task")} href="">*/}
                        {/*<span className="icon_bg"><span className="icon_lg fa fa-list-alt"></span></span><br />*/}
                        {/*<div className="tooltiprefer">*/}
                          {/*<span>Task Master</span>*/}
                        {/*</div>*/}
                      {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className={ type == "service" ? "active_user" : ""}>*/}
                      {/*<a onClick={()=>that.changeType("service")} href="">*/}
                        {/*<span className="icon_bg"><span className="icon_lg fa fa-puzzle-piece"></span></span><br />*/}
                        {/*<div className="tooltiprefer">*/}
                          {/*<span>Services</span>*/}
                        {/*</div>*/}
                      {/*</a>*/}
                    {/*</li>*/}
                    {/*<li className={ type == "calendar" ? "active_user" : ""}>*/}
                      {/*<a onClick={()=>that.changeToCalendarSettings()} href="">*/}
                        {/*<span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />*/}
                        {/*<div className="tooltiprefer">*/}
                          {/*<span>Calendar</span>*/}
                        {/*</div>*/}
                      {/*</a>*/}
                    {/*</li>*/}
                  {/*</ul>*/}
                {/*</li>*/}
              </span>
            )
          })}
        </ul>
      </div>
    )
  }
};
