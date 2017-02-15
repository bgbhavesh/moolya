/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let BackEndUser = `

     input assignedDepartment{
        department: String,
        subDepartment: String
    }
    
    input contacts{
        contactNumberType:String,
        contactType: String,
        countryCode:String,
        number:String,
        isOTPValidated:String
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
        isInternaluser: String,
        isExternaluser: String,
        email: String,
        InternalUprofile: InternalUprofile
    }
    
    input userObject{
        username: String,
        password: String,
        profile:profile
    }
    
    
    type Mutation{
        createUser(user:userObject!):String
        updateUser(userId:String!, user:userObject!): String
    }
    
    type Query{
        fetchUsers: String
        fetchUser(userId:String): String
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],BackEndUser]);
console.log(MlSchemaDef);
