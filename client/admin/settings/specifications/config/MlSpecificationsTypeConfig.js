import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlSpecificationTypeTableConfig=new MlViewer.View({
  name:"specificationTypeTable",
  module:"specification",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["specificationName","specificationDisplayName","about","isActive"],
  searchFields:["specificationName","specificationDisplayName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "specificationName", title: "Specification",dataSort:true},
    {dataField: "specificationDisplayName", title: "Display Name",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
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
          FlowRouter.go("/admin/settings/editSpecification/"+data.id)
        }
        else{
          alert("Please select a Specification to Edit");
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addSpecification")
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
              data:SearchQuery(module:"specification",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on Specification{
                              specificationName
                              specificationDisplayName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }

              `
});

export {mlSpecificationTypeTableConfig};
