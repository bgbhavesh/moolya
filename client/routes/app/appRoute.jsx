import React from "react";
import {render} from "react-dom";
import {mount} from "react-mounter";
import AppLayout from "../../app/layouts/appLayout";
import MlViews from "../../admin/core/components/MlViews";
import MlAppIdeatorLanding from "../../../client/app/ideators/components/MlAppIdeatorLanding";
import MlAppIdeatorTabs from "../../../client/app/ideators/components/MlAppIdeatorTabs";
import MlAppStartupLanding from "../../../client/app/startup/components/MlAppStartupLanding";
import MlAppStartupTabs from "../../../client/app/startup/components/MlAppStartupTabs";
import MlAppCommunitiesList from "../../../client/app/commons/components/MlAppCommunitiesList";
import MlAdminProfileHeader from "../../admin/layouts/header/MlAdminProfileHeader";
import MlAppDashboard from "../../app/dashboard/components/MlAppDashboard";
import MlPortfolioLanding from "../../app/commons/components/MlPortfolioLanding";
import MlAppIdeatorAddIdea from "../../app/ideators/components/MlAppIdeatorAddIdea";
import MlAppPortfolio from "../../app/commons/components/MlAppPortfolio";
import MlAppManageSchedule from "../../app/calendar/manageScheduler/activity/components/MlAppManageSchedule";
import MlPortfolioIdeatorLibraryView from "../../admin/transaction/portfolio/component/IdeatorView/MlPortfolioLibrary.jsx";
import MlAppMyProfile from "../../app/profile/components/MlAppMyProfile";
import MlProfileSettings from "../../app/profile/components/MlProfileSettings";
import MlAppProfileAddressBook from "../../app/profile/components/MlAppProfileAddressBook";
import MlAppSwitchProfile from "../../app/profile/components/MlAppSwitchProfile";
import MyList from "../../app/profile/components/myList/MyList";
import MlAppMyOffice from "../../../client/app/profile/office/components/MlAppMyOffice";
import MlAppAddOffice from "../../app/profile/office/components/MlAppAddOffice";
import MlAppEditOffice from "../../app/profile/office/components/MlAppEditOffice";
import MlAppMember from "../../app/profile/office/components/OfficeMemberInfo/MlAppMember";
import MlAppOfficeMembersDetails from "../../app/profile/office/components/MlAppOfficeMembersDetails";
import MlAppPayOfficeSubscription from "../../app/profile/office/components/MlAppPayOfficeSubscription";
import MlAppInvestment from "../../app/investment/components/MlAppInvestment";
import MlAppMyTransaction from "../../app/myTransaction/component/MlAppMyTransaction";
import RegistrationWizard from "../../admin/transaction/requested/component/RegistrationWizard";
import {mlAppFunderConfig} from "../../app/funders/config/mlAppFunderConfig";
import MlAppMyCalendar from "../../app/calendar/myCalendar/components/MlAppMyCalendar";
import MlAppActivityList from "../../app/calendar/manageScheduler/activity/components/MlAppActivityList";
import MlAppTaskList from "../../app/calendar/manageScheduler/activity/components/MlAppTaskList";
//profile

//Funders

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

// appSection.route('/explore', {
//   name: 'ideator',
//   action(redirect){
//     mount(AppLayout,{appContent:< MlAppIdeatorLanding/>, isExploreMenu:true})
//   }
// });

appSection.route('/myProfile', {
  name: 'myProfile',
  action(){
      mount(AppLayout,{appContent:<MlAppMyProfile/>, isProfileMenu:true})
  }
});

appSection.route('/appSwitchProfile', {
  name: 'appSwitchProfile',
  action(){
    mount(AppLayout,{appContent:<MlAppSwitchProfile/>, isProfileMenu:true})
  }
});


appSection.route('/addressBook', {
  name: 'addressBook',
  action(){
    mount(AppLayout,{appContent:<MlAppProfileAddressBook/>, isProfileMenu:true})
  }
});

appSection.route('/myOffice', {
  name: 'myOffice',
  action(){
    mount(AppLayout, {appContent: <MlAppMyOffice />, isProfileMenu: true})
  }
});

appSection.route('/library', {
  name: 'library',
  action(){
    mount(AppLayout, {appContent: <MlPortfolioIdeatorLibraryView />, isProfileMenu: true})
  }
});

appSection.route('/myInvestments', {
  name: 'myInvestments',
  action(){
    mount(AppLayout, {appContent: <MlAppMyOffice />, isProfileMenu: true})
  }
});

appSection.route('/addOffice', {
  name: 'addOffice',
  action(){
    mount(AppLayout, {appContent: <MlAppAddOffice />, isProfileMenu: true})
  }
});

appSection.route('/officeMembersDetails/:officeId', {
  name: 'officeMembersDetails',
  action(params){
    mount(AppLayout, {appContent: <MlAppOfficeMembersDetails config={params.officeId}/>, isProfileMenu: true})
  }
});

appSection.route('/payOfficeSubscription/:officeId', {
  name: 'payOfficeSubscription',
  action(params){
    mount(AppLayout, {appContent: <MlAppPayOfficeSubscription config={params.officeId}/>, isProfileMenu: true})
  }
});

appSection.route('/editOffice/:officeId', {
  name: 'addOffice',
  action(params){
    mount(AppLayout, {appContent: <MlAppEditOffice config={params.officeId} />, isProfileMenu: true})
  }
});

appSection.route('/officeMember/:officeId/:memberId', {
  name: 'officeMember',
  action(){
    mount(AppLayout, {appContent: <MlAppMember />, isProfileMenu: true})
  }
});

appSection.route('/myConnections', {
  name: 'myConnections',
  action(){
    mount(AppLayout, {appContent: <MyList />, isProfileMenu: true})
  }
});

appSection.route('/investments', {
  name: 'myInvestments',
  action(){
    mount(AppLayout, {appContent: <MlAppInvestment />, isProfileMenu: false})
  }
});

appSection.route('/portfolio', {
  name: 'portfolio',
  action(){
    mount(AppLayout,{appContent:<MlPortfolioLanding/>, isProfileMenu:true})
  }
});

appSection.route('/transaction', {
  name: 'myTransaction',
  action(){
    mount(AppLayout, {appContent: <MlAppMyTransaction />, isProfileMenu: false})
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

// Ideators
appSection.route('/ideator', {
  name: 'ideator',
  action(){
      mount(AppLayout,{appContent:<MlAppIdeatorLanding/>})
  }
});
appSection.route('/portfolio/view/:portfolioId/:communityType', {
  name: 'portfolio',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={params.communityType}/>, isProfileMenu:true})
  }
});
appSection.route('/portfolio/edit/:portfolioId/:communityType', {
  name: 'portfolio',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={false} config={params.portfolioId} communityType={params.communityType}/>, isProfileMenu:true})
  }
});
appSection.route('/portfolio/addIdea', {
  name: 'portfolio',
  action(){
    mount(AppLayout,{appContent:< MlAppIdeatorAddIdea/>, isProfileMenu:true})
  }
});

appSection.route('/ideator/:portfolioId', {
  name: 'ideator',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"ideator"}/>, isProfileMenu:false})
  }
});

appSection.route('/ideator/editPortfolio/', {
  appSection: 'ideator_portfolio_edit',
  action(params){
    mount(AppLayout,{appContent:<MlAppIdeatorTabs viewMode={false}/>})
  }
});

//Startups
appSection.route('/startup', {
  name: 'startup',
  action(){
    mount(AppLayout,{appContent:< MlAppStartupLanding/>})
  }
});
appSection.route('/startup/:id', {
  name: 'startup',
  action(params){
    mount(AppLayout,{appContent:< MlAppStartupTabs config={params.id}/>})
  }
});

appSection.route('/register/:id', {
  name: 'registeras',
  action(params){
    mount(AppLayout,{appContent:<RegistrationWizard config={params.id}/>})
  }
});


// Funders
appSection.route('/funder', {
  name: 'funder',
  action(){
    mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={mlAppFunderConfig} />})
  }
});

appSection.route('/funder/:portfolioId', {
  name: 'funder',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"funder"}/>, isProfileMenu:false})
  }
});

//Calendar
appSection.route('/calendar', {
  name: 'calendar',
  action(){
    mount(AppLayout, {appContent: <MlAppMyCalendar />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppManageSchedule />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/activityList', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppActivityList />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/taskList', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppTaskList />, isCalenderMenu: true})
  }
});
