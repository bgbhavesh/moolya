import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let BusinessType = `        
    type BusinessType{
      businessTypeName :String
      businessTypeDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
        
    type Mutation{
        CreateBusinessType(_id:String,businessTypeName:String,businessTypeDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateBusinessType(_id:String,businessTypeName:String,businessTypeDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindBusinessType(_id: String):BusinessType
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], BusinessType]);

