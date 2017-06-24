/**
 * Created by pankaj on 24/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";


let activity=`
  type CalendarSettingSlotDuration {
    hours: Int
    minutes: Int
  }
  
  type CalendarSettingLunch {
    isActive: Boolean
    start   : String
    end     : String
  }
   
  type CalendarSettingSlot {
    isActive      : Boolean
    start         : String
    startTimestamp: String
    end           : String
    endTimestamp  : String
  }
  
  type CalendarSettingVacation {
    isActive: Boolean
    start   : Date
    end     : Date
    type    : String
    note    : String
  }
  
  type CalendarSettingWorkingDays {
    isActive: Boolean
    dayName : Int
    lunch   : [CalendarSettingLunch]
    slot    : [CalendarSettingSlot]
  }
  
  type CalendarSetting {
    slotDuration            : CalendarSettingSlotDuration
    appointmentCountPerSlots: Int
    slotBreakTime           : Int
    isOverlappingSchedule   : Int
    workingDays             : [CalendarSettingWorkingDays]
    vacation                : [CalendarSettingVacation]
  }
  input calendarSettingSlotDuration {
    hours: Int
    minutes: Int
  }
  
  input calendarSettingLunch {
    isActive: Boolean
    start   : String
    end     : String
  }
   
  input calendarSettingSlot {
    isActive      : Boolean
    start         : String
    startTimestamp: String
    end           : String
    endTimestamp  : String
  }
  
  input calendarSettingVacation {
    isActive: Boolean
    start   : Date
    end     : Date
    type    : String
    note    : String
  }
  
  input calendarSettingWorkingDays {
    isActive: Boolean
    dayName : Int
    lunch   : [calendarSettingLunch]
    slot    : [calendarSettingSlot]
  }
  
  input calendarSetting {
    slotDuration            : calendarSettingSlotDuration
    appointmentCountPerSlots: Int
    slotBreakTime           : Int
    isOverlappingSchedule   : Boolean
    workingDays             : [calendarSettingWorkingDays]
    vacation                : [calendarSettingVacation]
  }
  type Query {      
  }
  
  type Mutation {
     updateMyCalendarSetting(calendarSetting:calendarSetting):response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], activity]);
let supportedApi = [
  // {api:'fetchMyCalendarSetting', actionName:'READ', moduleName:"OFFICE"},
  {api:'updateMyCalendarSetting', actionName:'UPDATE', moduleName:"OFFICE"},
]
MlResolver.MlModuleResolver.push(supportedApi)
