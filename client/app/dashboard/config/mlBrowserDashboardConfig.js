/**
 * Created by venkatsrinag on 27/4/17.
 */
import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlMapViewContainer from '../../../admin/core/containers/MlMapViewContainer'
/*import maphandler from "../../../../client/commons/components/map/findMapDetailsTypeAction"*/
import React from 'react';
import gql from 'graphql-tag'

const mlBrowserDashboardMapConfig = new MlViewer.View({
    name:"browserDashboardMap",
    viewType:MlViewerTypes.MAP,
    throttleRefresh:true,
    pagination:false,
    fetchCenter:false,
    viewComponent:<MlMapViewContainer />,
    graphQlQuery:gql`       
       query{
          data:fetchActiveAwards {
        label:awardDisplayName
        value:_id
      }
    }
    `
    //above query is tempory for removing error from server for checking herarirchy
})

export {mlBrowserDashboardMapConfig};




//    query ContextSpecSearch($context:ContextParams,$searchSpec:SearchSpec){
//       data:ContextSpecSearch(module:"chapter",context:$context,searchSpec:$searchSpec){
//         totalRecords
//         data{
//          ...on Chapter{
//              _id
//              desc:displayName
//              text:chapterName
//              lat:latitude
//              lng:longitude
//              isActive:isActive
//              status:status {
//                code
//                description
//              }
//              }
//          }
//       }
//    }
