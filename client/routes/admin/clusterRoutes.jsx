import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import MlClusterChapterList from '../../admin/cluster/components/MlClusterChapterList'
import MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlChapterList from '../../admin/dashboard/component/MlChapterList'
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'
import {mlClusterChapterListConfig} from '../../admin/cluster/config/mlClusterChapterConfig'
import {mlClusterSubChaptersListConfig} from '../../admin/cluster/config/mlClusterSubChaptersConfig'
import {mlClusterListConfig,mlClusterMapConfig} from '../../admin/cluster/config/mlClusterConfig'
import MlViews from '../../admin/core/components/MlViews';

adminSection.route('/clusters', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<MlViews showInfinity={true} mapConfig={mlClusterMapConfig} listConfig={mlClusterListConfig} />})
  }
});

adminSection.route('/clusters/:clusterId/clusterDetails', {
  name: 'cluster_clusterDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterDetails params={params.clusterId}/>})
  }
});

adminSection.route('/clusters/:clusterId/chapters', {
  name: 'cluster_chapters',
  action(params){
    mount(AdminLayout,{adminContent:< MlViews viewMode={false} showInfinity={false} params={params.clusterId} listConfig={mlClusterChapterListConfig}/>})
  }
});

adminSection.route('/clusters/:clusterId/:chapterId/:subChapterId/communities', {
  name: 'cluster_communities',
  action(params){
    mount(AdminLayout,{adminContent:< MlViews viewMode={false} showInfinity={false} params={params} />})
  }
});
adminSection.route('/clusters/:clusterId/:chapterId/subChapters', {
  name: 'cluster_chapters',
  action(params){
    mount(AdminLayout,{adminContent:< MlViews viewMode={false} showInfinity={false} params={params} listConfig={mlClusterSubChaptersListConfig}/>})
  }
});

adminSection.route('/clusters/:clusterId/assignusers', {
  name: 'cluster_assignusers',
  action(params){
    mount(AdminLayout,{adminContent:< MlAssignBackendUsers params={params.clusterId}/>})
  }
});
