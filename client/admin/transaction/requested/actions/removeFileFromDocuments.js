import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function removeFileFromDocumentsActionHandler(fileId,documentId,registrationId) {
 /* let clusterId = clusterIdInfo
  let userType =userTypeInfo
  let communityType=communityTypeInfo*/
  const result = await client.mutate({
    mutation: gql`
     mutation($fileId: String, $documentId: String, $registrationId: String!, $actionName: String!, $moduleName: String! ){
           RemoveFileFromDocuments(fileId:$fileId,documentId:$documentId,registrationId:$registrationId,actionName:$actionName,moduleName:$moduleName) {
            success
            code
            result
          }
        }
    `,
    variables: {
      fileId,
      documentId,
      registrationId,
      moduleName:"REGISTRATION",
      actionName:"UPDATE",
    },
    forceFetch: true
  })
  const id = result.data.RemoveFileFromDocuments;
  return id
}
