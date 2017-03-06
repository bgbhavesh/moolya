import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"
import MlCommunityList from "../components/MlCommunityList"

import React from 'react';
import gql from 'graphql-tag'

const mlCommunityMapConfig=new MlViewer.View({
  name:"chapterMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  viewComponent:<MlMapViewContainer />,
  graphQlQuery:gql`
              query{
                  data:fetchChaptersForMap{
                     _id
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
              `
});

const mlCommunityListConfig=new MlViewer.View({
  name:"communityList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["name","displayName","communityImageLink","aboutCommunity","isActive"],
  searchFields:["name","displayName","communityImageLink","aboutCommunity","isActive"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlCommunityList />,
  graphQlQuery:gql`
              query{
              data:fetchCommunities{
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

export {mlCommunityMapConfig, mlCommunityListConfig};
