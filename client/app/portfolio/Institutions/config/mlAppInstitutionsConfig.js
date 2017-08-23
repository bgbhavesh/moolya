/**
 * Created by vishwadeep on 19/8/17.
 */
import {MlAppViewer} from "../../../../commons/core/MlAppViewer";
import MlAppInstitutionListView from "../components/MlAppInstitutionsListView";
import React from "react";
import gql from "graphql-tag";

export const mlAppInstitutionConfig = new MlAppViewer({
  name: "Service Provider List",
  extraFields: [],
  fields: ["firstName", "lastName", "category", "investmentBudget"],
  searchFields: ["firstName", "lastName", "category", "investmentBudget"],
  throttleRefresh: true,
  pagination: true,
  moduleName: "institutionPortfolioDetails",
  sort: true,
  perPageLimit: 20,
  viewComponent: <MlAppInstitutionListView />,
  showActionComponent: true,
  graphQlQuery: gql`
              query ($module: String!, $queryProperty: appGenericSearchQueryProperty) {
                data: AppGenericSearch(module: $module, queryProperty: $queryProperty) {
                  count
                    data{
                      ...on InstitutionPortfolio{
                        portfolioDetailsId
                        aboutUs{
                          institutionDescription
                        }
                        chapterName
                        accountType
                      }
                    }
                }
              }
            `
});
