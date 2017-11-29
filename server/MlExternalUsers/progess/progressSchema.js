/**
 * Created by Pankaj on 28/11/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef';
import MlResolver from '../../commons/mlResolverDef'

let progressSchema = `
  
  type Query {
        fetchProgresses: response
    }
    type Mutation {
        createProgress: response
    }
`;
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], progressSchema]);
let supportedApi = [
  {api:'fetchProgresses', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
  {api:'createProgress', actionName:'CREATE', moduleName:"OFFICE", isAppWhiteList: true},
];
MlResolver.MlModuleResolver.push(supportedApi);
