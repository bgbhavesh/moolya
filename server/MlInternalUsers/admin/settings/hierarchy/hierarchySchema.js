import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let HierarchySchema = `
    type Hierarchy
    {
      _id :String
      level:String
      module :String
      role :String
    } 
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],HierarchySchema]);
