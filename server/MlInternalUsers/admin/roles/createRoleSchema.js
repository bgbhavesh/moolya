import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let CreateRole = `    
    input AssignRole 
    {
        cluster : String
        chapter : String
        subChapter : String
        department : String
        subDepartment : String
        isActive : Boolean
    }
    
    input Permission{
        permissionId : String
        validFrom : String
        validTo : String
        isActive : Boolean
    }
    
    type Mutation{
        CreateRole(roleName:String,displayName:String,roletype:String,description:String,assignRoles:[AssignRole],permissions:[Permission],isActive:Boolean):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],CreateRole]);
console.log(MlSchemaDef);
