import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import AdminUsersContent from '../../components/users/users';

function composer(props,onData){
   Meteor.call('reterieveAllUsers', function (err, resp) {
    let users = resp;
     onData(null,{users});
  });
}

export default UsersListContainer=compose(composer)(AdminUsersContent);
