import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import gql from 'graphql-tag'
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MlCommunityList from '../component/MlCommunityList'
import React from 'react';

import {getAdminUserContext} from '../../../commons/getAdminUserContext'

const mlCommunityDashboardListConfig=new MlViewer.View({
  name:"communityDashBoardList",
  module:"community",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
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
      query($clusterId:String, $chapterId:String, $subChapterId:String, $userType:String){
          data:fetchUsersForDashboard(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, userType:$userType){
              totalRecords
              data{
                  ...on BackendUsers{
                      _id,
                      profile{
                          isInternaluser,
                          isExternaluser,
                          isActive,
                          email,
                          InternalUprofile{
                              moolyaProfile{
                                userType,
                                roleType,
                                displayName,
                                globalAssignment,
                                isActive
                              }
                          }    
                      }
                  }
              }      
          }
      }`
});

const mlCommunityDashboardMapConfig=new MlViewer.View({
  name:"communityDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  viewComponent:<MlMapViewContainer />,
  queryOptions:true,
  buildQueryOptions:(config)=>{
    if(!config.params){
      let userDefaultObj = getAdminUserContext()
      return {context:{clusterId:userDefaultObj.clusterId?userDefaultObj.clusterId:null}}
    }
    else
      return {clusterId:config.params&&config.params.clusterId?config.params.clusterId:null,
        chapterId:config.params&&config.params.chapterId?config.params.chapterId:null,
        subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null}
  },
  graphQlQuery:gql`
    query($clusterId:String, $chapterId:String, $subChapterId:String){
      data:fetchCommunities(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId){
        totalRecords
          data{
            ...on Community{
              name,
              displayName,
              code,
              communityImageLink,
              showOnMap,
              aboutCommunity,
              isActive
            }
          }
        }
      }
  `
});

export {mlCommunityDashboardListConfig,mlCommunityDashboardMapConfig};
