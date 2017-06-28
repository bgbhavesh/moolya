/**
 * Created by pankaj on 6/6/17.
 */
import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import MlOfficeItem from '../component/MlOfficeItem';
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'

function dateFormatter (data){
  let createdDateTime=data&&data.data&&data.data.dateTime;
  return <div>{moment(createdDateTime).format('MM/DD/YYYY HH:mm:ss')}</div>;
}
const mlOfficeTableConfig=new MlViewer.View({
  name:"officeTable",
  module:"office",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  // fields:['userId','userName','transactionId','clusterName','chapterName','subChapterName','communityName'],
  // searchFields:['userId','userName','transactionId','clusterName','chapterName','subChapterName','communityName'],
  fields:['profileId','userName','transactionId','clusterName','chapterName','subChapterName','communityName'],
  searchFields:['profileId','userName','transactionId','clusterName','chapterName','subChapterName','communityName'],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlOfficeItem,
  columns:[
    {dataField: "dateTime", title: "Date & Time",dataSort:true,customComponent:dateFormatter},
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    // {dataField: "userId", title: "UserId",dataSort:true},
    {dataField: "profileId", title: "UserId",dataSort:true},
    {dataField: "userName", title: "Name",dataSort:true},
    {dataField: "transactionId", title: "Trans Id"},
    {dataField:"clusterName", title:"Cluster"},
    {dataField:"chapterName", title:"Chapter"},
    {dataField:"subChapterName", title:"Sub Chapter"},
    {dataField:"communityName", title:"Community"},
    {dataField:"status", title:"Status"},
    {dataField:"updatedBy", title:"Payment"},
    {dataField:"updatedAt", title:"Action"},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:false,
  actionConfiguration:[],
  graphQlQuery:gql`query ContextSpecSearch($context:ContextParams $offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"officeTransaction", context:$context, offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ... on officeTransactionType {
                      id: _id
                      userId
                      clusterName
                      chapterName
                      chapterName
                      subChapterName
                      communityName
                      transactionId
                      status
                      userName
                      dateTime
                      profileId
                    }
                    }
              }
              }`/*gql`
                query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                data: SearchQuery(module: "officeTransaction", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData) {
                  totalRecords
                  data {
                    ... on officeTransactionType {
                      id: _id
                      userId
                      clusterName
                      chapterName
                      chapterName
                      subChapterName
                      communityName
                      transactionId
                      status
                    }
                  }
                }
              }
              `*/
});

export {mlOfficeTableConfig};
