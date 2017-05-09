import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlAppFunderListView from '../components/MlAppFunderListView'
import React from 'react';
import gql from 'graphql-tag'

export const mlAppFunderConfig=new MlViewer.View({
  name:"FundersList",
  viewType:MlViewerTypes.LIST,
  extraFields:[],
  fields:["firstName","lastName","category","investmentBudget"],
  searchFields:["firstName","lastName","category","investmentBudget"],
  throttleRefresh:true,
  pagination:true,
  moduleName:"FunderPortfolio",
  sort:true,
  viewComponent:<MlAppFunderListView />,
  showActionComponent:true,
  graphQlQuery:gql`
              query{
              data:SearchQuery(module:"FunderPortfolio"){
                    totalRecords
                    data{
                     ...on FunderPortfolio{
                              portfolioDetailsId
                              funderAbout{
                                  firstName
                              }
                           }
                      }
              }
              }
              `
});
