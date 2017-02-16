import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlClusterList from '../component/MlClusterList'
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"

import React from 'react';
import gql from 'graphql-tag'
const mlClusterDashboardListConfig=new MlViewer.View({
  name:"clusterDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlClusterList />,
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"cluster"){
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
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  viewComponent:<MlMapViewContainer />,
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"cluster"){
                    totalRecords
                    data{
                     ...on Cluster{
                              countryId
                              displayName
                              about
                            
                              _id
                             
                              showOnMap
                              countryFlag
                              latitude
                              longitude
                          }
                      }
              }
              }
              `
});

export {mlClusterDashboardListConfig,mlClusterDashboardMapConfig};
