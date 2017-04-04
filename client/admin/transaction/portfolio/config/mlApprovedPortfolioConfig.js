import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlApprovedPortfolioTableConfig=new MlViewer.View({
  name:"portfolioInfoTable",
  module:"portfolioInfo",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["firstName","lastName"],
  searchFields:["registrationInfo.firstName","registrationInfo.lastName"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "firstName", title: "Date & Time",dataSort:true},
    {dataField: "lastName", title: "Requested Id",dataSort:true},
    {dataField: "firstName", title: "Transaction Type",dataSort:true},
    {dataField: "firstName", title: "Name",dataSort:true},
    {dataField: "lastName", title: "Contact No",dataSort:true},
    {dataField: "lastName", title: "Community",dataSort:true},
    {dataField: "firstName", title: "Cluster",dataSort:true},
    {dataField: "lastName", title: "Chapter",dataSort:true},
    {dataField: "lastName", title: "SubChapter",dataSort:true},
    {dataField: "firstName", title: "Subscription Type",dataSort:true},
    {dataField: "lastName", title: "Source",dataSort:true},
    {dataField: "lastName", title: "Created By",dataSort:true},
    {dataField: "lastName", title: "Status",dataSort:true},
    {dataField: "lastName", title: "Assign",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{

        if(data && data.id){
          // FlowRouter.go("/admin/transactions/editRequests/"+data.id);
        } else{
          alert("Please select a User Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'assign',
      handler: (data)=>{
        if(data && data.id){
          const internalConfig=data;
        } else{
          alert("Please select a User Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  graphQlQuery:gql`
              query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
              data:SearchQuery(module:"registrationInfo", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on RegistrationInfo{
                              firstName 
                              lastName
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlApprovedPortfolioTableConfig};
