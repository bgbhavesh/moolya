import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlSubChapterList from "../../dashboard/component/MlSubChapterList"
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MapDetails from "../../../../client/commons/components/map/mapDetails"
import maphandler from "../../../../client/commons/components/map/findMapDetailsTypeAction"
import React from 'react';
import gql from 'graphql-tag'
import MlMapFooter from '../component/MlMapFooter';
const mlSubChapterDashboardMapConfig=new MlViewer.View({
  name:"subChapterDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  module:"subChapter",
  throttleRefresh:true,
  pagination:false,
  sort:false,
  fetchCenter:true,
  fetchCenterHandler:async function(reqParams){
    let mapDetailsQuery = {moduleName: reqParams.module,id:reqParams&&reqParams.params&&reqParams.params.clusterId?reqParams.params.clusterId:null};
    let center=await maphandler.fetchDefaultCenterOfUser(mapDetailsQuery);
    return center;
  },
  viewComponent:<MlMapViewContainer />,
  mapFooterComponent:<MlMapFooter />,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,chapterId:config.params&&config.params.chapterId?config.params.chapterId:null}}
  },
  actionConfiguration:[
    {
      actionName: 'onMouseEnter',
      hoverComponent: <MapDetails />,
      handler:  function (reqParams,mapHoverHandlerCallback) {
        let mapDetailsQuery = {moduleName: reqParams.module,id: reqParams.markerId};
        const mapDataPromise =  maphandler.findMapDetailsTypeActionHandler(mapDetailsQuery);
        mapDataPromise.then(data =>{
          //console.log(data);
          if(mapHoverHandlerCallback){
            mapHoverHandlerCallback(data);
          };
        });
        return null;
      }
    },
    {
      actionName: 'onMouseLeave',
      // hoverComponent:<MapDetails />,
      handler:  (data)=>{
        if(data&&data.id){
          console.log('on leave called')
        }
      }
    }
  ],
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$searchSpec:SearchSpec){
              data:ContextSpecSearch(module:"subChapter",context:$context,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on SubChapter{
                                   _id
                                   desc:aboutSubChapter
                                   text:subChapterName
                                   lat:latitude
                                   lng:longitude
                                   isActive:isActive
                                   showOnMap:showOnMap
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
  module:"subChapter",
  throttleRefresh:true,
  fields:["subChapterDisplayName"],
  searchFields:["subChapterDisplayName"],
  pagination:true,
  sort:true,
  viewComponent:<MlSubChapterList />,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,chapterId:config.params&&config.params.chapterId?config.params.chapterId:null}}
  },
  graphQlQuery:gql`query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter]){
              data:ContextSpecSearch(module:"subChapter",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec, fieldsData:$fieldsData){
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
                                   isDefaultSubChapter
                          }
                      }
              }
              }
   `
});

export { mlSubChapterDashboardListConfig,mlSubChapterDashboardMapConfig};
