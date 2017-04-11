import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updatePortfolioActionHandler(details) {
  let portfoliodetailsId  = details.portfolioId;
  let portfolio = details.portfolio;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($portfoliodetailsId: String, $portfolio:portfolio){
        updatePortfolio(
          portfoliodetailsId:$portfoliodetailsId
          portfolio:$portfolio
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      portfoliodetailsId,
      portfolio
    }
  })
  const id = result.data.updatePortfolio;
  return id
}
