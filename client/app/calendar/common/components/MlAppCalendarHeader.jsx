/**
 * Created by pankaj on 28/8/17.
 */
import React, { Component } from 'react';

export default class MlAppCalendarHeader extends Component {
  render() {
    const that = this;
    const { selectUser, users } = that.props;
    const selectedUser = that.props.selectedUser && that.props.selectedUser._id ? that.props.selectedUser._id : '';
    return (
      <div className="col-lg-12">
        <ul className="users_list well well-sm">
          {users.map((user, index) => (
            <li key={index} className={ selectedUser == user._id ? 'active_user' : ''}>
              <a href="" onClick={() => selectUser(user)}>
                <img src={ user.profileImage ? user.profileImage : '/images/def_profile.png'} /><br />
                <div className="tooltiprefer">
                  <span>{user.name}</span>
                </div>
              </a>
            </li>))}
        </ul>
      </div>
    )
  }
}
