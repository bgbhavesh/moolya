import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'

let transactOperations = `

input transactionParams{  
   allocation        :   allocationInput
   assignedUserId    :   String
   status            :   String
}

type Mutation {
  updateGenericTransaction(module: String!,params:transactionParams,transactionType:String,operation:String,transactionId:String):response
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],transactOperations]);
