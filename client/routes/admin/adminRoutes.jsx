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
import MlRequestedList from '../../admin/transaction/requested/component/MlRequestedList'
import  RegisterForm from  '../../admin/transaction/requested/component/registerForm'
import MlProcessDocumentList from '../../admin/processDocument/cluster/components/MlProcessDocumentList'
import MlProcessDocMapping from '../../admin/processDocument/cluster/components/MlProcessDocMapping'
import {mlCommunityListConfig} from '../../admin/community/config/mlCommunityConfig'
import MlAdminProcessDocHeader from '../../admin/layouts/header/MlAdminProcessDocHeader';

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
    mount(AdminLayout,{adminContent:<MlProcessDocumentList/>})
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
    mount(AdminLayout,{adminContent:<MlRequestedList/>})
  }
});

adminSection.route('/transactions/requestedList', {
  name: 'transaction_RequestList',
  action(){
    mount(AdminLayout,{adminContent:<MlRequestedList/>})
  }
});
adminSection.route('/transactions/editRequests/:id', {
  name: 'transaction_EditRequests',
  action(params){
    mount(AdminLayout,{adminContent:<RegisterForm config={params.id}/>})
  }
});
