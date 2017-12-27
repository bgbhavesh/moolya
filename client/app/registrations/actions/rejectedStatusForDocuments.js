import gql from 'graphql-tag'
import {appClient} from "../../core/appConnection";

export async function rejectedStausForDocuments(document,doctype,registration) {
  let documentId=document;
  let docTypeId=doctype
  let registrationId=registration;
  const result = await appClient.mutate({
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
      documentId:documentId,
      docTypeId:docTypeId,
      moduleName:"REGISTRATION",
      actionName:"UPDATE",
      registrationId:registrationId
    }
  })

  const id = result.data.RejectedStatusOfDocuments;
  return id
}
