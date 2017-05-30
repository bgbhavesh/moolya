import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlTemplateTypeTableConfig=new MlViewer.View({
  name:"templateTypeTable",
  module:"MASTERSETTINGS",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["accountName","accountDisplayName","isActive"],
  searchFields:["accountName","accountDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "accountName", title: "Account Type",dataSort:true},
    {dataField: "accountDisplayName", title: "Display Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editAccountType/"+data.id)
        }
        else{
          toastr.error("Please select a Account Type")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){
        FlowRouter.go("/admin/settings/accountTypeList")
      }else{
        FlowRouter.go("/admin/settings/addAccountType")

      }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  forceFetch: true,
  sizePerPage:5,
  graphQlQuery:gql`
                query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                data:SearchQuery(module:"MASTERSETTINGS",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Account{
                              accountName
                              accountDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlTemplateTypeTableConfig};
