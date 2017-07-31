import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';


export async function fetchPortfolioActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchPortfolioClusterId(portfoliodetailsId: $portfoliodetailsId) {
                  clusterId
                  communityType
                  communityCode
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchPortfolioClusterId;
  return id
}
