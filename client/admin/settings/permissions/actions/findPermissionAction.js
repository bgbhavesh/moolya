import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findPermissionActionHandler(PermissionId) {
  //console.log(PermissionId)
 let did=PermissionId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindPermission(_id:$id){
         id:_id
        permissionName
        displayName
        isActive
        permissionDesc
      }
      }
    `,
    variables: {
      id:did
    }
  })
  console.log(result)
  const id = result.data.FindPermission;
  return id
}
