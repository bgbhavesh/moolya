
import gql from 'graphql-tag'

import {client} from '../../../client/admin/core/apolloConnection'
import _ from 'lodash'


export async function findComments(annotationId) {

  const result = await client.query({
    query: gql`
          query ($annotationId: String!) {
              fetchComments(annotationId: $annotationId) {
                  _id
                  comment
    							annotatorId
    							portfolioId
    							userId 
                  userName
                  isResolved
                  isReopened
                  createdAt
              }
          }
  
      `,
    variables: {
      annotationId: annotationId
    },
    forceFetch: true
  })
  const data = result.data.fetchComments;
  let commitsArray = []
  commitsArray  = _.map(data, function (row) {
    return _.omit(row, ['__typename']);
  });
  return commitsArray;
}




