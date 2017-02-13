import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addPermissionActionHandler(PermissionDetails) {
  let permissionName = PermissionDetails.permissionName;
  let displayName = PermissionDetails.displayName;
  let permissionDesc = PermissionDetails.permissionDesc;
  let isActive = PermissionDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($permissionName: String, $displayName: String, $permissionDesc: String,$isActive: Boolean){
        CreatePermission(
          permissionName: $permissionName,
          displayName: $displayName,
          permissionDesc: $permissionDesc,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      permissionName,
      displayName,
      permissionDesc,
      isActive
    }
  })
  const id = result.data.CreatePermission;
  return id
}
