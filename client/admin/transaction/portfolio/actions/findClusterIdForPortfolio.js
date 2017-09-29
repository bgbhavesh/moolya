import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';


export async function fetchPortfolioActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            findPortfolioDetails(portfoliodetailsId: $portfoliodetailsId) {
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
  const id = result.data.findPortfolioDetails;
  return id
}
