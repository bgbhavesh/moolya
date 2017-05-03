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
import  MlAppIdeatorEditTabs from '../../../client/app/ideator/components/MlAppIdeatorEditTabs'
import MlAppCommunitiesList from '../../../client/app/commons/components/MlAppCommunitiesList'

// import MyProfileAddressBook from '../../admin/profile/component/MlMyProfileAddressBook'
// import MyProfileSettings from '../../admin/profile/component/MlMyProfileSettings'
import MlAppProfileTabs from '../../app/profile/components/MlAppProfileTabs'
import MlAdminProfileHeader from'../../admin/layouts/header/MlAdminProfileHeader'
import MlAppDashboard from '../../app/dashboard/components/MlAppDashboard'
import MlPortfolioLanding from '../../app/commons/components/MlPortfolioLanding'
import MlAppIdeatorAddIdea from '../../app/ideator/components/MlAppIdeatorAddIdea'


//profile
import MlAppMyProfile from '../../app/profile/components/MlAppMyProfile'
import MlProfileSettings from '../../app/profile/components/MlProfileSettings'
import MlAppProfileAddressBook from '../../app/profile/components/MlAppProfileAddressBook'


import RegistrationWizard from '../../admin/transaction/requested/component/RegistrationWizard'
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
    // mount(AppLayout,{appContent:<MlViews showInfinity={true} mapConfig={mlBrowserDashboardMapConfig}/>})
    mount(AppLayout,{appContent:<MlAppDashboard/>})
  }
});

appSection.route('/myProfile', {
  name: 'myProfile',
  action(){
      mount(AppLayout,{appContent:<MlAppMyProfile/>, isProfileMenu:true})
  }
});

appSection.route('/addressBook', {
  name: 'addressBook',
  action(){
    // mount(AppLayout,{appContent:<MyProfileAddressBook/>, isProfileMenu:true})
    mount(AppLayout,{appContent:<MlAppProfileAddressBook/>, isProfileMenu:true})
  }
});

appSection.route('/portfolio', {
  name: 'portfolio',
  action(){
    mount(AppLayout,{appContent:<MlPortfolioLanding/>, isProfileMenu:true})
  }
});

appSection.route('/settings', {
  name: 'settings',
  action(){
    mount(AppLayout,{appContent:<MlProfileSettings/>, isProfileMenu:true})
  }
});

appSection.route('/myProfile/registerAs', {
    name: 'registeras',
    action(){
        mount(AppLayout,{headerContent:<MlAdminProfileHeader />,appContent:< MlAppCommunitiesList/>})
    }
})

appSection.route('/ideator', {
  name: 'ideator',
  action(){
      mount(AppLayout,{appContent:< MlAppIdeatorLanding/>})
  }
});
appSection.route('/portfolio/view/:id/', {
  name: 'portfolio',
  action(params){
    mount(AppLayout,{appContent:< MlAppIdeatorTabs viewMode={true} config={params.id}/>, isProfileMenu:true})
  }
});
appSection.route('/portfolio/edit/:id/', {
  name: 'portfolio',
  action(params){
    mount(AppLayout,{appContent:< MlAppIdeatorEditTabs viewMode={true} config={params.id}/>, isProfileMenu:true})
  }
});
appSection.route('/portfolio/addIdea', {
  name: 'portfolio',
  action(){
    mount(AppLayout,{appContent:< MlAppIdeatorAddIdea/>, isProfileMenu:true})
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
appSection.route('/ideator/editPortfolio/', {
  appSection: 'ideator_portfolio_edit',
  action(params){
    // mount(AppLayout,{adminContent:<MlPortfolio viewMode={false} config={params.id} communityType={params.communityType}/>})
    mount(AppLayout,{appContent:<MlAppIdeatorTabs viewMode={false}/>})
  }
});

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

appSection.route('/register/:id', {
  name: 'registeras',
  action(params){
    mount(AppLayout,{appContent:<RegistrationWizard config={params.id}/>})
  }
});

