import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let NumericalFormatSchema = `
    type NumericalFormat
    {
      _id : String
      numberOfDigitsAfterDecimal :String
      measurementSystem :String
      currencyFormat :String
      currencySymbol :String
      valueSeparator :String
    }
    input numericalFormatObject{
         _id : String,
      numberOfDigitsAfterDecimal :String,
      measurementSystem :String,
      currencyFormat :String,
      currencySymbol :String,
      valueSeparator :String,
    }
    
   type Mutation 
    {
        updateNumericalFormat(_id:String, numericalFormat: numericalFormatObject):String
        createNumericalFormat(numericalFormat:numericalFormatObject):String
    }
    type Query{
        findNumericalFormat(_id:String): NumericalFormat
        fetchNumericalFormat:[NumericalFormat]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],NumericalFormatSchema]);
