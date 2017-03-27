import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mltemplatesConfig=new MlViewer.View({
  name:"templatesTable",
  module:"templates",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["processName","subProcessName","createdBy","createdDate"],
  searchFields:["processName","subProcessName","createdBy","createdDate"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "createdDate", title: "created Date",dataSort:true},
    {dataField: "processName", title: "Process",dataSort:true},
    {dataField: "subProcessName", title: "Sub Process",dataSort:true},
    {dataField: "createdBy", title: "Created By",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/stepDetails/"+data.id)
        }
        else{
          alert("Please select a Template Type")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addTemplateType")
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
              data:SearchQuery(module:"templates",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on SubProcess{
                              processName
                              createdDate
                              createdBy
                              subProcessName
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mltemplatesConfig};
