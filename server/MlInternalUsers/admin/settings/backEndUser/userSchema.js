/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let BackEndUser = `  
    
    type department{
    departmentId : String
    subDepartmentId : String
    }
    
    type contact{
    contactType : String
    contactNumberType : String
    countryCode : String
    number : String
    isOTPValidated : Boolean
    }
    
    type User 
    {
    firstName : String
    middleName : String
    lastName : String
    userType : String
    roleType : String
    password : String    
    departments : [department]
    displayName : String
    contacts : [contact]
    email : String
    globalAssignmentAvailability : String
    isActive : String
    }
    
    input assignedDepartment{
    departmentId : String
    subDepartmentId : String
    }
    
    input contactInput{
    contactType : String
    contactNumberType : String
    countryCode : String
    number : String
    isOTPValidated : Boolean
    }
    
    
    input UserInput 
    {
    firstName : String
    middleName : String
    lastName : String
    userType : String
    roleType : String
    password : String    
    departments : [assignedDepartment]
    displayName : String
    contacts : [contactInput]
    email : String
    globalAssignmentAvailability : String
    isActive : Boolean
    }
    
    input UserUpdate 
    {
    id : String
    firstName : String
    middleName : String
    lastName : String
    userType : String
    roleType : String
    password : String    
    departments : [assignedDepartment]
    displayName : String
    contacts : [contactInput]
    email : String
    globalAssignmentAvailability : String
    isActive : Boolean
    }
    
    input role{
      roleId : String
      chapterId : String
      subchapterId : String
      communityId : String
    }
    
    input UserProfile{
      id : String
      isDefault : Boolean
      clusterId : String
      userRoles : [role]
    }
    
    type Mutation{
        createUser(user : UserInput):String
        assignUser(user : UserProfile):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],BackEndUser]);
console.log(MlSchemaDef);
