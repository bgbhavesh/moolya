import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let countriesSchema = `

    type Countries{
        _id           : String,
        country       : String,
        countryCode   : String,
        displayName   : String,
        url           : String,
        about         : String,
        capital       : String,
        isActive      : Boolean,
        lat           : String,
        lng           : String
    }
    
    input countryObject{
        id            : String,
        country       : String,
        countryCode   : String,
        displayName   : String,
        url           : String,
        about         : String,
        capital       : String,
        isActive      : Boolean
        lat           : String,
        lng           : String
    }
    
    type Query {
        fetchCountries: [Countries]
        fetchCountry(countryId: String): Countries
        fetchCountriesSearch: [Countries]
        fetchCountriesAPI:[Countries]
    }
    
    type Mutation{
        updateCountry(countryId: String, country: countryObject, moduleName:String, actionName:String): response
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], countriesSchema]);
// String
