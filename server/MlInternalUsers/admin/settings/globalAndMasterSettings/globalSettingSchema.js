/**
 * Created by mohammed.mohasin on 04/03/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let GlobalSettingsSchema = `
   enum GLOBAL_SETTINGS_TYPE {
            DATEANDTIME,NUMERICAL,REGIONAL
   }
      
      type DateAndTimeInfo{
           timeFormat:String
           amSymbol:String
           pmSymbol:String
           dateFormat:String
           numberOfDaysInWeek:String
           firstDayOfWeek:String   
           hoursFormat:Boolean
      }
      
      type NumericalInfo{
             numberOfDigitsAfterDecimal:String,
             firstDayOfWeek:String,
             currencySymbol:String,
             measurementSystem:String,
             currencyFormat:Boolean,
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
           dateFormat:String
           numberOfDaysInWeek:String
           firstDayOfWeek:String 
           hoursFormat:Boolean
      }
      
      input NumericalInfoRequest{
           numberOfDigitsAfterDecimal:String,
           firstDayOfWeek:String,
           currencySymbol:String,
           measurementSystem:String,
           currencyFormat:Boolean,
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
