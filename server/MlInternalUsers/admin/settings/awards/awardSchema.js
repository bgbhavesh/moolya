import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Award = `        
    type Award{
      awardName :String
      awardDisplayName :String
      about: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateAward(_id:String,awardName:String,awardDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateAward(_id:String,awardName:String,awardDisplayName:String,about:String,isActive:Boolean, moduleName:String, actionName:String):response        
    }
    type Query{
      FindAward(_id: String):Award
      fetchActiveAwards:[Award]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Award]);
