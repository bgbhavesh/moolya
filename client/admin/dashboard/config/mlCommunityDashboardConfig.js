import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import gql from 'graphql-tag'
import MlCommunityMapView from "../component/MlCommunityMapView"
import MlCommunityList from '../component/MlCommunityList'
import React from 'react';
import MapDetails from "../../../../client/commons/components/map/mapDetails"
import maphandler from "../actions/findMapDetailsTypeAction"
import MlMapFooter from '../component/MlMapFooter';
import {getAdminUserContext} from '../../../commons/getAdminUserContext'

const mlCommunityDashboardListConfig=new MlViewer.View({
  name:"communityDashBoardList",
  module:"users",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["username",'profile.firstName'],
  searchFields:["username", 'profile.firstName'],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    if(!config.params){
      let userDefaultObj = getAdminUserContext()
      return {clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        userType:config.params&&config.params.userType?config.params.userType:"All"}
    }
    else
      return {clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        userType:config.params&&config.params.userType?config.params.userType:"All"}
  },
  viewComponent:<MlCommunityList params={this.params}/>,
  graphQlQuery:gql`
      query($clusterId:String, $chapterId:String, $subChapterId:String, $userType:String, $offset: Int, $limit: Int, $fieldsData:[GenericFilter]){
          data:fetchUsersForDashboard(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, userType:$userType, offset: $offset, limit: $limit, fieldsData:$fieldsData){
              totalRecords
              data{
                  ...on BackendUsers{
                      _id,
                      name
                      profile{
                          isInternaluser,
                          isExternaluser,
                          isActive,
                          email,
                          profileImage
                      }
                      communityCode
                      roleNames
                      clusterName
                  }
              }      
          }
      }`
});

const mlCommunityDashboardMapConfig=new MlViewer.View({
  name:"communityDashBoardMap",
  module:"users",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  fetchCenter:true,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    if(!config.params){
      let userDefaultObj = getAdminUserContext()
      return {clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        userType:config.params&&config.params.userType?config.params.userType:"All"}
    }
    else
      return {clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null,
        userType:config.params&&config.params.userType?config.params.userType:"All"}
  },
  fetchCenterHandler:async function(config){
    let userDefaultObj = getAdminUserContext();
    let clusterId = config&&config.params&&config.params.clusterId?config.params.clusterId:userDefaultObj.clusterId;
    let mapDetailsQuery = {moduleName: config.module,id: clusterId?clusterId:null};
    let center=await maphandler.fetchDefaultCenterOfUser(mapDetailsQuery);
    return center;
  },
  fetchZoom:true,
  fetchZoomHandler:async function(reqParams){
    var zoom=1;
    let loggedInUser = getAdminUserContext();
    if(loggedInUser.hierarchyLevel != 4){
      zoom = 4;
    }
    return zoom;
  },
  viewComponent:<MlCommunityMapView params={this.params}/>,
  mapFooterComponent:<MlMapFooter />,
  actionConfiguration:[
    {
      actionName: 'onMouseEnter',
      hoverComponent: <MapDetails />,
      handler:  function (config,mapHoverHandlerCallback) {
        let mapDetailsQuery = {moduleName: config.module,id: config.markerId};
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
    },
    {
      actionName: 'onMarkerClick',
      // hoverComponent:<MapDetails />,
      handler:  (data)=>{
        if(data.module == 'cluster')
          FlowRouter.go('/admin/dashboard/'+data.markerId+'/chapters?viewMode=true');
        if(data.module == 'chapter')
        {
          if(data&&data.params)
          {
            if(data.params.clusterId)
              FlowRouter.go('/admin/dashboard/'+data.params.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
          }
          else
          {
            let loggedInUser = getAdminUserContext();
            FlowRouter.go('/admin/dashboard/'+loggedInUser.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
          }
        }

        if(data.module == 'subChapter')
          FlowRouter.go('/admin/dashboard/'+data.params.clusterId+'/'+data.params.chapterId+'/'+data.markerId+'/communities?viewMode=true');
      }
    }
  ],
  graphQlQuery:gql`
    query($clusterId:String, $chapterId:String, $subChapterId:String, $userType:String){
          data:fetchUsersForDashboard(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, userType:$userType){
              totalRecords
              data{
                  ...on BackendUsers{
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

export {mlCommunityDashboardListConfig,mlCommunityDashboardMapConfig};
