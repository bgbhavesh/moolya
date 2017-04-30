import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'

const mlAssetsTableConfig=new MlViewer.View({
  name:"AssetsTable",
  module:"Assets",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["AssetName","AssetDisplayName","icon","about","isActive"],
  searchFields:["AssetName","AssetDisplayName","icon","about","isActive"],
  throttleRefresh:false,
  pagination:true,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "id",title:"Id",'isKey':true,isHidden:true},
    {dataField: "assetName", title: "Name",dataSort:true},
    {dataField: "displayName", title: "Display Name",dataSort:true},
    {dataField: "icon", title: "Icon",dataSort:true},
    {dataField: "about", title: "About",dataSort:true},
    {dataField: "isActive", title: "Status",dataSort:true},
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler:  (data)=>{
        if(data&&data.id){
          FlowRouter.go("/admin/settings/editAssets/"+data.id)
        }
        else{
          toastr.error("Please select an Asset to edit")
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{ if(data&&data.id){
        FlowRouter.go("/admin/settings/assetsList")
      }else {
        FlowRouter.go("/admin/settings/addAssets")
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
              query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"Assets",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Assets{
                              assetName
                              displayName
                              about
                              isActive
                              id:_id
                          }
                      }
              }
              }
              `
});

export {mlAssetsTableConfig};
