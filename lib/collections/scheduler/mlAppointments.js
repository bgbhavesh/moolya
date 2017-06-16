/**
 * Created by venkatsrinag on 15/6/17.
 */

import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlAppointments = new Mongo.Collection('mlAppointments');
MlAppointmentSchema = new SimpleSchema({
    seeker:{
        type:Object,
        optional:true
    },

    "seeker.userId":{
        type:String,
        optional:true
    },

    "seeker.profileId":{
        type:String,
        optional:true
    },

    provider:{
        type:Object,
        optional:true
    },

    "provider.userId":{
        type:String,
        optional:true
    },

    "provider.profileId":{
        type:String,
        optional:true
    },

    serviceId:{
        type:String,
        optional:true
    },

    serviceName:{
        type:String,
        optional:true
    },

    serviceName:{
        type:String,
        optional:true
    },

    appointmentDate:{
        type:Date,
        optional:true
    },

    appointmentStartDate:{
        type:Date,
        optional:true
    },

    appointmentEndDate:{
        type:Date,
        optional:true
    },

    payment:{
        type:Object,
        optional:true
    }

});

MlAppointments.attachSchema(MlAppointmentSchema);
MlCollections['MlService'] = MlAppointments;
