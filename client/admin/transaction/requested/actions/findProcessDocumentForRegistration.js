import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findProcessDocumentForRegistrationActionHandler(clusterIdInfo) {
  let clusterId = clusterIdInfo
  const result = await client.query({
    query: gql`
       query($clusterId: String){
            findProcessDocumentForRegistration(clusterId:$clusterId) {
              _id
              processDocuments {
                kycCategoryId
                kycCategoryName
                docTypeId
                docTypeName
                documentId
                documentDisplayName
                documentName
                isMandatory
                isActive
                inputLength
                allowableMaxSize
                allowableFormat
                docMappingDef
              }
            }
        }
    `,
    variables: {
      clusterId
    },
    forceFetch: true
  })
  const id = result.data.findProcessDocumentForRegistration;
  return id
}
