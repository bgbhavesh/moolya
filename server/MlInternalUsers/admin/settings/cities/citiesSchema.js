import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let citiesSchema = `       
    type MlCities
    {     
        _id         : String,
        name        : String,
        stateId     : String,
        countryId   : String,
        countryCode : String,
        isActive    : Boolean
    }
    
    input cityObject{
        _id         : String,
        name        : String,
        stateId     : String,
        countryId   : String,
        countryCode : String,
        isActive    : Boolean
    }
    
    type Query {
        fetchCities(countryId: String!): [MlCities]      
    }
    
    type Mutation {
        updateCity(cityId: String!, city:cityObject!): String      
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], citiesSchema]);
