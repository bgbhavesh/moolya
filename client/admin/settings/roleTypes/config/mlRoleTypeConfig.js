import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'

//@for displaying  list of departments under assign roles
function departmentsFormatter (data){

  let departments=data&&data.data&&data.data.departmentsList?data.data.departmentsList: [];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }

}

//@for displaying  list of sub-departments under assign roles
function subdepartmentsFormatter (data){
  let departments=data&&data.data&&data.data.subdepartmentsList?data.data.subdepartmentsList: [];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }

}

//@for displaying  list of clusters under assign roles
function clustersFormatter (data){

  let departments=data&&data.data&&data.data.clustersList?data.data.clustersList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }
}

//@for displaying chapters under assign roles
function chapterFormatter(data){
  let departments = [];
  departments=data&&data.data&&data.data.chaptersList?data.data.chaptersList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }
}

//@for displaying subchapters under assign roles
function subChapterFormatter(data){
  let departments=data&&data.data&&data.data.subChapterList?data.data.subChapterList:[];
  if(departments.length>0){
    return <div>{departments.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function dateFormatter(data){
  let createdDateTime=data&&data.data&&data.data.createdDateTime;
  if(createdDateTime){
    return <div>{moment(createdDateTime).format('MM-DD-YYYY, HH:MM')}</div>;
  } else {
    return <div>System Generated</div>;
  }
}
function createdByFormatter(data){
  let createdBy=data&&data.data&&data.data.createdBy;
  if(createdBy){
    return <div>{createdBy}</div>;
  } else {
    return <div>System Generated</div>;
  }
}

const mlRoleTypeTableConfig=new MlViewer.View({
  name:"roleTypeTable",
  module:"roles",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["roleName","displayName","roleType","userType","about"],
  searchFields:["roleTypeName","roleTypeDisplayName","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "roleName", title: "Role Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "roleType", title: "Role Type",dataSort:true},
    {dataField: "departmentsList", title: "Departments",dataSort:true,customComponent:departmentsFormatter},
    {dataField: "subdepartmentsList", title: "SubDepartments",dataSort:true,customComponent:subdepartmentsFormatter},
    {dataField: "clustersList", title: "Cluster",dataSort:true,customComponent:clustersFormatter},
    {dataField: "createdDateTime", title: "Created Date and Time",dataSort:true,customComponent:dateFormatter},
    {dataField: "createdBy", title: "Created By",dataSort:true,customComponent:createdByFormatter},
    {dataField: "clustersList", title: "Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField: "subChapterList", title: "Sub-Chapter",dataSort:true,customComponent:subChapterFormatter},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editRole/"+data.id);
        } else{
          toastr.error("Please select a Role Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){FlowRouter.go("/admin/settings/rolesList")}
        else {
          FlowRouter.go("/admin/settings/createRole")
        }
      }
    }
  ],
  graphQlQuery:gql`
                query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
                data:SearchQuery(module:"roles", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                      totalRecords
                      data{
                       ...on Roles{
                              id:_id,
                              roleName, 
                              displayName, 
                              roleType,
                              createdDateTime,
                              createdBy,
                              departmentsList,
                              subdepartmentsList,
                              clustersList,
                              chaptersList,
                              subChapterList,
                              userType,
                              about 
                            }
                        }
                }
               }
              `
});

export {mlRoleTypeTableConfig};
