import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Template = `        
    type Template{
      templateName :String
      templateDisplayName :String
      templateDescription: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateTemplate(_id:String,templateName:String,templateDisplayName:String,templateDescription:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateTemplate(_id:String,templateName:String,templateDisplayName:String,templateDescription:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindTemplate(_id: String):Template
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Template]);
