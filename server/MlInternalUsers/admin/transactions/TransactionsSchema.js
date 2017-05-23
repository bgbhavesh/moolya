import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef';

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
    
    type userAgent{
        OS                  :String
        ipAddress           :String
        browser             :String
        deviceModel         :String
        deviceType          :String
        deviceVendor        :String
    }
    
    type Transactions{
       _id                      : String
       status                   : String
      transactionTypeName       : String
      transactionTypeId         : String
      requestId                 : String
      userId                    : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : statusInfo
      transactionAssignedBy     : String
      transactionCompletedBy    : String
      transactionCreatedDate    : Date
      transactionUpdatedDate    : Date
      hierarchy                 : String
      allocation                : allocation
      cluster                   : String
      chapter                   : String
      subChapter                : String
      community                 : String
    }
    
    type TransactionsLog{
       _id                      : String
      userId                    : String
      userName                  : String
      action                    : String
      userAgent                 :[userAgent]
      createdAt                 :String
      transactionDetails        :String
    
    }
    
    input userAgentInput{
        OS                  :String
        ipAddress           :String
        browser             :String
        deviceModel         :String
        deviceType          :String
        deviceVendor        :String
    }
    
    input TransactionsLogInput{
       _id                      : String
      userId                    : String
      userName                  : String
      action                    : String
      createdAt                 : String
      emailId                   : String
      userAgent                 : [userAgentInput]
      transactionDetails        : String
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
     input allocationInput{
        assignee            : String
        assigneeId          : String
        assignedDate        : String
        department          : String
        departmentId        : String
        subDepartment       : String
        subDepartmentId     : String
    }
    input TransactionsInput{
       status                   : String
      transactionTypeName       : String
      transactionTypeId         : String
      requestId                 : String
      userId                    : String
      requestTypeName           : String
      requestTypeId             : String
      requestDescription        : String
      transactionStatus         : statusInput
      transactionAssignedBy     : String
      transactionCompletedBy    : String
      transactionCreatedDate    : Date
      transactionUpdatedDate    : Date
      hierarchy                 : String
      allocation                : allocationInput
      cluster                   : String
      chapter                   : String
      subChapter                : String
      community                 : String
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
      updateTransaction(transactionId:TransactionsInput,collection:String):response
      assignTransaction(params:assignmentParams,transactionId:String,transactionType:String,collection:String):response
      updateTransactionStatus(transactionId:String,status:String):response
      createRegistrationTransaction(transactionType:String):response
      updateRegistrationTransaction(transactionInfo:TransactionsInput):response
      selfAssignTransaction(transactionId:String,collection:String):response
      unAssignTransaction(transactionId:String,collection:String):response
      createTransactionLog(transaction:TransactionsLogInput):response
    }
    type Query{
      fetchTransactionsByUser(userId:String):[Transactions]
      fetchTransactions(transactionType:String,status:[String]):[Transactions]
      fetchTransactionsLog(userId:String):[TransactionsLog]
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], transactionsSchema]);
