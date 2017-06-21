/**
 * Created by vishwadeep on 18/6/17.
 */
import {MlViewer, MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import React from "react";
import gql from "graphql-tag";
import MlGenericTransactionAccordion from '../../commons/components/transactionAccordion/MlGenericTransactionAccordion'

const mlMyTransactionTableConfig = new MlViewer.View({
  name: "MyTransactionTable",
  module: "myTransaction",//Module name for filter.
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
  expandComponent: MlGenericTransactionAccordion,
  columns: [
    {dataField: "transactionId", title: "transactionId", 'isKey': true, isHidden: true},
    // {dataField: "transactionId", title: "Transaction Id", dataSort: true},
    {dataField: "transactionType", title: "Transaction Type", dataSort: true},
    {dataField: "Created At", title: "createdAt", dataSort: true},
    {dataField: "firstName", title: "firstName", dataSort: true},
    {dataField: "lastName", title: "lastName", dataSort: true},
    {dataField: "username", title: "username", dataSort: true}
  ],
  tableHeaderClass: 'react_table_head',
  showActionComponent: false,
  actionConfiguration: [],
  graphQlQuery: gql` query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                        data: SearchQuery(module: "userTransaction", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData) {
                          totalRecords
                          data {
                            ... on myTransaction {
                                userId
                                createdAt
                                transactionId
                                username
                                firstName
                                lastName
                                transactionType
                            }
                          }
                        }
                        }`
})

export {mlMyTransactionTableConfig};
