import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlProcessTableConfig=new MlViewer.View({
  name:"roleTypeTable",
  module:"roles",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["roleName","displayName","roleType","userType","about"],
  searchFields:["roleTypeName","roleTypeDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "processId", title: "processId",dataSort:true},
    {dataField: "procecss", title: "procecss",dataSort:true},
    {dataField: "isActive", title: "Status",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editProcess/"+data.id);
        } else{
          alert("Please select a Role Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addProcess")
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
                data:SearchQuery(module:"process"){
                      totalRecords
                      data{
                       ...on ProcessType{
                             id:_id,
                              processId, 
                              process,
                              isActive
                            }
                        }
                }
               }
              `
});

export {mlProcessTableConfig};
