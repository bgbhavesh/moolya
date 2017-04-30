import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlRequestTypeTableConfig=new MlViewer.View({
  name:"requestTypeTable",
  module:"request",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["requestName","displayName","isActive"],
  searchFields:["requestName","displayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "requestName", title: "Request Type",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
    //{dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editRequestType/"+data.id)
        }
        else{
          toastr.error("Please select a request")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){FlowRouter.go("/admin/settings/requestTypeList")}
        else {
          FlowRouter.go("/admin/settings/addRequestType")
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
              data:SearchQuery(module:"request",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Requests{
                              requestName
                              displayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlRequestTypeTableConfig};
