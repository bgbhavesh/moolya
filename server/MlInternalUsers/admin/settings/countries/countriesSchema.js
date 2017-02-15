import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let countriesSchema = `

    type Countries
    {
        _id           : String
        country       : String
        countryCode   : String
        displayName   : String
        url           : String
        isActive      : Boolean
    }
    
    input countryObject{
        id:String
        country       : String
        countryCode   : String
        displayName   : String
        url           : String
        isActive      : Boolean
    }
    
    type Query {
        fetchCountries: [Countries]
        fetchCountry(countryId: String): String
        fetchCountriesSearch: [Countries]
    }
    
    type Mutation{
        updateCountry(countryId: String, country: countryObject): String
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], countriesSchema]);
