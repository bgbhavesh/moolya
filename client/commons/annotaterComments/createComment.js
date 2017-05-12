
import gql from 'graphql-tag'

import {client} from '../../../client/admin/core/apolloConnection'

export async function createCommentActionHandler(details) {
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
  return id
}

export async function resolveCommentActionHandler(commentId) {
  const result = await client.mutate({
    mutation: gql`
          mutation  ($commentId:String){
              resolveComment(commentId:$commentId){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      commentId : commentId
    }
  })
  const id = result.data.resolveComment;
  return id
}

export async function reopenCommentActionHandler(commentId) {
  const result = await client.mutate({
    mutation: gql`
          mutation  ($commentId:String){
              reopenComment(commentId:$commentId){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      commentId : commentId
    }
  })
  const id = result.data.reopenComment;
  return id
}



