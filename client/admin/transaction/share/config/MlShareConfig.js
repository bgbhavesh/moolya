import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import MlProcessSetupDetailsComponent from '../component/MlShareDetailsComponent'
import MlCustomFilter from '../../../../commons/customFilters/customFilter';
import {client} from '../../../core/apolloConnection';

const mlProcessSetupRequestsTableConfig=new MlViewer.View({
  name:"ProcessSetupTable",
  module:"processSetup",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["dateTime","profileId","name", "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  searchFields:["dateTime","profileId" ,"name" , "clusterName", "chapterName", "subChapterName", "communityId", "status"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  filter:false,
  filterComponent: <MlCustomFilter module="share" moduleName="share" client={client}/>,
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true,selectRow:true},
    {dataField: "_id", title: "Created Date",dataSort:true,selectRow:true},
    {dataField: "user.profileId", title: "UserId",dataSort:true,selectRow:true},
    {dataField: "user.userId", title: "Name",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Transaction Id",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Cluster",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Chapter",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Sub Chapter",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Community",dataSort:true,selectRow:true},
    {dataField: "_id", title: "Payment",dataSort:true,selectRow:true},
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
                      ...on Share{
                          _id   
                          user{
                            userId
                            profileId
                          }
                          owner{
                            userId
                            profileId
                          }
                          file{
                            url
                            fileName
                            fileType
                          }
                          sharedEndDate
                          sharedStartDate
                          isSignedUrl
                          isDownloadable
                          createdBy
                          createdAt
                          updatedAt
                          updatedBy
                          isActive
                        }
                     }        
                   }
             }`
});

export {mlProcessSetupRequestsTableConfig};

// $context:ContextParams
// context:$context,
