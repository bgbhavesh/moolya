import React, {Component} from "react";
import {render} from "react-dom";
import {getUserProfileActionHandler} from "../../activity/actions/activityActionHandler";

export default class MlCalendarHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: [],
      profilePic: "",
      displayName: "",
      profileDisplay: false,
      subMenu: false
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

  changeProfile(profileId){
    FlowRouter.go("/app/calendar/manageSchedule/"+profileId+"/activityList")
  };
  changeType(type){
    let selectedProfileId = FlowRouter.getParam('profileId');
    FlowRouter.go("/app/calendar/manageSchedule/"+selectedProfileId+"/"+type+"List")
  }

  changeToCalendarSettings(){
    let selectedProfileId = FlowRouter.getParam('profileId');
    FlowRouter.go("/app/calendar/manageSchedule/"+selectedProfileId+"/setCalendar");
  }

  async getUserProfiles() {
    const resp = await getUserProfileActionHandler();
    // this.setState({profile: resp})
    let name = resp[0].displayName;
    let profileImage = resp[0].profileImage;
    this.setState({profile: resp, displayName: name, profilePic: profileImage})
    return resp;
  }


  render() {
    let profiles = this.state.profile || [];
    let selectedProfileId = FlowRouter.getParam('profileId');
    let that = this;
    let type = this.props.type;

    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li>
            <a href="#" onClick={()=>that.changeProfile("all")}>
              <img src={that.state.profilePic ? that.state.profilePic : "/images/def_profile.png"}/><br />
              <div className="tooltiprefer">
                <span>{that.state.displayName ? that.state.displayName : "All"}</span>
              </div>
            </a>
          </li>
          <li className={"sub_list_wrap "+ ( selectedProfileId == "all" ? "" :"hidden_list" )}>
            <ul className="sub_list">
              <li className={ type == "activity" ? "active_user" : ""}>
                <a onClick={()=>that.changeType("activity")} href="">
                  <span className="icon_bg"><span className="icon_lg fa fa-file-text-o"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Activity</span>
                  </div>
                </a>
              </li>
              <li className={ type == "task" ? "active_user" : ""}>
                <a onClick={()=>that.changeType("task")} href="">
                  <span className="icon_bg"><span className="icon_lg fa fa-list-alt"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Task Master</span>
                  </div>
                </a>
              </li>
              <li className={ type == "service" ? "active_user" : ""}>
                <a onClick={()=>that.changeType("service")} href="">
                  <span className="icon_bg"><span className="icon_lg fa fa-puzzle-piece"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Services</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>

          {profiles.map(function (profile, idx) {
            return (
              <span key={idx}>
                < li>
                  <div >
                    <a href="" onClick={()=>that.changeProfile(profile.profileId)}>
                      <span className="icon_bg"> <span className="icon_lg ml ml-funder"></span></span><br />
                      <div className="tooltiprefer">
                        <span>{profile.communityName}</span>
                      </div>
                    </a>
                  </div>
                </li>
                <li className={"sub_list_wrap "+ ( selectedProfileId == profile.profileId ? "" :"hidden_list" )}>
                  <ul className="sub_list">
                    <li className={ type == "activity" ? "active_user" : ""}>
                      <a onClick={()=>that.changeType("activity")} href="">
                        <span className="icon_bg"><span className="icon_lg fa fa-file-text-o"></span></span><br />
                        <div className="tooltiprefer">
                          <span>Activity</span>
                        </div>
                      </a>
                    </li>
                    <li className={ type == "task" ? "active_user" : ""}>
                      <a onClick={()=>that.changeType("task")} href="">
                        <span className="icon_bg"><span className="icon_lg fa fa-list-alt"></span></span><br />
                        <div className="tooltiprefer">
                          <span>Task Master</span>
                        </div>
                      </a>
                    </li>
                    <li className={ type == "service" ? "active_user" : ""}>
                      <a onClick={()=>that.changeType("service")} href="">
                        <span className="icon_bg"><span className="icon_lg fa fa-puzzle-piece"></span></span><br />
                        <div className="tooltiprefer">
                          <span>Services</span>
                        </div>
                      </a>
                    </li>
                    <li className={ type == "calendar" ? "active_user" : ""}>
                      <a onClick={()=>that.changeToCalendarSettings()} href="">
                        <span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />
                        <div className="tooltiprefer">
                          <span>Calendar</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </span>
            )
          })}
        </ul>
      </div>
    )
  }
};
