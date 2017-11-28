/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import { mergeStrings } from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


const inquirySchema = `
    type Mutation{
        createInquiry(resourceId:String!,resourceType:String!,subject:String!,message:String!):response       
    }
`

MlSchemaDef.schema = mergeStrings([MlSchemaDef.schema, inquirySchema]);
