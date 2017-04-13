import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updatePortfolioActionHandler(details) {
  let portfoliodetailsId  = details.portfolioId;
  let portfolio = details.portfolio;
  const result = await client.mutate({
      mutation: gql`
          mutation  ($portfoliodetailsId: String, $portfolio:portfolio){
              updatePortfolio(portfoliodetailsId:$portfoliodetailsId, portfolio:$portfolio){
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


export async function createAnnotationActionHandler(details) {
  let portfoliodetailsId  = details.portfolioId;
  let quote = details.quote
  let docId = details.docId
  const result = await client.mutate({
    mutation: gql`
          mutation  ($portfoliodetailsId: String, $docId:String, $quote:String){
              createAnnotation(portfoliodetailsId:$portfoliodetailsId, docId:$docId, quote:$quote){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      portfoliodetailsId,
      docId,
      quote
    }
  })
  const id = result.data.createAnnotation;
  return id
}
