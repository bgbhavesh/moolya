import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findUserTypeActionHandler(userTypeId) {
  const did = userTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindUserType(_id:$id){
         id:_id
        userTypeName
        displayName
        communityCode
        communityName
        isActive
        userTypeDesc
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindUserType;
  return id
}
