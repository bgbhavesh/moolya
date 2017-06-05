import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlLookingForTableConfig=new MlViewer.View({
  name:"lookingForTable",
  module:"lookingFor",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["lookingForName","lookingForDisplayName","communityName","about","isActive"],
  searchFields:["lookingForName","lookingForDisplayName","communityName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "lookingForName", title: "Looking For Name",dataSort:true},
    {dataField: "lookingForDisplayName", title: "Display Name",dataSort:true},
    {dataField: "communityName", title: "Community",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editLookingFor/"+data.id)
        }
        else{
          toastr.error("Please select a Looking For to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){
          toastr.error("Please uncheck the record")
          // FlowRouter.go("/admin/settings/lookingForList")
        }else {
          FlowRouter.go("/admin/settings/addLookingFor")
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
              data:SearchQuery(module:"lookingFor",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on LookingFor{
                              lookingForName
                              lookingForDisplayName
                              communityName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlLookingForTableConfig};
