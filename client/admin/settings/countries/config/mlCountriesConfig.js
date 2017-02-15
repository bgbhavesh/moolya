import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveFormatter from '../actions/ActiveFormatter';
import FlagFormatter from '../actions/FlagFormatter';

const mlCountriesTableConfig=new MlViewer.View({
  name:"CountriesTable",
  module:"countries",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["country","displayName","url","isActive"],
  searchFields:["country","displayName","url","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "country", title: "Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "url", title: "Flag",dataSort:true,customComponent:FlagFormatter},
    {dataField: "isActive", title: "Available in System",dataSort:true,customComponent:ActiveFormatter},
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
          FlowRouter.go("/admin/settings/editCountry/"+data.id);
        } else{
          alert("Please select a Country");
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'add',
    //   handler: (data)=>{
    //     FlowRouter.go("/admin/settings/addSubDepartment")
    //   }
    // },
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
                              displayName
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
