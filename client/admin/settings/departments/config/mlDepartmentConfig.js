import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlDepartmentTableConfig=new MlViewer.View({
  name:"departmentTable",
  module:"department",//Module name for filter.
  action:"READ",
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["departmentName","displayName","isActive"],
  searchFields:["departmentName","displayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "departmentName", title: "Department Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editDepartment/"+data.id)
        }
        else{
          alert("Please select a department")
        }
        }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDepartment")
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
              query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"department",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Department{
                              departmentName
                              displayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

const mlDepartmentModuleConfig={
  moduleName:"department",
  actions:{"READ":"read","ADD":"add","UPDATE":"update"}
};
export {mlDepartmentTableConfig,mlDepartmentModuleConfig};
