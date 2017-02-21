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
        CreateIndustry(_id:String,industryName:String,industryDisplayName:String,about:String,isActive:Boolean):String
        UpdateIndustry(_id:String,industryName:String,industryDisplayName:String,about:String,isActive:Boolean):String        
    }
    type Query{
      FindIndustry(_id: String):Industry
      fetchIndustrySearch: [Industry]
      fetchIndustries:[Industry]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Industry]);
