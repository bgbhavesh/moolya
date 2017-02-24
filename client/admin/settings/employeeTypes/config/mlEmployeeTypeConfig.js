import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlEmployeeTypeTableConfig=new MlViewer.View({
  name:"employeeTypeTable",
  module:"EmployeeType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["employmentName","employmentDisplayName","isActive"],
  searchFields:["employmentName","employmentDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "employmentName", title: "Employee Type",dataSort:true},
    {dataField: "employmentDisplayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editEmployeeType/"+data.id)
        }
        else{
          alert("Please select a employee type ")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addEmployeeType")
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
                query SearchQuery( $offset: Int, $limit: Int) {
              data:SearchQuery(module:"EmployeeType",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on EmployeeType{
                              employmentName
                              employmentDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlEmployeeTypeTableConfig};
