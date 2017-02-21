import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let StageOfCompany = `        
    type StageOfCompany{
      stageOfCompanyName :String
      stageOfCompanyDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateStageOfCompany(_id:String,stageOfCompanyName:String,stageOfCompanyDisplayName:String,about:String,isActive:Boolean):String
        UpdateStageOfCompany(_id:String,stageOfCompanyName:String,stageOfCompanyDisplayName:String,about:String,isActive:Boolean):String
    }
    type Query{
      FindStageOfCompany(_id: String):StageOfCompany
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], StageOfCompany]);

