import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlTemplateTypeTableConfig=new MlViewer.View({
  name:"templateTypeTable",
  module:"template",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["templateName","templateDisplayName","isActive"],
  searchFields:["templateName","templateDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "templateName", title: "Template Type",dataSort:true},
    {dataField: "templateDisplayName", title: "Display Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editTemplateType/"+data.id)
        }
        else{
          alert("Please select a Template")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addTemplateType")
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
              data:SearchQuery(module:"template",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Template{
                              templateName
                              templateDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlTemplateTypeTableConfig};
