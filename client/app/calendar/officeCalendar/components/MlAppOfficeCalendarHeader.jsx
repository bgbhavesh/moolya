/**
 * Created by pankaj on 20/8/17.
 */

import React, {Component} from "react";
import {fetchOfficeMemberActionHandler} from './../actions/fetchOfficeMember';

export default class MlAppOfficeCalendarHeader extends Component {

  constructor(props){
    super(props);
    this.state={
      users:[]
    };
    this.getOfficeMembers();
  }

  async getOfficeMembers() {
    let users = await fetchOfficeMemberActionHandler();
    if(users){
      this.setState({
        users: users
      });
    }
  }

  render(){
    const that = this;
    const {selectUser} = this.props;
    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          <li>
            <a href="#">
              <img src="/images/def_profile.png" /><br />
              <div className="tooltiprefer">
                <span>All</span>
              </div>
            </a>
          </li>
          {that.state.users.map( (user, index) => {
            return(
              <li key={index}>
                <a href="" onClick={()=>selectUser(user)}>
                  <img src={ user.profileImage ? user.profileImage : "/images/def_profile.png"} /><br />
                  <div className="tooltiprefer">
                    <span>{user.name}</span>
                  </div>
                </a>
              </li>);
          })}
        </ul>
      </div>
    )
  }
}
