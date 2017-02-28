import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mlCitizenshipTableConfig=new MlViewer.View({
  name:"citizenshipTable",
  module:"citizenship",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["citizenshipTypeName","citizenshipTypeDisplayName","about","isActive"],
  searchFields:["citizenshipTypeName","citizenshipTypeDisplayName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "citizenshipTypeName", title: "Citizenship Name",dataSort:true},
    {dataField: "citizenshipTypeDisplayName", title: "Display Name",dataSort:true},
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
          FlowRouter.go("/admin/settings/editCitizenship/"+data.id)
        }
        else{
          alert("Please select a Citizenship to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addCitizenship")
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
              query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"citizenship",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Citizenship{
                              citizenshipTypeName
                              citizenshipTypeDisplayName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlCitizenshipTableConfig};
