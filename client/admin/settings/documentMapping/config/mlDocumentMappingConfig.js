import {MlViewer,MlViewerTypes} from "../../../../../lib/common/mlViewer/mlViewer";
import React from 'react';
import gql from 'graphql-tag'
function categoriesformatter (data){
    let categories=data&&data.data&&data.data.kycCategory?data.data.kycCategory:[];
    let ids =[];
  categories.map(function (doc) {
      ids.push(doc.id)
    })
    return <div>{ids}</div>;
}
function allowableFormatformatter (data){

  let allowableFormat=data&&data.data&&data.data.allowableFormat?data.data.allowableFormat:[];
  let ids =[];
  allowableFormat.map(function (doc) {
    ids.push(doc.id)
  })
  return <div>{ids}</div>;

}
function clustersformatter (data){

  let clusters=data&&data.data&&data.data.clusters?data.data.clusters:[];
  let ids =[];
  clusters.map(function (doc) {
    ids.push(doc.id)
  })
  return <div>{ids}</div>;

}
const mlDocumentMappingTableConfig=new MlViewer.View({
  name:"documentMappingTable",
  module:"documentMapping",//Module name for filter.
  viewType:MlViewerTypes.TABLE,
  extraFields:[],
  fields:["documentName","roleTypeDisplayName","isActive"],
  searchFields:["documentName","roleTypeDisplayName","isActive"],
  throttleRefresh:false,
  pagination:false,//To display pagination
  selectRow:true,  //Enable checkbox/radio button to select the row.
  columns:[
    {dataField: "documentId",title:"Id",'isKey':true,isHidden:true},
    {dataField: "documentName", title: "Name",dataSort:true},
    {dataField: "kycCategory", title: "Category",dataSort:true, customComponent:categoriesformatter},
    {dataField: "allowableFormat", title: "Allowable Format",dataSort:true, customComponent:allowableFormatformatter},
    {dataField: "allowableMaxSize", title: "Allowable Size",dataSort:true},
    {dataField: "clusters", title: "Jurisdiction",dataSort:true, customComponent:clustersformatter}
  ],
  tableHeaderClass:'react_table_head',
  showActionComponent:true,
  actionConfiguration:[
    {
      actionName: 'edit',
      showAction: true,
      handler: (data)=>{
        if(data && data.documentId){
          FlowRouter.go("/admin/settings/editDocumentMapping/"+data.documentId);
        } else{
          alert("Please select a Document");
        }
      }
    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data)=>{
        FlowRouter.go("/admin/settings/addDocumentMapping")
      }
    },
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=>{console.log(data);}
    }
  ],
  // graphQlQuery:gql`
  //            query {
  //                data: findDocuments{
  //                   documentId
  //                   documentName
  //                 allowableFormat{
  //                   id
  //                 }
  //                 clusters{
  //                   id
  //                 }
  //                 chapters{
  //                   id
  //                 }
  //                 subChapters{
  //                   id
  //                 }
  //                 kycCategory{
  //                   id
  //                 }
  //                 documentType{
  //                   id
  //                 }
  //                 isActive
  //               }
  //         }
  //             `
  graphQlQuery:gql`
             query SearchQuery($offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]){
              data:SearchQuery(module:"documentMapping", offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on DocumentOutput{
                              documentId
                              documentName
                      				kycCategory {
                      				  id
                      				}
                              allowableFormat{
                                id
                              }
                              allowableMaxSize
                              clusters{
                                id
                              }
                          }
                      }
              }
             }
              `
});

export {mlDocumentMappingTableConfig};
