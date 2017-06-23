/**
 * Created by pankaj on 23/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlCalendarSettings = new Mongo.Collection('mlCalendarSettings');
MlCalendarSettingsSchema = new SimpleSchema({
    userId:{
      type: String,
      optional:true
    },
    profileId:{
      type: String,
      optional:true
    },
    slotDuration:{
      type:Object,
      optional:true
    },
    'slotDuration.hours':{
      type:Number,
      optional:true
    },
    'slotDuration.minutes':{
      type:Number,
      optional:true
    },
    appointmentCountPerSlots:{
      type: Number,
      optional: true
    },
    slotBreakTime:{
      type:Number, // In minutes
      optional:true
    },
    isOverlappingSchedule:{
      type:Boolean,
      optional:true
    },
    days:{
      type: Array,
      optional:true
    },
    'days.$':{
      type:Object,
      optional:true
    },
    'days.$.day':{
      type:Number,
      optional:false
    },
    'days.$.lunch':{
      type:Object,
      optional:true
    },
    'days.$.lunch.isActive':{
      type:Boolean,
      optional:true
    },
    'days.$.lunch.start':{
      type:Date,
      optional:true
    },
    'days.$.lunch.end':{
      type:Date,
      optional:true
    },
    'days.$.slots':{
      type:Array,
      optional:true
    },
    'days.$.slots.$':{
      type:Object,
      optional:true
    },
    'days.$.slots.$.isActive':{
      type:Boolean,
      optional:true
    },
    'days.$.slots.$.start':{
      type:Date,
      optional:true
    },
    'days.$.slots.$.end':{
      type:Date,
      optional:true
    },
    vacation:{
      type:Array,
      optional:true
    },
    'vacation.$':{
      type:Object,
      optional:true
    },
    'vacation.$.isActive':{
      type:Boolean,
      optional:true
    },
    'vacation.$.date':{
      type:Object,
      optional:true
    },
    'vacation.$.data.start':{
      type:Date,
      optional:true
    },
    'vacation.$.data.end':{
      type:Date,
      optional:true
    },
    'vacation.$.data.type':{
      type:String,
      allowedValues:['holiday','travel'],
      optional:true
    },
    'vacation.$.data.note':{
      type:String,
      optional:true
    },
});

MlCalendarSettings.attachSchema(MlCalendarSettingsSchema);
MlCollections['CalendarSettings'] = MlCalendarSettings;
