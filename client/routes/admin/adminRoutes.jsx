import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
import MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'
import MlSubChapterDetails from '../../admin/subChapter/components/MlSubChapterDetails'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import MlEditCommunityFormComponent from '../../admin/community/components/MlEditCommunityFormComponent'
import MlAsignInternalUsers from'../../admin/internalUsers/components/MlassignInternalUsers'
import MlClusterListView from '../../admin/cluster/components/MlClusterListView'
import MlClusterView from '../../admin/cluster/components/MlClusterView'
import MlChapterView from '../../admin/chapter/components/MlChapter'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlChapterMapConfig, mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterListConfig} from '../../admin/subChapter/config/mlSubChapterConfig'
import {mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'

import {mlClusterListConfig,mlClusterMapConfig} from '../../admin/cluster/config/mlClusterConfig'

import  MlCommunityView from '../../admin/community/components/MlCommunity'
import {mlCommunityListConfig} from '../../admin/community/config/mlCommunityConfig'

let userId = Meteor.userId();

export const adminSection = FlowRouter.group({
  prefix: "/admin",
  name: 'admin',
  triggersEnter: [function(context, redirect) {
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
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} queryOptions={{"id":params.chapterId}}/>})
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
    mount(AdminLayout,{adminContent:<MlDashboard params={params} mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} /> })
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
    mount(AdminLayout,{adminContent:< MlCommunityView listConfig={mlCommunityListConfig}/>})
  }
});
adminSection.route('/community/:communityId', {
  name: 'community',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditCommunityFormComponent params={params.communityId}/>})
  }
});
adminSection.route('/internalusers', {
  name: 'community',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});

