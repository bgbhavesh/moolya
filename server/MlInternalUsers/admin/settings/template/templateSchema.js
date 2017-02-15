import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Template = `        
    
    type Template{
      templateName :String
      templateDisplayName :String
      templateDescription: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateTemplate(_id:String,templateName:String,templateDisplayName:String,templateDescription:String,isActive:Boolean):String
        UpdateTemplate(_id:String,templateName:String,templateDisplayName:String,templateDescription:String,isActive:Boolean):String
    }
    type Query{
      FindTemplate(_id: String):Template
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Template]);
console.log(MlSchemaDef);
