import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlSubChapterList from "../../dashboard/component/MlSubChapterList"
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import React from 'react';
import gql from 'graphql-tag'

const mlsubChapterDashboardMapConfig=new MlViewer.View({
  name:"subChapterDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  viewComponent:<MlMapViewContainer />,
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"subChapter"){
                    totalRecords
                    data{
                     ...on Chapter{
                              chapterId
                              chapterName
                              displayName
                              about
                              chapterImage
                              stateName
                              stateId
                              cityId
                              cityName
                              latitude
                              longitude
                              showOnMap
                              isActive
                          }
                      }
              }
              }
              `
});

const mlSubChapterDashboardListConfig=new MlViewer.View({
  name:"subChapterList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlSubChapterList />,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,chapterId:config.params&&config.params.chapterId?config.params.chapterId:null}}
  },
  graphQlQuery:gql`query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec){
              data:ContextSpecSearch(module:"subChapter",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on SubChapter{
                               _id
                                   chapterId
                                   clusterId
                                   clusterName
                                   chapterName
                                   subChapterName
                                   subChapterCode
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
              }
              }
   `
});

export { mlSubChapterDashboardListConfig};
