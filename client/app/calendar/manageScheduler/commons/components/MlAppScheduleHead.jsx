import React, { Component } from 'react';
import { getUserActiveProfileDetails } from '../../activity/actions/activityActionHandler';
import generateAbsolutePath from '../../../../../../lib/mlGenerateAbsolutePath'
import { fetchCurrencyTypeActionHandler } from '../../../../../commons/actions/mlCurrencySymbolHandler'
import { appClient } from '../../../../core/appConnection';


export default class MlCalendarHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: [],
      profilePic: '',
      displayName: '',
      profileDisplay: false,
      subMenu: false
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

  async getCurrencyType(userId, profileId) {
    const response = await fetchCurrencyTypeActionHandler(appClient, userId, null, profileId);
    this.setState({ currencySymbol: response.symbol })
    return response;
  }

  changeProfile(profileId, isDisabled, userId) {
    this.setState({ userId, profileId })
    this.getCurrencyType(userId, profileId, () => this.props.getUserIdOfProfile(this.state.currencySymbol));
    if (profileId && !isDisabled) {
      FlowRouter.go(`/app/calendar/manageSchedule/${profileId}/activityList`);
    }
  }
  changeType(type) {
    const selectedProfileId = FlowRouter.getParam('profileId');
    FlowRouter.go(`/app/calendar/manageSchedule/${selectedProfileId}/${type}List`)
  }

  changeToCalendarSettings() {
    const selectedProfileId = FlowRouter.getParam('profileId');
    FlowRouter.go(`/app/calendar/manageSchedule/${selectedProfileId}/setCalendar`);
  }

  async getUserProfiles() {
    const response = await getUserActiveProfileDetails();
    if (response) {
      const profiles = response.map((data) => {
        let iconClass = '';
        switch (data.communityDefCode) {
          case 'FUN':
            iconClass = 'my-ml-Investors';
            break;
          case 'STU':
            iconClass = 'my-ml-Startups';
            break;
          case 'IDE':
            iconClass = 'my-ml-Ideator';
            break;
          case 'INS':
            iconClass = 'my-ml-Institutions';
            break;
          case 'SPS':
            iconClass = 'my-ml-Service-Providers';
            break;
          case 'OFB':
            iconClass = 'my-ml-team-members';
            break;
          default:
            iconClass = 'ml-moolya-symbol';
        }
        return {
          showIcon: true,
          iconClass,
          name: `${data.clusterName} - ${data.isMoolya ? '' : (`${data.subChapterName} - `)}${data.communityName}`,
          isDisabled: !data.isHasManageSchedule,
          userId: data.userId,
          profileId: data.profileId
        }
      });
      if (profiles.length == 1) {
        const profileId = response && response[0] && response[0].profileId ? response[0].profileId : 'all';
        FlowRouter.setParams({
          profileId
        });
      }
      const name = response && response[0] && response[0].displayName ? response[0].displayName : '';
      const profileImage = response && response[0] && response[0].profileImage ? response[0].profileImage : '';
      this.setState({
        profile: profiles,
        displayName: name,
        profilePic: profileImage
      });
      console.log(response, profiles);
    }
  }


  render() {
    const profiles = this.state.profile || [];
    const selectedProfileId = FlowRouter.getParam('profileId');
    const that = this;
    const type = this.props.type;
    const consolidated = profiles.length == 1 ? profiles[0].profileId : 'all';

    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li>
            <a href="" onClick={() => that.changeProfile(consolidated, false)}>
              <img src={that.state.profilePic ? generateAbsolutePath(that.state.profilePic) : '/images/def_profile.png'}/><br />
              <div className="tooltiprefer">
                <span>{that.state.displayName ? that.state.displayName : 'All'}</span>
              </div>
            </a>
          </li>
          <li className={`sub_list_wrap ${selectedProfileId == consolidated ? '' : 'hidden_list'}`}>
            <ul className="sub_list">
              <li className={ type == 'activity' ? 'active_user' : ''}>
                <a onClick={() => that.changeType('activity')} href="">
                  <span className="icon_bg"><span className="icon_lg ml my-ml-activity"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Activity</span>
                  </div>
                </a>
              </li>
              <li className={ type == 'task' ? 'active_user' : ''}>
                <a onClick={() => that.changeType('task')} href="">
                  <span className="icon_bg"><span className="icon_lg ml my-ml-task"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Task Master</span>
                  </div>
                </a>
              </li>
              <li className={ type == 'service' ? 'active_user' : ''}>
                <a onClick={() => that.changeType('service')} href="">
                  <span className="icon_bg"><span className="icon_lg ml my-ml-service"></span></span><br />
                  <div className="tooltiprefer">
                    <span>Services</span>
                  </div>
                </a>
              </li>
              { profiles.length == 1
                ?
                <li className={ type == 'calendar' ? 'active_user' : ''} >
                  <a onClick={() => that.changeToCalendarSettings()} href="">
                    <span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />
                    <div className="tooltiprefer">
                      <span>Calendar</span>
                    </div>
                  </a>
                </li>
                :
                ''
              }
            </ul>
          </li>

          { profiles.length > 1 && profiles.map((profile, idx) => (
            <span key={idx}>
              < li className={ selectedProfileId == profile.profileId ? 'active_user' : '' } >
                <div >
                  <a href="" onClick={() => that.changeProfile(profile.profileId, profile.isDisabled)} className={profile.isDisabled ? 'disabled' : ''} >
                    <span className="icon_bg"> <span className={ `icon_lg ml ${profile.iconClass}` }></span></span><br />
                    <div className="tooltiprefer">
                      <span>{profile.name}</span>
                    </div>
                  </a>
                </div>
              </li>
              <li className={`sub_list_wrap ${selectedProfileId == profile.profileId ? '' : 'hidden_list'}`}>
                <ul className="sub_list">
                  <li className={ type == 'activity' ? 'active_user' : ''}>
                    <a onClick={() => that.changeType('activity')} href="">
                      <span className="icon_bg"><span className="icon_lg ml my-ml-activity"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Activity</span>
                      </div>
                    </a>
                  </li>
                  <li className={ type == 'task' ? 'active_user' : ''}>
                    <a onClick={() => that.changeType('task')} href="">
                      <span className="icon_bg"><span className="icon_lg ml my-ml-task"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Task Master</span>
                      </div>
                    </a>
                  </li>
                  <li className={ type == 'service' ? 'active_user' : ''}>
                    <a onClick={() => that.changeType('service')} href="">
                      <span className="icon_bg"><span className="icon_lg ml my-ml-service"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Services</span>
                      </div>
                    </a>
                  </li>
                  <li className={ type == 'calendar' ? 'active_user' : ''}>
                    <a onClick={() => that.changeToCalendarSettings()} href="">
                      <span className="icon_bg"><span className="icon_lg fa fa-calendar"></span></span><br />
                      <div className="tooltiprefer">
                        <span>Calendar</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </span>
          ))}
        </ul>
      </div>
    )
  }
}
