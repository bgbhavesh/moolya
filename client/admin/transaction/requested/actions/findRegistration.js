import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRegistrationActionHandler(registrationId) {
  let regId = registrationId
  const result = await client.query({
    query: gql`
   query($id: String){
        findRegistrationInfo(registrationId:$id){          
          _id
          registrationInfo {
            userType
            firstName
            lastName
            countryId
            countryName
            contactNumber
            email
            cityId
            cityName
            registrationType
            userName
            password
            accountType
            institutionAssociation
            companyname
            companyUrl
            remarks
            referralType
            clusterId
            clusterName
            chapterId
            chapterName
            subChapterId
            subChapterName
            communityId
            communityName
            source
            deviceName
            deviceNumber
            ipAddress
            ipLocation
            registrationDate
            userId
            registrationStatus
            assignedUser
          },
          socialLinksInfo {
            socialLinkTypeName
            socialLinkType
            socialLinkUrl
    		}
          
        }
      }
    `,
    variables: {
      id: regId
    },
    forceFetch: true
  })
  const id = result.data.findRegistrationInfo;
  return id
}
