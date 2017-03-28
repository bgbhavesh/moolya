import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function rejectedStausForDocuments(document,registration) {
  let documentId=document;
  let registrationId=registration;
  const result = await client.mutate({
    mutation: gql`
     mutation($documentId:[String],$moduleName:String!,$actionName:String!,$registrationId:String!){
      RejectedStatusOfDocuments(documentId:$documentId,moduleName:$moduleName,actionName:$actionName,registrationId:$registrationId) {
          success
          code
          result
        }
      }
    `,
    variables: {
      documentId:documentId,
      moduleName:"REGISTRATION",
      actionName:"UPDATE",
      registrationId:registrationId
    }
  })

  const id = result.data.RejectedStatusOfDocuments;
  return id
}
