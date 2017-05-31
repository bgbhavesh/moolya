import {MlViewer, MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from "react";
import gql from "graphql-tag";
import MlCustomFilter from "../../../../commons/customFilters/customFilter";
import moment from "moment";
import hierarchyValidations from "../../../../commons/containers/hierarchy/mlHierarchyValidations"

function dateFormatter (data){
  let createdDateTime=data&&data.data&&data.data.registrationDate?data.data.registrationDate:null;
  return <div>{createdDateTime&&moment(createdDateTime).format('MM-DD-YYYY hh:mm:ss')}</div>;
}

const mlUserTypeTableConfig=new MlViewer.View({
  name:"registrationInfoTable",
  module:"registrationInfo",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["registrationInfo.clusterName","registrationInfo.chapterName","registrationInfo.subChapterName","status","registrationInfo.firstName","registrationInfo.lastName"],fields:["registrationInfo.firstName","registrationInfo.lastName"],
  searchFields:["registrationInfo.clusterName","registrationInfo.chapterName","registrationInfo.subChapterName","status","registrationInfo.firstName","registrationInfo.lastName"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  filter:true,
  filterComponent: <MlCustomFilter module="registration" moduleName="registration" />,
  fieldsMap: {
    'registrationDate': 'registrationInfo.registrationDate',
    'firstName': 'registrationInfo.firstName',
    'contactNumber': 'registrationInfo.contactNumber',
    'communityName': 'registrationInfo.communityName',
    'clusterName': 'registrationInfo.clusterName',
    'chapterName': 'registrationInfo.chapterName',
    'accountType': 'registrationInfo.accountType',
    'assignedUser': 'registrationInfo.assignedUser',
    'subChapterName': 'registrationInfo.subChapterName'
  },
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "registrationDate", title: "Date",dataSort:true,customComponent:dateFormatter},
    {dataField: "firstName", title: "Name",dataSort:true},
    {dataField: "contactNumber", title: "ContactNo",dataSort:true},
    {dataField: "communityName", title: "Community",dataSort:true},
    {dataField: "clusterName", title: "Cluster",dataSort:true},
    {dataField: "chapterName", title: "Chapter",dataSort:true},
    {dataField: "subChapterName", title: "SubChapter",dataSort:true},
    {dataField: "accountType", title: "Subscription Type",dataSort:true},
    {dataField: "source", title: "Source",dataSort:true},
    {dataField: "registrationStatus", title: "Status",dataSort:true},
    {dataField: "assignedUser", title: "Assignto",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        //if(data && data.id && (Meteor.userId()==data.userName || Meteor.user().profile.email=="platformadmin@moolya.com")){
        if(data && data.id && hierarchyValidations.validateEditAction(data.userName)){
          FlowRouter.go("/admin/transactions/editRequests/"+data.id);
        }else if(data && data.id){
          toastr.error("User does not have access to edit record");
        } else{
          toastr.error("Please Select a record");
        }
      }
    },
    {
      showAction: true,
      actionName: 'assign',
      handler: (data) => {
        console.log(data);
        if (data && data.id) {
          const internalConfig = data;
        } else {
          toastr.error("Please Select a record");
        }
      }
    }
  ],
  graphQlQuery:
  gql`query ContextSpecSearch($offset: Int, $limit: Int,$searchSpec:SearchSpec,$fieldsData:[GenericFilter],$sortData: [SortFilter]){
                    data:ContextSpecSearch(module:"registrationInfo",offset:$offset,limit:$limit,searchSpec:$searchSpec,fieldsData:$fieldsData,sortData:$sortData){
                    totalRecords
                    data{
                      ...on RegistrationInfo{
                              registrationId
                              firstName
                              lastName
                              id:_id
                              contactNumber
                              communityName
                      			  clusterName
                      			  clusterId
                      				chapterName
                              subChapterName
                              accountType
                      				source
                              assignedUser
              								registrationStatus
                      				registrationDate
                              transactionId                              
                              userName
                          }
                      }
              }
              }`
});

export {mlUserTypeTableConfig};
