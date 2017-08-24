import React from "react";
import {render} from "react-dom";
import {mount} from "react-mounter";
import AppLayout from "../../app/layouts/appLayout";
import MlAppIdeatorTabs from "../../../client/app/ideators/components/MlAppIdeatorTabs";
import MlAppCommunitiesList from "../../../client/app/commons/components/MlAppCommunitiesList";
import MlAdminProfileHeader from "../../admin/layouts/header/MlAdminProfileHeader";
import MlPortfolioLanding from "../../app/commons/components/MlPortfolioLanding";
import MlAppIdeatorAddIdea from "../../app/ideators/components/MlAppIdeatorAddIdea";
import MlAppPortfolio from "../../app/commons/components/MlAppPortfolio";
import Library from '../../commons/components/portfolioLibrary/libraryRoute'
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
import {appClient} from '../../app/core/appConnection'
import MlViews from '../../app/commons/view/MlAppViews'
import {mlDashboardListConfig, mlDashboardMapConfig} from '../../app/dashboard/config/mlAppDashboardConfig'
import {mlAppInstitutionConfig} from '../../app/portfolio/Institutions/config/mlAppInstitutionsConfig'
import {mlAppCompanyConfig} from '../../app/portfolio/Companies/config/mlAppCompaniesConfig'

// import RegistrationWizard from "../../admin/transaction/requested/component/RegistrationWizard";
import MlAppRegistrationWizard from "../../../client/app/registrations/component/MlAppRegistrationWizard";
import MlAppTempRoute from "../../../client/app/registrations/component/MlAppTempRoute";
import {mlAppFunderConfig} from "../../app/funders/config/mlAppFunderConfig";
import MLAppMyCalendar from "../../app/calendar/myCalendar/components/calendarParentComponent";

/**
 * Activities Routes
 */
import MlAppActivity from "../../app/calendar/manageScheduler/activity/components/MlAppActivity";
import MlAppScheduleHead from "../../app/calendar/manageScheduler/activity/components/MlAppActivityList";
import MlAppActivityList from "../../app/calendar/manageScheduler/activity/components/MlAppActivityList";
import MlAppCreateTeam from "../../app/calendar/manageScheduler/activity/components/MlAppActivityBasicInfo";

/**
 * Tasks Routes
 */
import MlAppTaskList from "../../app/calendar/manageScheduler/task/components/MlAppTaskList";
import MlAppTaskLanding from "../../app/calendar/manageScheduler/task/components/MlAppTaskLanding";

/**
 * Services Routes
 */
import MlAppServiceList from "../../app/calendar/manageScheduler/service/components/MlAppServiceList";
import MlAppServiceManageSchedule from "../../app/calendar/manageScheduler/service/components/MlAppServiceManageSchedule";

/**
 * Internal Tasks Routes
 */
import MlAppInternalTask from "../../app/internalTask/components/MlAppInternalTask";

/**
 * Set Calendars Routes
 */
import MlAppSetCalendarSettings from '../../app/calendar/manageScheduler/setCalendar/components/MlAppSetCalendarSettings';
import MlAppOfficeCalendar from '../../app/calendar/officeCalendar/components/MlAppOfficeCalendar';


import _ from "lodash";
import MlAppExplore from "../../app/explore/components/MlAppExplore";

import {mlAppServiceProviderConfig} from '../../app/serviceProvider/config/mlAppServiceProviderConfig'
import  {mlAppStartupConfig} from '../../app/startup/config/mlAppStartupConfig'
import  {mlAppIdeatorConfig} from '../../app/ideators/config/mlAppIdeatorConfig'

/**
 * Import infinite scroll component
 */
import MlInfiniteScroll from '../../commons/core/mlInfiniteScroll/components/MlInfiniteScroll';
import {mlAppFunderConfig2} from "../../app/funders/config/mlAppFunderConfig2";

/**
 * Import My Appointment routes
 */
import MlAppMyAppointment from '../../app/calendar/myAppointments/components/MlAppMyAppointment';
import MlAppMyTaskAppointment from '../../app/calendar/myCalendar/components/myTaskAppointments/containers/MlAppMyTaskAppointments';
import mlConversationUtils from '../../commons/conversations/utils/mlconversationUtils'

export const appSection = FlowRouter.group({
  prefix: "/app",
  name: 'app',
  triggersEnter: [function(context, redirect)
  {
      userId = Meteor.userId();
      if (!userId) {
        redirect('/login')
      }
      mlConversationUtils.init();
  }]
});

appSection.route('/', {
    triggersEnter: [function(context, redirect) {
        console.log('running /app trigger');
        redirect("/app/dashboard/"+ true);
    }]
})

/**if user login first time then passing content from URL*/
appSection.route('/dashboard/:isFirst', {
  name: 'dashboard',
  action(params){
    mount(AppLayout,{appContent:<MlViews showInfinity={true} mapConfig={mlDashboardMapConfig} listConfig={mlDashboardListConfig}/>, isFirst:(params.isFirst=='true'?true:false)})
    // mount(AppLayout,{appContent:<MlAppDashboard/>, isFirst:(params.isFirst=='true'?true:false) })
  }
});

appSection.route('/dashboard', {
  name: 'dashboard',
  action(){
    mount(AppLayout,{appContent:<MlViews showInfinity={true} mapConfig={mlDashboardMapConfig} listConfig={mlDashboardListConfig}/>})
    // mount(AppLayout,{appContent:<MlAppDashboard/>})
  }
});

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
    mount(AppLayout, {appContent: <Library client={appClient} />, isProfileMenu: true})
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
    var listConfig = _.extend(mlAppIdeatorConfig, {isExplore: false});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
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
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"ideator"}/>})
  }
});

appSection.route('/ideator/editPortfolio/', {
  appSection: 'ideator_portfolio_edit',
  action(params){
    mount(AppLayout,{appContent:<MlAppIdeatorTabs viewMode={false}/>})
  }
});

/**
 * startup tabs
 * */
appSection.route('/startup', {
  name: 'startup',
  action(){
    // mount(AppLayout, {appContent: <MlViews viewMode={false} showInfinity={false} listConfig={listConfig}/>})
    var listConfig = _.extend(mlAppStartupConfig, {isExplore: false});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
    /**infinite scroll component*/
  }
});
appSection.route('/startup/:portfolioId', {
  name: 'startup',
  action(params){
    // mount(AppLayout,{appContent:< MlAppStartupTabs config={params.id}/>})
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"startup"}/>})
  }
});

appSection.route('/serviceProvider', {
  name: 'provider',
  action(){
    var listConfig = _.extend(mlAppServiceProviderConfig, {isExplore: false});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
    // mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={listConfig} />})
    /**using infinite scroll*/
  }
});

appSection.route('/serviceProvider/:portfolioId', {
  name: 'provider',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"serviceProvider"}/>, isProfileMenu:false})
  }
});

/********************************************************start of routes for the institution*************************/
appSection.route('/explore/institution', {
  name: 'explore',
  action(){
    var listConfig = _.extend(mlAppInstitutionConfig, {isExplore: true});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
  }
});

appSection.route('/explore/institution/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"institution"}/>})
  }
  /**there is no need to send community type other than ideator*/
});

appSection.route('/institution', {
  name: 'institutions',
  action(){
    var listConfig = _.extend(mlAppInstitutionConfig, {isExplore: false});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
  }
});

appSection.route('/institution/:portfolioId', {
  name: 'institutions',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"institution"}/>, isProfileMenu:false})
  }
});
/************************************************end of instituion routes**********************************************/

/********************************************************start of routes for the companies *************************/
appSection.route('/explore/company', {
  name: 'explore',
  action(){
    var listConfig = _.extend(mlAppCompanyConfig, {isExplore: true});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
  }
});

appSection.route('/explore/company/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"institution"}/>})
  }
  /**there is no need to send community type other than ideator*/
});

appSection.route('/company', {
  name: 'companies',
  action(){
    var listConfig = _.extend(mlAppInstitutionConfig, {isExplore: false});
    mount(AppLayout,{appContent:<mlAppCompanyConfig viewMode={false} showInfinity={false} config={listConfig} />})
  }
});

appSection.route('/company/:portfolioId', {
  name: 'companies',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"institution"}/>, isProfileMenu:false})
  }
});
/************************************************end of companies routes**********************************************/
appSection.route('/register/:id', {
  name: 'registeras',
  action(params){
    // mount(AppLayout,{appContent:<RegistrationWizard config={params.id}/>})
    mount(AppLayout,{appContent:<MlAppRegistrationWizard config={params.id}/>}) /*making seperate registration wizard for app and admin*/
  }
});

/**
 * temporary route for registration*/

appSection.route('/register/', {
  name: 'registeras',
  action(params){
    mount(AppLayout,{appContent:< MlAppTempRoute/>})
  }
});

// Funders
appSection.route('/funder', {
  name: 'funder',
  action(){
    var config = _.extend(mlAppFunderConfig2, {isExplore: false});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={config} />})
    // var listConfig = _.extend(mlAppFunderConfig, {isExplore: false});
    // mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={listConfig} />})
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
  name: 'mycalendar',
  action(){
    mount(AppLayout, {appContent: <MLAppMyCalendar />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/officeCalendar', {
  name: 'calendar_office',
  action(){
    mount(AppLayout, {appContent: <MlAppOfficeCalendar />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/all/activityList', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppScheduleHead />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/createTask', {
  name: 'calendar_manageSchedule',
  action(params){
    mount(AppLayout, {appContent: <MlAppTaskLanding profileId={params.profileId} editMode={false}/>, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/activityList', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppActivityList />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/createActivity', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent:<MlAppActivity />, isCalenderMenu: true})
  }
});


appSection.route('/calendar/manageSchedule/:profileId/createService', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent:<MlAppServiceManageSchedule viewMode={false} />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/editService', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent:<MlAppServiceManageSchedule viewMode={false} />, isCalenderMenu: true})
  }
});


appSection.route('/calendar/manageSchedule/:profileId/editActivity', {
  name: 'calendar_manageSchedule',
  action(params){
    mount(AppLayout, {appContent:<MlAppActivity />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/taskList', {
  name: 'calendar_manageSchedule',
  action(params){
    mount(AppLayout, {appContent: <MlAppTaskList profileId={params.profileId}/>, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/editTask/:taskId', {
  name: 'calendar_manageSchedule',
  action(params){
    mount(AppLayout, {appContent: <MlAppTaskLanding profileId={params.profileId} taskId={params.taskId} editMode={true}/>, isCalenderMenu: true})
  }
});

appSection.route('/task', {
  name: 'my_task',
  action(){
    mount(AppLayout, {appContent: <MlAppInternalTask />})
  }
});


appSection.route('/calendar/manageSchedule/:profileId/serviceList', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppServiceList />, isCalenderMenu: true})
  }
});

appSection.route('/calendar/manageSchedule/:profileId/setCalendar', {
  name: 'calendar_manageSchedule',
  action(){
    mount(AppLayout, {appContent: <MlAppSetCalendarSettings />, isCalenderMenu: true})
  }
});

/**
 * Explore menus for all communities
 * */

appSection.route('/explore', {
  name: 'explore',
  action(){
    mount(AppLayout,{appContent:< MlAppExplore />})
  }
});

appSection.route('/explore/ideator/', {
  name: 'explore',
  action(params){
    // mount(AppLayout,{appContent:< MlAppIdeatorLanding isExplore={true}/>})
    var listConfig = _.extend(mlAppIdeatorConfig, {isExplore: true});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
  }
});

appSection.route('/explore/ideator/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"ideator"}/>})
  }
});

appSection.route('/explore/investor', {
  name: 'explore',
  action(){
    // var listConfig = _.extend(mlAppFunderConfig, {isExplore: true});
    // mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={listConfig} />})
    let listConfig = _.extend(mlAppFunderConfig2, {isExplore: true});
    mount(AppLayout,{appContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
  }
  // isExplore={true}
  /**removing explore menu from left nav*/
});

appSection.route('/explore/investor/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"funder"}/>})
  }
  // , isExploreMenu:true
  /**removing explore menu from left nav*/
});

appSection.route('/explore/serviceProvider', {
  name: 'explore',
  action(){
    var listConfig = _.extend(mlAppServiceProviderConfig, {isExplore: true});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
    // mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={listConfig} />})
    /**using infinite scroll*/
  }
});

appSection.route('/explore/serviceProvider/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"serviceProvider"}/>})
  }
  /**there is no need to send community type other than ideator*/
});

appSection.route('/explore/startup', {
  name: 'explore',
  action(){
    var listConfig = _.extend(mlAppStartupConfig, {isExplore: true});
    mount(AppLayout,{appContent:<MlInfiniteScroll viewMode={false} showInfinity={false} config={listConfig} />})
    // mount(AppLayout,{appContent:<MlViews viewMode={false} showInfinity={false} listConfig={listConfig} />})
    /**import of infinite scroll component*/
  }
});

appSection.route('/explore/startup/:portfolioId', {
  name: 'explore',
  action(params){
    mount(AppLayout,{appContent:< MlAppPortfolio viewMode={true} config={params.portfolioId} communityType={"startup"}/>})
  }
  /**there is no need to send community type other than ideator*/
});

appSection.route('/myAppointment', {
  name: 'myAppointment',
  action(params){
    mount(AppLayout,{appContent:< MlAppMyAppointment />, isProfileMenu: true})
  }
  /**there is no need to send community type other than ideator*/
});

appSection.route('/myTaskAppointment', {
  name: 'myTaskAppointment',
  action(params){
    mount(AppLayout,{appContent:< MlAppMyTaskAppointment />, isProfileMenu: true})
  }
  /**there is no need to send community type other than ideator*/
});
