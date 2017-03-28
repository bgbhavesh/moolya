import {MlViewer,MlViewerTypes} from "/lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
const mltemplatesassignmetConfig=new MlViewer.View({
  name:"templatesTable",
  module:"templateAssignment",//Module name for filter.
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
    {dataField: "templateProcessName", title: "Process",dataSort:true},
    {dataField: "templateSubProcessName", title: "Sub Process",dataSort:true},
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
          FlowRouter.go("/admin/templates/assignTemplate/"+data.id)
        }
        else{
          alert("Please select a Template Type")
        }
      }
    }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
 query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"templateAssignment",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on TemplateAssignment{
                              templateProcessName
                              templateSubProcessName
                              createdBy
                              createdDate
                              id:_id
                          }
                      }
              }
              }
            
              `
});

export {mltemplatesassignmetConfig};
