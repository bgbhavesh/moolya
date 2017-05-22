import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let UserTypesSchema = `
    type UserTypes
    {
      userTypeName  :String
      displayName   :String
      userTypeDesc  :String      
      communityCode :String
      communityName :String
      _id           :String
      isActive      :Boolean
    }
     input userTypeObject{
        userTypeName  :String,
        displayName   :String,
        userTypeDesc  :String,
        communityCode :String,
        communityName :String,
        isActive      :Boolean
    }
    
   type Mutation 
    {
        UpdateUserType(_id:String, displayName:String, userTypeDesc:String, communityCode :String, communityName :String, isActive:Boolean , moduleName:String, actionName:String):response
        createUserType(userType:userTypeObject, moduleName:String, actionName:String):response
    }
    type Query{
        FindUserType(_id:String): UserTypes
        FetchUserType(communityCode:String,displayAllOption:Boolean):[UserTypes]
        FetchUserTypeForMultiSelect(communityId:[String]):[UserTypes]   
        FetchUserTypeSelect:[UserTypes]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],UserTypesSchema]);
//FetchUserType1:[UserTypes]
