import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let GlobalSettingsSchema = `
   enum GLOBAL_SETTINGS_TYPE {
            DATEANDTIME,NUMERICAL,REGIONAL
   }
      
      type DateAndTimeInfo{
           timeFormat:String
           amSymbol:String
           pmSymbol:String
           ateFormat:String
           numberOfDaysInWeek:String
           firstDayOfWeek:String    
      }
      
      type NumericalInfo{
             numberOfDigitsAfterDecimal:String,
             firstDayOfWeek:String,
             currencySymbol:String,
             measurementSystem:String,
             currencyFormat:String,
             valueSeparator:String
      }
      
      type RegionalInfo{
             clusterName:String,
             capitalName:String,
             regionalPhoneNumber:String,
             regionalCurrencyName:String,
             regionalCurrencyMarking:String,
             regionalFlag:String,
             aboutRegion:String,
             regionalZipFormat:String
             regionalCurrencySymbol:String
             regionalCurrencyValue:String,
       }

      input DateAndTimeInfoRequest{
           timeFormat:String
           amSymbol:String
           pmSymbol:String
           ateFormat:String
           numberOfDaysInWeek:String
           firstDayOfWeek:String 
      
      }
      
      input NumericalInfoRequest{
           numberOfDigitsAfterDecimal:String,
           firstDayOfWeek:String,
           currencySymbol:String,
           measurementSystem:String,
           currencyFormat:String,
           valueSeparator:String
      }
      
      input RegionalInfoRequest{
             clusterName:String,
             capitalName:String,
             regionalPhoneNumber:String,
             regionalCurrencyName:String,
             regionalCurrencyMarking:String,
             regionalFlag:String,
             aboutRegion:String,
             regionalZipFormat:String
             regionalCurrencySymbol:String
             regionalCurrencyValue:String
       }
      
      
      type GlobalSettings{
         dateAndTimeInfo:DateAndTimeInfo
         numericalInfo:NumericalInfo,
         regionalInfo:RegionalInfo
      }
      
      input GlobalSettingsRequest{
         dateAndTimeInfo:DateAndTimeInfoRequest
         numericalInfo:NumericalInfoRequest
         regionalInfo:RegionalInfoRequest
      }

      type Query{
        fetchGlobalSettings(type:GLOBAL_SETTINGS_TYPE):[GlobalSettings]    
      }
    
    type Mutation{
      updateGlobalSetting(type:GLOBAL_SETTINGS_TYPE!,settingsData:GlobalSettingsRequest):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],GlobalSettingsSchema]);
