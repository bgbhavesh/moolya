import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlSubChapterList from "../../dashboard/component/MlSubChapterList"

import React from 'react';
import gql from 'graphql-tag'

const mlSubChapterDashboardListConfig=new MlViewer.View({
  name:"subChapterList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlSubChapterList />,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {id:config.params&&config.params.chapterId?config.params.chapterId:null}
  },
  graphQlQuery:gql` query fetchSubChapters( $id:String) {
                    data:fetchSubChapters(id: $id){
                       data{
                                   _id
                                   chapterId
                                   clusterId
                                   clusterName
                                   chapterName
                                   subChapterName
                                  subChapterDisplayName
                                   aboutSubChapter
                                   subChapterImageLink
                                   subChapterEmail
                                   isEmailNotified
                                   showOnMap
                                   isActive
                                   subChapterDisplayName
                            
                    }
                    }
                     }`
});

export { mlSubChapterDashboardListConfig};
