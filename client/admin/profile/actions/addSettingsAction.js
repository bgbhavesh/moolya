import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';



export async function updateSettings(Details) {
  const result = await client.mutate({
    mutation: gql`
   mutation ($userId: String, $moduleName: String, $actionName: String, $settingsAttributes: settingsAttributesObject) {
  updateSettings(userId: $userId, moduleName: $moduleName, actionName: $actionName, settingsAttributes: $settingsAttributes) {
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
      "settingsAttributes": {
        "currencyTypes": Details.currencySymbol,
        "numericalFormat": Details.measurementSystem
    }
  }});
  const id = result.data.updateSettings;
  return id;
}
