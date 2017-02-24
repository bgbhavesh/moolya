import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveFormatter from '../actions/ActiveFormatter';
// import FlagFormatter from '../actions/FlagFormatter';

const mlGenderTableConfig=new MlViewer.View({
  name:"GenderTable",
  module:"gender",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["genderName","genderDisplayName","aboutGender","isActive"],
  searchFields:["genderName","genderDisplayName","aboutGender","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "genderName", title: "Name",dataSort:true},
    {dataField: "genderDisplayName", title: "Display Name",dataSort:true},
    {dataField: "aboutGender", title: "About",dataSort:true},
    // {dataField: "addressUploadIcon", title: "Icon",dataSort:true,customComponent:FlagFormatter},
    {dataField: "isActive", title: "Status",dataSort:true,customComponent:ActiveFormatter},
    // {dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data._id){
          FlowRouter.go("/admin/settings/editGender/"+data._id);
        } else{
          alert("Please select a Gender");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addGender")
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
              data:SearchQuery(module:"gender",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                      ...on Gender{
                             _id
                            genderName
                            aboutGender
                            genderUploadIcon
                            genderDisplayName
                            isActive
                          }
                      }
                }
              }
              `
});

export {mlGenderTableConfig};
