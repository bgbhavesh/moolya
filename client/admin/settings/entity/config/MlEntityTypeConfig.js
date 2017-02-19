import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlEntityTableConfig=new MlViewer.View({
  name:"entityTable",
  module:"entity",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["entityName","entityDisplayName","about","isActive"],
  searchFields:["entityName","entityDisplayName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "entityName", title: "Entity Name",dataSort:true},
    {dataField: "entityDisplayName", title: "Display Name",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
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
          FlowRouter.go("/admin/settings/editEntity/"+data.id)
        }
        else{
          alert("Please select a Entity to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addEntity")
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
              data:SearchQuery(module:"entity",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on Entity{
                              entityName
                              entityDisplayName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlEntityTableConfig};
