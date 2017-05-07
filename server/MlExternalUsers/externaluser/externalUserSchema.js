/**
 * Created by venkatsrinag on 28/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'

let externalUser = `
    input externalUser{
        username: String,
        profile:profile
    }

    input profile{
        isExternaluser:Boolean,
        city:String,
        state:String,
        country:String,
        cluster:String,
        chapter:String,
        community:String,
        externalUserProfiles:externalUserProfile
    }

    input userPortfolios{
        portfolioId:String,
        isDefault:Boolean
    }

    input userProfiles{
        registrationId:String,
        portfolio:[userPortfolios],
        countryName:String,
        countryId:String,
        cityName:String,
        mobileNumber:String,
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        communityId:String,
        communityName:String,
        communityType:String,
        isDefault:Boolean,
        isActive:Boolean,
        accountType:String
    }
    
    type ContactInfoSchema{
      numberType        : String
      numberTypeName    : String
      countryCode       : String
      contactNumber     : String
      index     : String
        
    }
    
     type EmailInfoSchema{
      emailIdType        : String
      emailIdTypeName        : String
      emailId           : String
      index     : String
     }
     
     type AddressInfoSchema{
        addressType         : String
        addressTypeName     : String
        name                : String
        phoneNumber         :  String
        addressFlat         :  String
        addressLocality     :  String
        addressLandmark     :  String
        addressArea         :  String
        addressCity         :  String
        addressState        :  String
        addressCountry      : String
        addressPinCode      : String
        index     : String
     }
     
     type SocialLinkInfoSchema{
        socialLinkTypeName    : String
        socialLinkType        : String
        socialLinkUrl         : String
     }
     
    type externalUserAdditionalInfoSchema{
       clusterId          : String
       registrationId     : String
       profileId          : String
       addressInfo        : [AddressInfoSchema]
       emailInfo          : [EmailInfoSchema]
       contactInfo        : [ContactInfoSchema]
       socialLinkInfo     : [SocialLinkInfoSchema]
    }
    
    type externalUserProfiles{
        registrationId:String,
        countryName:String,
        countryId:String,
        cityName:String,
        cityId:String,
        mobileNumber:String,
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        communityId:String,
        communityName:String,
        communityType:String,
        communityName:String,
        communityDefCode:String,
        communityDefName:String,
        communityType:String,
               
        isDefault:Boolean,
        isActive:Boolean,
        accountType:String,
        isProfileActive:Boolean,
        optional:Boolean,
        userType :String,
        identityType:String
    }
    
    input externalUserProfile{
        firstName:String,
        lastName:String,
        middleName:String,
        userProfiles:[userProfiles]
    }
    input contactObj {
      numberType        : String
      numberTypeName    : String
      countryCode       : String
      contactNumber     : String
      index     : String
    }
    
    type Mutation{
      updateContactNumber(contactDetails:contactObj):response
    }
    
    type Query{
        fetchIdeatorUsers:response
        findAddressBook:externalUserAdditionalInfoSchema
        fetchUserProfiles:[externalUserProfiles]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],externalUser]);
