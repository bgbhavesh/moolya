import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function findRegistrationActionHandler(registrationId) {
  let regId = registrationId
  const result = await appClient.query({
    query: gql`
   query($registrationId: String){  
        findRegistrationInfo(registrationId:$registrationId){          
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
    		kycDocuments {
          docTypeName
          docTypeId
          kycCategoryId
          kycCategoryName
          documentId
          documentDisplayName
          documentName
          isMandatory
          isActive
          allowableFormat
          allowableMaxSize
          status
          docFiles {
            fileId
            fileUrl
            fileName
            fileSize
          }
        }
        emails{
          address
          verified
        }
          
        }
      }
    `,
    variables: {
      registrationId: regId
    },
    forceFetch: true
  })
  const id = result.data.findRegistrationInfo;
  return id
}

export async function fetchIdentityTypes() {
  const result = await appClient.query({
    query: gql`
       query{
        data:FetchIdentityTypes{
         _id
        identityTypeName
        identityTypeDisplayName
        isActive
        communities
        }
    }`
  });

  return result && result.data ? result.data.data : [];

};

export async function findCountryCode(clusterId) {
  const result = await appClient.query({
    query: gql`
            query($clusterId: String){  
                fetchCountryCode(clusterId:$clusterId){          
                _id          
                country      
                countryCode  
                displayName   
                url        
                about       
                capital     
                isActive     
                lat        
                lng 
                phoneNumberCode
            }
        }`,
    variables: {
      clusterId: clusterId
    },
    forceFetch: true
  });
  const id = result.data.fetchCountryCode;
  return id

}

export async function documentTypesActionHandler() {

  const result = await appClient.query({
    query: gql`query{  
      fetchDocumentsType{
        docTypeName 
        docTypeDisplayName 
        about 
        _id 
        isActive 
      }  
    }`
  });
  const id = result.data.fetchDocumentsType;
  return id

}

export async function fetchPendingRegistration() {
  const result = await appClient.query({
    query: gql`
      query{
      findUserPendingRegistration{
        registrationId : _id,
        registrationInfo{
          email
          communityName
          clusterName
          }
        }
      }
     `,
    forceFetch: true
  });
  const id = result.data.findUserPendingRegistration;
  return id
}
