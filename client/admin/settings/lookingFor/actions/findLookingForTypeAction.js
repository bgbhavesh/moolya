import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findLookingForActionHandler(LookingForTypeId) {
  const did = LookingForTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindLookingFor(_id:$id){
         id:_id
        lookingForName
        lookingForDisplayName
        communityName
        communityCode
        isActive
        about
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindLookingFor;
  return id
}
