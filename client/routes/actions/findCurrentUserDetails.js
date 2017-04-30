import gql from 'graphql-tag'
import {client} from '../../../client/admin/core/apolloConnection';

export async function findUserActionHandler(token) {
  let LoginToken=token
  const result = await client.query({
    query: gql`
    query  ($token: String){
        FindUserOnToken(token:$token){
            success,
            code,
            result
        } 
      }
    `,
    variables: {
      token:LoginToken
    },
    forceFetch:true
  })
  const id = result.data.FindUserOnToken;
  return id
}