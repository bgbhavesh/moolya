import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {fetchAssignUsersActionHandler} from '../actions/fetchAssignUsers'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

export default class MlAssignBackendUserList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            backendUsers:[]
        }

        this.fetchAssignUsers.bind(this);
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

    render(){
        let that = this
        let backendUsers = that.state.backendUsers
        return(
          <div>
            {backendUsers.map(function (user) {
                <div className="col-md-4 col-sm-4">
                    <div className="list_block provider_block">
                        <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                        <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/ideator_01.png" /> </div>
                        <h3>{user.username}<br />USA</h3>
                    </div>
               </div>
            })}
          </div>
        )
    }
}
