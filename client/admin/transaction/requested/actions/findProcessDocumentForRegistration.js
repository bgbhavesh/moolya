import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findProcessDocumentForRegistrationActionHandler(countryIdInfo,clusterIdInfo,chapterInfo,subchapterInfo,communityTypeInfo,userTypeInfo,identityTypeInfo,professionInfo,industryInfo,emailInfo) {
  let countryId = countryIdInfo
  let clusterId = clusterIdInfo
  let userType =userTypeInfo
  let communityType=communityTypeInfo
  let chapterId=chapterInfo
  let subChapterId=subchapterInfo
  let identityType=identityTypeInfo
  let profession=professionInfo
  let industry=industryInfo
  let email=emailInfo
  const result = await client.query({
    query: gql`
     query($countryId: String,$clusterId: String,$chapterId:String,$subChapterId:String, $userType: String, $communityType: String,$identityType: String,$profession:String,$industry:String, $email:String ){
            findProcessDocumentForRegistration(countryId:$countryId,clusterId:$clusterId,chapterId:$chapterId,subChapterId:$subChapterId,userType:$userType, communityType:$communityType,identityType:$identityType,profession:$profession,industry:$industry,email:$email) {
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
                status
                 docFiles{
                   fileId,
                   fileUrl,
                   fileName,
                   fileSize
                }
              }
            }
        
    `,
    variables: {
      countryId,
      clusterId,
      chapterId,
      subChapterId,
      userType,
      communityType,
      identityType,
      profession,
      industry,
      email
    },
    forceFetch: true
  })
  const id = result.data.findProcessDocumentForRegistration;
  return id
}
