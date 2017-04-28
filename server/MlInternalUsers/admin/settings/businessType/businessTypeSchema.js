import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
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
      fetchBusinessTypes:[BusinessType]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], BusinessType]);

