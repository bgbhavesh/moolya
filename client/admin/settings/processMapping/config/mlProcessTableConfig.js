import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'
function stateFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.states?data.data.states:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function chapterFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.chapters?data.data.chapters:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function clusterFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.clusters?data.data.clusters:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function professionFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.clusters?data.data.professions:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function  communityFormatter(data) {
  let processmapping = [];
  processmapping=data&&data.data&&data.data.clusters?data.data.communities:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }
}

function dateFormatter (data){
  let createdDateTime=data&&data.data&&data.data.date;
  return <div>{moment(createdDateTime).format('MM/DD/YYYY HH:mm:ss')}</div>;
}
const mlProcessTableConfig=new MlViewer.View({
  name:"roleTypeTable",
  module:"roles",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["processId","isActive","process"],
  searchFields:["processId","process","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "processId", title: "Id",dataSort:true},
    {dataField: "processName", title: "Process",dataSort:true},
     {dataField: "communities", title: "Community",dataSort:true,customComponent:communityFormatter},
    {dataField: "industries", title:"Industry",dataSort:true},
    {dataField: "professions", title:"Profession",dataSort:true,customComponent:professionFormatter},
    {dataField: "clusters", title: "Cluster",dataSort:true,customComponent:clusterFormatter},
    {dataField: "states", title: "State",dataSort:true,customComponent:stateFormatter},
    {dataField:"chapters", title:"Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField: "date", title: "Created Date",dataSort:true,customComponent:dateFormatter}

  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.id){
          FlowRouter.go("/admin/settings/editProcess/"+data.id);
        } else{
          alert("Please select a Process Type");
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
    // {
    //   showAction: true,
    //   actionName: 'logout',
    //   handler: (data)=>{console.log(data);}
    // }
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
                              processName,
                              isActive,
                              communities,
                              industries,
                              professions,
                              clusters,
                              states,
                              chapters,
                              date
                            }
                        }
                }
               }
              `
});

export {mlProcessTableConfig};
