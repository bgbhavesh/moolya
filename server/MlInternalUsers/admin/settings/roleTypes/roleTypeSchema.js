import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let RoleTypesSchema = `
    type RoleTypes
    {
      roleTypeName :String
      roleTypeDisplayName :String
      roleTypeDescription :String
      _id :String
      isActive :Boolean
    }
    
   type Mutation 
    {
        UpdateRoleType(_id:String, roleTypeDisplayName:String, roleTypeDescription:String, isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
        FindRoleType(_id:String): RoleTypes
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],RoleTypesSchema]);
