import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import MlClusterListView from '../../admin/cluster/components/MlClusterListView'
import MlClusterChapterList from '../../admin/cluster/components/MlClusterChapterList'
import MlClusterView from '../../admin/cluster/components/MlClusterView'
import MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlChapterList from '../../admin/dashboard/component/MlChapterList'
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'

import {mlClusterListConfig,mlClusterMapConfig} from '../../admin/cluster/config/mlClusterConfig'

adminSection.route('/clusters', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<MlClusterListView mapConfig={mlClusterMapConfig} listConfig={mlClusterListConfig} />})
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
    mount(AdminLayout,{adminContent:< MlClusterChapterList params={params.clusterId}/>})
  }
});

adminSection.route('/clusters/:clusterId/communities', {
  name: 'cluster_communities',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterChapterList params={params.clusterId}/>})
  }
});

adminSection.route('/clusters/:clusterId/assignusers', {
  name: 'cluster_assignusers',
  action(params){
    mount(AdminLayout,{adminContent:< MlAssignBackendUsers params={params.clusterId}/>})
  }
});
