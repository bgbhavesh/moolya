import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let PermissionsSchema = `
    type Permissions
    {
      permissionName :String
      displayName :String
      permissionDesc: String
      _id:String
      isActive:Boolean
    }
   type Mutation 
    {
        CreatePermission(_id:String,permissionName:String, displayName:String, permissionDesc:String, isActive:Boolean):String
        UpdatePermission(_id:String,permissionName:String, displayName:String, permissionDesc:String, isActive:Boolean):String
    }
    type Query{
        FindPermission(_id:String): Permissions
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],PermissionsSchema]);
