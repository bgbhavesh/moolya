import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Countries = `   
   
    type MlCountries 
    {  
     _id : String  
     country : String
     countryCode : String
     url : String
     isActive : Boolean
    }
    type Query {
        FetchCountries(input: String): [MlCountries]
        FetchCountry(countryCode: String): MlCountries
        FetchCountriesSearch(searchQuery:String): [MlCountries]
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Countries]);
