import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlDocumentMappingTableConfig=new MlViewer.View({
  name:"documentMappingTable",
  module:"documentMapping",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["roleTypeName","roleTypeDisplayName","isActive"],
  searchFields:["roleTypeName","roleTypeDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "documentName", title: "Name",dataSort:true},
    {dataField: "kycCategory", title: "Category",dataSort:true},
    {dataField: "allowableFormat", title: "Allowable Format",dataSort:true},
    {dataField: "allowableMaxSize", title: "Allowable Size",dataSort:true},
    {dataField: "clusters", title: "Jurisdiction",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          // FlowRouter.go("/admin/settings/editSubDepartment/"+data.id);
        } else{
          alert("Please select a Document");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDocumentMapping")
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
              data:SearchQuery(module:"documentMapping"){
                    totalRecords
                    data{
                     ...on DocumentMapping{
                              documentId
                              documentDisplayName
                              documentName
                              kycCategory
                              allowableFormat
                              allowableMaxSize
                              clusters
                              id:_id
                          }
                      }
              }
             }
              `
});

export {mlDocumentMappingTableConfig};
