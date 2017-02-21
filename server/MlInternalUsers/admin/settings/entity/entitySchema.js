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
        CreateEntity(_id:String,entityName:String,entityDisplayName:String,about:String,isActive:Boolean):String
        UpdateEntity(_id:String,entityName:String,entityDisplayName:String,about:String,isActive:Boolean):String
    }
    type Query{
      FindEntity(_id: String):Entity
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], Entity]);

