import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

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
          alert("Please select a Role Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/createRole")
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
                data:SearchQuery(module:"roles", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                      totalRecords
                      data{
                       ...on Roles{
                              id:_id,
                              roleName, 
                              displayName, 
                              roleType,
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
