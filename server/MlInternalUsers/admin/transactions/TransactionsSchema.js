import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef';

let transactionsSchema = `        
    
    type Transactions{
      transactionTypeName       : String
      transactionTypeId         : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : String
      transactionAssignedBy     : String
      transactionCompletedBy    : String
      transactionCreatedDate    : String
      transactionUpdatedDate    : String
      hierarchy                 : String
    }
    input TransactionsInput{
      transactionTypeName       : String
      transactionTypeId         : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : String
      transactionAssignedBy     : String
      transactionCompletedBy    : String
      transactionCreatedDate    : String
      transactionUpdatedDate    : String
      hierarchy                 : String
    }
    type Mutation{
      createTransaction(transaction:TransactionsInput):response
      updateTransaction(transactionId:TransactionsInput):response
    }
    type Query{
      fetchTransactionsByUser(userId:String):[Transactions]
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], transactionsSchema]);
