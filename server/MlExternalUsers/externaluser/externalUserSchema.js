/**
 * Created by venkatsrinag on 28/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from '../../commons/mlResolverDef'

let externalUser = `
    input externalUser{
        username: String,
        profile:  profile
    }
    type Users{
        _id: String,
        password: String,
        username: String,
        latitude:Float,
        longitude:Float,
        name: String,
        clusterName:String,
        communityCode : String,
        profile:Profile
    }
    type Profile{
      isExternaluser:Boolean,
      isActive:Boolean,
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
        accountType:String,
        profileId:String
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
        communityImage:String,        
        isDefault:Boolean,
        isActive:Boolean,
        accountType:String,
        isActive:Boolean,
        optional:Boolean,
        userType :String,
        identityType:String,
        profileId:String
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
      addressStateId  :String
      addressCountry : String
      addressCountryId : String
      addressPinCode : String
      latitude        :  Int
      longitude       :  Int
      isDefaultAddress:Boolean
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
    
    type mapCenterCords{
        lat:Float,
        lng:Float
    }
    
    type Mutation{
      updateContactNumber(contactDetails:contactObj):response
      createUserGeneralInfo(registration: registrationObject!, moduleName:String!, actionName:String!, registrationId:String!,profileId:String!,type:String!):response
      deActivateUserProfile(profileId:String!):response
      blockUserProfile(profileId:String!):response
      setDefaultProfile(profileId:String!):response
      switchExternalProfile(profileId:String!):response
      updateUserGeneralInfo(registration: registrationObject!, moduleName:String!, actionName:String!, registrationId:String!,profileId:String!,type:String!):response
    }
    
    type Query{
        fetchIdeatorUsers:response
        findAddressBook:externalUserAdditionalInfoSchema
        fetchUserProfiles:[externalUserProfiles]
        fetchMapCenterCordsForExternalUser(module:String, id:String):mapCenterCords
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],externalUser]);

let supportedApi = [
    {api:'fetchMapCenterCordsForExternalUser', actionName:'READ', moduleName:"USERS", isAppWhiteList:true},
    {api:'fetchUserProfiles', actionName:'READ', moduleName:"USERS", isAppWhiteList:true},
    {api:'findAddressBook', actionName:'READ', moduleName:"USERS", isAppWhiteList:true},
    {api:'fetchUserProfiles', actionName:'READ', moduleName:"USERS", isAppWhiteList:true},
    {api:'updateContactNumber', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},
    {api:'deActivateUserProfile', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},
    {api:'blockUserProfile', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},
    {api:'setDefaultProfile', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},
    {api:'createUserAddressInfo', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},
    {api:'updateUserGeneralInfo', actionName:'UPDATE', moduleName:"USERS", isAppWhiteList:true},

]

MlResolver.MlModuleResolver.push(supportedApi)
