import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

const mlFundingTypeTableConfig=new MlViewer.View({
  name:"fundingType",
  module:"fundingType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["fundingTypeName","displayName","icon","about","isActive"],
  searchFields:["fundingTypeName","displayName","icon","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "fundingTypeName", title: "Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    // {dataField: "icon", title: "Icon",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
    {dataField: "isActive", title: "Status",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editFundingType/"+data.id)
        }
        else{
          toastr.error("Please select a type to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/fundingTypeList")
        }else {
          FlowRouter.go("/admin/settings/addFundingType")
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
              query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"FundingType",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on FundingType{
                              fundingTypeName
                              displayName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlFundingTypeTableConfig};
