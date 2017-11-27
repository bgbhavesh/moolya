
import gql from 'graphql-tag'


export async function createCommentActionHandler(details, client) {
  const connection = client || {};
  const result = await connection.mutate({
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
      annotatorId: details.annotatorId,
      portfolioId: details.portfolioId,
      comment: details.comment
    }
  })
  const id = result.data.createComment;
  return id
}

export async function resolveCommentActionHandler(commentId, client) {
  const connection = client || {};
  const result = await connection.mutate({
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
      commentId
    }
  })
  const id = result.data.resolveComment;
  return id
}

export async function reopenCommentActionHandler(commentId, client) {
  const connection = client || {};
  const result = await connection.mutate({
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
      commentId
    }
  })
  const id = result.data.reopenComment;
  return id
}

