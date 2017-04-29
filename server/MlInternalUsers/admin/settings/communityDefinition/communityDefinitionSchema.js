import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let CommunityDefinition = `        
    type CommunityDefinition{
      name :String
      displayName :String
      code: String
      communityImageLink : String
      showOnMap :Boolean
      aboutCommunity: String
      isActive:Boolean
      _id:String
    }
    type Mutation{

    }
    type Query{
      fetchCommunityDefinition:[CommunityDefinition]
       fetchCommunityDefinitionForSelect:[CommunityDefinition]
       fetchCommunityDefinitionAPI:[CommunityDefinition]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],CommunityDefinition]);
