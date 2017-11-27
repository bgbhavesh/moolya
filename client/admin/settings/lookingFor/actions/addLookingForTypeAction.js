import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addLookingForActionHandler(LookingForDetails) {
  const lookingForName = LookingForDetails.lookingForName;
  const lookingForDisplayName = LookingForDetails.lookingForDisplayName;
  const communityCode = LookingForDetails.communityCode;
  const communityName = LookingForDetails.communityName;
  const about = LookingForDetails.about;
  const isActive = LookingForDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($lookingForName: String, $lookingForDisplayName: String, $communityCode: String,$communityName:String,$about:String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateLookingFor(
          lookingForName: $lookingForName,
          lookingForDisplayName: $lookingForDisplayName,
          communityCode: $communityCode,
          communityName:$communityName,
          about:$about,
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
      lookingForName,
      lookingForDisplayName,
      communityCode,
      communityName,
      about,
      isActive,
      moduleName: 'LOOKINGFOR',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateLookingFor;
  return id
}
