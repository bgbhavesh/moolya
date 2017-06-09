import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import gql from 'graphql-tag'
import MlCommunityMapView from "../component/MlCommunityMapView"
import MlCommunityList from '../component/MlCommunityList'
import React from 'react';

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
                          email
                      }
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
  viewComponent:<MlCommunityMapView params={this.params}/>,
  graphQlQuery:gql`
    query($clusterId:String, $chapterId:String, $subChapterId:String, $userType:String){
          data:fetchUsersForDashboard(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, userType:$userType){
              totalRecords
              data{
                  ...on BackendUsers{
                      _id,
                      text:name
                      isActive:profile{isActive}                      
                      lat:latitude
                      lng:longitude
                      
                  }
              }      
          }
      }`
});

export {mlCommunityDashboardListConfig,mlCommunityDashboardMapConfig};
