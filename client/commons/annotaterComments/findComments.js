
import gql from 'graphql-tag'

import {client} from '../../../client/admin/core/apolloConnection'
import _ from 'lodash'


export async function findComments(annotationId) {

  const result = await client.query({
    query: gql`
          query ($annotationId: String!) {
              fetchComments(annotationId: $annotationId) {
                    result
              }
          }
  
      `,
    variables: {
      annotationId: annotationId
    },
    forceFetch: true
  })
  const data = result.data.fetchComments;
  return data
}




