import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import gql from 'graphql-tag'
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MlCommunityList from '../component/MlCommunityList'
import React from 'react';

const mlCommunityDashboardListConfig=new MlViewer.View({
  name:"communityDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlCommunityList/>,
  buildQueryOptions:(config)=>
  {
    debugger
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

const mlCommunityDashboardMapConfig=new MlViewer.View({
  name:"communityDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  viewComponent:<MlMapViewContainer />,
  buildQueryOptions:(config)=>{
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
