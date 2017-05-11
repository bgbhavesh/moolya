import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import ActiveProcessFormatter from "../components/ActiveProcessDocFormatter"
import {getAdminUserContext} from '../../../../commons/getAdminUserContext'
function stateFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.stateNames?data.data.stateNames:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function chapterFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.chapterNames?data.data.chapterNames:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function subChapterFormatte(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.subChapterNames?data.data.subChapterNames:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}

function clusterFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.clusterNames?data.data.clusterNames:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function professionFormatter(data){
  let processmapping = [];
  processmapping=data&&data.data&&data.data.professionNames?data.data.professionNames:[];
  if(processmapping.length>0){
    return <div>{processmapping.join()}</div>;
  }else{
    return <div>All</div>;
  }

}
function  communityFormatter(data) {
  let processmapping = [];
  processmapping=data&&data.data&&data.data.communityNames?data.data.communityNames:[];
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
  buildQueryOptions:(config)=>
  {
    if(!config.params){
      let userDefaultObj = getAdminUserContext()
      console.log(userDefaultObj);
      if(userDefaultObj.hierarchyCode === "CLUSTER"){
      return {context:{clusterId:userDefaultObj.clusterId?userDefaultObj.clusterId:null}}
    }
    else
      return {context:{clusterId:config.params&&config.params.clusterId?config.params.clusterId:null}}
    if(userDefaultObj.hierarchyCode === "CHAPTER"){
      return {context:{chapterId:userDefaultObj.chapterId?userDefaultObj.chapterId:null}}
    }
    else
      return {context:{chapterId:config.params&&config.params.chapterId?config.params.chapterId:null}}
    if(userDefaultObj.hierarchyCode === "COMMUNITY"){
      return {context:{communityId:userDefaultObj.communityId?userDefaultObj.communityId:null}}
    }
    else
      return {context:{communityId:config.params&&config.params.communityId?config.params.communityId:null}}
      if(userDefaultObj.hierarchyCode === "SUBCHAPTER"){
        return {context:{subChapterId:userDefaultObj.subChapterId?userDefaultObj.subChapterId:null}}
      }
      else
        return {context:{subChapterId:config.params&&config.params.subChapterId?config.params.subChapterId:null}}}
  },
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "processName", title: "Process",dataSort:true},
    {dataField: "industrieNames", title:"Industry",dataSort:true},
    {dataField: "professionNames", title:"Profession",dataSort:true,customComponent:professionFormatter},
    {dataField: "clusterNames", title: "Cluster",dataSort:true,customComponent:clusterFormatter},
    {dataField: "stateNames", title: "State",dataSort:true,customComponent:stateFormatter},
    {dataField:"chapterNames", title:"Chapter",dataSort:true,customComponent:chapterFormatter},
    {dataField:"subChapterNames", title:"Sub Chapter",dataSort:true,customComponent:subChapterFormatte},
    {dataField: "communityNames", title: "Community",dataSort:true,customComponent:communityFormatter},
    {dataField: "userTypeNames", title: "User Type",dataSort:true},
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
          let documents=data.documents
          for(let i=0;i<documents.length;i++){
            if(documents[i].isActive){

              // FlowRouter.go("/admin/documents/"+data.id+"/"+documents[i].type);
              FlowRouter.go("/admin/documents/"+data.id+"/"+documents[i].category+"/"+documents[i].type);
              i=documents.length;
            }
          }


        } else{
          toastr.error("Please select a Process Document Type");
        }
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
                        			communityNames
                              industries,
                              industrieNames,
                              professions
                      				professionNames,
                              clusters,
                              clusterNames
                              states,
                              stateNames
                              chapters,
                        			chapterNames
                              subChapters,
                        			subChapterNames
                              userTypes,
                        			userTypeNames
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
