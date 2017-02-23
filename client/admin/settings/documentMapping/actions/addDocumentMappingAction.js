import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDocumentMappingActionHandler(Details) {

  const result = await client.mutate({
    mutation: gql`
        mutation ($documentInput:documentInput){
            createDocument(
                document: $documentInput
            ) 
         }
        `,
    variables: {
      documentInput: Details
    }
  })
  console.log(result)
  const id = result.data.createDocument;
  return id
}
