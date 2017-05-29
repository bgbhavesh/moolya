import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

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
let supportedApi = [
  {api:'FindUserType', actionName:'READ', moduleName:"USERTYPE"},
  {api:'FetchUserType', actionName:'READ', moduleName:"USERTYPE"},
  {api:'FetchUserTypeForMultiSelect', actionName:'READ', moduleName:"USERTYPE"},
  {api:'FetchUserTypeSelect', actionName:'READ', moduleName:"USERTYPE"},
  {api:'createUserType', actionName:'CREATE', moduleName:"USERTYPE"},
  {api:'UpdateUserType', actionName:'UPDATE', moduleName:"USERTYPE"}
];
MlResolver.MlModuleResolver.push(supportedApi)
