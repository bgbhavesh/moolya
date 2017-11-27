import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findRoleTypeActionHandler(roleTypeId) {
  const did = roleTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindRoleType(_id:$id){
         id:_id
        roleTypeName
        roleTypeDisplayName
        isActive
        roleTypeDescription
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindRoleType;
  return id
}
