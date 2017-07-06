/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import moment from "moment";
import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlServiceCardsDetailsComponent  from '../component/MlserviceCardsDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';


function createdateFormatter (data){
  console.log(data)
  let createdAt=data&&data.data&&data.data.createdAt;
  if(createdAt){
    return <div>{moment(createdAt).format('DD-MM-YYYY HH:mm:ss')}</div>;
  }
  else {
    return <div></div>
  }
}
function updatedateFormatter (data){
  let updateDate=data&&data.data&&data.data.updatedDate;
  if(updateDate){
    return <div>{moment(updateDate).format('DD-MM-YYYY HH:mm:ss')}</div>;
  }
  else {
    return <div></div>
  }
}

const mlProcessSetupRequestsTableConfig=new MlViewer.View({
  name:"ProcessSetupTable",
  module:"processSetup",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["createdAt","userId","profileId", "chapterName", "communityId", "status"],
  searchFields:["createdAt","userId" ,"profileId" , "chapterName", "communityId", "status"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:false,
  filterComponent: <MlCustomFilter module="processSetup" moduleName="processSetup" />,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true,selectRow:true},
    {dataField: "createdAt", title: "Date & Time",dataSort:true,selectRow:true, customComponent:createdateFormatter},
    {dataField: "userId", title: "UserId",dataSort:true,selectRow:true},
    {dataField: "profileId", title: "Profile Id",dataSort:true,selectRow:true},
    {dataField: "service", title: "Transaction Type",dataSort:true,selectRow:true},
    {dataField: "userDetails.chapterName", title: "Scope",dataSort:true,selectRow:true,customComponent:function(data){ return <div>{data.data.userDetails.chapterName}</div>}},
    {dataField: "userDetails.communityName", title: "Community",dataSort:true,selectRow:true, customComponent:function(data){ return <div>{data.data.userDetails.communityName}</div>}},
    {dataField: "status", title: "Status",dataSort:true,selectRow:true},
    {dataField: "service", title: "Action",dataSort:true,selectRow:true},
    {dataField: "service", title: "Progress",dataSort:true,selectRow:true},
    {dataField: "service", title: "Assignee",dataSort:true,selectRow:true}
  ],
  tableHeaderClass:'react_table_head',
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlServiceCardsDetailsComponent,
  showActionComponent:false,
  actionConfiguration:[
    {
      actionName: 'add',
      showAction: true,
      handler: (data)=>{

      }
    }
  ],
  graphQlQuery:
    gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"serviceCards",offset:$offset, limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on AdminService{
                            userId
                            email
                            _id
                            profileId
                            name
                            displayName
                            noOfSession
                            sessionFrequency
                            status
                            tasks
                            createdAt
                            updatedAt
                            validTill
                            isBeSpoke 
                            mode 
                            cluster{
                              id
                              name
                            }
                            state{
                              id
                              name
                            }
                            city{
                              id
                              name
                            }
                            community{
                              id
                              name
                             }
                             duration{
                              hours
                              minutes
                             }
                            userDetails{
                              chapterName
                              clusterName
                              communityName
                              mobileNumber
                              subChapterName
                            }
                            
                      }
                    }
              }
              }`
});

export {mlProcessSetupRequestsTableConfig};

// $context:ContextParams
// context:$context,
