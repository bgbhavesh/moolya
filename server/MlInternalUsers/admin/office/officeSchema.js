/**
 * Created by venkatsrinag on 6/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'
import MlResolver from '../../../commons/mlResolverDef'

let office = `
  type Office{
  }
  
  input office{
      
  }
`
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],  office]);
let supportedApi = [{api:'FetchMenu', actionName:'READ', isWhiteList: true, moduleName:"MENU"}];
MlResolver.MlModuleResolver.push(supportedApi)
