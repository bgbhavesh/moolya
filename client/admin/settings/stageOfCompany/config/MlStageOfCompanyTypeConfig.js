import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlStageOfCompanyTableConfig=new MlViewer.View({
  name:"stageOfCompanyTable",
  module:"stageOfCompany",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["stageOfCompanyName","stageOfCompanyDisplayName","about","isActive"],
  searchFields:["stageOfCompanyName","stageOfCompanyDisplayName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "stageOfCompanyName", title: "Stage Of Company Name",dataSort:true},
    {dataField: "stageOfCompanyDisplayName", title: "Display Name",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
    {dataField: "createdBy", title: "Created By",dataSort:true},
    {dataField: "createdDate", title: "Created Date",dataSort:true},
    {dataField: "updatedBy", title: "Updated By",dataSort:true},
    {dataField: "updatedDate", title: "Updated Date",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editStageOfCompany/"+data.id)
        }
        else{
          toastr.error("Please select a Stage Of Company to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data && data.id){
          toastr.error("Please uncheck the record")
          // FlowRouter.go("/admin/settings/stageOfCompanyList");
        } else {
          FlowRouter.go("/admin/settings/addStageOfCompany")
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
              query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"stageOfCompany",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on StageOfCompany{
                              stageOfCompanyName
                              stageOfCompanyDisplayName
                              about
                              isActive
                              id:_id
                              createdBy
                              createdDate  
                              updatedBy     
                              updatedDate  
                          }
                      }
              }
              }
              `
});

export {mlStageOfCompanyTableConfig};
