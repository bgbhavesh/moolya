import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let Role = `
    type Role{
      roleName: String,
      roleValue:String
    }
    type MlRole 
    {
      name: String
      role:[Role]
    }
    type Query {
        FetchRole(roleName: String, roleValue: String,name: String): MlRole
        FetchRoles(name: String,searchQuery:String): [Role]
    }   
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Role]);
console.log(MlSchemaDef);
