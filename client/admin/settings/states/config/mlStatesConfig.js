import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveStateFormatter from "../actions/ActiveStateFormatter"

const mlStatesTableConfig=new MlViewer.View({
  name:"StatesTable",
  module:"states",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  action:"READ",
  fields:["name","countryCode","isActive"],
  searchFields:["name","countryCode","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "name", title: "Name",dataSort:true},
    {dataField: "countryCode", title: "Country",dataSort:true},
    {dataField: "isActive", title: "Available in System",dataSort:true, customComponent:ActiveStateFormatter},
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
          FlowRouter.go("/admin/settings/editState/"+data.id);
        } else{
          alert("Please select a State");
        }
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'add',
    //   handler: (data)=>{
    //     FlowRouter.go("/admin/settings/addSubDepartment")
    //   }
    // },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  sizePerPage:5,
//   graphQlQuery:gql`
//       query{
//   data:fetchStates{
//      totalRecords
//                     data{
//                      ...on States{
//                              name
//                             countryId
//                            countryCode
//                              isActive
//                               id:_id
//                           }
//                       }
//
//   }
// }
//   `
  graphQlQuery:gql`
              query SearchQuery( $offset: Int, $limit: Int) {
              data:SearchQuery(module:"states",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                      ...on States{
                              name
                              countryCode
                              countryId
                              isActive
                              id:_id
                          }
                      }
              }
              }
             `
});
const mlStateModuleConfig={
  moduleName:"states",
  actions:{"READ":"read","UPDATE":"update"}
};
export {mlStatesTableConfig,mlStateModuleConfig};
