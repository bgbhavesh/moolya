import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let RegionalSchema = `
    type Regional
    {
      _id :String
      clusterName : String
      capitalName : String
      regionalPhoneNumber : String
      regionalCurrencyName: String
      regionalCurrencyMarking: String
      regionalFlag : String
      aboutRegion : String
      regionalZipFormat : String
      regionalCurrencySymbol: String
      regionalCurrencyValue: String
    }
    input regionalObject{
        clusterName : String,
        capitalName : String,
        regionalPhoneNumber : String,
        regionalCurrencyName: String,
        regionalCurrencyMarking: String,
        regionalFlag : String,
        aboutRegion : String,
        regionalZipFormat : String,
        regionalCurrencySymbol: String,
        regionalCurrencyValue: String,
        _id :String,
    }
    
   type Mutation 
    {
        updateRegional(_id:String, regional: regionalObject):String
        createRegional(regional:regionalObject):String
    }
    type Query{
        fetchRegional(_id:String): Regional
        fetchRegionals:[Regional]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],RegionalSchema]);
