import gql from 'graphql-tag';
import { appClient } from '../../core/appConnection';

export async function findProcessDocumentForRegistrationActionHandler(countryIdInfo, clusterIdInfo, chapterInfo, subchapterInfo, communityTypeInfo, userTypeInfo, identityTypeInfo, professionInfo, industryInfo, emailInfo) {
  const countryId = countryIdInfo
  const clusterId = clusterIdInfo
  const userType = userTypeInfo
  const communityType = communityTypeInfo
  const chapterId = chapterInfo
  const subChapterId = subchapterInfo
  const identityType = identityTypeInfo
  const profession = professionInfo
  const industry = industryInfo
  const email = emailInfo
  const result = await appClient.query({
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
