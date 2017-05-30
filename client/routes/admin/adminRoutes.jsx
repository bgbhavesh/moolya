import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
import MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'
import MlSubChapterDetails from '../../admin/subChapter/components/MlSubChapterDetails'
import MlEditCommunityFormComponent from '../../admin/community/components/MlEditCommunityFormComponent'
import MlAsignInternalUsers from'../../admin/internalUsers/components/MlassignInternalUsers'
import MlChapterView from '../../admin/chapter/components/MlChapter'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlChapterMapConfig, mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterListConfig} from '../../admin/subChapter/config/mlSubChapterConfig'
import {mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'
import MlViews from '../../admin/core/components/MlViews'
import {mlClusterListConfig,mlClusterMapConfig} from '../../admin/cluster/config/mlClusterConfig'
import MlTransactionRequested from '../../admin/transaction/requests/components/MlTransactionRequested'
import MlRequestedList from '../../admin/transaction/requested/component/MlRequestedList'
import MlSystemsLogList from '../../admin/transaction/systemsLog/component/MlSystemsLogList'
import MlRegistrtionApprovedList from '../../admin/transaction/requested/component/MlRegistrtionApprovedList'
import  RegistrationWizard from  '../../admin/transaction/requested/component/RegistrationWizard'
import MlProcessDocumentList from '../../admin/processDocument/cluster/components/MlProcessDocumentList'
import MlProcessDocMapping from '../../admin/processDocument/cluster/components/MlProcessDocMapping'
import {mlCommunityListConfig} from '../../admin/community/config/mlCommunityConfig'
import MlAdminProcessDocHeader from '../../admin/layouts/header/MlAdminProcessDocHeader';
import MlCreateRegistration from '../../admin/transaction/requested/component/createRegistration'
import MlAssignedTemplatesList from '../../templates/component/MlAssignedTemplatesList'
import MlAssignTemplate from '../../templates/component/MlAssignTemplate'
import MlEditAssignTemplate from '../../templates/component/MlEditAssignTemplate'
import MlRequestedPortfolioList from '../../admin/transaction/portfolio/component/MlRequestedProtfolioList'
import MlApprovedPortfolioList from '../../admin/transaction/portfolio/component/MlApprovedPortfolioList'
import MlCreatePortfolio from '../../admin/transaction/portfolio/component/MlCreatePortfolio'

import MyProfileAddressBook from '../../admin/profile/component/MlMyProfileAddressBook'
import MyProfileSettings from '../../admin/profile/component/MlMyProfileSettings'

import MlMyProfile from '../../admin/profile/component/MlMyprofile'
import MlAdminProfileHeader from'../../admin/layouts/header/MlAdminProfileHeader'

import  MlAdminSwitchProfile from '../../admin/profile/component/MlAdminSwitchProfile'
import MlPortfolio from '../../admin/transaction/portfolio/component/MlPortfolio'
import MlIdeatorPortfolioTemplate from '../../admin/transaction/portfolio/component/Ideator/MlIdeatorPortfolio'
import MlIdeatorPortfolioAbout from '../../admin/transaction/portfolio/component/Ideator/MlIdeatorPortfolioAbout'
import MlTransactionApprovals from '../../admin/transaction/requests/components/MlTransactionApprovals'
import MlInteractionsLogList from '../../admin/transaction/interactions/component/MlinteractionsLogList'
import MlConversationsLogList from '../../admin/transaction/conversations/component/MlConversationsLogList'
import MlAdminHeader from '../../admin/layouts/header/MlAdminHeader';


import MlInternalRequestsList from '../../admin/transaction/internalRequests/component/MlInternalRequestsList'
import MlApprovedInternalRequestsList from '../../admin/transaction/internalRequests/component/MlApprovedInternalRequestsList'


const localStorageLoginToken = Meteor.isClient && Accounts._storedLoginToken();
if(localStorageLoginToken){
  FlowRouter._askedToWait = true;
  FlowRouter.wait();
  Meteor.setTimeout(function (){
    FlowRouter.initialize();
  }, 500);
}

export const adminSection = FlowRouter.group({
  prefix: "/admin",
  name: 'admin',
  triggersEnter: [function(context, redirect)
  {
    console.log('running /adminPrefix trigger');
     userId = Meteor.userId();
    if (!userId) {
      FlowRouter.go('/login')
    }
  }]
});



adminSection.route('/', {
  triggersEnter: [function(context, redirect) {
    console.log('running /admin trigger');
    //todo: route based on context-Internal User or External User
    redirect("/admin/dashboard");
  }]
});

adminSection.route('/myprofile/personalInfo', {
  name: 'myprofile',
  action(){
    mount(AdminLayout,{headerContent:<MlAdminProfileHeader />,adminContent:< MlMyProfile/>})
  }
});

adminSection.route('/myprofile/AddressBook', {
  name: 'myprofile',
  action(){
    mount(AdminLayout,{headerContent:<MlAdminProfileHeader />,adminContent:< MyProfileAddressBook/>})
  }
});

adminSection.route('/myprofile/Settings', {
  name: 'myprofile',
  action(){
    mount(AdminLayout,{headerContent:<MlAdminProfileHeader />,adminContent:< MyProfileSettings/>})
  }
});
adminSection.route('/switchprofile', {
  name: 'myprofile',
  action(){
    mount(AdminLayout,{adminContent:<MlAdminSwitchProfile/>})
  }
});

adminSection.route('/dashboard/subChapters/:chapterId', {
  name: 'dashboard_subChapters',
  action(params){
    /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
    mount(AdminLayout,{adminContent:<MlViews showInfinity={true} mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} queryOptions={{"id":params.chapterId}}/>})
  }
});

adminSection.route('/chapter', {
  name: 'chapter',
  action(){
    mount(AdminLayout,{adminContent:<MlChapterView mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig} />})
  }
});
adminSection.route('/chapters/:chapterId', {
  name: 'chapter',
  action(params){
    mount(AdminLayout,{adminContent:<MlViews showInfinity={true} params={params} mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} /> })
  }
});
  adminSection.route('/chapter/subChapterDetails/:subChapterId', {
  name: 'subChapterDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlSubChapterDetails params={params.subChapterId}/>})
  }
});


adminSection.route('/community', {
  name: 'community',
  action(){
    mount(AdminLayout,{adminContent:< MlViews viewMode={false} showInfinity={false} listConfig={mlCommunityListConfig}/>})
  }
});
adminSection.route('/community/:communityId/communityDetails', {
  name: 'community_Community_Details',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditCommunityFormComponent params={params.communityId}/>})
  }
});
adminSection.route('/community/:communityId/assignusers', {
  name: 'community_assignusers',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});

adminSection.route('/documents/clusterList', {
  name: 'documents_ClusterList',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'documents','showBreadCrum':true,'module':'cluster'}} />, adminContent:<MlProcessDocumentList/>})
  }
});
adminSection.route('/documents/chapterList', {
  name: 'documents_ChapterList',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'documents','showBreadCrum':true,'module':'chapter'}} />, adminContent:<MlProcessDocumentList/>})
  }
});
adminSection.route('/documents/communityList', {
  name: 'documents_CommunityList',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'documents','showBreadCrum':true,'module':'community'}} />, adminContent:<MlProcessDocumentList/>})
  }
});
adminSection.route('/documents/:pid/:kycid/:docid', {
  name: '',
  action(params){
    mount(AdminLayout,{headerContent:<MlAdminProcessDocHeader processMapConfig={params.pid} />,adminContent:<MlProcessDocMapping processConfig={params.pid} kycConfig={params.kycid} docConfig={params.docid}/>})
  }
});


adminSection.route('/transactions/requestedList', {
  name: 'transaction_RequestList',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'requests'}} />, adminContent:<MlInternalRequestsList/>})
    //mount(AdminLayout,{adminContent:<MlTransactionRequested/>})
  }
});

adminSection.route('/transactions/approvedList', {
  name: 'transaction_ApprovedList',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'approvels'}} />, adminContent:<MlApprovedInternalRequestsList/>})
    //mount(AdminLayout,{adminContent:<MlTransactionApprovals/>})
  }
});

adminSection.route('/transactions/registrationApprovedList', {
  name: 'transaction_registration_approved',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'registration', subModule:'approved'}} />,  adminContent:<MlRegistrtionApprovedList/>})
  }
});


adminSection.route('/transactions/registrationRequested/edit', {
  name: 'transaction_registration_requested_edit',
  action(params){
    mount(AdminLayout,{adminContent:<RegistrationWizard config={params.id}/>})
  }
});

adminSection.route('/transactions/registrationRequested', {
  name: 'transaction_registration_requested',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'registration', subModule:'requested'}} />, adminContent:<MlRequestedList/>})
  }
});


adminSection.route('/transactions/systemsLog', {
  name: 'systems_Log',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'system'}} />, adminContent:<MlSystemsLogList/>})
  }
});

adminSection.route('/transactions/interactionsLog', {
  name: 'Interactions_Log',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'interactions'}} />, adminContent:<MlInteractionsLogList/>})
  }
});

adminSection.route('/transactions/conversationsLog', {
  name: 'Conversations_Log',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'conversations'}} />, adminContent:<MlConversationsLogList/>})
  }
});

adminSection.route('/transactions/portfolioRequested/edit', {
    name: 'transaction_portfolio_requested_edit',
    action(params){
        mount(AdminLayout,{adminContent:<MlPortfolio config={params.id}/>})
    }
});

/*

adminSection.route('/transactions/editRequests/:id', {
  name: 'transaction_EditRequests',
  action(params){
    mount(AdminLayout,{adminContent:<RegisterForm config={params.id}/>})
  }
});


adminSection.route('transactions/registrationRequested', {
  name: 'transaction_registration_requested_list',
  action(params){
    mount(AdminLayout,{adminContent:<RegisterForm/>})
  }
});

adminSection.route('transactions/registrationRequested/edit', {
  name: 'transaction_registration_requested_edit',
  action(params){
    mount(AdminLayout,{adminContent:<RegisterForm config={params.id}/>})
  }
});
*/



adminSection.route('/transactions/editRequests/:id', {
  name: 'transaction_registration_requested_edit',
  action(params){
    mount(AdminLayout,{adminContent:<RegistrationWizard config={params.id}/>})
  }
});

adminSection.route('/transactions/createRegistration', {
  name: 'transaction_registration_create',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'registration', subModule:'create'}} />, adminContent:<MlCreateRegistration/>})
  }
});
// ************* Portfolio Routes **************
adminSection.route('/transactions/portfolio/requestedPortfolioList', {
  name: 'portfolio_requested',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'portfolio', subModule:'requested'}} />, adminContent:<MlRequestedPortfolioList/>})
  }
});
adminSection.route('/transactions/portfolio/approvedPortfolioList', {
  name: 'portfolio_approved',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'portfolio', subModule:'approved'}} />, adminContent:<MlApprovedPortfolioList/>})
  }
});
adminSection.route('/transactions/portfolio/createPortfolio', {
  name: 'portfolio_create',
  action(params){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'transaction','showBreadCrum':true,'module':'portfolio', subModule:'create'}} />, adminContent:<MlCreatePortfolio/>})
  }
});

adminSection.route('/transactions/portfolio/editRequests/:id/:communityType', {
  name: 'transaction_portfolio_EditRequests',
  action(params){
    mount(AdminLayout,{adminContent:<MlPortfolio viewMode={false} config={params.id} communityType={params.communityType}/>})
  }
});

adminSection.route('/transactions/portfolio/viewPortfolio/:id/:communityType', {
  name: 'transaction_portfolio_viewPortfolio',
  action(params){
    mount(AdminLayout,{adminContent:<MlPortfolio viewMode={true} config={params.id} communityType={params.communityType}/>})
  }
});

adminSection.route('/templates/templateList', {
  name: 'templates_List',
  action(){
    mount(AdminLayout,{adminContent:<MlAssignedTemplatesList/>})
  }
});

adminSection.route('/templates/assignTemplate/', {
  name: 'templates_assignment',
  action(){
    mount(AdminLayout,{adminContent:<MlAssignTemplate />})
  }
});

adminSection.route('/templates/assignTemplate/:id', {
  name: 'templates_assignment_edit',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditAssignTemplate config={params.id} />})
  }
});



// test routes need to remove later
adminSection.route('/portfolio/tabcomponent', {
    action(params){
        mount(AdminLayout,{adminContent:<MlIdeatorPortfolioTemplate />})
    }
});

adminSection.route('/portfolio/about', {
  action(params){
      mount(AdminLayout,{adminContent:<MlIdeatorPortfolioAbout />})
  }
});
