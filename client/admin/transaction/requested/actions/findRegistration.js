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
            _id
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
          qualification
          employmentStatus
          professionalTag
          profession
          employerName
          employerWebsite
          employmentDate
          experience
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
