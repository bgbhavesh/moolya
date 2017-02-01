import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let CommunitySchema = `
    type Community{
     name :String
      displayName :String
      cluster: String
      chapter: String
      link : String
      id:String      
      showOnMap : Boolean
      about : String
      isActive : Boolean
    }
   
    
    type Mutation 
    {
        createCommunity(
          name:String,
          displayName:String,
          cluster:String
          chapter:String,
          link:String,
          showOnMap:Boolean,
          about:String,
          isActive:Boolean):String
    }
    
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],CommunitySchema]);
