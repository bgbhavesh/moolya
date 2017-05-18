import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let AccountType = `        
    type Account{
      accountName :String
      accountDisplayName :String
      accountDescription: String
      _id:String
      isActive:Boolean
    }
    type Mutation{
        CreateAccount(_id:String,accountName:String,accountDisplayName:String,accountDescription:String,isActive:Boolean, moduleName:String, actionName:String):response
        UpdateAccount(_id:String,accountName:String,accountDisplayName:String,accountDescription:String,isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
      FindAccount(_id: String):Account
      FetchAccount:[Account]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],AccountType]);
