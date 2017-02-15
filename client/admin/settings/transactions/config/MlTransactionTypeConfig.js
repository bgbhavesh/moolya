import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlTransactionTypeTableConfig=new MlViewer.View({
  name:"transactionTypeTable",
  module:"transaction",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["transactionName","transactionDisplayName","isActive"],
  searchFields:["transactionName","transactionDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "transactionName", title: "Transaction Type",dataSort:true},
    {dataField: "transactionDisplayName", title: "Display Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
    //{dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editTransactionType/"+data.id)
        }
        else{
          alert("Please select a transaction")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addTransactionType")
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
                query SearchQuery( $offset: Int, $limit: Int) {
              data:SearchQuery(module:"transaction",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on Transaction{
                              transactionName
                              transactionDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlTransactionTypeTableConfig};
