import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";

import React from 'react';
const mlCommunityDashboardListConfig=new MlViewer.View({
  name:"communityDashBoardList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
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
  throttleRefresh:true,
  pagination:false,
  sort:false,
  viewComponent:'',
  graphQlQuery:''
});

export {mlCommunityDashboardListConfig,mlCommunityDashboardMapConfig};
