import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let DocumentMapping = `

   type DocumentMapping{
        _id:String,
        roleName: String, 
        displayName:String, 
        roleType:String,
        userType:String,
        about:String 
    }
    
    scalar Date
    input assignroles{
        cluster:String,
        chapter:String,
        subChapter:String,
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
    
    input actions{
        actionId : String
    }
    
    input modules{
        moduleId:String,
        actions : [actions]
        fieldRestrictions: [fieldRestrictions],
        permissions:[permissions]
    }
    
    input roleObject{
        roleName: String, 
        displayName:String, 
        roleType:String,
        userType:String,
        about:String, 
        assignRoles:[assignroles],
        modules:[modules], 
        isActive:Boolean
    }
    
    type Query {
        fetchDocumentMapping(roleName: String, roleValue: String, name: String): String
    }
    
    type Mutation {
       createDocumentMapping(role:roleObject): String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DocumentMapping]);

