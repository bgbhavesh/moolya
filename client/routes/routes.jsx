import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { mount } from 'react-mounter';
import { findUserActionHandler } from './actions/findCurrentUserDetails'
import loginActions, { loginActionHandler } from '../login/actions/loginActions';
import MlAccessDenied from '../admin/MlAccessDenied'
import MlLogout from '../login/layouts/MlLogout'

const userId = Meteor.userId();
const localStorageLoginToken = localStorage.getItem('Meteor.loginToken');

FlowRouter.route('/', {
  async action() {
    const response = await findUserActionHandler(localStorageLoginToken);
    console.log(response)
    if (response) {
      if (response.success) {
        const user = JSON.parse(response.result);
        if (user) {
          FlowRouter.go('/app');
        } else {
          FlowRouter.go('/admin');
        }
      } else {
        FlowRouter.go('/login');
      }
    } else {
      FlowRouter.go('/login');
    }
  },
  triggersEnter: [function (context, redirect) {
    console.log('running / trigger');
    if (!userId) {
      redirect('/login');
    }
  }]
});


FlowRouter.route('/login', {
  name: 'login',
  action: () => {
    mount(MlLoginLayout, { content: <MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/> })
  }
});

FlowRouter.route('/reset/:token', {
  name: 'login',
  action: () => {
    mount(MlLoginLayout, { content: <MlResetPasswordContent /> })
  }
});

FlowRouter.route('/forgot-password', {
  name: 'login',
  action: () => {
    mount(MlLoginLayout, { content: <MlForgotPasswordContent /> })
  }
});

FlowRouter.route('/unauthorize', {
  name: 'unauthorize',
  action: () => {
    mount(MlLoginLayout, { content: <MlAccessDenied/> })
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  action: () => {
    mount(MlLoginLayout, { content: <MlLogout formSubmit={loginActionHandler.onLoginFormSubmit}/> })
  }
});
