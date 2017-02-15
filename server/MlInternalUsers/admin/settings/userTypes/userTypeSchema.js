import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let UserTypesSchema = `
    type UserTypes
    {
      userTypeName :String
      displayName :String
      userTypeDesc :String
      _id :String
      isActive :Boolean
    }
    
   type Mutation 
    {
        UpdateUserType(_id:String, userTypeName:String, displayName:String, userTypeDesc:String, isActive:Boolean):String
    }
    type Query{
        FindUserType(_id:String): UserTypes
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],UserTypesSchema]);
