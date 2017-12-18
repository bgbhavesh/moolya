/**
 * Created by venkatasrinag on 17/1/17.
 */
/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import {mergeStrings} from 'gql-merge'

const schema = `
  type response{
      success : Boolean,
      code : Int,
      result: String
  }
  type LoginMethodResponse {
    # Id of the user logged in user
    success: Boolean
    # Token of the connection
    token: String
    # Expiration date for the token
    message: String
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
