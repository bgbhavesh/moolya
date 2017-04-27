import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AppLayout from '../../app/layouts/appLayout'
import MlMyProfile from '../../admin/profile/component/MlMyprofile'
import MlAdminProfileHeader from'../../admin/layouts/header/MlAdminProfileHeader'


export const appSection = FlowRouter.group({
  prefix: "/app",
  name: 'app',
  triggersEnter: [function(context, redirect)
  {
      userId = Meteor.userId();
      if (!userId) {
          FlowRouter.go('/login')
      }
  }]
});

appSection.route('/', {
    triggersEnter: [function(context, redirect) {
        console.log('running /app trigger');
        redirect("/app/dashboard");
    }]
})

appSection.route('/dashboard', {
  name: 'myprofile',
  action(){
    mount(AppLayout,{headerContent:<MlAdminProfileHeader />,adminContent:< MlMyProfile/>})
  }
});


