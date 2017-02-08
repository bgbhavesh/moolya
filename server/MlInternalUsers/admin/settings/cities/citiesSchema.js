import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Cities = `       
    type MlCities
    {     
     _id : String
     name : String
     stateId : String
     countryId: String
     countryCode : String
     isActive : Boolean
    }
    type Query {
        FetchCities(countryId: String,stateId: String): [MlCities]      
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Cities]);
