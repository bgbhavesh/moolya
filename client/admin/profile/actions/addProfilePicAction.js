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


export async function updateDataEntry(Details) {
 // let Details = Details;
  const result = await client.mutate({
    mutation: gql`
    mutation ($userId: String, $moduleName: String, $actionName: String, $attributes: attributesObject) {
    updateDataEntry(userId: $userId, moduleName: $moduleName, actionName: $actionName, attributes: $attributes) {
    success
    code
    result
  }
}
`,
    variables: {
    "userId": Details.userId,
    "moduleName": "PROFILE",
    "actionName": "UPDATE",
    "attributes": {
      "profileImage": Details.profileImage,
      "firstName": Details.firstName,
      "middleName": Details.middleName,
      "lastName":  Details.lastName

      }
    }
  })
  const id = result.data.updateDataEntry;
  return id;
}
