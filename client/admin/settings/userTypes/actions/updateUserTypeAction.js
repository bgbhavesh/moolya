import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateUserTypeActionHandler(UserTypeDetails) {
  const _id = UserTypeDetails.id;
  const displayName = UserTypeDetails.displayName;
  const userTypeDesc = UserTypeDetails.userTypeDesc;
  const isActive = UserTypeDetails.isActive
  const communityCode = UserTypeDetails.communityCode;
  const communityName = UserTypeDetails.communityName
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String, $displayName: String, $userTypeDesc: String,$isActive: Boolean, $communityCode: String, $communityName:String, $moduleName:String, $actionName:String){
        UpdateUserType(
          _id: $_id,
          displayName: $displayName,
          userTypeDesc: $userTypeDesc,
          isActive :$isActive,
          communityCode :$communityCode
          communityName :$communityName,
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
      displayName,
      userTypeDesc,
      isActive,
      communityCode,
      communityName,
      moduleName: 'USERTYPE',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateUserType;
  return id
}
