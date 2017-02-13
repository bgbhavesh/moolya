import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updatePermissionActionHandler(PermissionDetails) {
  let _id=PermissionDetails.id;
  let permissionName = PermissionDetails.permissionName;
  let displayName = PermissionDetails.displayName;
  let permissionDesc = PermissionDetails.permissionDesc;
  let isActive = PermissionDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$permissionName: String, $displayName: String, $permissionDesc: String,$isActive: Boolean){
        UpdatePermission(
          _id:$_id
          permissionName: $permissionName,
          displayName: $displayName,
          permissionDesc: $permissionDesc,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      permissionName,
      displayName,
      permissionDesc,
      isActive
    }
  })
  console.log(result)
  const id = result;
  return id
}
