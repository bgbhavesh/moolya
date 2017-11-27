
import gql from 'graphql-tag'

import { client } from '../../../client/admin/core/apolloConnection'
import _ from 'lodash'

export async function findAnnotations(portfoliodetailsId, docId) {
  const connection = client || {};
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $docId:String!) {
              fetchAnnotations(portfoliodetailsId: $portfoliodetailsId, docId:$docId) {
                result
              }
          }
  
      `,
    variables: {
      portfoliodetailsId,
      docId
    },
    forceFetch: true
  })
  const data = result.data.fetchAnnotations;
  return data
}

