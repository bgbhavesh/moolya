import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDocumentMappingActionHandler(Id)
{
  let did=Id
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findDocument(documentId:$id){
          documentId
          documentName
          documentDisplayName
          validity 
          inputLength
          remarks
          allowableMaxSize
          issuingAuthority
        allowableFormat{
          id
        }
        clusters{
          id
        }    
        chapters{
          id
        }
        subChapters{
          id
        }
        kycCategory{
          id
        }
        documentType{
          id
        }
        isActive
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findDocument;
  console.log("DAta "+id);
  return id
}
