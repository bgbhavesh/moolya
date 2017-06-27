/**
 * Created by pankaj on 26/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";

let appointment=`
  
  type Query {   
     
  }
  
  type Mutation {
     
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  // {api:'fetchMyCalendarSetting', actionName:'READ', moduleName:"OFFICE"}
];
MlResolver.MlModuleResolver.push(supportedApi);
