import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let RequestTypeSchema = `
    type Requests
    {
      requestName :String
      displayName :String
      requestDesc: String
      _id:String
      isActive:Boolean
    }
   type Mutation 
    {
        CreateRequestType(_id:String,requestName:String, displayName:String, requestDesc:String, isActive:Boolean):String
        UpdateRequestType(_id:String,requestName:String, displayName:String, requestDesc:String, isActive:Boolean):String
    }
    type Query{
        FindRequestType(_id:String): Requests
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],RequestTypeSchema]);
