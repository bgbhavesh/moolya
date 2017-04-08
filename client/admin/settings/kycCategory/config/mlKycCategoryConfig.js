import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlKycCategoryTableConfig=new MlViewer.View({
  name:"kycCategoryTable",
  module:"kycCategory",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["docCategoryName","docCategoryDisplayName","isActive"],
  searchFields:["docCategoryName","docCategoryDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "docCategoryName", title: "Name",dataSort:true},
    {dataField: "docCategoryDisplayName", title: "Display Name",dataSort:true},
    {dataField: "isActive", title: "Active",dataSort:true},
    //{dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editKycCategory/"+data.id);
        } else{
          alert("Please select a KYC Category");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addKycCategory")
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
              data:SearchQuery(module:"kycCategory", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on KycCategories{
                              docCategoryName
                              docCategoryDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlKycCategoryTableConfig};
