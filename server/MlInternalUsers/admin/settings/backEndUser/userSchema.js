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
        profile:userProfile
    }
    
    type userProfile{
        isInternaluser: Boolean,
        isExternaluser: Boolean,
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
        userRoles:[UserRoles]
    }
    
    type UserRoles{
        roleId:String,
        clusterId:String,
        chapterId:String,
        validFrom: String,
        validTo: String,
        subChapterId:String,
        communityId:String,
        isActive:Boolean,
        hierarchyLevel:String,
        hierarchyCode:String
    }
    
    type MoolyaProfile{
        firstName: String,
        middleName: String,
        lastName: String,
        userType: String,
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
    
    input userroles{
        roleId:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        communityId:String,
        isActive:Boolean,
        hierarchyLevel:String
    }
    
    input userprofiles{
        isDefault: Boolean,
        clusterId: String,
        userRoles:[userroles]
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
  
    input profile{
        isInternaluser: Boolean,
        isExternaluser: Boolean,
        email: String,
        InternalUprofile: InternalUprofile
    }
    
    input userObject{
        username: String,
        password: String,
        profile:profile
    }
    
    type dep{
      department:String,
       subDepartment:String
    }
    
    type Mutation{
        createUser(user:userObject!, moduleName:String, actionName:String):String
        updateUser(userId:String!, user:userObject!): String
        addUserProfile(userId:String, user:userObject): String
        assignUsers(userId:String, user:userObject): response
    }
    
    type Query{
        fetchUser(userId:String): BackendUsers
        fetchUsersByClusterDepSubDep(clusterId:String): [BackendUsers]
        fetchUserRoles(userId:String): [UserRoles]
        fetchUserDepSubDep(userId:String, clusterId:String):[dep]
        fetchAssignedUsers(clusterId:String, chapterId:String, subChapterId:String, communityId:String,subChapterName:String): [BackendUsers]
        fetchUsersBysubChapterDepSubDep(subChapterId:String): [BackendUsers]
        fetchsubChapterUserDepSubDep(userId:String, subChapterId:String):[dep]  
        fetchAssignedAndUnAssignedUsers(clusterId:String, chapterId:String, subChapterId:String, communityId:String,subChapterName:String): [BackendUsers]
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],BackEndUser]);

