import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlProcessSetupDetailsComponent from '../../processSetup/component/MlProcessSetupDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';

const mlProcessSetupRequestsTableConfig=new MlViewer.View({
  name:"ProcessSetupTable",
  module:"processSetup",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["dateTime","userId","name", "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  searchFields:["dateTime","userId" ,"name" , "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:false,
  filterComponent: <MlCustomFilter module="processSetup" moduleName="processSetup" />,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true,selectRow:true},
    {dataField: "dateTime", title: "Created Date",dataSort:true,selectRow:true},
    {dataField: "userId", title: "UserId",dataSort:true,selectRow:true},
    {dataField: "name", title: "Name",dataSort:true,selectRow:true},
    {dataField: "transactionId", title: "Transaction Id",dataSort:true,selectRow:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true,selectRow:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true,selectRow:true},
    {dataField: "subChapterName", title: "Sub Chapter",dataSort:true,selectRow:true},
    {dataField: "communityName", title: "Community",dataSort:true,selectRow:true},
    {dataField: "paymentDetails.paymentStatus", title: "Payment",dataSort:true,selectRow:true},
    {dataField: "status", title: "Status",dataSort:true,selectRow:true}
  ],
  tableHeaderClass:'react_table_head',
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlProcessSetupDetailsComponent,
  showActionComponent:true,
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
                    data:ContextSpecSearch(module:"processSetup",offset:$offset, limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on ProcessTransactions{
                          _id
                          name
                          username
                          userId
                          status
                          transactionId
                          transactionType
                          clusterName
                          chapterName
                          subChapterName
                          communityName
                          dateTime
                          mobileNumber
                          paymentDetails{
                            subscriptionName
                            cost
                            isTaxInclusive
                            about
                            dateTime
                            
                            totalAmountPaid
                            paymentMode
                            cardNumber
                            cardHolderName
                            promotionCode
                            codeAmount
                            promotionStatus
                            voucherCode
                            voucherAmount
                            voucherStatus
                            paymentStatus
                          }
                          deviceDetails{
                            deviceName
                            deviceId
                            ipAddress
                            location
                          }
                      }
                    }
              }
              }`
});

export {mlProcessSetupRequestsTableConfig};

// $context:ContextParams
// context:$context,
