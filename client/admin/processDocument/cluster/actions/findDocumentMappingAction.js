import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDocumentMappingActionHandler(kycid,docId)
{
  let kycId=kycid
  let docTypeId=docId
  const result = await client.query({
    query: gql`
    query  ($kycId: String,$docTypeId: String){
        findProcessDocuments(kycId:$kycId,docTypeId:$docTypeId) {
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
      kycId,
      docTypeId
    },
    forceFetch:true
  })
  const id = result.data.findProcessDocuments;
  return id
}
