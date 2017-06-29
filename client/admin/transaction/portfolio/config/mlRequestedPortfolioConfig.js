import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';
import MlPortfolioAssignComponent from '../component/MlPortfolioAssignComponent'
import {validateTransaction} from '../actions/assignUserforTransactionAction'

const mlRequestedPortfolioTableConfig=new MlViewer.View({
  name:"portfolioInfoTable",
  module:"portfolioDetails",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:['portfolioId', 'transactionType', 'portfolioUserName' , 'contactNumber', 'communityType', 'clusterName', 'chapterName','subChapterName', 'accountType', 'source', 'createdBy', 'status'],
  searchFields:['portfolioId', 'transactionType', 'portfolioUserName' , 'contactNumber', 'communityType', 'clusterName', 'chapterName','subChapterName', 'accountType', 'source', 'createdBy', 'status'],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  filter:true,
  multiSelect:true,
  filterComponent: <MlCustomFilter module="portfolio" moduleName="portfolio" />,
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
    {dataField: "assignedUser", title: "Assign",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,

  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: async(data)=>{
        let response =  await validateTransaction(data.transactionId,"MlPortfolioDetails",data[0].assignedUserId);
        if(data && data[0].id && response.success === true){
          FlowRouter.go("/admin/transactions/portfolio/editRequests/"+data[0].id+"/"+data[0].communityType);
        }else if(data && data[0].id){
          toastr.error("User does not have access to edit record");
        } else{
          toastr.error("Please Select a record");
        }
      }
    },
    {
      showAction: true,
      actionName: 'assign',
      hasPopOver:true,
      popOverTitle:'Assign Portfolio',
      placement:'top',
      target:'portfolioAssign',
      popOverComponent:<MlPortfolioAssignComponent />,
      actionComponent:function(props){
        return  <div className={props.activeClass} id={props.actionName}>
          <div onClick={props.onClickHandler} className={props.activesubclass} data-toggle="tooltip" title={props.actionName} data-placement="top" >
            <span className={props.iconClass} id={props.target}></span>
          </div></div>;
      }
    },
    {
      showAction: true,
      actionName: 'view',
      handler: (data)=>{
        if(data && data[0].id){
          FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/"+data[0].id+"/"+data[0].communityType);
        } else{
          toastr.error("Please select a record");
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'approveUser',
    //   handler: (data) => {
    //     if (data && data.id) {
    //       FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/" + data.id+"/"+data.communityType);
    //     } else {
    //       toastr.error("Please select a record");
    //     }
    //   }
    // },
    {
      showAction: true,
      actionName: 'rejectUser',
      handler: (data) => {
        if (data && data[0].id) {
          FlowRouter.go("/admin/transactions/portfolio/viewPortfolio/" + data[0].id+"/"+data[0].communityType);
        } else {
          toastr.error("Please select a record");
        }
      }
    },
  ],
  graphQlQuery:/*gql`
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
  `*/
    gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"portfolioRequests",offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
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
                          transactionId
                          assignedUser
                          assignedUserId
                     }
                      }
              }
              }`
});

export {mlRequestedPortfolioTableConfig};
