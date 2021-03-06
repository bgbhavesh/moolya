import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import adminlayout from '../../layouts/admin/admin';
import registerlayout from '../../layouts/admin/registration/registration.jsx';

adminSection = FlowRouter.group({
  prefix: "/admin"
});

adminSection.route('/', {
  triggersEnter(context){
      if(!Meteor.userId()){
         FlowRouter.go('/login')
      }
  },
  action(){
    mount(AdminLayout, {content:(<AdminContent/>)})
  }
});

adminSection.route('/users', {
  action(){
    mount(AdminContent, {children:(<AdminUsersContent/>)})
  }
});
adminSection.route('/registration', {
  action(){
    mount(RegistrationLayout, {
      content:(<RegistrationContent/>)
    })
  }
});

