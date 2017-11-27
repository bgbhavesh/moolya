import { MlViewer, MlViewerTypes } from '../../../../../lib/common/mlViewer/mlViewer';
import React from 'react';
import gql from 'graphql-tag'
import moment from 'moment'
function createdateFormatter(data) {
  const createdDate = data && data.data && data.data.createdDate;
  if (createdDate) {
    return <div>{moment(createdDate).format('MM-DD-YYYY HH:mm:ss')}</div>;
  }

  return <div></div>
}
function updatedateFormatter(data) {
  const updateDate = data && data.data && data.data.updatedDate;
  if (updateDate) {
    return <div>{moment(updateDate).format('MM-DD-YYYY HH:mm:ss')}</div>;
  }

  return <div></div>
}
const mlSpecificationTypeTableConfig = new MlViewer.View({
  name: 'specificationTypeTable',
  module: 'specification', // Module name for filter.
  viewType: MlViewerTypes.TABLE,
  extraFields: [],
  fields: ['specificationName', 'specificationDisplayName', 'about', 'isActive'],
  searchFields: ['specificationName', 'specificationDisplayName', 'about', 'isActive'],
  throttleRefresh: false,
  pagination: true, // To display pagination
  selectRow: true, // Enable checkbox/radio button to select the row.
  columns: [
    {
      dataField: 'id', title: 'Id', isKey: true, isHidden: true
    },
    { dataField: 'specificationName', title: 'Specification', dataSort: true },
    { dataField: 'specificationDisplayName', title: 'Display Name', dataSort: true },
    { dataField: 'about', title: 'About', dataSort: true },
    { dataField: 'createdBy', title: 'Created By', dataSort: true },
    {
      dataField: 'createdDate', title: 'CreatedDate And Time', dataSort: true, customComponent: createdateFormatter
    },
    { dataField: 'updatedBy', title: 'Updated By', dataSort: true },
    {
      dataField: 'updatedDate', title: 'UpdatedDate And Time', dataSort: true, customComponent: updatedateFormatter
    },
    { dataField: 'isActive', title: 'Active', dataSort: true }
  ],
  tableHeaderClass: 'react_table_head',
  showActionComponent: true,
  actionConfiguration: [
    {
      actionName: 'edit',
      showAction: true,
      handler: (data) => {
        if (data && data.id) {
          FlowRouter.go(`/admin/settings/documentProcess/editSpecification/${data.id}`)
        } else {
          toastr.error('Please select a Specification to Edit');
        }
      }

    },
    {
      showAction: true,
      actionName: 'add',
      handler: (data) => {
        if (data && data.id) {
          toastr.error('Please uncheck the record')
          // FlowRouter.go("/admin/settings/specificationList")
        } else {
          FlowRouter.go('/admin/settings/documentProcess/addSpecification')
        }
      }
    }
  ],
  sizePerPage: 5,
  graphQlQuery: gql`
                query SearchQuery( $offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
              data:SearchQuery(module:"specification",offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                    totalRecords
                    data{
                     ...on Specification{
                              specificationName
                              specificationDisplayName
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

export { mlSpecificationTypeTableConfig };
