import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import {mlChapterDashboardMapConfig, mlChapterDashboardListConfig} from '../../admin/dashboard/config/mlChapterDashboardConfig'
import MlChapterView from '../../admin/chapter/components/MlChapter'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlSubChapterDashboardMapConfig,mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'


adminSection.route('/dashboard', {
  name: 'dashboard',
  action(){
    FlowRouter.go("/admin/dashboard/clusters");
  }
});

adminSection.route('/dashboard/clusters', {
  name: 'dashboard_Clusters',
  action(){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlClusterDashboardListConfig} />})
  }
});

adminSection.route('/dashboard/chapters', {
  name: 'dashboard_Chapters',
  action(){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlChapterDashboardMapConfig} listConfig={mlChapterDashboardListConfig} />})
  }
});

adminSection.route('/dashboard/communities', {
  name: 'dashboard_Communities',
  action(){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlChapterDashboardMapConfig} listConfig={mlChapterDashboardListConfig} />})
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
