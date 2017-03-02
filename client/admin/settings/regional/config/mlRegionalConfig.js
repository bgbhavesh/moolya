import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlRegionalTableConfig=new MlViewer.View({
  name:"regionalTable",
  module:"regional",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["clusterName","regionalPhoneNumber","regionalCurrencyName","regionalZipFormat"],
  searchFields:["clusterName","regionalPhoneNumber","regionalCurrencyName","regionalZipFormat"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    // {dataField: "_id",title:"id",'isKey':true,isHidden:true},
    {dataField: "clusterName", title: "Cluster",'isKey':true,dataSort:true},
    {dataField: "regionalPhoneNumber", title: "Phone Number",dataSort:true},
    {dataField: "regionalCurrencyName", title: "Currency Name",dataSort:true},
    {dataField: "regionalZipFormat", title: "Zip Format",dataSort:true},
    //{dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data._id){
          FlowRouter.go("/admin/settings/editRegional/"+data._id);
        } else{
          alert("Please select a Regional");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addRegional")
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  graphQlQuery:gql`
              query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
              data:SearchQuery(module:"regional", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Regional{
                            regionalZipFormat
                            clusterName
                            regionalCurrencyName
                            regionalPhoneNumber
                            _id
                          }
                      }
              }
              }
              `
});

export {mlRegionalTableConfig};
