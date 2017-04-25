import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlRequestedPortfolioTableConfig=new MlViewer.View({
  name:"portfolioInfoTable",
  module:"PortfolioRquest",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:['portfolioId', 'transactionType', 'portfolioUserName' , 'contactNumber', 'communityType', 'clusterName', 'chapterName', 'accountType', 'source', 'createdBy', 'status'],
  searchFields:['portfolioId', 'transactionType', 'portfolioUserName' , 'contactNumber', 'communityType', 'clusterName', 'chapterName', 'accountType', 'source', 'createdBy', 'status'],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "portfolioId", title: "Requested Id",dataSort:true},
    {dataField: "createdAt", title: "Date & Time",dataSort:true},
    {dataField: "transactionType", title: "Transaction Type",dataSort:true},
    {dataField: "portfolioUserName", title: "Name",dataSort:true},
    {dataField: "contactNumber", title: "Contact No",dataSort:true},
    {dataField: "communityType", title: "Community",dataSort:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true},
    {dataField: "subChapterName", title: "SubChapter",dataSort:true},
    {dataField: "accountType", title: "Account Type",dataSort:true},
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
          FlowRouter.go("/admin/transactions/portfolio/editRequests/"+data.id+"/"+data.communityType);
        } else{
          toastr.error("Please select a record");
        }
      }
    },
    /*{
      showAction: true,
      actionName: 'comment',
      handler: null
    },*/
    {
      showAction: true,
      actionName: 'assign',
      handler: (data)=>{
        if(data && data.id){
          const internalConfig=data;
        } else{
          toastr.error("Please select a record");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/"+data.id+"/"+data.communityType);
        } else{
          toastr.error("Please select a record");
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // },
    /*{
      showAction: true,
      actionName: 'cancel',
      handler: null
    },*/
    {
      showAction: true,
      actionName: 'approveUser',
      handler: (data) => {
        if (data && data.id) {
          FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/" + data.id);
        } else {
          toastr.error("Please select a record");
        }
      }
    },
    {
      showAction: true,
      actionName: 'rejectUser',
      handler: (data) => {
        if (data && data.id) {
          FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/" + data.id);
        } else {
          toastr.error("Please select a record");
        }
      }
    },
  ],
  graphQlQuery:gql`
    query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
      data:SearchQuery(module:"Portfoliodetails", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
        totalRecords
          data{
            ...on Portfoliodetails{
                id:_id
                portfolioId
                transactionType,
                portfolioUserName,
              	contactNumber
                communityType
                clusterName
                chapterName
                subChapterName
                accountType
                source
                createdBy
                createdAt
                status
                assignedTo
            }
          }
      }
    }
  `
});

export {mlRequestedPortfolioTableConfig};
