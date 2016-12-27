import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

import {landing} from '../common/layouts/MoolyaLayout'
import {login} from '../common/views/login'

FlowRouter.route('/', {
  action() {
    mount(MoolyaLayout, {
      content: (<MoolyaContent />)
    });
  }
});


FlowRouter.route('/login', {
  action() {
    mount(LoginLayout, {
      content: (<LoginContent />)
    });
  }
});
