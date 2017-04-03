import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveProcessFormatter from "../components/ActiveProcessDocFormatter"
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
function subChapterFormatte(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.subChapters?data.data.subChapters:[];
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
    {dataField: "processName", title: "Process",dataSort:true},
    {dataField: "industries", title:"Industry",dataSort:true},
    {dataField: "professions", title:"Profession",dataSort:true,customComponent:professionFormatter},
    {dataField: "clusters", title: "Cluster",dataSort:true,customComponent:clusterFormatter},
    {dataField: "states", title: "State",dataSort:true,customComponent:stateFormatter},
    {dataField:"chapters", title:"Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField:"subChapters", title:"Sub Chapter",dataSort:true,customComponent:subChapterFormatte},
    {dataField: "communities", title: "Community",dataSort:true,customComponent:communityFormatter},
    {dataField: "userTypes", title: "User Type",dataSort:true},
    {dataField: "identity", title: "Identity",dataSort:true},
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
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  graphQlQuery:gql`
                query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
                data:SearchQuery(module:"processdocument", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
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
                              subChapters,
                              userTypes,
                              identity
                              date
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
