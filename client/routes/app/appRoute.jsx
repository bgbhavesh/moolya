import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AppLayout from '../../app/layouts/appLayout'
import MlMapViewContainer from "../../admin/core/containers/MlMapViewContainer"
import MoolyaMapView from "../../commons/components/map/MoolyaMapView"
import MlViews from "../../admin/core/components/MlViews";
import {mlBrowserDashboardMapConfig} from '../../app/dashboard/config/mlBrowserDashboardConfig'
import MlAppIdeatorLanding from '../../../client/app/ideator/components/MlAppIdeatorLanding'
import MlAppIdeatorTabs from '../../../client/app/ideator/components/MlAppIdeatorTabs'
import MlAppStartupLanding from '../../../client/app/startup/components/MlAppStartupLanding'
import MlAppStartupTabs from '../../../client/app/startup/components/MlAppStartupTabs'

// import MyProfileAddressBook from '../../admin/profile/component/MlMyProfileAddressBook'
// import MyProfileSettings from '../../admin/profile/component/MlMyProfileSettings'
//
// import MlMyProfile from '../../admin/profile/component/MlMyprofile'
import MlAppProfileTabs from '../../app/profile/components/MlAppProfileTabs'
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
  name: 'dashboard',
  action(){
    mount(AppLayout,{appContent:<MlViews showInfinity={true} mapConfig={mlBrowserDashboardMapConfig}/>})
  }
});

appSection.route('/myprofile/personalInfo', {
  name: 'myprofile',
  action(){
    mount(AppLayout,{headerContent:<MlAdminProfileHeader />,appContent:< MlAppProfileTabs/>})
  }
});

// appSection.route('/myprofile/AddressBook', {
//   name: 'myprofile',
//   action(){
//     mount(AppLayout,{headerContent:<MlAdminProfileHeader />,appContent:< MyProfileAddressBook/>})
//   }
// });
//
// appSection.route('/myprofile/Settings', {
//   name: 'myprofile',
//   action(){
//     mount(AppLayout,{headerContent:<MlAdminProfileHeader />,appContent:< MyProfileSettings/>})
//   }
// });

appSection.route('/ideator', {
  name: 'ideator',
  action(){
    mount(AppLayout,{appContent:< MlAppIdeatorLanding/>})
    // mount(AppLayout,{appContent:<div>Ideator</div>})
  }
});


// appSection.route('/ideator/viewPortfolio/:id/:communityType', {
appSection.route('/ideator/:id/', {
  name: 'ideator_portfolio_view',
  action(params){
    mount(AppLayout,{appContent:<MlAppIdeatorTabs viewMode={true} config={params.id} />})
    // mount(AppLayout,{adminContent:<MlPortfolio viewMode={true} config={params.id} communityType={params.communityType}/>})
  }
});

// appSection.route('/ideator/editPortfolio/:id/:communityType', {
// appSection.route('/ideator/editPortfolio/', {
//   appSection: 'ideator_portfolio_edit',
//   action(params){
//     // mount(AppLayout,{adminContent:<MlPortfolio viewMode={false} config={params.id} communityType={params.communityType}/>})
//     mount(AppLayout,{appContent:<MlAppIdeatorTabs viewMode={false}/>})
//   }
// });

appSection.route('/startup', {
  name: 'startup',
  action(){
    mount(AppLayout,{appContent:< MlAppStartupLanding/>})
    // mount(AppLayout,{appContent:<div>Startup</div>})
  }
});
appSection.route('/startup/:id', {
  name: 'startup',
  action(params){
    mount(AppLayout,{appContent:< MlAppStartupTabs config={params.id}/>})
    // mount(AppLayout,{appContent:<div>Startup</div>})
  }
});
