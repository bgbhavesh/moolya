import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let ProcessTypesSchema = `
    type ProcessTypes
    {
      processName :String
      displayName :String
      processDesc :String
      _id :String
      isActive :Boolean
    }
    type Query{
        FetchProcessType:[ProcessTypes]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ProcessTypesSchema]);
