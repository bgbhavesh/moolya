import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlClusterList from '../component/MlClusterList'
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MapDetails from "../../../../client/commons/components/map/mapDetails"
import maphandler from "../../../../client/commons/components/map/findMapDetailsTypeAction"
import React from 'react';
import gql from 'graphql-tag'
const mlClusterDashboardListConfig=new MlViewer.View({
  name:"clusterDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["displayName"],
  searchFields:["displayName"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlClusterList />,
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec, $fieldsData:[GenericFilter]){
                    data:ContextSpecSearch(module:"cluster",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec, fieldsData:$fieldsData){
                    totalRecords
                    data{
                     ...on Cluster{
                              countryId
                              displayName
                              about
                              link
                              id:_id
                              email
                              showOnMap
                              countryFlag
                          }
                      }
              }
              }
              `
});

const mlClusterDashboardMapConfig=new MlViewer.View({
  name:"clusterDashBoardMap",
  module:"cluster",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  fetchCenter:true,
  fetchCenterHandler:async function(reqParams){
    let mapDetailsQuery = {moduleName: reqParams.module,id: reqParams&&reqParams.params&&reqParams.params.clusterId?reqParams.params.clusterId:null};
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
  // async function (data) {
  //   console.log(data);
    // let mapMarkerData=await findMapDetailsTypeActionHandler(data);
    // return mapMarkerData;
  // },
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$searchSpec:SearchSpec){
                    data:ContextSpecSearch(module:"cluster",context:$context,searchSpec:$searchSpec){
                    totalRecords
                    data{
                     ...on Cluster{
                             _id
                             desc:about
                             text:displayName
                             lat:latitude
                             lng:longitude
                             isActive:isActive
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

export {mlClusterDashboardListConfig,mlClusterDashboardMapConfig};
