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
    
    type Registration{
         _id            : String
         addressInfo     : [AddressInfoSchema]
         emailInfo       : [EmailInfoSchema]
         contactInfo     : [ContactInfoSchema]
         socialLinkInfo : [SocialLinkInfoSchema]
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
    
    input registrationObject{
        socialLinksInfo:[SocialLinkInfo],
        addressInfo:[AddressInfo],
        emailInfo : [EmailInfo],
        contactInfo:[ContactInfo]
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
        companyName     :   String,
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
        assignedUser    :   String
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
        companyName     :   String,
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
        assignedUser    :   String
    }
    
    type Mutation{
         createRegistration(registration: registrationObject!, moduleName:String!, actionName:String!):response
         updateRegistration(registrationId:String, registration: registrationObject, moduleName:String, actionName:String):response
         updateRegistrationInfo(registrationId:String,registrationDetails:registrationInfoInput):response
    }
    type Query{
        findRegistration(registrationId:String):Registration
        findRegistrationInfo(registrationId:String):RegistrationInfo
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], registrationSchema]);
