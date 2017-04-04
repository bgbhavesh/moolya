import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlRequestedPortfolioTableConfig=new MlViewer.View({
  name:"portfolioInfoTable",
  module:"PortfolioRquest",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["name"],
  searchFields:[],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "datetime", title: "Date & Time",dataSort:true},
    {dataField: "reqid", title: "Requested Id",dataSort:true},
    {dataField: "transcationType", title: "Transaction Type",dataSort:true},
    {dataField: "name", title: "Name",dataSort:true},
    {dataField: "contactNumber", title: "Contact No",dataSort:true},
    {dataField: "communityType", title: "Community",dataSort:true},
    {dataField: "cluster", title: "Cluster",dataSort:true},
    {dataField: "chapter", title: "Chapter",dataSort:true},
    {dataField: "subChapter", title: "SubChapter",dataSort:true},
    {dataField: "subscriptionType", title: "Subscription Type",dataSort:true},
    {dataField: "source", title: "Source",dataSort:true},
    {dataField: "createdBy", title: "Created By",dataSort:true},
    {dataField: "status", title: "Status",dataSort:true},
    {dataField: "assignedTo", title: "Assign",dataSort:true},
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
              data:SearchQuery(module:"PortfolioRquest", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on PortfolioRquest{
                              name
                          }
                      }
              }
  }
              `
});

export {mlRequestedPortfolioTableConfig};
