/**
 * Created by venkatasrinag on 17/1/17.
 */
import { Meteor } from 'meteor/meteor';
import {mergeStrings} from 'gql-merge'

const schema = `
  
  type ResponseMessage{
      message: String
  }
  
  union ResponseResult = ResponseMessage | Cluster
    
  type response{
      success : Boolean,
      code : Int,
      result: String
  }
  
  type response1{
      success : Boolean,
      code : Int,
      result: ResponseResult
  }
  
  type Query {
      genericQuery(id: String): String
  }
  
  type Mutation{  
      genericMutation(id: String): String
  }
  
  schema{
      query: Query
      mutation:Mutation
  }
`

MlSchemaDef ={'schema':schema};

module.exports = MlSchemaDef;
