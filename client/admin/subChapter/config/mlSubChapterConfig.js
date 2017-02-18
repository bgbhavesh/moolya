import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlSubChapterList from "../../dashboard/component/MlSubChapterList"

import React from 'react';
import gql from 'graphql-tag'

const mlSubChapterListConfig=new MlViewer.View({
  name:"subChapterList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["userName","mobileNumber","eMail","city","regType"],
  searchFields:["userName","mobileNumber","eMail","city","regType"],
  throttleRefresh:true,
  pagination:true,
  sort:true,
  viewComponent:<MlSubChapterList />,
  graphQlQuery:gql`
               query{
                  data:fetchSubChapters($id: String){
                     totalRecords
                        data{
                         ...on SubChapter{
                                  clusterName
                                  chapterName
                                  subChapterName
                                  subChapterDisplayName
                                  aboutSubChapter
                                  subChapterImageLink
                                  subChapterEmail
                                  isEmailNotified 
                                  showOnMap
                                  isActive
                              }
                         }
                      
                  }
               }
              `
});

export { mlSubChapterListConfig};
