import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Transaction = `        
    
    type Transaction{
      transactionName :String
      transactionDisplayName :String
      transactionDescription: String
      createdDateTime: Date
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateTransaction(_id:String,transactionName:String,transactionDisplayName:String,transactionDescription:String,createdDateTime: Date,isActive:Boolean , moduleName:String, actionName:String):response
        UpdateTransaction(_id:String,transactionName:String,transactionDisplayName:String,transactionDescription:String,isActive:Boolean , moduleName:String, actionName:String):response
    }
    type Query{
      FindTransaction(_id: String):Transaction
      fetchTransaction:[Transaction]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Transaction]);

