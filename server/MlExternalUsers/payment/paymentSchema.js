

import { mergeStrings } from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef';
import MlResolver from '../../commons/mlResolverDef'

const paymentSchema = `
    type Mutation {
      updatePayment( transactionId:String, Status: String ): response       
    }
`;

MlSchemaDef.schema = mergeStrings([MlSchemaDef.schema, paymentSchema]);
