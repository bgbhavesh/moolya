/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let BackEndUser = `    
    type BackEndUser 
    {
    firstName : String
    middleName : String
    lastName : String
    backEndUserType : String
    subChapter : String
    internalUser : String
    password : String
    displayName : String
    email : String
    globalAssignmentAvailability : String
    isActive : String
    }
    
    input AssignedDepartment{
    departmentId : String
    subDepartmentId : String
    }
    
    input Contact{
    contactType : String
    contactNumberType : String
    countryCode : String
    number : String
    isOTPValidated : Boolean
    }
    
    type Mutation{
        CreateUser(firstName : String,middleName : String,lastName : String,backEndUserType : String,subChapter : String,internalUser : String, password : String,AssignedDepartments:[AssignedDepartment], displayName : String, email : String,contacts:[Contact],globalAssignmentAvailability : String , isActive : String):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],BackEndUser]);
console.log(MlSchemaDef);
