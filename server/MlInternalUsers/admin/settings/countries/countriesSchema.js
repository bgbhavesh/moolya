import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Countries = `   
   
    type Countries 
    {  
     _id : String  
     country : String
     countryCode : String
     url : String
     isActive : Boolean
    }
    type Query {
        FetchCountries(input: String): [Countries]
        FetchCountry(countryCode: String): Countries
        FetchCountriesSearch(searchQuery:String): [Countries]
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Countries]);
