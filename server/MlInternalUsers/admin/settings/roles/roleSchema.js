import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Role = `
    scalar Date
    input assignroles{
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        communityId:String,
        department:String, 
        subDepartment:String, 
        isActive:Boolean
    }
    
    input permissions{
        actionId:String,
        validFrom:Date,
        validTo:Date,
        isActive:Boolean
    }
    
    input fieldRestrictions{
        fieldName:String,
        actionId:String
    }
    
    input modules{
        moduleId:String,
        fieldRestrictions: [fieldRestrictions],
        permissions:[permissions]
    }
    
    input roleObject{
        roleName: String, 
        displayName:String, 
        roleType:String,
        assignRoles:[assignroles],
        modules:[modules], 
        about:String, 
        isActive:Boolean
    }
    
    type Query {
        fetchRole(roleName: String, roleValue: String, name: String): String
    }
    
    type Mutation {
       createRole(role:roleObject): String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Role]);
console.log(MlSchemaDef);
