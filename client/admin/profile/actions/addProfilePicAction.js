import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function addProfilePicActionHandler(profilePic,userId)
{
  let profile = profilePic;
  const result = await client.mutate({
    mutation: gql`
    mutation ($userId: String, $profileImage: String, $moduleName: String, $actionName: String) {
      updateProfileImage(userId: $userId, profileImage: $profileImage, moduleName: $moduleName, actionName: $actionName) {
        success
        code
        result
      }
    }
    `,
    variables: {
      userId:userId,
      profileImage:profilePic,
      moduleName:"PROFILE",
      actionName:"UPDATE"
    }
  })
  const id = result.data.updateProfileImage;
  return id;
}


export async function updateDataEntry(Details,userId)
{
  const result = await client.mutate({
    mutation: gql`
    mutation ($userId: String, $profileImage: String, $moduleName: String, $actionName: String, $firstName: String, $middleName: String, $lastName: String) {
      updateDataEntry(userId: $userId, profileImage: $profileImage, moduleName: $moduleName, actionName: $actionName,firstName: $firstName, middleName: $middleName, lastName: $lastName, , ) {
        success
        code
        result
      }
    }
    `,
    variables: {
      userId:userId,
      profileImage:profilePic,
      moduleName:"PROFILE",
      actionName:"UPDATE",
      firstName:firstName,
      middleName:middleName,
      lastName:lastName,
    }
  })
  const id = result.data.updateDataEntry;
  return id;
}
