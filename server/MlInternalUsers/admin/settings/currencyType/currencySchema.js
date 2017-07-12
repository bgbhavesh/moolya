import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';
import MlResolver from '../../../../commons/mlResolverDef'

let currencySchema = ` 

type currency{

  _id:String,
  countryName:String,
  currencyName:String,
  currencyCode:String,
  symbol_native:String,
  currencyCode:String,
  isActive:Boolean
   
   }
   type Query {
        fetchCurrency: [currency]
        fetchCurrencySymbol : [currency]
        }
        `

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], currencySchema]);

let supportedApi = [

  {api:'fetchCurrency', actionName:'READ', moduleName:"GLOBALSETTINGS"},
  {api:'fetchCurrencySymbol',actionName:'READ',moduleName:"GLOBALSETTINGS"}
]
MlResolver.MlModuleResolver.push(supportedApi)
