import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDocumentMappingActionHandler(Id)
{
  let kycId=Id
  const result = await client.query({
    query: gql`
    query  ($kycId: String){
        findProcessDocuments(kycId:$kycId) {
              _id
          documentId
          documentName
          documentDisplayName
          validity
          inputLength
          remarks
          allowableMaxSize
          issuingAuthority
          allowableFormat
          clusters
          chapters
          subChapters
          kycCategory
          documentType
          isActive
        }
      }
    `,
    variables: {
      kycId
    },
    forceFetch:true
  })
  const id = result.data.findProcessDocuments;
  return id
}
