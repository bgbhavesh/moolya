/**
 * Created by vishwadeep on 6/7/17.
 */
/**
 * import of all the routes and libs
 * */
import {MlViewer, MlViewerTypes} from "../../../../lib/common/mlViewer/mlViewer";
import MlUsersCluster from "../components/MlUsersCluster";
import React from "react";
import gql from "graphql-tag";

/**
 * export of config file
 * */
const mlUsersClusterListConfig = new MlViewer.View({
  name: "clusterList",
  viewType: MlViewerTypes.LIST,
  extraFields: [],
  fields: ["portfolioUserName", "chapterName"],
  searchFields: ["portfolioUserName", "chapterName"],
  throttleRefresh: true,
  pagination: true,
  sort: true,
  showActionComponent: false,
  actionConfiguration: [
    {
      showAction: true,
      actionName: 'logout',
      handler: (data)=> {
        console.log(data);
      }
    }
  ],
  viewComponent: <MlUsersCluster />,
  graphQlQuery: gql`
              query ContextSpecSearch($offset: Int, $limit: Int, $searchSpec: SearchSpec, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
                data: ContextSpecSearch(module: "users", offset: $offset, limit: $limit, searchSpec: $searchSpec, fieldsData: $fieldsData, sortData: $sortData) {
                  totalRecords
                  data {
                    ... on Portfoliodetails {
                    portfolioId : _id
                    transactionType
                    portfolioUserName
                    contactNumber
                    communityType
                    clusterName
                    chapterName
                    subChapterName
                    accountType
                    source
                    createdBy
                    createdAt
                    status
                    assignedTo
                    communityCode
                    }
                  }
                }
              }
              `
});


export {mlUsersClusterListConfig};