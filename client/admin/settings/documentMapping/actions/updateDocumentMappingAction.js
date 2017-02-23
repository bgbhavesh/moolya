import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateDocumentMappingActionHandler(did,details) {

  const result = await client.mutate({
    mutation: gql`
   mutation  ($documentId:String, $document: documentInput){
       updateDocument(
       documentId: $documentId,
       document: $document,
       )
   }
   `,
    variables: {
      documentId : did,
      document: details
    }
  })
  console.log(result)
  const id = result;
  return id
}
