/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let BackEndUser = `

    type BackendUsers{
        _id: String,
        password: String,
        username: String,
        profile:userProfile,
        roleNames:[String]
    }
    
    type userProfile{
        isInternaluser: Boolean,
        isExternaluser: Boolean,
        isActive: Boolean,
        isChapterAdmin :Boolean,
        email: String,
        InternalUprofile: internalUserprofile
    }
    
     type internalUserprofile{
        moolyaProfile: MoolyaProfile
    }
    
    type AssignedDepartment{
        department: String,
        subDepartment: String
    }
    
    type Contacts{
        contactNumberType:String,
        countryCode:String,
        number:String,
        isOTPValidated:Boolean
    }
    
    type UserProfiles{
        isDefault: Boolean,
        clusterId: String,
        clusterName:String,
        userRoles:[UserRoles],
    }
    
    
    type UserRoles{
        roleId:String,
        roleName:String,
        clusterId:String,
        chapterId:String,
        validFrom: String,
        validTo: String,
        subChapterId:String,
        communityId:String,
        isActive:Boolean,
        hierarchyLevel:String,
        hierarchyCode:String,
        departmentId: String,
        departmentName : String,
        subDepartmentId : String,
        subDepartmentName : String
    }
    
    type MoolyaProfile{
        firstName: String,
        middleName: String,
        lastName: String,
        userType: String,
        isChapterAdmin : Boolean,
        subChapter: String,
        roleType: String,
        assignedDepartment:[AssignedDepartment],
        displayName: String,
        email:String,
        contact:[Contacts],
        globalAssignment:Boolean,
        isActive:Boolean,
        userProfiles:[UserProfiles]
    }

     input assignedDepartment{
        department: String,
        subDepartment: String
    }
    
    input contacts{
        contactNumberType:String,
        countryCode:String,
        number:String,
        isOTPValidated:Boolean
    }
    
    input userRoles{
        roleId:String,
        clusterId:String,
        validFrom:String,
        validTo:String,
        chapterId:String,
        subChapterId:String,
        communityId:String,
        isActive:Boolean,
        hierarchyLevel:Int,
        hierarchyCode:String,
        roleName:String,
        departmentId: String,
        departmentName : String,
        subDepartmentId : String,
        subDepartmentName : String
    }
    
    input userprofiles{
        isDefault: Boolean,
        clusterId: String,
        userRoles:[userRoles]
    }
  
    input moolyaProfile{
        firstName: String,
        middleName: String,
        lastName: String,
        userType: String,
        subChapter: String,
        roleType: String,
        assignedDepartment:[assignedDepartment],
        displayName: String,
        email:String,
        contact:[contacts],
        globalAssignment:Boolean,
        isActive:Boolean,
        userProfiles:[userprofiles]
        
    }

    input InternalUprofile{
        moolyaProfile: moolyaProfile
    }
    
    input externalProfile{
        registrationId    : String,
        countryName       : String,
        countryId         : String,
        cityName          : String,
        cityId            : String,
        mobileNumber      : String,
        clusterId         : String,
        clusterName       : String,
        chapterId         : String,
        chapterName       : String,
        subChapterId      : String,
        subChapterName    : String,
        communityId       : String,
        communityName     : String,
        communityType     : String,
        isDefault         : Boolean,
        isProfileActive   : Boolean,
        accountType       : String,
        optional          : Boolean
    }
    
    input up{
        userProfiles      : [externalProfile]        
    }
  
    input profile{
        isInternaluser    : Boolean,
        isExternaluser    : Boolean,
        email             : String,
        isActive          : Boolean,
        isChapterAdmin    : Boolean,
        InternalUprofile  : InternalUprofile,
        externalUserProfile:up
    }
    
    input userObject{
        username: String,
        password: String,
        profile:profile
    }
    
    type dep{
        department:String,
        departmentName:String,
        subDepartment:String,
        subDepartmentName:String,
        isAvailiable:Boolean
    }
    
    type userDetails{
        alsoAssignedas: String,
        displayName:String,
        userName:String,
        deActive: Boolean
    }
    
    type contextRoles{
        roleId:String,
        roleName:String,
        isChapterAdmin:Boolean,
        validFrom:String, 
        validTo:String, 
        isActive:Boolean,
        clusterId:String, 
        chapterId:String, 
        subChapterId:String, 
        communityId:String,
        hierarchyLevel:Int,
        hierarchyCode:String,
        departmentId:String,
        departmentName:String,
        subDepartmentId:String,
        subDepartmentName:String
    }
   
    
    type Mutation{
        createUser(user:userObject!, moduleName:String, actionName:String):response
        updateUser(userId:String!, user:userObject!, moduleName:String, actionName:String):response
        resetPassword (userId:String!, password: String!, moduleName:String, actionName:String):response
        addUserProfile(userId:String, user:userObject): String
        assignUsers(userId:String, user:userObject, moduleName:String, actionName:String): response
        deActivateUser(userId:String, deActive:Boolean, moduleName:String, actionName:String): response
    }
    
    type Query{
        fetchUserDetails(userId:String): userDetails
        fetchUser(userId:String): BackendUsers
        fetchUsersByClusterDepSubDep(clusterId:String): [BackendUsers]
        fetchUserDepSubDep(userId:String, clusterId:String):[dep]
        fetchUserRoles(userId:String):[contextRoles]
        fetchAssignedUsers(clusterId:String, chapterId:String, subChapterId:String, communityId:String,subChapterName:String): [BackendUsers]
        fetchUsersBysubChapterDepSubDep(clusterId:String, chapterId:String, subChapterId:String): [BackendUsers]
        fetchsubChapterUserDepSubDep(userId:String, subChapterId:String):[dep]  
        fetchAssignedAndUnAssignedUsers(clusterId:String, chapterId:String, subChapterId:String, communityId:String,subChapterName:String): [BackendUsers]
        fetchUsersForDashboard(clusterId:String, chapterId:String, subChapterId:String, userType:String): SearchResp
        fetchUserTypeFromProfile:String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],BackEndUser]);
// userObject changed
// fetchChapterBasedRoles(userId:String, clusterId:String): UserProfiles
// fetchClusterBasedRoles(userId:String, clusterId:String): UserProfiles

