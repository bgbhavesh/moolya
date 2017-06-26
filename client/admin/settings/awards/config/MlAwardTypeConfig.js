import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'
function createdateFormatter (data){
  let createdDate=data&&data.data&&data.data.createdDate;
  if(createdDate){
    return <div>{moment(createdDate).format('MM-DD-YYYY HH:mm:ss')}</div>;
  }
  else {
    return <div></div>
  }
}
function updatedateFormatter (data){
  let updateDate=data&&data.data&&data.data.updatedDate;
  if(updateDate){
    return <div>{moment(updateDate).format('MM-DD-YYYY HH:mm:ss')}</div>;
  }
  else {
    return <div></div>
  }
}
const mlAwardTypeTableConfig=new MlViewer.View({
  name:"awardTypeTable",
  module:"awards",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["awardName","awardDisplayName","about","isActive"],
  searchFields:["awardName","awardDisplayName","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "awardName", title: "Award",dataSort:true},
    {dataField: "awardDisplayName", title: "Display Name",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
    {dataField: "createdBy", title: "Created By",dataSort:true},
    {dataField: "createdDate", title: "CreatedDate And Time",dataSort:true,customComponent:createdateFormatter},
    {dataField: "updatedBy", title: "Updated By",dataSort:true},
    {dataField: "updatedDate", title: "UpdatedDate And Time",dataSort:true,customComponent:updatedateFormatter},
    {dataField: "isActive", title: "Active",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editAward/"+data.id)
        }
        else{
          toastr.error("Please select a Award to Edit");
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        if(data&&data.id){
          toastr.error("Please uncheck the record")
          // FlowRouter.go("/admin/settings/awardList")
        }else {
          FlowRouter.go("/admin/settings/addAward")
        }
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
                query SearchQuery( $offset: Int, $limit: Int,$fieldsData:[GenericFilter], $sortData:[SortFilter]) {
              data:SearchQuery(module:"awards",offset: $offset, limit: $limit,fieldsData:$fieldsData, sortData:$sortData){
                    totalRecords
                    data{
                     ...on Award{
                              awardName
                              awardDisplayName
                              about
                              isActive
                              id:_id
                              createdBy
                              createdDate  
                              updatedBy     
                              updatedDate 
                          }
                      }
              }
              }

              `
});

export {mlAwardTypeTableConfig};
