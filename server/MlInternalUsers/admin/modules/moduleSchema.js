/**
 * Created by venkatasrinag on 9/2/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let modules = `
    type Module{
        _id:String
         name:String,
         displayName:String,
         code:String,
         isActive:Boolean
    }
    type Query {
        fetchModules: [Module]
    }    
`

//TODO: Update Role

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], modules]);
