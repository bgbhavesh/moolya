import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlUserTypeTableConfig=new MlViewer.View({
  name:"userTypeTable",
  module:"userType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["userTypeName","displayName",'communityName',"isActive"],
  searchFields:["userTypeName","displayName",'communityName',"isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "userTypeName", title: "User Category Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "communityName", title: "Community Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editUserType/"+data.id);
        } else{
          toastr.error("Please select a User Category");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
          if(data&&data.id){FlowRouter.go("/admin/settings/userTypeList")}
          else {
            FlowRouter.go("/admin/settings/addUserType")
          }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  graphQlQuery:gql`
              query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
              data:SearchQuery(module:"userType", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on UserTypes{
                             userTypeName
                              displayName
                              userTypeDesc
                              communityName
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlUserTypeTableConfig};
