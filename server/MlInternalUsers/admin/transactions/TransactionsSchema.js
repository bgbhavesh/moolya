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
    type allocation{
        assignee            : String
        assigneeId          : String
        assignedDate        : Date
        department          : String
        departmentId        : String
        subDepartment       : String
        subDepartmentId     : String
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
      allocation                : allocation
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
      allocation                : allocationInput
    }
    input allocationInput{
        assignee            : String
        assigneeId          : String
        assignedDate        : Date
        department          : String
        departmentId        : String
        subDepartment       : String
        subDepartmentId     : String
    }
    input assignmentParams{
       cluster        : String
       chapter        : String
       subChapter     : String
       community      : String
       department     : String
       subDepartment  : String
       role           : String
       user           : String
    }
    type Mutation{
      createTransaction(transaction:TransactionsInput):response
      updateTransaction(transactionId:TransactionsInput):response
      createRegistrationTransaction(params:assignmentParams):response
    }
    type Query{
      fetchTransactionsByUser(userId:String):[Transactions]
      fetchTransactions(transactionType:String):[Transactions]
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], transactionsSchema]);
