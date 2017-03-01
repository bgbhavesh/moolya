import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlClustersList from "../components/MlClustersList"
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"

import React from 'react';
import gql from 'graphql-tag'
const mlClusterListConfig=new MlViewer.View({
  name:"clusterList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlClustersList />,
  graphQlQuery:gql`
              query ContextSpecSearch($context:ContextParams,$offset: Int, $limit: Int,$searchSpec:SearchSpec){
                    data:ContextSpecSearch(module:"cluster",context:$context,offset:$offset,limit:$limit,searchSpec:$searchSpec){
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

const mlClusterMapConfig=new MlViewer.View({
  name:"clusterMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  viewComponent:<MlMapViewContainer />,
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
                          }
                      }
              }
              }
              `
});

export {mlClusterListConfig,mlClusterMapConfig};
