import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateRoleTypeActionHandler(RoleTypeDetails) {
  const _id = RoleTypeDetails.id;
  const roleTypeDisplayName = RoleTypeDetails.roleTypeDisplayName;
  const roleTypeDescription = RoleTypeDetails.roleTypeDescription;
  const isActive = RoleTypeDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String, $roleTypeDisplayName: String, $roleTypeDescription: String, $isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateRoleType(
          _id: $_id,
          roleTypeDisplayName: $roleTypeDisplayName,
          roleTypeDescription: $roleTypeDescription,
          isActive :$isActive,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
        } 
      }
    `,
    variables: {
      _id,
      roleTypeDisplayName,
      roleTypeDescription,
      isActive,
      moduleName: 'ROLETYPE',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateRoleType;
  return id
}
