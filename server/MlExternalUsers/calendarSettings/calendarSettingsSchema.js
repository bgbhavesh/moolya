/**
 * Created by pankaj on 24/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";


let calendarSettingSlot=`
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
    slots    : [CalendarSettingSlot]
  }
  
  type CalendarSetting {
    _id                     : String
    slotDuration            : CalendarSettingSlotDuration
    appointmentCountPerSlots: Int
    slotBreakTime           : Int
    isOverlappingSchedule   : Int
    workingDays             : [CalendarSettingWorkingDays]
    vacations               : [CalendarSettingVacation]
  }
  
  type DayCalendar {
    date:Date,
    status: Int
  }
  
  type MonthCalendar {
    days: [DayCalendar]
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
    start   : String
    end     : String
    type    : String
    note    : String
  }
  
  input calendarSettingWorkingDays {
    isActive: Boolean
    dayName : Int
    lunch   : [calendarSettingLunch]
    slots   : [calendarSettingSlot]
  }
  
  input calendarSetting {
    slotDuration            : calendarSettingSlotDuration
    appointmentCountPerSlots: Int
    slotBreakTime           : Int
    isOverlappingSchedule   : Boolean
    workingDays             : [calendarSettingWorkingDays]
    vacations               : [calendarSettingVacation]
  }
  
  type Query {   
     fetchMyCalendarSetting(profileId:String):CalendarSetting
     getMyCalendar(month:Int, year: Int): MonthCalendar
     getMyCalendarDayAvailable:response
  }
  
  type Mutation {
     updateMyCalendarSetting(profileId:String,calendarSetting:calendarSetting):response
     updateMyCalendarWorkingDays(workingDays:[calendarSettingWorkingDays]):response
     updateMyCalendarWorkingDay(workingDay:calendarSettingWorkingDays):response
     updateMyCalendarVacation(vacation:calendarSettingVacation):response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], calendarSettingSlot]);
let supportedApi = [
  {api:'fetchMyCalendarSetting', actionName:'READ', moduleName:"OFFICE"},
  {api:'getMyCalendar', actionName:'READ', moduleName:"OFFICE"},
  {api:'getMyCalendarDayAvailable', actionName:'READ', moduleName:"OFFICE"},
  {api:'updateMyCalendarSetting', actionName:'UPDATE', moduleName:"OFFICE"},
  {api:'updateMyCalendarWorkingDay', actionName:'UPDATE', moduleName:"OFFICE"},
  {api:'updateMyCalendarWorkingDays', actionName:'UPDATE', moduleName:"OFFICE"},
  {api:'updateMyCalendarVacation', actionName:'UPDATE', moduleName:"OFFICE"},
]
MlResolver.MlModuleResolver.push(supportedApi)
