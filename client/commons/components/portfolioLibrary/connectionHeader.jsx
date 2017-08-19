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
      isAll: false
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
    this.setState({selectedProfileId: '', isAll: true, selectedProfile:""});
    this.props.showLibrary(false)
    // this.props.componentToLoad('calendar');
    // this.props.getAppointmentCounts();
  }

  changeProfile(userId, index){
    this.setState({selectedProfile: index, isAll: false})
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
                <li className={that.state.selectedProfile === idx ? 'active_user' : ''}>
                  <a href="#" onClick={()=>that.changeProfile(profile.userId, idx)}>
                    <img src={profile.profilePic ? profile.profilePic : "/images/def_profile.png"}/><br />
                    <div className="tooltiprefer">
                      <span>{profile.displayName ? profile.displayName : "All"}</span>
                    </div>
                  </a>
                </li>
              </span>
            )
          })}
        </ul>
      </div>
    )
  }
};
