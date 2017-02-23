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
   
   type MapData {
   key:String,
   count:Int
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
     type Query{
        FetchMapData(moduleName:String,id:String):[MapData]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], CommunitySchema]);

