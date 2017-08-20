/**
 * Created by vishwadeep on 19/8/17.
 */
import {MlAppViewer} from "../../../../commons/core/MlAppViewer";
import MlAppServiceProviderListView from "../components/MlAppInstitutionsListView";
import React from "react";
import gql from "graphql-tag";

export const mlAppServiceProviderConfig = new MlAppViewer({
  name: "Service Provider List",
  // viewType:MlViewerTypes.LIST,
  extraFields: [],
  fields: ["firstName", "lastName", "category", "investmentBudget"],
  searchFields: ["firstName", "lastName", "category", "investmentBudget"],
  throttleRefresh: true,
  pagination: true,
  moduleName: "serviceProviderPortfolioDetails",
  sort: true,
  perPageLimit: 20,
  viewComponent: <MlAppServiceProviderListView />,
  showActionComponent: true,
  graphQlQuery: gql`
              query ($module: String!, $queryProperty: appGenericSearchQueryProperty) {
                data: AppGenericSearch(module: $module, queryProperty: $queryProperty) {
                  count
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
