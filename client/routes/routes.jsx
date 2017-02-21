import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import loginActions,{loginActionHandler} from '../login/actions/loginActions';

let userId = Meteor.userId();

FlowRouter.route('/', {
  action: function() {
    //TODO: write a controller to control the route based on logged in user(Internal/External)
    FlowRouter.go("/admin");
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
