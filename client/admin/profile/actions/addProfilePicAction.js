import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


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
