import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef';

let registrationSchema = `        
    
    type ContactInfoSchema{
      numberType        : String
      numberTypeName        : String
      countryCode           : String
      contactNumber       : String
        
    }
    
     type EmailInfoSchema{
      emailIdType        : String
      emailIdTypeName        : String
      emailId           : String
     }
     
     type AddressInfoSchema{
        addressType        : String
        addressTypeName        : String
        name             : String
        phoneNumber      :  String
        addressFlat      :  String
        addressLocality      :  String
        addressLandmark      :  String
        addressArea      :  String
        addressCity      :  String
        addressState      :  String
        addressCountry : String
        addressPinCode : String
     }
     
     type SocialLinkInfoSchema{
        socialLinkTypeName    : String
        socialLinkType        : String
        socialLinkUrl         : String
     }
     type docFilesInputSchema{
       fileId:String,
       fileUrl: String,
       fileName:String,
       fileSize: String
     }
      type kycDocumentInfoSchema{
        docTypeName: String,
        docTypeId: String,
        kycCategoryId:String,
        kycCategoryName: String,
        documentId:String,
        documentDisplayName:String,
        documentName:String,
        isMandatory:Boolean,
         isActive:Boolean,
        allowableFormat:[String],
        allowableMaxSize:String,
        docFiles:[docFilesInputSchema],
        status: String
      }
    type Registration{
         _id            : String
         addressInfo     : [AddressInfoSchema]
         emailInfo       : [EmailInfoSchema]
         contactInfo     : [ContactInfoSchema]
         socialLinkInfo : [SocialLinkInfoSchema]
         kycDocuments    :[kycDocumentInfoSchema]
    }
   
    input ContactInfo{
      numberType        : String
      numberTypeName        : String
      countryCode           : String
      contactNumber       : String
    }
    
    input EmailInfo{
       emailIdType        : String
       emailIdTypeName        : String
       emailId           : String
    }
    
    input AddressInfo{
      addressType       : String
      addressTypeName  : String
      name             : String
      phoneNumber      :  String
      addressFlat      :  String
      addressLocality      :  String
      addressLandmark      :  String
      addressArea      :  String
      addressCity      :  String
      addressState      :  String
      addressCountry : String
      addressPinCode : String
    }
    
    input SocialLinkInfo{
       socialLinkTypeName    : String
       socialLinkType        : String
       socialLinkUrl         : String
     }
     
     input docFilesInput{
       fileId:String,
       fileUrl: String,
       fileName:String,
       fileSize: String
     
     }
    
    input KycDocumentInfo{
      docTypeName: String,
      docTypeId: String,
      kycCategoryId:String,
      kycCategoryName: String,
      documentId:String,
      documentDisplayName:String,
      documentName:String,
      isMandatory:Boolean,
      isActive:Boolean,
      allowableFormat:[String],
      allowableMaxSize:String,
      docFiles:[docFilesInput],
      status: String
    }
    input registrationObject{
        socialLinksInfo:[SocialLinkInfo],
        addressInfo:[AddressInfo],
        emailInfo : [EmailInfo],
        contactInfo:[ContactInfo]
        kycDocuments:[KycDocumentInfo]
    }
    
    input registrationInfoInput{
        userType        :   String,
        firstName       :   String,
        lastName        :   String,
        countryId       :   String,
        countryName     :   String,
        contactNumber   :   String,
        email           :   String,
        cityId          :   String,
        cityName        :   String,
        registrationType:   String,
        userName        :   String,
        password        :   String,
        accountType     :   String,
        institutionAssociation    :   String,
        companyname     :   String,
        companyUrl      :   String,
        remarks         :   String,
        referralType    :   String,
        clusterId       :   String,
        clusterName     :   String,
        chapterId       :   String,
        chapterName     :   String,
        subChapterId    :   String,
        subChapterName  :   String,
        communityId     :   String,
        communityName   :   String,
        source          :   String,
        deviceName      :   String,
        deviceNumber    :   String,
        ipAddress       :   String,
        ipLocation      :   String,  
        registrationDate:   Date,
        userId          :   String,
        registrationStatus        :   String,
        assignedUser    :   String,
        profileImage    :   String
    }
    
    type RegistrationResponse{
        _id             :   String,
        registrationInfo :  RegistrationInfo,
        registrationDetails : RegistrationDetails
        addressInfo     : [AddressInfoSchema]
         emailInfo       : [EmailInfoSchema]
         contactInfo     : [ContactInfoSchema]
         socialLinksInfo : [SocialLinkInfoSchema]
         kycDocuments: [kycDocumentInfoSchema]
        
    }
    
    type RegistrationInfo{        
        _id             :   String,
        userType        :   String,
        firstName       :   String,
        lastName        :   String,
        countryId       :   String,
        countryName     :   String,
        contactNumber   :   String,
        email           :   String,
        cityId          :   String,
        cityName        :   String,
        registrationType:   String,
        userName        :   String,
        password        :   String,
        accountType     :   String,
        institutionAssociation    :   String,
        companyname     :   String,
        companyUrl      :   String,
        remarks         :   String,
        referralType    :   String,
        clusterId       :   String,
        clusterName     :   String,
        chapterId       :   String,
        chapterName     :   String,
        subChapterId    :   String,
        subChapterName  :   String,
        communityId     :   String,
        communityName   :   String,
        source          :   String,
        deviceName      :   String,
        deviceNumber    :   String,
        ipAddress       :   String,
        ipLocation      :   String,  
        registrationDate:   Date,
        userId          :   String,
        registrationStatus        :   String,
        assignedUser    :   String,
        profileImage    : String
    }
    
    type branchLocation{
        id              :   String,
        name            :   String
    }
    
    type citizenship{
        id              :   String,
        name            :   String
    }
    
    type RegistrationDetails{    
          userType: String,
          companyName: String,
          groupName: String,
          companyWebsite:  String,
          companyEmail: String,
          foundationDate:  String,
          headQuarterLocation: String,
          branchLocations: String,  
          companytyp: String,
          entityType:  String,
          businessType: String,
          industry: String,
          subDomain:  String,
          stageOfCompany:  String,
          subsidaryCompany: String,
          parentCompany: String,
          registrationNumber: String,
          isoAccrediationNumber:String,
          companyTurnOver: String,
          partnerCompanies: String,
          investors: String,
          lookingFor:  String,
          companyCEOName: String,
          companyManagement: String,
          toatalEmployeeCount: String,
          associatedCompanies:  String,
              
          userCategory: String,
          institutionType:String,
          instituteName:  String,
          instituteGroupName: String,
          foundationYear:  String,
          website:String,
          registrationNumber: String,
          isoAccrediationNumber: String,
          curriculamProvider: String,
          associatedUniversity: String,
          studentCount:  String,
          staffCount:String,
          chairman: String,
          dean:  String,
          headQuarterLocation: String,
          branchLocations: String,  
          
          identityType : String,
          userType : String,
          title :  String,
          firstName : String,
          middleName : String,
          lastName :String,
          displayName :  String,
          dateOfBirth :  String,
          gender : String,
          citizenships : String,  
          qualification :String,
          employmentStatus : String,
          professionalTag : String,
          industry :  String,
          profession : String,
          employerName :String,
          employerWebsite :  String,
          employmentDate :String,
          experience : String
    }
    
    input branchLocationInput{
        id              :   String,
        name            :   String
    }
    
    input citizenshipInput{
        id              :   String,
        name            :   String
    }
    
    input RegistrationDetailsInput{    
          userType: String,
          companyName: String,
          groupName: String,
          companyWebsite:  String,
          companyEmail: String,
          foundationDate:  String,
          headQuarterLocation: String,
          branchLocations: String
          companytyp: String,
          entityType:  String,
          businessType: String,
          industry: String,
          subDomain:  String,
          stageOfCompany:  String,
          subsidaryCompany: String,
          parentCompany: String,
          registrationNumber: String,
          isoAccrediationNumber:String,
          companyTurnOver: String,
          partnerCompanies: String,
          investors: String,
          lookingFor:  String,
          companyCEOName: String,
          companyManagement: String,
          toatalEmployeeCount: String,
          associatedCompanies:  String,
              
          userCategory: String,
          institutionType:String,
          instituteName:  String,
          instituteGroupName: String,
          foundationYear:  String,
          website:String,
          registrationNumber: String,
          isoAccrediationNumber: String,
          curriculamProvider: String,
          associatedUniversity: String,
          studentCount:  String,
          staffCount:String,
          chairman: String,
          dean:  String,
          headQuarterLocation: String,
          branchLocations: String,  
          
          identityType : String,
          userType : String,
          title :  String,
          firstName : String,
          middleName : String,
          lastName :String,
          displayName :  String,
          dateOfBirth :  String,
          gender : String,
          citizenships : String,   
          qualification :String,
          employmentStatus : String,
          professionalTag : String,
          industry :  String,
          profession : String,
          employerName :String,
          employerWebsite :  String,
          employmentDate :String,
          experience : String
    }
    
    type Mutation{
         createRegistrationAPI(registration: registrationInfoInput!):response
         createRegistration(registration: registrationInfoInput!, moduleName:String!, actionName:String!):response
         updateRegistration(registrationId:String, registration: registrationObject, moduleName:String, actionName:String):response       
         updateRegistrationInfo(registrationId:String,registrationDetails:registrationInfoInput,details:RegistrationDetailsInput):response
         updateRegistrationUploadedDocumentUrl(registrationId:String,docUrl:String,document:String,documentId:String):response         
         createGeneralInfoInRegistration(registration: registrationObject!, moduleName:String!, actionName:String!, registrationId:String!,type:String!):response
         updateRegistrationGeneralInfo(registration: registrationObject!, moduleName:String!, actionName:String!, registrationId:String!,type:String!):response
         ApprovedStatusOfDocuments(documentId:[String],moduleName:String!,actionName:String!, registrationId:String!):response
         RejectedStatusOfDocuments(documentId:[String],moduleName:String!,actionName:String!, registrationId:String!):response
    }
    type Query{
        findRegistration(registrationId:String):Registration
        findRegistrationInfo(registrationId:String):RegistrationResponse
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], registrationSchema]);
