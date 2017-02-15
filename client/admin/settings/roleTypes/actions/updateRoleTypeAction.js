import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRoleTypeActionHandler(RoleTypeDetails) {
  let _id=RoleTypeDetails.id;
  let roleTypeName = RoleTypeDetails.roleTypeName;
  let roleTypeDisplayName = RoleTypeDetails.roleTypeDisplayName;
  let roleTypeDescription = RoleTypeDetails.roleTypeDescription;
  let isActive = RoleTypeDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String, $roleTypeName: String, $roleTypeDisplayName: String, $roleTypeDescription: String,$isActive: Boolean){
        UpdateRoleType(
          _id: $_id,
          roleTypeName: $roleTypeName,
          roleTypeDisplayName: $roleTypeDisplayName,
          roleTypeDescription: $roleTypeDescription,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      roleTypeName,
      roleTypeDisplayName,
      roleTypeDescription,
      isActive
    }
  })
  const id = result;
  return id
}
