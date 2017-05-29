import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

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
        lng           : String,
        phoneNumberCode : String
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
        lng           : String,
        phoneNumberCode : String
    }
    
    type Query {
        fetchCountries: [Countries]
        fetchCountry(countryId: String): Countries
        fetchCountriesSearch: [Countries]
        fetchCountriesAPI:[Countries]
        fetchCountryCode(clusterId: String):Countries
    }
    
    type Mutation{
        updateCountry(countryId: String, country: countryObject, moduleName:String, actionName:String): response
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], countriesSchema]);
let supportedApi = [
    {api:'fetchCountries', actionName:'READ', moduleName:"COUNTRIES"},
    {api:'fetchCountry', actionName:'READ', moduleName:"COUNTRIES"},
    {api:'fetchCountriesSearch', actionName:'READ', moduleName:"COUNTRIES", isWhiteList:true},
    {api:'fetchCountriesAPI', actionName:'READ', moduleName:"COUNTRIES"},
    {api:'fetchCountryCode', actionName:'READ', moduleName:"COUNTRIES"},
    {api:'updateCountry', actionName:'UPDATE', moduleName:"COUNTRIES"},
]
// String
MlResolver.MlModuleResolver.push(supportedApi)
