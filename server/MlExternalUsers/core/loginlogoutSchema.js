/* eslint-disable */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from '../../commons/mlResolverDef'

let loginlogoutSchema = `
    type Mutation{
        login (username: String!, password: String!):LoginMethodResponse
        # Log the user out.
        logout (token: String!): response
    }
`
;
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], loginlogoutSchema]);
let supportedApi = [
  {api:'login',actionName:'UPDATE',moduleName:"LOGIN",isWhiteList:true},
  {api:'logout', actionName:'UPDATE', moduleName:"LOGOUT", isWhiteList:true}
]
// String
MlResolver.MlModuleResolver.push(supportedApi);
