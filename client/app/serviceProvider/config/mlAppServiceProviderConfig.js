import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlAppServiceProviderListView from '../components/MlAppServiceProviderListView'
import React from 'react';
import gql from 'graphql-tag'

export const mlAppServiceProviderConfig = new MlViewer.View({
  name:"Service Provider List",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["firstName","lastName","category","investmentBudget"],
  searchFields:["firstName","lastName","category","investmentBudget"],
  throttleRefresh:true,
  pagination:true,
  moduleName:"serviceProviderPortfolioDetails",
  sort:true,
  viewComponent:<MlAppServiceProviderListView />,
  showActionComponent:true,
  graphQlQuery:gql`
              query SearchQuery($offset: Int, $limit: Int,$fieldsData:[GenericFilter], $sortData:[SortFilter]) {
              data:SearchQuery(module:"serviceProviderPortfolioDetails", offset: $offset, limit: $limit,fieldsData:$fieldsData, sortData:$sortData){
                    totalRecords
                    data{
                     ...on serviceProviderPortfolioDetails{
                              portfolioDetailsId
                              about{
                                  aboutTitle
                              }
                           }
                      }
              }
              }
              `
});
