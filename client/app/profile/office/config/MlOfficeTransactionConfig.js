/**
 * Created by vishwadeep on 9/6/17.
 */
import {MlViewer, MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from "react";
import gql from "graphql-tag";
import MlAppTransaction from "../components/officeTransaction/MlAppTransaction";

const mlOfficeTransactionConfig = new MlViewer.View({
  name: "officeTransactionTable",
  module: "officeTransaction",//Module name for filter.
  viewType: MlViewerTypes.TABLE,
  extraFields: [],
  fields: ['transactionId','transactionType' ,'clusterName', 'chapterName', 'communityName', 'status'],
  searchFields: ['transactionId', 'transactionType','clusterName', 'chapterName', 'communityName', 'status'],
  throttleRefresh: false,
  pagination: true,//To display pagination
  selectRow: true,  //Enable checkbox/radio button to select the row.
  isExpandableRow: (row)=> {
    return true;
  },
  expandComponent: MlAppTransaction,
  columns: [
    {dataField: "id", title: "Id", 'isKey': true, isHidden: true},
    {dataField: "transactionId", title: "Transaction Id", dataSort: true},
    {dataField: "transactionType", title: "Transaction Type", dataSort: true},
    {dataField: "clusterName", title: "Cluster Name", dataSort: true},
    {dataField: "chapterName", title: "Chapter Name", dataSort: true},
    {dataField: "communityName", title: "CommunityName", dataSort: true},
    {dataField: "status", title: "status", dataSort: true}
  ],
  tableHeaderClass: 'react_table_head',
  showActionComponent: false,
  actionConfiguration: [],
  //temp query to view data need to change
  graphQlQuery: gql` query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                        data: SearchQuery(module: "officeTransaction", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData) {
                          totalRecords
                          data {
                            ... on officeTransactionType {
                              id: _id
                              transactionId
                              clusterName
                              chapterName
                              status
                              communityName
                              transactionType
                            }
                          }
                        }
                        }`
})

export {mlOfficeTransactionConfig};
