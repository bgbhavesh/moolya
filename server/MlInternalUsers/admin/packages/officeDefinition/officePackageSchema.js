/**
 * Created by venkatsrinag on 28/7/17.
 */
import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../../../commons/mlSchemaDef";
import MlResolver from "../../../../commons/mlResolverDef";

let officePackage = `

  type ApplicableCommunity{
    communityName:String,
    communityId:String
  }

  type OfficePackage{
    officeName:String,
    displayName:String,
    cardType:String,
    frequencyType:String,
    officeAbout:String,
    termsConditions:String,
    validFrom:Date,
    validTo:Date,
    accountType:String,
    officePic:String,
    isMoolya:Boolean,
    isOthers:Boolean,
    isActive:Boolean,
    applicableCommunity:[ApplicableCommunity],
    totalCount:Int,
    principalUserCount:Int,
    teamUserCount:Int,
    availableCommunities:[AvailableCommunities]
    clusterId : String,
    chapterId : String,
    communityId: String,
    barerCount:Int
  }
  
  input applicableCommunity{
    communityName:String,
    communityId:String
  }

  input officePackage{
    officeName:String,
    displayName:String,
    cardType:String,
    frequencyType:String,
    officeAbout:String,
    termsConditions:String,
    validFrom:Date,
    validTo:Date,
    accountType:String,
    officePic:String,
    isMoolya:Boolean,
    isOthers:Boolean,
    isActive:Boolean,
    applicableCommunity:[applicableCommunity],
    totalCount:Int,
    principalUserCount:Int,
    teamUserCount:Int,
    availableCommunities:[availableCommunities]
    clusterId : String,
    chapterId : String,
    communityId: String,
    barerCount:Int
  }
  
  type Query{
    fetchOfficePackages:[OfficePackage],
    fetchOfficePackageById(officePackageId:String):OfficePackage
  }
  
  type Mutation{
    createOfficePackage(package:officePackage):response
    updateOfficePackage(package:officePackage, packageId:String):response
  }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], officePackage]);

let supportedApi = [
    {api: 'createOfficePackage', actionName:'CREATE', MODULE: "OFFICEPACKAGE"},
    {api: 'updateOfficePackage', actionName:'UPDATE', MODULE: "OFFICEPACKAGE"},
    {api: 'fetchOfficePackages', actionName:'READ', MODULE: "OFFICEPACKAGE", isWhiteList:true},
    {api: 'fetchOfficePackageById', actionName:'READ', MODULE: "OFFICEPACKAGE", isWhiteList:true},
]

MlResolver.MlModuleResolver.push(supportedApi)
