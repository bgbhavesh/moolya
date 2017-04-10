import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

//@for displaying  list of clusters under dep in departments list
function departmentNameFormatter (data){

  let departments=data&&data.data&&data.data.departmentName?data.data.departmentName:"";
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }
}

//@for displaying  list of clusters under dep in departments list
function clustersFormatter (data){

  let departments=data&&data.data&&data.data.clustersList?data.data.clustersList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }
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

const mlSubDepartmentTableConfig=new MlViewer.View({
  name:"subDepartmentTable",
  module:"subDepartment",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["subDepartmentName","displayName","departmentAliasName","clustersList","subChapterList","isActive"],
  searchFields:["subDepartmentName","displayName","departmentAliasName","clustersList","subChapterList","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "subDepartmentName", title: "Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "departmentAliasName", title: "Department Name",dataSort:true},
    {dataField: "clustersList", title: "Cluster",dataSort:true,customComponent:clustersFormatter},
    {dataField: "clustersList", title: "Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField: "subChapterList", title: "Sub-Chapter",dataSort:true,customComponent:subChapterFormatter},
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
          FlowRouter.go("/admin/settings/editSubDepartment/"+data.id);
        } else{
          toastr.error("Please select a Sub Department");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addSubDepartment")
      }
    },
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
  ],
  graphQlQuery:gql`
              query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"subDepartment",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on SubDepartment{
                              clustersList
                              chaptersList
                              subChapterList
                              departmentAliasName
                              subDepartmentName
                              displayName
                              aboutSubDepartment
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlSubDepartmentTableConfig};
