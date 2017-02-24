import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
// import ActiveFormatter from '../actions/ActiveFormatter';
// import FlagFormatter from '../actions/FlagFormatter';

const mlAddressTypeTableConfig=new MlViewer.View({
  name:"AddressTypeTable",
  module:"addressType",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["addressName","addressDisplayName","addressUploadIcon","isActive"],
  searchFields:["addressName","addressDisplayName","addressUploadIcon","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "_id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "addressName", title: "Name",dataSort:true},
    {dataField: "addressDisplayName", title: "Display Name",dataSort:true},
    {dataField: "aboutAddress", title: "About",dataSort:true},
    // {dataField: "addressUploadIcon", title: "Icon",dataSort:true,customComponent:FlagFormatter},
    // {dataField: "isActive", title: "Available in System",dataSort:true,customComponent:ActiveFormatter},
    //{dataField: "isActive", title: "Active",customComponent:"ActiveFormatter"}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data._id){
          FlowRouter.go("/admin/settings/editAddressType/"+data._id);
        } else{
          alert("Please select a Address Type");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addAddressType")
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
              data:SearchQuery(module:"addressType",offset: $offset, limit: $limit){
                    totalRecords
                    data{
                      ...on AddressType{
                             _id
                            addressName
                            aboutAddress
                            addressDisplayName
                          }
                      }
                }
              }
              `
});

export {mlAddressTypeTableConfig};
