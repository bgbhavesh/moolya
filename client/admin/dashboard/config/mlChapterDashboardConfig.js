import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";

import React from 'react';
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
  viewComponent:'',
  graphQlQuery:''
});

export {mlChapterDashboardListConfig,mlChapterDashboardMapConfig};
