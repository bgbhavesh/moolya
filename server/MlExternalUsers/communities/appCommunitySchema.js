/**
 * Created by venkatsrinag on 1/5/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'


let appCommunitySchema = `
    type appCommunities{
        name:String,
        communityName:String,
        displayName:String,
        code:String,
        communityImageLink:String,
        aboutCommunity:String,
        isActive:Boolean
    }
    
    type Query{
        fetchCommunitiesFromDef:[appCommunities]
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appCommunitySchema]);
