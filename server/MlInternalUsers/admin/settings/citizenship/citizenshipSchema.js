import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Citizenship = `        
    type Citizenship{
      citizenshipTypeName :String
      citizenshipTypeDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateCitizenship(_id:String,citizenshipTypeName:String,citizenshipTypeDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateCitizenship(_id:String,citizenshipTypeName:String,citizenshipTypeDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindCitizenship(_id: String):Citizenship
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], Citizenship]);

