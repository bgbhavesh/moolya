import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findProcessDocumentForRegistrationActionHandler(clusterIdInfo,communityTypeInfo,userTypeInfo) {
  let clusterId = clusterIdInfo
  let userType =userTypeInfo
  let communityType=communityTypeInfo
  const result = await client.query({
    query: gql`
       query($clusterId: String, $userType: String, $communityType: String ){
            findProcessDocumentForRegistration(clusterId:$clusterId, userType:$userType, communityType:$communityType) {
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
      clusterId,
      userType,
      communityType
    },
    forceFetch: true
  })
  const id = result.data.findProcessDocumentForRegistration;
  return id
}
