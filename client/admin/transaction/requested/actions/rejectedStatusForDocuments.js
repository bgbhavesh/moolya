import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function rejectedStausForDocuments(document, doctype, registration) {
  const documentId = document;
  const docTypeId = doctype
  const registrationId = registration;
  const result = await client.mutate({
    mutation: gql`
     mutation($documentId:[String],$docTypeId:[String],$moduleName:String!,$actionName:String!,$registrationId:String!){
      RejectedStatusOfDocuments(documentId:$documentId,docTypeId:$docTypeId,moduleName:$moduleName,actionName:$actionName,registrationId:$registrationId) {
          success
          code
          result
        }
      }
    `,
    variables: {
      documentId,
      docTypeId,
      moduleName: 'REGISTRATION',
      actionName: 'UPDATE',
      registrationId
    }
  })

  const id = result.data.RejectedStatusOfDocuments;
  return id
}
