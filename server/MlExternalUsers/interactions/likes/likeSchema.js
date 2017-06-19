/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let likeSchema = `
    type Query{
        fetchLikes(resourceType:String):response       
    }
    type Mutation{
        likeRequest(resourceId:String!,resourceType:String!):response       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],likeSchema]);
