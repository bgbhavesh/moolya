import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
// import ActiveFormatter from '../actions/ActiveFormatter'
const mlDateAndTimeTableConfig=new MlViewer.View({
  name:"languageTable",
  module:"dateAndTime",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["timeFormat","dateFormat","firstDayOfWeek"],
  searchFields:["timeFormat","dateFormat","firstDayOfWeek"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "timeFormat", title: "Time Format",dataSort:true},
    {dataField: "dateFormat", title: "Date Format",dataSort:true},
    {dataField: "firstDayOfWeek", title: "First Day of Week",dataSort:true},
    {dataField: "numberOfDaysInWeek", title: "Number Of Days In Week",dataSort:true},
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
          FlowRouter.go("/admin/settings/editDateAndTime/"+data._id);
        } else{
          alert("Please select a Document Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDateAndTime")
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
              data:SearchQuery(module:"dateAndTime"){
                    totalRecords
                    data{
                     ...on DateAndTime{
                              _id  
                              timeFormat
                              dateFormat
                              numberOfDaysInWeek
                              firstDayOfWeek
                          }
                      }
              }
              }
              `
});

export {mlDateAndTimeTableConfig};
