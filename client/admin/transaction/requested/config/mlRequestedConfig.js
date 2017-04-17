import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlUserTypeTableConfig=new MlViewer.View({
  name:"registrationInfoTable",
  module:"registrationInfo",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["firstName","lastName"],
  searchFields:["registrationInfo.firstName","registrationInfo.lastName"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
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
          toastr.error("Please Select a User Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'assign',
      handler: (data) => {
        console.log(data);
        if (data && data.id) {
          const internalConfig = data;
        } else {
          toastr.error("Please Select a User Type");
        }
      }
    }
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
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
              `
});

export {mlUserTypeTableConfig};
