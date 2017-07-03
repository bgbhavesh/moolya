import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlInternalRequestDetailsComponent from '../../internalRequests/component/MlInternalRequestDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';

const mlRejectedInternalRequestsTableConfig=new MlViewer.View({
  name:"TransactionsLogTable",
  module:"internalRejectedRequests",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["transactionCreatedDate","requestId","requestTypeName", "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  searchFields:["transactionCreatedDate","requestId" ,"requestTypeName" , "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:true,
  filterComponent: <MlCustomFilter module="internalRejectedRequests" moduleName="internalRejectedRequests" />,
  columns:[
    {dataField: "requestId",title:"Id",'isKey':true,isHidden:true,selectRow:true},
    {dataField: "requestId", title: "Transaction Id",dataSort:true,selectRow:true},
    {dataField: "createdBy", title: "Created By",dataSort:true,selectRow:true},
    {dataField: "emailId", title: "Email Id",dataSort:true,selectRow:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true,selectRow:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true,selectRow:true},
    {dataField: "subChapterName", title: "Sub Chapter",dataSort:true,selectRow:true},
    {dataField: "communityName", title: "Community",dataSort:true,selectRow:true},
    {dataField: "transactionTypeName", title: "Transaction Type",dataSort:true,selectRow:true},
    {dataField: "transactionCreatedDate", title: "Created Date",dataSort:true,selectRow:true},
    {dataField: "status", title: "status",dataSort:true,selectRow:true},
    {dataField: "requestTypeName", title: "Activity",dataSort:true,selectRow:true},
  ],
  tableHeaderClass:'react_table_head',
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlInternalRequestDetailsComponent,
  showActionComponent:false,
  actionConfiguration:[],
  queryOptions:true,
  buildQueryOptions:(config)=>{
    return {context:{transactionTypeName:"internalRequests"}}
  },
  graphQlQuery:
  gql`query ContextSpecSearch($context:ContextParams $offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"internalRejectedRequests",offset:$offset, context:$context, limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on requests{
                          _id
                          userId
                          status
                          requestId
                          emailId
                          requestTypeName
                          transactionCreatedDate
                          transactionTypeName
                          requestTypeId
                          requestDescription
                          clusterName
                          chapterName
                          subChapterName
                          communityName
                          createdBy
                      }
                    }
              }
              }`
});

export {mlRejectedInternalRequestsTableConfig};

