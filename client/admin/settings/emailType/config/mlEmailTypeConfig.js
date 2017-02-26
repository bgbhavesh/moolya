import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
// import ActiveFormatter from '../actions/ActiveFormatter';
// import FlagFormatter from '../actions/FlagFormatter';

const mlEmailTypeTableConfig=new MlViewer.View({
  name:"EmailTypeTable",
  module:"emailType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["emailName","emailDisplayName","emailUploadIcon","isActive"],
  searchFields:["emailName","emailDisplayName","emailUploadIcon","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "emailName", title: "Name",dataSort:true},
    {dataField: "emailDisplayName", title: "Display Name",dataSort:true},
    {dataField: "aboutEmail", title: "About",dataSort:true},
    // {dataField: "addressUploadIcon", title: "Icon",dataSort:true,customComponent:FlagFormatter},
    // {dataField: "isActive", title: "Available in System",dataSort:true,customComponent:ActiveFormatter},
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
          FlowRouter.go("/admin/settings/editEmailType/"+data._id);
        } else{
          alert("Please select a Email Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addEmailType")
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
              data:SearchQuery(module:"emailType",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                      ...on EmailType{
                             _id
                            emailName
                            aboutEmail
                            emailDisplayName
                          }
                      }
                }
              }
              `
});

export {mlEmailTypeTableConfig};
