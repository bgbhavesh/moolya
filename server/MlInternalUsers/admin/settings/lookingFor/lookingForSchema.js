import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let LookingForSchema = `
    type LookingFor
    {
      lookingForName :String
      lookingForDisplayName :String
      communityCode: String
      communityName: String
      about: String
      _id:String
      isActive:Boolean
    }
   type Mutation 
    {
        CreateLookingFor(_id:String,lookingForName:String, lookingForDisplayName:String, communityCode:String,communityName:String,about:String, isActive:Boolean, moduleName:String, actionName:String):response
        UpdateLookingFor(_id:String,lookingForName:String, lookingForDisplayName:String, communityCode:String,communityName:String,about:String, isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
        FindLookingFor(_id:String): LookingFor
        fetchLookingFor(communityCode:String):[LookingFor]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],LookingForSchema]);
