import React, {Component} from "react";
import {render} from "react-dom";
import {getSharedConnectionsActionHandler} from "../../actions/mlLibraryActionHandler";

export default class MlConnectionHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: [],
      profilePic: "",
      displayName: "",
      profileDisplay: false,
      subMenu: false,
      isAll: true
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
    this.setState({selectedProfileId: '', isAll: true});
    this.props.showLibrary(false)
    // this.props.componentToLoad('calendar');
    // this.props.getAppointmentCounts();
  }

  changeProfile(userId){
    console.log('===connection Header===', userId)
    this.props.connectionManagement(userId);
  };


  async getUserProfiles() {
    const resp = await getSharedConnectionsActionHandler();
    this.setState({profile: resp})
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
            <a href="#" onClick={()=>that.resetWithAll()}>
              <img src="/images/def_profile.png"/><br />
              <div className="tooltiprefer">
                <span>Me</span>
              </div>
            </a>
          </li>
          {profiles.map(function (profile, idx) {
            return (
              <span key={idx}>
               <li className={that.state.isAll ? 'active_user' : ''}>
            <a href="#" onClick={()=>that.changeProfile(profile.userId)}>
              <img src={profile.profilePic ? profile.profilePic : "/images/def_profile.png"}/><br />
              <div className="tooltiprefer">
                <span>{profile.displayName ? profile.displayName : "All"}</span>
              </div>
            </a>
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
