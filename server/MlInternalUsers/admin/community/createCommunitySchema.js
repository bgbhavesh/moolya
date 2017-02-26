import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let CommunitySchema = `

    type clustersOutput{
        id   :  String
    } 
     type chaptersOutput{
        id   :  String
    } 

    type Community{
      communityName :String,
      communityDisplayName :String,
      link : String,
      id:String,      
      showOnMap : Boolean,
      communityDescription : String,
      isActive : Boolean,
    }
    type CommunityDef{
      name :String
      displayName :String
      communityImageLink: String
      code: String
      aboutCommunity : String
      clusters: [clustersOutput]
      chapters: [chaptersOutput]
      _id:String      
      showOnMap : Boolean
      isActive : Boolean
    }
    type CommunityDefOutput{
      data:[CommunityDef]
    }
   
   type MapData {
   key:String,
   count:Int
   }
   
  input clusters{
      id   :  String
  }    
  input chapters{
      id   :  String
  }    
  input communityInput{
      communityName :String,
      communityDisplayName :String,
      communityDefId:String,
      communityDefCode:String,
      communityDefName:String,
      link : String,    
      showOnMap : Boolean,
      communityDescription : String,
      isActive : Boolean,
  }
  input communityDefInput{
      name :String,
      displayName :String,
      communityImageLink: String,
      code: String,
      aboutCommunity : String,
      clusters: [clusters],
      chapters: [chapters],
      showOnMap : Boolean,
      isActive : Boolean,
    }
    
    type Mutation {
         updateCommunityDef(_id:String, communityDef:communityDefInput): String
    }
     type Query{
        FetchMapData(moduleName:String,id:String):[MapData]
        fetchCommunityDef(_id:String): CommunityDef
        fetchCommunityDefs: CommunityDefOutput
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], CommunitySchema]);

