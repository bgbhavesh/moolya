import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Entity = `        
    type Entity{
      entityName :String
      entityDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateEntity(_id:String,entityName:String,entityDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateEntity(_id:String,entityName:String,entityDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindEntity(_id: String):Entity
      fetchEntities:[Entity]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], Entity]);

