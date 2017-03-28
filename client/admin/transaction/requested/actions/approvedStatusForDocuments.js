import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function approvedStausForDocuments(document,registration) {

    let documentId=document;
   let registrationId=registration;
  const result = await client.mutate({
    mutation: gql`
     mutation($documentId:[String],$moduleName:String!,$actionName:String!,$registrationId:String!){
      ApprovedStatusOfDocuments(documentId:$documentId,moduleName:$moduleName,actionName:$actionName,registrationId:$registrationId) {
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

  const id = result.data.ApprovedStatusOfDocuments;
  /*  console.log("//////////////////////////");
   console.log(result.data.createStep3InRegistration);*/

  return id
}
