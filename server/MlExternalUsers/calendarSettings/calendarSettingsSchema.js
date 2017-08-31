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
    vacationId: String
    isActive  : Boolean
    start     : Date
    end       : Date
    type      : String
    note      : String
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
    expiryDate: String
  }
  
  type TimeSlots{
    isAvailable: Boolean
    slotTime: String
    status: Int
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
    vacationId: String
    isActive  : Boolean
    start     : String
    end       : String
    type      : String
    note      : String
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
     getServiceProviderCalendar(portfolioId:String, month:Int, year: Int, orderId: String): MonthCalendar
     getMyCalendarDayAvailable:response
     getSessionDayAvailable(orderId:String!, sessionId: String!, day: Int, month: Int, year: Int): [TimeSlots]
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
  {api:'fetchMyCalendarSetting', actionName:'READ', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'getMyCalendar', actionName:'READ', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'getMyCalendarDayAvailable', actionName:'READ', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'updateMyCalendarSetting', actionName:'UPDATE', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'updateMyCalendarWorkingDay', actionName:'UPDATE', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'updateMyCalendarWorkingDays', actionName:'UPDATE', moduleName:"OFFICE", isAppWhiteList:true},
  {api:'updateMyCalendarVacation', actionName:'UPDATE', moduleName:"OFFICE", isAppWhiteList:true},
]
MlResolver.MlModuleResolver.push(supportedApi)
