import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlCompanyTypeTableConfig=new MlViewer.View({
  name:"companyTypeTable",
  module:"CompanyType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["companyName","companyDisplayName","isActive"],
  searchFields:["companyName","companyDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "companyName", title: "Company Type",dataSort:true},
    {dataField: "companyDisplayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editCompanyType/"+data.id)
        }
        else{
          alert("Please select a company type ")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addCompanyType")
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
              data:SearchQuery(module:"CompanyType",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                     ...on CompanyType{
                              companyName
                              companyDisplayName
                              isActive
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mlCompanyTypeTableConfig};
