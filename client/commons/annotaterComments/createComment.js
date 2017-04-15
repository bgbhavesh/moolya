
import gql from 'graphql-tag'

import {client} from '../../../client/admin/core/apolloConnection'

export async function createComment(details) {

  const result = await client.mutate({
    mutation: gql`
          mutation  ($annotatorId: String, $portfolioId:String, $comment:String){
              createComment(annotatorId:$annotatorId, portfolioId:$portfolioId, comment:$comment){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      annotatorId : details.annotatorId,
      portfolioId : details.portfolioId,
      comment : details.comment
    }
  })
  const id = result.data.createComment;
  console.log(id);
  return id
}
