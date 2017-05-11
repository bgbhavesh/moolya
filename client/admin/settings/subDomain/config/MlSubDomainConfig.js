import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

const mlSubDomainTableConfig=new MlViewer.View({
  name:"SubDomainTable",
  module:"SubDomain",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["name","displayName","industryId","about","isActive"],
  searchFields:["name","displayName","industryId","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "name", title: "Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "industryId", title: "Industry",dataSort:true},
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
          FlowRouter.go("/admin/settings/editSubDomain/"+data.id)
        }
        else{
          toastr.error("Please select a Sub Domain to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/SubDomainList")
        }else {
          FlowRouter.go("/admin/settings/addSubDomain")
        }
      }
    }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
                query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                data:SearchQuery(module:"SubDomain",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                      totalRecords
                      data{
                       ...on SubDomain{ 
                                name
                                displayName
                                industryId
                                about
                                isActive
                                id:_id
                                
                            }
                        }
                }
                }
              `
});

export {mlSubDomainTableConfig};
