// import NPM module(s)
import React, { Component } from 'react';
import  Select from 'react-select';
import ScrollArea from 'react-scrollbar';
import FontAwesome from 'react-fontawesome';

export default class MlAppTaskAppointmentUser extends Component {
  constructor(props) {
    super(props);
  }

  getUserList(team, index) {
    let userList = [];
    console.log('--team--', team.users.length);
    team.users ? team.users.map((user, userIndex) => {
      userList.push(
        <li key={user.userId}>
          <a href="">
            <img src={user.profileImage ? user.profileImage : "/images/def_profile.png"} /><br />
            <div className="tooltiprefer">
              <span>{user.name}</span>
            </div>
            <span className="member_status" onClick={() => that.addUser(index, userIndex)}>
                      { user.isAdded ? <FontAwesome name="check" /> : <FontAwesome name="plus" /> }
                    </span>
          </a>
          <div className="input_types">
            <br />
            <input id={"mandatory"+index+userIndex} checked={ user.isMandatory ? true : false } name="Mandatory" type="checkbox" value="Mandatory" onChange={(evt)=>that.updateIsMandatory(evt, index, userIndex)} />
            <label htmlFor={"mandatory"+index+userIndex}>
              <span><span></span></span>
              Mandatory
            </label>
          </div>
        </li>
      )
    }) : [];
    return userList;
  }

  /**
   * Method :: getSessionList
   * Desc :: List of task session
   * @return XML
   */
  render() {
    const {activities, index, isExternal, isInternal, offices} = this.props;
    const that = this;
    console.log('----act--', activities);
    return (
      <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
        <div className="col-md-6 nopadding-left">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <label>{`Session ${index + 1}`}</label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 pull-right">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <label>Time: &nbsp;
                  <input type="text"
                         className="form-control inline_input"
                         disabled={true}
                         value={1}  /> Hours
                  <input type="text"
                         className="form-control inline_input"
                         disabled={true}
                         value={2}  /> Mins
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-12 nopadding-right">
          <div className="form_bg">
            <form>
              {activities && activities.map((activity, activityIndex) => {
                return (
                  <div key={activityIndex}>
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Activity Name</label>
                        <input type="text"
                               placeholder="Activity Name"
                               className="form-control float-label"
                               id="name"
                               defaultValue={activity.name} />
                      </div>
                    </div>
                    <br/>
                    <div className="form-group pull-right">
                      <label>Time: &nbsp;
                        <input type="text"
                               className="form-control inline_input"
                               disabled={true}
                               defaultValue={activity.duration && activity.duration.hours} /> Hours
                        <input type="text"
                               className="form-control inline_input"
                               disabled={true}
                               defaultValue={activity.duration && activity.duration.minutes} /> Mins
                      </label>
                    </div>
                    <br className="brclear" />Attendees<br className="brclear" />
                    {
                      activity.teams && activity.teams.map(function (team, indexAct) {
                        return (
                          <div className="col-md-12 pull-left" key={indexAct}>
                            <div className="panel panel-default library-wrap">
                              <div className="panel-body nopadding">
                                <br className="brclear" />
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <span className="placeHolder active">Choose team Type</span>
                                    <select defaultValue="chooseTeam" value={ team.resourceType == 'office' && team.resourceId ? team.resourceId : team.resourceType } className="form-control" onChange={(evt)=>that.chooseTeamType(evt, index)}>
                                      <option value="chooseTeam" disabled="disabled">Choose team Type</option>
                                      <option value="connections">My Connections</option>
                                      <option hidden={!isExternal} disabled={!isExternal} value="moolyaAdmins">Moolya Admins</option>
                                      {offices.map(function (office , index) {
                                        return <option key={index} hidden={!isInternal} disabled={!isInternal} value={office._id}>{ office.officeName + " - " + office.branchType }</option>
                                      })}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-8 att_members">
                                  <ul className="users_list">
                                    {that.getUserList(team, indexAct)}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
              }
            </form>
            {/* Attandees*/}
          </div>
        </div>
        <br className="brclear"/>
      </ScrollArea>
    )
  }
};

