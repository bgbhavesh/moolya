import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlProcessSetupDetailsComponent from '../component/MlShareDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';
import {client} from '../../../core/apolloConnection';

const mlProcessSetupRequestsTableConfig=new MlViewer.View({
  name:"ProcessSetupTable",
  module:"share",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["dateTime","profileId","name", "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  searchFields:["dateTime","profileId" ,"name" , "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:false,
  filterComponent: <MlCustomFilter module="share" moduleName="share" client={client}/>,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,selectRow:true},
    {dataField: "createdBy", title: "Created By",dataSort:true,selectRow:true},
    {dataField: "email", title: "Email",dataSort:true,selectRow:true},
    {dataField: "transactionType", title: "Transaction Type",dataSort:true,selectRow:true},
    {dataField: "cluster", title: "Cluster",dataSort:true,selectRow:true},
    {dataField: "chapter", title: "Chapter",dataSort:true,selectRow:true},
    {dataField: "subChapter", title: "Sub Chapter",dataSort:true,selectRow:true},
    {dataField: "community", title: "Community",dataSort:true,selectRow:true},
    {dataField: "createdAt", title: "Created Date",dataSort:true,selectRow:true},
    // {dataField: "profileId", title: "UserId",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Status",dataSort:true,selectRow:true}
  ],
  tableHeaderClass:'react_table_head',
  isExpandableRow:(row)=>{return true;},
  expandComponent:MlProcessSetupDetailsComponent,
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'add',
      showAction: true,
      handler: (data)=>{

      }
    }
  ],
  graphQlQuery:
    gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"share",offset:$offset, limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on AdminShareList{
                          _id
                          createdAt
                          createdBy
                          userId
                          profileId
                          email
                          mobileNumber
                          cluster
                          chapter
                          subChapter
                          community
                          transactionType
                        }
                     }        
                   }
             }`
});

export {mlProcessSetupRequestsTableConfig};

// $context:ContextParams
// context:$context,
