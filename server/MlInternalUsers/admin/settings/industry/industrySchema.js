import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Industry = `        
    type Industry{
      industryName :String
      industryDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateIndustry(_id:String,industryName:String,industryDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateIndustry(_id:String,industryName:String,industryDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response        
    }
    type Query{
      FindIndustry(_id: String):Industry
      fetchIndustries:[Industry]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Industry]);
