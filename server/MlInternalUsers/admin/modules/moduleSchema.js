/**
 * Created by venkatasrinag on 9/2/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let modules = `
    type Query {
        fetchModules: String
    }    
`

//TODO: Update Role

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], modules]);
console.log(MlSchemaDef);
