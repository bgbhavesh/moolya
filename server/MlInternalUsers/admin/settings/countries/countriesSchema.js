import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let coutriesSchema = `

    type Countries
    {
        _id           : String
        country       : String
        countryCode   : String
        displayName   : String
        url           : String
        isActive      : Boolean
    }
    type Query {
        fetchCountries: [Countries]
        fetchCountry(countryCode: String): String
        fetchCountriesSearch(searchQuery:String): String
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], coutriesSchema]);
