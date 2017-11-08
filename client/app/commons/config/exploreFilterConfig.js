import gql from "graphql-tag";

export default filterData = [
  {
    type: "SELECT",
    field: "clusterId",
    displayName: "Country",
    isGraphql: true,
    graphQLQuery: gql`{
                    data:fetchActiveClusters
                      {
                        value:_id
                        label:clusterName
                      }
                    }
                  `,
    graphQLOption:{},
  },
  {
    type: "SELECT",
    field: "chapterId",
    displayName: "City",
    isGraphql: true,
    graphQLQuery: gql`query($id: String) {
                  data:fetchChaptersWithoutAll(id: $id) {
                      value:_id
                      label:chapterName
                    }
                  }
                `,
    graphQLOption: {
      options: {
        variables: {
          id: "$$clusterId"
        }
      }
    },
  },
  // {
  //   type: "SELECT",
  //   field: "communityCode",
  //   displayName: "Community",
  //   isGraphql: true,
  //   graphQLQuery: gql`{
  //                 data:fetchCommunitiesSelect {
  //                     value:code
  //                     label:name
  //                   }
  //                 }
  //               `,
  //   graphQLOption: {},
  // },
  {
    type: "SELECT",
    field: "industryId",
    displayName: "Industry",
    isGraphql: true,
    graphQLQuery: gql`{
                  data:fetchIndustries {
                      value:_id
                      label:industryName
                    }
                  }
                `,
    graphQLOption: {},
  }
]
