import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {fetchAssignUsersActionHandler} from '../../../commons/fetchAssignUsers'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

export default class MlAssignBackendUserList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            backendUsers:[]
        }

        this.fetchAssignUsers.bind(this);
        this.onBackEndUserClick.bind(this);
        return this;
    }

    componentDidMount() {
        const resp=this.fetchAssignUsers();
    }

    async fetchAssignUsers(){
      let clusterId = this.props.clusterId;
      const response = await fetchAssignUsersActionHandler(clusterId, "", "", "", "");
      let data = response ? response : []
      this.setState({loading:false, backendUsers:data});
    }

  onBackEndUserClick(user){
    this.props.updateSelectedBackEndUser(user._id);
  }

    render(){
        let that = this
        let backendUsers = that.state.backendUsers
        return(
          <div>
            {backendUsers.map(function (user) {
              let status, icon;
              if(user.profile.isActive){
                status = "active";
                icon = "active-User";
              } else{
                status = "inactive";
                icon = "inactive-user"
              }
                return(
                    <div className="col-md-4 col-sm-4" key={user.username} onClick={that.onBackEndUserClick.bind(that,user)}>
                        <div className="list_block provider_block">
                          <div className={`cluster_status ${status}_cl`}><span className={`ml ml-${icon}`}></span></div>
                            <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/def_profile.png" /> </div>
                            {/*<h3>{user.username}<br />USA</h3>*/}
                            <h3>{user.username}</h3>
                        </div>
                   </div>
                )
            })}
          </div>
        )
    }
}
