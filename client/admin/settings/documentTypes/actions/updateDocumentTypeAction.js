import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateDocumentTypeActionHandler(DocTypeDetails)
{
  let docTypeName = DocTypeDetails.docTypeName;
  let docTypeDisplayName = DocTypeDetails.docTypeDisplayName;
  let about = DocTypeDetails.about;
  let isActive = DocTypeDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
        mutation ($documentType:documentTypeObject){
            createDocumentType(
                documentType: $documentType
            ) 
         }
        `,
    variables: {
      documentType: DocTypeDetails
    }
  })
  console.log(result)
  const id = result.data.createDocumentType;
  return id
}
