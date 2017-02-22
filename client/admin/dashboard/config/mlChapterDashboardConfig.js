import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MlChapterList from "../../dashboard/component/MlChapterList"
import React from 'react';
import gql from 'graphql-tag'

const mlChapterDashboardListConfig=new MlViewer.View({
  name:"chapterDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null}}
  },
  viewComponent:<MlChapterList />,
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec){
              data:ContextSpecSearch(module:"chapter",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on Chapter{
                              _id
                              clusterId
                              chapterCode
                              chapterName
                              displayName
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

const mlChapterDashboardMapConfig=new MlViewer.View({
  name:"chapterDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:{"userName":1,"mobileNumber":1,"eMail":1,"city":1,"regType":1},
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null}}
  },
  viewComponent:<MlMapViewContainer />,
  graphQlQuery:gql`
               query ContextSpecSearch($context:ContextParams,$searchSpec:SearchSpec){
                    data:ContextSpecSearch(module:"chapter",context:$context,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on Chapter{
                             _id
                             desc:displayName
                             text:chapterName
                             lat:latitude
                             lng:longitude
                          }
                      }
              }
              }
              `
});

export {mlChapterDashboardListConfig,mlChapterDashboardMapConfig};
