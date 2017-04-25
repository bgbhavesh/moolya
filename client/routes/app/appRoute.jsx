import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';


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
        console.log('running /admin trigger');
        //todo: route based on context-Internal User or External User
    }]
})
