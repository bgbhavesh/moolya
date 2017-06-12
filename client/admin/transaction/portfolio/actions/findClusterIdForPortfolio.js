import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';


export async function fetchClusterIdActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchPortfolioClusterId(portfoliodetailsId: $portfoliodetailsId) {
                  clusterId
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
