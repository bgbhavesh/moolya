import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import {MlAppViewer} from "../../../commons/core/MlAppViewer";
import MapDetails from "../../../../client/commons/components/map/mapDetails"
import maphandler from "../../../admin/dashboard/actions/findMapDetailsTypeAction"
import React from 'react';
import gql from 'graphql-tag'
// import MlMapFooter from '../../../admin/dashboard/component/MlMapFooter';
import MlDashboardMapView from '../components/MlAppDashboardMapView'
import MlDashboardListView from '../components/MlAppDashboardListView'
import {getAdminUserContext} from '../../../commons/getAdminUserContext';

export const mlDashboardMapConfig=new MlAppViewer({
  name:"Dashboard Map",
  moduleName:"externalUsers",
  module:"externalUsers",
  // viewType:MlViewerTypes.MAP,
  extraFields:[],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  fetchCenter:true,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    if(!config.params){
      return {
        // clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        // chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        // subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        content:{userType:config.params&&config.params.userType?config.params.userType:"All"}}
    }
    else
      return {
        // clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        // chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        // subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        content:{userType:config.params&&config.params.userType?config.params.userType:"All"}}
  },
  // fetchCenterHandler:async function(config){
  //   // let userDefaultObj = getAdminUserContext();
  //   let clusterId = config&&config.params&&config.params.clusterId?config.params.clusterId:null;
  //   let mapDetailsQuery = {moduleName: config.module,id: clusterId?clusterId:null};
  //   let center=await maphandler.fetchDefaultCenterOfUser(mapDetailsQuery);
  //   return center;
  // },
  // fetchZoom:true,
  // fetchZoomHandler:async function(reqParams){
  //   var zoom=1;
  //   // let loggedInUser = getAdminUserContext();
  //   // if(loggedInUser.hierarchyLevel != 4){
  //   //   zoom = 4;
  //   // }
  //   return zoom;
  // },
  viewComponent:<MlDashboardMapView params={this.params}/>,
  // mapFooterComponent:<MlMapFooter />,
  // actionConfiguration:[
  //   {
  //     actionName: 'onMouseEnter',
  //     hoverComponent: <MapDetails />,
  //     handler:  function (config,mapHoverHandlerCallback) {
  //       let mapDetailsQuery = {moduleName: config.module,id: config.markerId};
  //       const mapDataPromise =  maphandler.findMapDetailsTypeActionHandler(mapDetailsQuery);
  //       mapDataPromise.then(data =>{
  //         //console.log(data);
  //         if(mapHoverHandlerCallback){
  //           mapHoverHandlerCallback(data);
  //         };
  //       });
  //       return null;
  //     }
  //   },
  //   {
  //     actionName: 'onMouseLeave',
  //     // hoverComponent:<MapDetails />,
  //     handler:  (data)=>{
  //       if(data&&data.id){
  //         console.log('on leave called')
  //       }
  //     }
  //   },
  //   {
  //     actionName: 'onMarkerClick',
  //     // hoverComponent:<MapDetails />,
  //     handler:  (data)=>{
  //       if(data.module == 'cluster')
  //         FlowRouter.go('/admin/dashboard/'+data.markerId+'/chapters?viewMode=true');
  //       if(data.module == 'chapter')
  //       {
  //         if(data&&data.params)
  //         {
  //           if(data.params.clusterId)
  //             FlowRouter.go('/admin/dashboard/'+data.params.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
  //         }
  //         else
  //         {
  //           let loggedInUser = getAdminUserContext();
  //           FlowRouter.go('/admin/dashboard/'+loggedInUser.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
  //         }
  //       }
  //
  //       if(data.module == 'subChapter')
  //         FlowRouter.go('/admin/dashboard/'+data.params.clusterId+'/'+data.params.chapterId+'/'+data.markerId+'/communities?viewMode=true');
  //     }
  //   }
  // ],
  graphQlQuery:gql`
    query ($module: String!, $content: content, $queryProperty: appGenericSearchQueryProperty) {
                data:AppGenericSearch(module: $module, content: $content, queryProperty: $queryProperty) {
                  count
                  data{
                   ...on Users{
                          _id,
                          profile:profile{isActive}                      
                          lat:latitude
                          lng:longitude
                          text:communityCode
                      }
                   }                                                                                                     
                }
              }`
});

export const mlDashboardListConfig=new MlAppViewer({
  name:"Dashboard List",
  moduleName:"externalUsers",
  module:"externalUsers",
  // viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["username",'profile.firstName'],
  searchFields:["username", 'profile.firstName'],
  throttleRefresh:true,
  perPageLimit: 20,
  pagination:true,
  sort:true,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    if(!config.params){
      return {
        // clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        // chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        // subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        content:{userType:config.params&&config.params.userType?config.params.userType:"All"}}
    }
    else
      return {
        // clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        // chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        // subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        content:{userType:config.params&&config.params.userType?config.params.userType:"All"}}
  },
  viewComponent:<MlDashboardListView params={this.params}/>,
  graphQlQuery:gql`
      query ($module: String!, $content: content, $queryProperty: appGenericSearchQueryProperty) {
                data:AppGenericSearch(module: $module, content: $content, queryProperty: $queryProperty) {
                  count
                  data{
                   ...on Users{
                          _id,
                          name
                          communityCode
                          profile{
                            isActive,
                          }
                      }
                   }                                                                                                     
                }
              }`
});


