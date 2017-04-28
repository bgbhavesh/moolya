import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let IdentityTypesSchema = `
    type IdentityTypes
    {
      _id :String
      identityTypeName:String
      identityTypeDisplayName :String
      isActive :Boolean
      communities:[String]
    }
   
    type Query{
        FetchIdentityTypes:[IdentityTypes]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],IdentityTypesSchema]);
