import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let States = `       
    type MlStates 
    {     
     _id : String
     name : String
     countryId: String
     countryCode : String
     isActive : Boolean
    }
    type Query {
        FetchStates(countryId: String): [MlStates]      
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],States]);
