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
      clusters: [clustersOutput],
      chapters: [chaptersOutput],
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
      clusters: [clusters],
      chapters: [chapters],
      link : String,
      id:String,      
      showOnMap : Boolean,
      communityDescription : String,
      isActive : Boolean,
  }
    
    type Mutation {
         createCommunity(community:communityInput): String
    }
     type Query{
        FetchMapData(moduleName:String,id:String):[MapData]
        fetchCommunityDef: CommunityDefOutput
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], CommunitySchema]);

