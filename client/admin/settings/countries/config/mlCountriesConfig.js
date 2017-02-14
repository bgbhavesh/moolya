import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlCountriesTableConfig=new MlViewer.View({
  name:"CountriesTable",
  module:"countries",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["country","url","isActive"],
  searchFields:["country","url","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "country", title: "Name",dataSort:true},
    {dataField: "url", title: "Flag",dataSort:true

    },
    {dataField: "isActive", title: "Available in System",dataSort:true},
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
          FlowRouter.go("/admin/settings/editSubDepartment/"+data.id);
        } else{
          alert("Please select a Sub Department");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addSubDepartment")
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
              data:SearchQuery(module:"countries"){
                    totalRecords
                    data{
                     ...on Countries{
                              country
                              url
                              countryCode
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlCountriesTableConfig};
