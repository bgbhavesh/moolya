import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';
function dateFormatter (data){
  let createdDateTime=data&&data.data&&data.data.registrationDate?data.data.registrationDate:null;
  return <div>{createdDateTime&&moment(createdDateTime).format('MM-DD-YYYY hh:mm:ss')}</div>;
}
const mlUserTypeTableConfig=new MlViewer.View({
  name:"registrationInfoTable",
  module:"registrationInfo",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["firstName","lastName"],
  searchFields:["registrationInfo.firstName","status","registrationInfo.lastName"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  filter:true,
  filterComponent: <MlCustomFilter module="registration" moduleName="registration" />,
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "registrationDate", title: "Date",dataSort:true,customComponent:dateFormatter},
    {dataField: "firstName", title: "Name",dataSort:true},
    {dataField: "contactNumber", title: "ContactNo",dataSort:true},
    {dataField: "communityName", title: "Community",dataSort:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true},
    {dataField: "subChapterName", title: "SubChapter",dataSort:true},
    {dataField: "accountType", title: "Subscription Type",dataSort:true},
    {dataField: "source", title: "Source",dataSort:true},
    {dataField: "registrationStatus", title: "Status",dataSort:true},
    {dataField: "assignedUser", title: "Assignto",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{

        if(data && data.id){
          FlowRouter.go("/admin/transactions/editRequests/"+data.id);
        } else{
          toastr.error("Please select a record");
        }
      }
    },
    {
      showAction: false,
      actionName: 'assign',
      handler: (data)=>{
        if(data && data.id){
          const internalConfig=data;
        } else{
          toastr.error("Please select a record");
        }
      }
    }
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  graphQlQuery:/*gql`
             query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
              data:SearchQuery(module:"registrationApprovedInfo", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on RegistrationInfo{

                              firstName
                              lastName
                              id:_id
                              contactNumber
                              communityName
                      			  clusterName
                      				chapterName
                              subChapterName
                              accountType
                      				source
                              assignedUser
              								registrationStatus
                      				registrationDate


                          }
                      }
              }
              }
              `*/
    gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"registrationApprovedInfo",offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on RegistrationInfo{
                              firstName
                              lastName
                              id:_id
                              contactNumber
                              communityName
                      			  clusterName
                      				chapterName
                              subChapterName
                              accountType
                      				source
                              assignedUser
              								registrationStatus
                      				registrationDate
                          }
                      }
              }
              }`
});

export {mlUserTypeTableConfig};
