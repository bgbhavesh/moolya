import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AppLayout from '../../app/layouts/appLayout'
import MlMapViewContainer from "../../admin/core/containers/MlMapViewContainer"
import MoolyaMapView from "../../commons/components/map/MoolyaMapView"
import MlViews from "../../admin/core/components/MlViews";
import {mlBrowserDashboardMapConfig} from '../../app/dashboard/config/mlBrowserDashboardConfig'
import MlAppIdeatorLanding from '../../../client/app/ideator/components/MlAppIdeatorLanding'
import MlAppStartupLanding from '../../../client/app/startup/components/MlAppStartupLanding'

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
  name: 'dashboard',
  action(){
    mount(AppLayout,{appContent:<MlViews showInfinity={true} mapConfig={mlBrowserDashboardMapConfig}/>})
  }
});

appSection.route('/ideator', {
  name: 'ideator',
  action(){
    mount(AppLayout,{appContent:< MlAppIdeatorLanding/>})
    // mount(AppLayout,{appContent:<div>Ideator</div>})
  }
});

appSection.route('/startup', {
  name: 'startup',
  action(){
    mount(AppLayout,{appContent:< MlAppStartupLanding/>})
    // mount(AppLayout,{appContent:<div>Startup</div>})
  }
});
