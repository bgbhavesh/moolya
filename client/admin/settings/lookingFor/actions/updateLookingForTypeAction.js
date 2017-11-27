import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateLookingForTypeActionHandler(LookingForType) {
  const _id = LookingForType.id;
  const lookingForName = LookingForType.lookingForName;
  const lookingForDisplayName = LookingForType.lookingForDisplayName;
  const communityCode = LookingForType.communityCode;
  const communityName = LookingForType.communityName;
  const about = LookingForType.about;
  const isActive = LookingForType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$lookingForName: String, $lookingForDisplayName: String, $communityCode:String, $communityName:String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateLookingFor(
          _id:$_id
          lookingForName: $lookingForName,
          lookingForDisplayName: $lookingForDisplayName,
          communityCode: $communityCode,
          communityName : $communityName,
          about: $about,
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
      lookingForName,
      lookingForDisplayName,
      communityCode,
      communityName,
      about,
      isActive,
      moduleName: 'LOOKINGFOR',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateLookingFor;
  return id
}
