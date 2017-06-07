import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlInteractionDetailsComponent from '../component/MlInteractionDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';

const mlInteractionsLogTableConfig=new MlViewer.View({
  name:"TransactionsLogTable",
  module:"InteractionsLog",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["createdAt","activity","transactionTypeName", "userName","clusterName", "chapterName", "subChapterName", "communityId"],
  searchFields:["createdAt","activity" ,"transactionTypeName" ,"userName", "clusterName", "chapterName", "subChapterName", "communityId"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:true,
  filterComponent: <MlCustomFilter module="transactionLog" moduleName="transactionLog" />,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true,selectRow:true},
    {dataField: "createdAt", title: "Created At",dataSort:true,selectRow:true},
    {dataField: "userName", title: "User Name",dataSort:true,selectRow:true},
    {dataField: "activity", title: "Activity",dataSort:true,selectRow:true},
    {dataField: "transactionDetails", title: "Details",dataSort:true,selectRow:true},
    {dataField: "transactionTypeName", title: "TransactionTypeName",dataSort:true,selectRow:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true,selectRow:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true,selectRow:true},
    {dataField: "subChapterName", title: "Sub Chapter",dataSort:true,selectRow:true},
    {dataField: "communityName", title: "Community",dataSort:true,selectRow:true},
    {dataField: "userAgent",isHidden:true},{dataField: "userId",isHidden:true},{dataField: "emailId",isHidden:true},{dataField: "transactionTypeId",isHidden:true}

  ],
  tableHeaderClass:'react_table_head',
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlInteractionDetailsComponent,
  showActionComponent:false,
  // expandableRow:_id,
  actionConfiguration:[],
  queryOptions:true,
  // buildQueryOptions:()=>{
  //   return {userId:"wJyiTdQandDyhcmKY"}
  // },
  buildQueryOptions:(config)=>{
    return {context:{transactionTypeName:"interactions"}}
  },
  graphQlQuery:
  gql`query ContextSpecSearch($context:ContextParams $offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"TransactionsLog", context:$context, offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on TransactionsLog{
                        _id
                        userId
                        userName
                        createdAt
                        activity
                        emailId
                        userAgent{
                        ipAddress
                        browser
                        }
                        transactionTypeName
                        transactionTypeId
                        transactionDetails
                        clusterName     
                        chapterName         
                        subChapterName           
                        communityId  
                        communityName
                        transactionTypeId
                      }
                    }
              }
              }`
});

export {mlInteractionsLogTableConfig};

