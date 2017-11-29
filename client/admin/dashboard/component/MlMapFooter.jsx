// Created by Rajat Shekhar

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { fetchUsers } from '../actions/findMapDetailsTypeAction'
import MlLoader from '../../../commons/components/loader/loader'

const users = [];
const activeUsers = [];
export default class MlMapFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      activeCount: 0,
      module: this.props.mapContext.module ? this.props.mapContext.module : null,
      users: [],
      activeUsers: [],
      loading: false
    }
    this.findAllUsers.bind(this);
    return this;
  }

  componentWillMount() {
    if (this.props.mapContext && this.props.mapContext.module != 'users') {
      this.setState({ loading: true })
      const ret = this.findAllUsers()
      return ret
    }
  }

  async findAllUsers() {
    const context = this.props.mapContext;
    let response;

    if (context) {
      const clusterId = context.params && context.params.clusterId ? context.params.clusterId : '';
      const chapterId = context.params && context.params.chapterId ? context.params.chapterId : '';
      const subChapterId = context.params && context.params.subChapterId ? context.params.subChapterId : '';
      const userType = context.params && context.params.userType ? context.params.userType : 'All';
      response = await fetchUsers(clusterId, chapterId, subChapterId, userType);
    }
    if (response) {
      const users = response || []
      const activeUsers = _.filter(users, (user) => {
        if (user.profile.isActive) { return user }
      });
      this.setState({ loading: false, users, activeUsers })
    }
  }

  render() {
    const that = this;
    let activeData = [];
    const data = that.props.data || [];
    if (data && that.props.mapContext.module == 'users') {
      activeData = _.filter(data, (user) => {
        if (user.profile.isActive) { return user }
      });
    } else {
      activeData = _.filter(data, { isActive: true, showOnMap: true });
    }
    const showLoader = that.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          data.length > 0 ?
            <div className="bottom_actions_block bottom_count">
              {(that.props.mapContext.module != 'users') ? <div><b>{that.state.activeUsers.length}</b> of <b>{that.state.users.length}</b> User(s) are Active<br/></div> : <div></div>}
              {/* <b>{activeData.length?activeData.length:0}</b> of <b>{data.length?data.length:0}</b> {that.state.module} are Active */}
            </div> :

            <div className="bottom_actions_block bottom_count">
              <div><b>0</b> of <b>0</b> User(s) are Active<br/></div>
            </div>

        )}
      </div>

    )
  }
}
