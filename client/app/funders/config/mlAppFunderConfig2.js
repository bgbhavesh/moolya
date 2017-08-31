
// import {MlViewer,MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import {MlAppViewer} from '../../../commons/core/MlAppViewer';
import MlAppFunderListView from '../components/MlAppFunderListView'
import React from 'react';
import gql from 'graphql-tag'

export const mlAppFunderConfig2=new MlAppViewer({
  name:"FundersList",
  moduleName:"FunderPortfolio",
  perPageLimit: 20,
  // header: {
  //   search: true,
  //   searchFields:["firstName","lastName","category","investmentBudget"],
  //   sort:true,
  //   sortBy: '_id'
  // },
  viewComponent:<MlAppFunderListView />,
  graphQlQuery:gql`
              query ($module: String!, $queryProperty: appGenericSearchQueryProperty) {
                data: AppGenericSearch(module: $module, queryProperty: $queryProperty) {
                  count
                  data {
                    ...on FunderPortfolio {
                      portfolioDetailsId
                      funderAbout {
                        firstName
                      }
                      chapterName
                      accountType
                      communityType
                      firstName
                      lastName
                    }
                  }
                }
              }
            `
});
