import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let DateAndTimeSchema = `
    type DateAndTime
    {
      _id : String
      timeFormat :String
      amSymbol :String
      pmSymbol :String
      dateFormat :String
      numberOfDaysInWeek :String
      firstDayOfWeek :String
    }
    input dateAndTimeObject{
        _id : String,
        timeFormat :String,
        amSymbol :String,
        pmSymbol :String,
        dateFormat :String,
        numberOfDaysInWeek :String,
        firstDayOfWeek :String,
    }
    
   type Mutation 
    {
        updateDateAndTime(_id:String, dateAndTime: dateAndTimeObject):String
        createDateAndTime(dateAndTime:dateAndTimeObject):String
    }
    type Query{
        findDateAndTime(_id:String): DateAndTime
        fetchDateAndTime:[DateAndTime]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],DateAndTimeSchema]);

let dateFormat = `        
    
    type DateFormat{
      dateFormatName :String
      dateFormatDisplayName :String
      about: String
      createdDateTime: String
      _id:String
      isActive:Boolean
    }
    
    type TimeFormat{
      timeFormatName :String
      timeFormatDisplayName :String
      about: String
      createdDateTime: String
      _id:String
      isActive:Boolean
    }
    
    type WeekDaysFormat{
      dayName :String
      displayName :String
      about: String
      createdDateTime: String
      _id:String
      isActive:Boolean
    }
    
    type Query{
      findDateFormat:[DateFormat]
      findTimeFormat:[TimeFormat]
      findWeekDays:[WeekDaysFormat]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],dateFormat]);
