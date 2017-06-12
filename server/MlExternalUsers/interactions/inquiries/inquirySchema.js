/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let inquirySchema = `
    type Mutation{
        createInquiry(requestId:String!,requestType:String!,subject:String!,message:String!):response       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],inquirySchema]);
