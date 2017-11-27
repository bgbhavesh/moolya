import gql from 'graphql-tag'
import { client } from '../../../client/admin/core/apolloConnection';

export async function findUserActionHandler(token) {
  const LoginToken = token
  const result = await client.query({
    query: gql`
    query  ($token: String){
        findUserOnToken(token:$token){
            success,
            code,
            result
        } 
      }
    `,
    variables: {
      token: LoginToken
    },
    forceFetch: true
  })
  const id = result.data.findUserOnToken;
  return id
}
