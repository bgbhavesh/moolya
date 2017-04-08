import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

//@for displaying  list of clusters under dep in departments list
function departmentsFormatter (data){

  let departments=data&&data.data&&data.data.clustersList?data.data.clustersList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }

  //return <div>{departments.join()}</div>;
}

//@for displaying chapters under dep in departments list
function chapterFormatter(data){
  let departments = [];
  departments=data&&data.data&&data.data.chaptersList?data.data.chaptersList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }

}

//@for displaying subchapters under dep in departments list
function subChapterFormatter(data){
  let departments=data&&data.data&&data.data.subChapterList?data.data.subChapterList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }
}

const mlDepartmentTableConfig=new MlViewer.View({
  name:"departmentTable",
  module:"department",//Module name for filter.
  action:"READ",
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["departmentName","displayName","depatmentAvailable","isActive"],
  searchFields:["departmentName","displayName","depatmentAvailable","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "departmentName", title: "Department Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "clustersList", title: "Cluster",dataSort:true,customComponent:departmentsFormatter},
    {dataField: "chaptersList", title: "Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField: "subChapterList", title: "Sub-Chapter",dataSort:true,customComponent:subChapterFormatter},
    {dataField: "isActive", title: "Active",dataSort:true}

  ], //@departmentsFormatter,@chapterFormatter,@subChapterFormatter custom functions for looping an array and displaying data in table
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editDepartment/"+data.id)
        }
        else{
          toastr.error("Please select a department");
        }
        }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDepartment")
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
              data:SearchQuery(module:"department",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Department{
                              clustersList
                              chaptersList
                              subChapterList
                              departmentName
                              displayName
                               depatmentAvailable {
                                cluster 
                                chapter
                                subChapter
                                email
                                isActive
                              }
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

const mlDepartmentModuleConfig={
  moduleName:"department",
  actions:{"READ":"read","ADD":"add","UPDATE":"update"}
};
export {mlDepartmentTableConfig,mlDepartmentModuleConfig};
