import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MlChapterList from "../../dashboard/component/MlChapterList"
import React from 'react';
import gql from 'graphql-tag'
import MapDetails from "../../../../client/commons/components/map/mapDetails"
import maphandler from "../../../../client/commons/components/map/findMapDetailsTypeAction"
import {getAdminUserContext} from '../../../commons/getAdminUserContext'

const mlChapterDashboardListConfig=new MlViewer.View({
  name:"chapterDashBoardList",
  module:"chapter",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  throttleRefresh:true,
  fields:["displayName"],
  searchFields:["displayName"],
  pagination:true,
  sort:true,
  queryOptions:true,
  buildQueryOptions:(config)=>
  {
    if(!config.params){
        let userDefaultObj = getAdminUserContext()
        return {context:{clusterId:userDefaultObj.clusterId?userDefaultObj.clusterId:null}}
    }
    else
      return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null}}
  },
  viewComponent:<MlChapterList />,
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec, $fieldsData:[GenericFilter]){
              data:ContextSpecSearch(module:"chapter",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec, fieldsData:$fieldsData){
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
  module:"chapter",
  fields:{"userName":1,"mobileNumber":1,"eMail":1,"city":1,"regType":1},
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  queryOptions:true,
  buildQueryOptions:(config)=>
  {
      if(!config.params){
        let userDefaultObj = getAdminUserContext()
        return {context:{clusterId:userDefaultObj.clusterId?userDefaultObj.clusterId:null}}
      }
      else
        return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null}}
  },
  fetchCenter:true,
  fetchCenterHandler:async function(reqParams){
    let mapDetailsQuery = {moduleName: reqParams.module,id:reqParams&&reqParams.params&&reqParams.params.clusterId?reqParams.params.clusterId:null};
    let center=await maphandler.fetchDefaultCenterOfUser(mapDetailsQuery);
    return center;
  },
  viewComponent:<MlMapViewContainer />,
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
                    data:ContextSpecSearch(module:"chapter",context:$context,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on Chapter{
                             _id
                             desc:displayName
                             text:chapterName
                             lat:latitude
                             lng:longitude
                             isActive:isActive
                             showOnMap:showOnMap
                             status:status {
                               code
                               description
                             }
                          }
                      }
              }
              }
              `
});

export {mlChapterDashboardListConfig,mlChapterDashboardMapConfig};
