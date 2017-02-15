import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Transaction = `        
    
    type Transaction{
      transactionName :String
      transactionDisplayName :String
      transactionDescription: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateTransaction(_id:String,transactionName:String,transactionDisplayName:String,transactionDescription:String,isActive:Boolean):String
        UpdateTransaction(_id:String,transactionName:String,transactionDisplayName:String,transactionDescription:String,isActive:Boolean):String
    }
    type Query{
      FindTransaction(_id: String):Transaction
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Transaction]);
console.log(MlSchemaDef);
