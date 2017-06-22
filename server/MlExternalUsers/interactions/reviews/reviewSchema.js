/**
 * Created by mohammed.mohasin on 21/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let reviewSchema = `
    type Mutation{
        createReview(resourceId:String!,resourceType:String!,message:String!):response       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],reviewSchema]);
