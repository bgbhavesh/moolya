import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import {mlChapterMapConfig, mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import MlChapterView from '../../admin/chapter/components/MlChapter'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'


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
    mount(AdminLayout,{adminContent:<MlChapterView mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig} />})
  }
});

adminSection.route('/dashboard/communities', {
  name: 'dashboard_Communities',
  action(params){
    mount(AdminLayout,{adminContent:<MlChapterView mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig} />})
  }
});

adminSection.route('/dashboard/:clusterId/chapters', {
  name: 'dashboard_specChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlChapterView mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig} params={params}/>})
  }
});

adminSection.route('/dashboard/:clusterId/:chapterId/subChapters', {
  name: 'dashboard_specSubChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} params={params}/>})
  }
});
