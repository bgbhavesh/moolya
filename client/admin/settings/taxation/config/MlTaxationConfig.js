import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlTaxationTableConfig=new MlViewer.View({
  name:"taxationTable",
  module:"taxation",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["taxationName","aboutTaxation","taxationValidityFrom","taxationValidityTo"],
  searchFields:["taxationName","aboutTaxation","taxationValidityFrom","taxationValidityTo"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "taxationName", title: "Taxation Name",dataSort:true},
    {dataField: "aboutTaxation", title: "About",dataSort:true},
    {dataField: "taxationValidityFrom", title: "Valid from",dataSort:true},
    {dataField: "taxationValidityTo", title: "Valid To",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editTaxation/"+data.id)
        }
        else{
          alert("Please select a Taxation")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addTaxation")
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
              data:SearchQuery(module:"taxation",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on taxation{
                              taxationName
                              taxationValidityFrom  
                              taxationValidityTo   
                              aboutTaxation        
                              isActive             
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlTaxationTableConfig};
