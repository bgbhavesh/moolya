import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlDepartmentTableConfig=new MlViewer.View({
  name:"departmentTable",
  module:"department",
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["departmentName","displayName","isActive"],
  searchFields:["departmentName","displayName","isActive"],
  throttleRefresh:false,
  pagination:false,
  selectRow:true,
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
      handler: null
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
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"department"){
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

export {mlDepartmentTableConfig};
