import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlSubDepartmentTableConfig=new MlViewer.View({
  name:"subDepartmentTable",
  module:"subDepartment",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["subDepartmentName","displayName","isActive"],
  searchFields:["subDepartmentName","displayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "subDepartmentName", title: "Department Name",dataSort:true},
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
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editSubDepartment/"+data.id);
        } else{
          alert("Please select a Sub Department");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addSubDepartment")
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
              data:SearchQuery(module:"subDepartment"){
                    totalRecords
                    data{
                     ...on SubDepartment{
                              subDepartmentName
                              displayName
                              aboutSubDepartment
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlSubDepartmentTableConfig};
