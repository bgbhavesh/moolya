/**
 * Created by pankaj on 6/6/17.
 */
import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import MlOfficeItem from '../component/MlOfficeItem';
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'

function dateFormatter (data){
  let createdDateTime=data&&data.data&&data.data.date;
  return <div>{moment(createdDateTime).format('MM/DD/YYYY HH:mm:ss')}</div>;
}
const mlOfficeTableConfig=new MlViewer.View({
  name:"officeTable",
  module:"office",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:[],
  searchFields:[],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlOfficeItem,
  columns:[
    {dataField: "createdAt", title: "Date & Time",dataSort:true,customComponent:dateFormatter},
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "userId", title: "UserId",dataSort:true},
    {dataField: "subProcessName", title: "Name",dataSort:true},
    {dataField: "transactionId", title: "Trans Id"},
    {dataField:"clusterName", title:"Cluster"},
    {dataField:"chapterName", title:"Chapter"},
    {dataField:"subChapterName", title:"Sub Chapter"},
    {dataField:"communityName", title:"Community"},
    {dataField:"updatedBy", title:"Payment"},
    {dataField:"status", title:"Status"},
    {dataField:"updatedAt", title:"Action"},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[],
  graphQlQuery:gql`
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
              `
});

export {mlOfficeTableConfig};
