import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
// import ActiveFormatter from '../actions/ActiveFormatter';
// import FlagFormatter from '../actions/FlagFormatter';

const mlContactTypeTableConfig=new MlViewer.View({
  name:"ContactTypeTable",
  module:"contactType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["contactName","contactDisplayName","contactUploadIcon","isActive"],
  searchFields:["contactName","contactDisplayName","contactUploadIcon","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "contactName", title: "Name",dataSort:true},
    {dataField: "contactDisplayName", title: "Display Name",dataSort:true},
    {dataField: "aboutContact", title: "About",dataSort:true}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data._id){
          FlowRouter.go("/admin/settings/editContactType/"+data._id);
        } else{
          alert("Please select a Contact Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addContactType")
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  sizePerPage:5,
  graphQlQuery:gql`
              query SearchQuery( $offset: Int, $limit: Int) {
              data:SearchQuery(module:"contactType",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                      ...on ContactType{
                             _id
                            contactName
                            aboutContact
                            contactDisplayName
                          }
                      }
                }
              }
              `
});

export {mlContactTypeTableConfig};
