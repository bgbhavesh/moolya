import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import {mlChapterDashboardMapConfig, mlChapterDashboardListConfig} from '../../admin/dashboard/config/mlChapterDashboardConfig'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlSubChapterDashboardMapConfig,mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'
import MlCommunityList from "../../admin/dashboard/component/MlCommunityList";

adminSection.route('/dashboard', {
  triggersEnter: [function(context, redirect) {
    redirect('/admin/dashboard/clusters');
  }]

});

adminSection.route('/dashboard/clusters', {
  name: 'dashboard_clusters',
  action(){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlClusterDashboardListConfig} />})
  }
});

adminSection.route('/dashboard/chapters', {
  name: 'dashboard_chapters',
  action(){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlChapterDashboardMapConfig} listConfig={mlChapterDashboardListConfig} />})
  }
});

adminSection.route('/dashboard/communities', {
  name: 'dashboard_communities',
  action(){
    mount(AdminLayout,{adminContent:<MlCommunityList />})
  }
});

adminSection.route('/dashboard/:clusterId/chapters', {
  name: 'dashboard_specChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlChapterDashboardMapConfig} listConfig={mlChapterDashboardListConfig} params={params}/>})
  }
});

adminSection.route('/dashboard/:clusterId/:chapterId/subChapters', {
  name: 'dashboard_specSubChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlSubChapterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} params={params}/>})
  }
});
