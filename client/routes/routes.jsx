import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import loginActions,{loginActionHandler} from '../login/actions/loginActions';

let userId = Meteor.userId();
let user = Meteor.user();

FlowRouter.route('/', {
  action: function() {
    if(user && user.profile && user.profile.isExternaluser){
        FlowRouter.go("/app");
    }else if(user && user.profile && user.profile.isExternaluser){
        FlowRouter.go("/admin");
    }

  },
  triggersEnter: [function(context, redirect) {
    console.log('running / trigger');
    if (!userId) {
      FlowRouter.go('/login');
    }
  }]
});



FlowRouter.route('/login', {
  name:'login',
  action:()=>{
    mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
  }
});
