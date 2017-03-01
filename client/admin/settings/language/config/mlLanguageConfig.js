import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveFormatter from '../actions/ActiveFormatter'
const mlLanguageTableConfig=new MlViewer.View({
  name:"languageTable",
  module:"language",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["languageName","languageDisplayName","isActive"],
  searchFields:["languageName","languageDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "languageName", title: "Name",dataSort:true},
    {dataField: "languageDisplayName", title: "Display Name",dataSort:true},
    {dataField: "aboutLanguage", title: "About",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true,customComponent:ActiveFormatter},
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
          FlowRouter.go("/admin/settings/editLanguage/"+data._id);
        } else{
          alert("Please select a Document Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addLanguage")
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
              data:SearchQuery(module:"language", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Language{
                              _id  
                              languageName
                              languageDisplayName
                              aboutLanguage
                              isActive
                          }
                      }
              }
              }
              `
});

export {mlLanguageTableConfig};
