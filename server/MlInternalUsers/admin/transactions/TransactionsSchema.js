import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef';

let transactionsSchema = `        
     type byInfo{
      type                      : String
      id                        : String
    }
    type trailInfo{
      statusCode                : String
      statusDescription         : String
      at                        : String
      by                        : byInfo
    }
    type statusInfo{
      code                      : String
      description               : String
      trail                     : [trailInfo]
    }
    type Transactions{
      transactionTypeName       : String
      transactionTypeId         : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : statusInfo
      transactionAssignedBy     : String
      transactionCompletedBy    : String
      transactionCreatedDate    : String
      transactionUpdatedDate    : String
      hierarchy                 : String
    }
    input byInput{
      type                      : String
      id                        : String
    }
    input trailInput{
      statusCode                : String
      statusDescription         : String
      at                        : String
      by                        : byInput
    }
    input statusInput{
      code                      : String
      description               : String
      trail                     : [trailInput]
    }
    input TransactionsInput{
      transactionTypeName       : String
      transactionTypeId         : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : statusInput
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
