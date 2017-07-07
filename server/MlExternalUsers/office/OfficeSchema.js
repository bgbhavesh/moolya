/**
 * Created by venkatsrinag on 11/5/17.
 */
import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../commons/mlSchemaDef";
import MlResolver from "../../commons/mlResolverDef";

let myOfficeSchema = ` 
    type OfficeMembers{
       _id: String,
       userId:String,
       firstName:String,
       lastName:String,
       mobileNumber:String,
       emailId:String,
       description:String,
       name:String,
       joiningDate:String,
       communityType:String,
       role:String,
       isActive:Boolean,
       isPrincipal:Boolean,
       isIndependent:Boolean,
       isInternalUserInteraction:Boolean,
       isExternalUserInteraction:Boolean,
       isFreeze:Boolean,
       isRetire:Boolean,
       isFreeUser:Boolean,
       isPaidUser:Boolean,
       isAdminUser:Boolean
    }

    type AvailableCommunities{
        communityName:String,
        communityId:String,
        userCount:Int
        id: String

    }
      
    type LocationCoordinates { 
      lat : Float
      lang : Float
    }
    
    type TeamMembersDetails {
      name:String
      _id: String
      userId: String
      profileId: String
      profileImage: String
    }
    
    type BranchType{
    branchType: String
    _id: String
    }
    
    type MyOffice{
        _id: String
        userId:String,
        userName : String,
        totalCount:Int,
        principalUserCount:Int,
        teamUserCount:Int,
        availableCommunities:[AvailableCommunities]
        clusterId : String
        clusterName : String
        chapterId : String
        chapterName: String
        communityId: String
        communityName: String
        barerCount:Int
        officeName : String
        branchType : String
        officeLocation : String
        landmark:String
        streetLocality : String
        area:String,
        city:String,
        state:String,
        country:String,
        zipCode: Int,
        subscriptionName :String
        about : String
        isActive:Boolean,
        paymentLink:String,
        location : [LocationCoordinates]
    }
    
    type OfficeSC{
        userId:String,
        profileId:String,
        officeId:String,
        totalusercount:Int,
        principalcount:Int,
        teamMembercount:Int,
        availableCommunities:[AvailableCommunities]
        isActive:Boolean,
        isActivated:Boolean,
        isExpired:Boolean 
        isRegistrationApproved : Boolean
    }
    
     type TeamUsers {
      firstName: String
      name: String
    }
    
    type OfficeMembersWithUserId {
       _id: String
       name: String,
       userId: String
       profileImage: String
    }
    
    input officeMembers{
       userId:String,
       firstName:String,
       lastName:String,
       mobileNumber:String,
       emailId:String,
       userType:String,
       description:String,
       name:String,
       joiningDate:Date,
       role:String,
       isActive:Boolean,
       isIndependent:Boolean,
       isInternalUserInteraction:Boolean,
       isExternalUserInteraction:Boolean,
       isFreeze:Boolean,
       isRetire:Boolean,
       communityType:String,
       isPrincipal:Boolean,
       isFreeUser:Boolean,
       isPaidUser:Boolean,
       isAdminUser:Boolean
    }

    input availableCommunities{
        communityName:String,
        communityId:String,
        userCount:Int
    }
    
    input locationCoordinates { 
      lat : Float
      lang : Float
    }
    
     input myOffice { 
        userId:String,
        userName : String,
        totalCount:Int,
        principalUserCount:Int,
        teamUserCount:Int,
        availableCommunities:[availableCommunities]
        clusterId : String
        clusterName : String
        chapterId : String
        chapterName: String
        communityId: String
        communityName: String
        barerCount:Int
        officeName : String
        branchType : String
        officeLocation : String
        landmark:String
        streetLocality : String
        area:String,
        city:String,
        state:String,
        country:String,
        zipCode: Int,
        subscriptionName :String
        about : String
        isActive:Boolean,
        isBeSpoke:Boolean,
        paymentLink:String,
        location : [locationCoordinates]
     }
  
    type Query{
        fetchOffice:[MyOffice]
        fetchOfficeSC:[OfficeSC]
        fetchOfficeById(officeId:String):MyOffice
        fetchOfficeSCById(officeId:String):MyOffice
        fetchOfficeMember(memberId:String):OfficeMembers
        fetchOfficeMembers(officeId:String, isPrincipal:Boolean):[OfficeMembers]
        fetchAllOfficeMembersWithUserId:[OfficeMembersWithUserId]
        findOfficeDetail(officeId:String):response
        getTeamUsers(officeId: String):[TeamMembersDetails]
        getTeamMembers:[AvailableCommunities]
        getBranchDetails:[BranchType]
    }
    
    type Mutation{       
        createOffice(myOffice:myOffice):response
        createOfficeMembers(myOfficeId:String, officeMember:officeMembers):response
        updateOfficeMember(officeId:String,memberId:String, officeMember:officeMembers):response
        updateOffice(myOffice:myOffice, myOfficeId:String):response
        updateOfficeStatus(id:String):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], myOfficeSchema]);
  let supportedApi = [
  {api: 'createOffice', userAction:"CREATEOFFICE", actionName:'CREATE', resource: "OFFICE"},
  {api: 'createOfficeMembers', userAction:"ADDMEMBER", actionName:'CREATE', resource: "OFFICE"},
  {api: 'fetchOffice', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList:true},
  {api: 'fetchOfficeSC', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList:true},
  {api: 'fetchOfficeById', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList:true},
    {api:'getBranchDetails', actionName:'READ', moduleName:"OFFICE"},
    {api:'getTeamMembers', actionName:'READ', moduleName:"OFFICE"},
    {api:'getTeamUsers', actionName:'READ', moduleName:"OFFICE"},
  // {api: 'updateOfficeMembers', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'updateOffice', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'updateOfficeMember', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'updateOfficeStatus', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'findOfficeDetail', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList:true},
  {api: 'fetchOfficeMembers', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList:true},
  {api: 'fetchOfficeMember', actionName: 'READ', moduleName: "OFFICE"},
  {api: 'fetchAllOfficeMembersWithUserId', actionName: 'READ', moduleName: "OFFICE"},

]
MlResolver.MlModuleResolver.push(supportedApi)

