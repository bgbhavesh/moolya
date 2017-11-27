
import gql from 'graphql-tag'

import _ from 'lodash'


export async function findComments(annotationId, client) {
  const connection = client || {};
  const result = await connection.query({
    query: gql`
          query ($annotationId: String!) {
              fetchComments(annotationId: $annotationId) {
                  _id
                  comment
    							annotatorId
    							portfolioId
    							userId 
                  userName
                  firstName
                  lastName
                  profileImage
                  createdAt
              }
          }
  
      `,
    variables: {
      annotationId
    },
    forceFetch: true
  })
  const data = result.data.fetchComments;
  let commitsArray = []
  commitsArray = _.map(data, row => _.omit(row, ['__typename']));
  return commitsArray;
}

