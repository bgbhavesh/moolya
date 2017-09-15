import React, {Component} from "react";
import {render} from "react-dom";
import {getUserProfileActionHandler} from "../../manageScheduler/activity/actions/activityActionHandler";
import {getSharedConnectionsActionHandler } from '../actions/fetchConnectionsForCalendar'

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
    this.props.calendarHeaderManagement("");
    // FlowRouter.setQueryParams({
    //   profile: null,
    //   community: null
    // });
    this.setState({selectedProfileId: '', isAll: true});
    // this.props.componentToLoad('calendar');
    this.props.getAllAppointments(true);
  }

  changeProfile(userId){
    this.props.calendarHeaderManagement(userId);
    // this.setState({selectedProfileId: profileId, isAll: false});
  };


  async getUserProfiles() {
    const resp = await getSharedConnectionsActionHandler();
    console.log('calendar head', resp)
    if( resp ) {
      let name = resp[0].displayName;
      let profileImage = resp[0].profileImage;
      this.setState({profile: resp, displayName: name, profilePic: profileImage})
      return resp;
    }
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
          <li>
          {profiles.map(function (profile, idx) {
            console.log('profile.userId', profile.userId)
            return (
              <a href="" onClick={()=>that.changeProfile(profile.userId)}>
                <img src={profile.profilePic ? profile.profilePic: "/images/def_profile.png"}/><br />
                <div className="tooltiprefer">
                  {/*Need to show only first name*/}
                  {profile.displayName ? profile.displayName:"User"}
                </div>
              </a>
            )
          })}
          </li>
        </ul>
      </div>
    )
  }
};
