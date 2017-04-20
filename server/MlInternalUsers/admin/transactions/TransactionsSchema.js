import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef';

let transactionsSchema = `        
    
    type Transactions{
      transactionType       : String
      transactionStatus     : String
      transactionAssignedBy : String
      transactionCompletedBy: String
      hierarchy             : String
    }
    input TransactionsInput{
      transactionType       : String
      transactionStatus     : String
      transactionAssignedBy : String
      transactionCompletedBy: String
      hierarchy             : String
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
