import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlDocumentFormatTableConfig=new MlViewer.View({
  name:"documentFormatTable",
  module:"documentFormat",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["docFormatName","docFormatDisplayName","isActive"],
  searchFields:["docFormatName","docFormatDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "docFormatName", title: "Name",dataSort:true},
    {dataField: "docFormatDisplayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editDocumentFormat/"+data.id);
        } else{
          alert("Please select a Document Format");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDocumentFormat")
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
              data:SearchQuery(module:"documentFormat"){
                    totalRecords
                    data{
                     ...on DocumentFormats{
                              docFormatName
                              docFormatDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlDocumentFormatTableConfig};
