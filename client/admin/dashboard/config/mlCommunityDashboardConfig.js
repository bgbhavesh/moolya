import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";

import React from 'react';
const mlCommunityDashboardListConfig=new MlViewer.View({
  name:"communityDashBoardList",
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

const mlCommunityDashboardMapConfig=new MlViewer.View({
  name:"communityDashBoardMap",
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

export {mlCommunityDashboardListConfig,mlCommunityDashboardMapConfig};
