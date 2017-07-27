/**
 * Created by vishwadeep on 27/7/17.
 */
/**
 * import of libs
 * */
import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

/**
 * @export of getting registration data with external user profile from users
 * this can be merged with the export of [registration action handler]
 * */
export async function findUserRegistrationActionHandler(registrationId) {
  let regId = registrationId
  const result = await client.query({
    query: gql`
   query($registrationId: String){  
        findRegistrationInfoUser(registrationId:$registrationId){          
            _id
            transactionId
            registrationInfo {
              registrationId
              industry
              profession 
              userType
              identityType
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
              profileImage
            }
          registrationDetails {
            userType
            companyName
            groupName
            companyWebsite
            companyEmail
            foundationDate
            headQuarterLocation
            companytyp
            entityType
            businessType
            industry
            subDomain
            stageOfCompany
            subsidaryCompany
            parentCompany
            registrationNumber
            isoAccrediationNumber
            companyTurnOver
            partnerCompanies
            investors
            lookingFor
            companyCEOName
            companyManagement
            toatalEmployeeCount
            associatedCompanies
            investingFrom
            currency
            investmentAmount
            userCategory
            institutionType
            instituteName
            instituteGroupName
            foundationYear
            website
            curriculamProvider
            associatedUniversity
            studentCount
            staffCount
            chairman
            dean
            identityType
            title
            firstName
            middleName
            lastName
            displayName
            dateOfBirth
            gender
            citizenships
            qualification
            employmentStatus
            professionalTag
            profession
            employerName
            employerWebsite
            employmentDate
            experience
          }
          socialLinksInfo {
              socialLinkTypeName
              socialLinkType
              socialLinkUrl
          }
          addressInfo {
            addressType
            addressTypeName
            name
            phoneNumber
            addressFlat
            addressLocality
            addressLandmark
            addressArea
            addressCity
            addressState
            addressStateId
            addressCountry
            addressCountryId
            addressPinCode
            isDefaultAddress
          }
          emailInfo {
            emailIdType
            emailIdTypeName
            emailId
          }
          contactInfo {
            numberType
            numberTypeName
            countryCode
            contactNumber
          }
           externalUserProfiles{
            communityName
            identityType
            clusterName
            chapterName
            subChapterName
            accountType
            isActive
          }
        }
      }
    `,
    variables: {
      registrationId: regId
    },
    forceFetch: true
  })
  const id = result.data.findRegistrationInfoUser;
  return id
}
