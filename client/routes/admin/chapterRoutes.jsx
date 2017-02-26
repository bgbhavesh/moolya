/*

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
import MlListViewContainer from "../../core/containers/MlListViewContainer";

import {mlClusterListConfig,mlClusterMapConfig} from '../../admin/cluster/config/mlClusterConfig'

adminSection.route('/chapters', {
  name: 'chapter',
  action(){
    mount(AdminLayout,{adminContent:<MlClusterListView mapConfig={mlClusterMapConfig} listConfig={mlClusterListConfig} />})
  }
});

adminSection.route('/chapters/:clusterId', {
  name: 'dashboard_chapters',
  action(){
    mount(AdminLayout,{adminContent:<MlListViewContainer params={params.clusterId}  />})
  }
});

adminSection.route('/chapters/:chapterId/chapterList', {
  name: 'chapter_chapterList',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterDetails params={params.chapterId}/>})
  }
});

adminSection.route('/chapters/:chapterId/subChapters', {
  name: 'chapter_subChapters',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterChapterList params={params.chapterId}/>})
  }
});

adminSection.route('/chapters/:chapterId/subChapters/:subChapterId/subChapterDetails', {
  name: 'chapter_subChapterDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterChapterList params={params.chapterId&&params.subChapterId}/>})
  }
});

adminSection.route('/chapters/:chapterId/subChapters/:subChapterId/communities', {
  name: 'chapter_communities',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterChapterList params={params.chapterId&&params.subChapterId}/>})
  }
});

adminSection.route('/chapters/:chapterId/subChapters/:subChapterId/assignusers', {
  name: 'chapter_assignusers',
  action(params){
    mount(AdminLayout,{adminContent:< MlAssignBackendUsers params={params.chapterId&&params.subChapterId}/>})
  }
});

*/
import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import MlChapters from '../../admin/chapter/components/MlChapters'
import {mlChapterMapConfig,mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterMapConfig,mlSubChapterListConfig} from '../../admin/chapter/config/mlSubChapterConfig'
import MlSubChapterDetails from "../../admin/subChapter/components/MlSubChapterDetails"
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'

adminSection.route('/chapters/', {
  name: 'chapter_chapters',
  action(){
    mount(AdminLayout,{adminContent:<MlChapters  mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig}/>})
  }
});

adminSection.route('/chapters/:clusterId/:chapterId/subChapters', {
  name: 'chapter_subChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlChapters mapConfig={mlSubChapterMapConfig} listConfig={mlSubChapterListConfig} params={params}/>})
  }
});

adminSection.route('/chapters/:subChapterId/subChapterDetails', {
  name: 'chapter_subChapterDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlSubChapterDetails params={params.subChapterId}/>})
  }
});

adminSection.route('/chapters/:subChapterId/assignusers', {
  name: 'chapter_assignusers',
  action(params){
    mount(AdminLayout,{adminContent:< MlAssignBackendUsers params={params.subChapterId}/>})
  }
});
