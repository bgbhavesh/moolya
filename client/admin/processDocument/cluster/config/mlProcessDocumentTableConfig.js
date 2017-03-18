import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveProcessFormatter from "../components/ActiveProcessDocFormatter"
const mlProcessTableConfig=new MlViewer.View({
  name:"roleTypeTable",
  module:"roles",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["processId","displayNprocessame","isActive"],
  searchFields:["processId","process","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "processId", title: "processId",dataSort:true},
    {dataField: "process", title: "process",dataSort:true},
    {dataField: "isActive", title: "Status",dataSort:true,customComponent:ActiveProcessFormatter}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          console.log(data)
          FlowRouter.go("/admin/documents/"+data.id+"/"+data.documents[0].category+"/"+data.documents[0].type);

        } else{
          alert("Please select a Process Document Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addProcess")
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  graphQlQuery:gql`
                query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
                data:SearchQuery(module:"process", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                      totalRecords
                      data{
                       ...on ProcessType{
                             id:_id,
                              processId, 
                              process,
                              isActive,
                              documents {
                                  type
                                  category
                                  isActive
                                }
                            }
                        }
                }
               }
              `
});

export {mlProcessTableConfig};
