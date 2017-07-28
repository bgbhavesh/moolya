import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import {findUserActionHandler} from './actions/findCurrentUserDetails'
import loginActions,{loginActionHandler} from '../login/actions/loginActions';
import MlAccessDenied from '../admin/MlAccessDenied'

let userId = Meteor.userId();
const localStorageLoginToken = localStorage.getItem('Meteor.loginToken');
// if(user && user.profile && user.profile.isExternaluser){
//   FlowRouter.go("/app");
// }else if(user && user.profile && user.profile.isInternaluser){
//   FlowRouter.go("/admin");
// }
FlowRouter.route('/', {
  action: async function() {
    let response = await findUserActionHandler(localStorageLoginToken);
    console.log(response)
    if(response){
      if(response.success){
        let user = JSON.parse(response.result);
        if(user){
          FlowRouter.go("/app");
        }else{
          FlowRouter.go("/admin");
        }
      }else {
        FlowRouter.go('/login');
      }
    }else {
      FlowRouter.go('/login');
    }
  },
  triggersEnter: [function(context, redirect) {
    console.log('running / trigger');
    if (!userId) {
      redirect('/login');
    }
  }]
});



FlowRouter.route('/login', {
  name:'login',
  action:()=>{
    mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
  }
});

FlowRouter.route('/reset/:token', {
  name:'login',
  action:()=>{
    mount(MlLoginLayout, {content:<MlResetPasswordContent />})
  }
});

FlowRouter.route('/forgot-password', {
  name:'login',
  action:()=>{
    mount(MlLoginLayout, {content:<MlForgotPasswordContent />})
  }
});

FlowRouter.route('/unauthorize', {
  name:'unauthorize',
  action:()=>{
    mount(MlLoginLayout, {content:<MlAccessDenied/>})
  }
});
