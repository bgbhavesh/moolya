import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';
const mlTransactionsLogTableConfig=new MlViewer.View({
  name:"TransactionsLogTable",
  module:"TransactionsLog",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["createdAt","action", "userName","clusterName", "chapterName", "subChapterName", "communityId"],
  searchFields:["createdAt","action" , "userName", "clusterName", "chapterName", "subChapterName", "communityId"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  // filter:true,
  // filterComponent: <MlCustomFilter module="registration" moduleName="registration" />,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "createdAt", title: "Created At",dataSort:true},
    {dataField: "transactionDetails", title: "Details",dataSort:true},
    {dataField: "action", title: "Action",dataSort:true},
    {dataField: "userName", title: "User Name",dataSort:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true},
    {dataField: "subChapterName", title: "Sub Chapter",dataSort:true},
    {dataField: "communityId", title: "Community",dataSort:true},

  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:false,
  actionConfiguration:[],
  // queryOptions:true,
  // buildQueryOptions:()=>{
  //   return {userId:"wJyiTdQandDyhcmKY"}
  // },
  graphQlQuery:
  gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"TransactionsLog",offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on TransactionsLog{
                        _id
                        userId
                        userName
                        createdAt
                        action
                        transactionDetails
                        clusterName     
                        chapterName         
                        subChapterName           
                        communityId              
                      }
                    }
              }
              }`
});

export {mlTransactionsLogTableConfig};

