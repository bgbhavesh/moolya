/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let followSchema = `
    type Mutation{
        followUser(resourceId:String!,resourceType:String!,follow:Boolean):response       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],followSchema]);
