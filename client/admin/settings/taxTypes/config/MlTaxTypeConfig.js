import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlTaxTypeTableConfig=new MlViewer.View({
  name:"taxTypeTable",
  module:"tax",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["taxName","taxDisplayName","isActive"],
  searchFields:["taxName","taxDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "taxName", title: "Tax Type",dataSort:true},
    {dataField: "taxDisplayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editTaxType/"+data.id)
        }
        else{
          alert("Please select a Tax")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addTaxType")
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
              data:SearchQuery(module:"tax",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on Tax{
                              taxName
                              taxDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlTaxTypeTableConfig};
