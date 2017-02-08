import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Countries = `    
    type MlCountries 
    {     
     country : String
     countryCode : String
     url : String
     isActive : Boolean
    }
    type Query {
        FetchCountries(input: String): [MlCountries]
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Countries]);
