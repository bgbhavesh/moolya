import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlMapViewContainer from "../../core/containers/MlMapViewContainer"

import React from 'react';
import gql from 'graphql-tag'

const mlChapterDashboardListConfig=new MlViewer.View({
  name:"chapterDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:{"userName":1,"mobileNumber":1,"eMail":1,"city":1,"regType":1},
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:'',
  graphQlQuery:''
});

const mlChapterDashboardMapConfig=new MlViewer.View({
  name:"chapterDashBoardMap",
  viewType:MlViewerTypes.MAP,
  extraFields:[],
  fields:{"userName":1,"mobileNumber":1,"eMail":1,"city":1,"regType":1},
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:false,
  sort:false,
  viewComponent:<MlMapViewContainer />,
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"chapter"){
                    totalRecords
                    data{
                     ...on Chapter{
                              chapterId
                              chapterName
                              displayName
                              about
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

export {mlChapterDashboardListConfig,mlChapterDashboardMapConfig};
