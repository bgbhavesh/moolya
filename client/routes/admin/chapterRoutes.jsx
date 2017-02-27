
import {adminSection} from "../admin/adminRoutes";
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import MlChaptersView from '../../admin/chapter/components/MlChapters'
import MlSubChapterList from '../../admin/chapter/components/MlSubChapterList'
import {mlChapterMapConfig,mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterMapConfig,mlSubChapterListConfig} from '../../admin/chapter/config/mlSubChapterConfig'
import MlSubChapterDetails from "../../admin/subChapter/components/MlSubChapterDetails"
import MlAssignChapterBackendUsers from '../../admin/chapter/components/MlAssignBackendUsers'

adminSection.route('/chapters/', {
  name: 'chapter_chapters',
  action(){
    mount(AdminLayout,{adminContent:<MlChaptersView  mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig}/>})
  }
});

adminSection.route('/chapters/:clusterId/:chapterId/subChapters', {
  name: 'chapter_subChapters',
  action(params){
    mount(AdminLayout,{adminContent:<MlSubChapterList mapConfig={mlSubChapterMapConfig} listConfig={mlSubChapterListConfig} params={params}/>})
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
    mount(AdminLayout,{adminContent:< MlAssignChapterBackendUsers params={params.subChapterId}/>})
  }
});
