import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
// import ActiveFormatter from '../actions/ActiveFormatter'
const mlNumericalFormatTableConfig=new MlViewer.View({
  name:"numericalFormatTable",
  module:"numericalFormat",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["numberOfDigitsAfterDecimal","measurementSystem","currencyFormat"],
  searchFields:["numberOfDigitsAfterDecimal","measurementSystem","currencyFormat"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "numberOfDigitsAfterDecimal", title: "Number Of Digits After Decimal",dataSort:true},
    {dataField: "measurementSystem", title: "Measurement System",dataSort:true},
    {dataField: "currencySymbol", title: "Currency Symbol",dataSort:true},
    {dataField: "valueSeparator", title: "Value Separator",dataSort:true},
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
          FlowRouter.go("/admin/settings/editNumericalFormat/"+data._id);
        } else{
          alert("Please select a Numerical Format");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addNumericalFormat")
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
              data:SearchQuery(module:"numericalFormat", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on NumericalFormat{
                              _id  
                              valueSeparator
                      				currencyFormat
                              currencySymbol
                              numberOfDigitsAfterDecimal
                              measurementSystem
                          }
                      }
              }
              }
              `
});

export {mlNumericalFormatTableConfig};
