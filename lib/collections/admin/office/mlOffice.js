/**
 * Created by venkatsrinag on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'

MlOffice = new Mongo.Collection('mlOffice');

OfficeSchema = new SimpleSchema({
    officeId:{
        type:String,
        optional:true
    },

    userId:{
        type:String,
        optional:true
    },

    dateTime:{
        type:Date,
        optional:true
    },

    transcationId:{
        type:String,
        optional:true
    },

    status:{
        type:String,
        optional:true
    },

    action:{
      type:String,
      optional:true
    },

    paymentDetails:{
        type:Object,
        optional:true
    },

    "paymentDetails.$.datetime":{
        type:Date,
        optional:true
    },

    "paymentDetails.$.transcationId":{
        type:String,
        optional:true
    },

    "paymentDetails.$.totalAmountpaid":{
        type:String,
        optional:true
    },

    "paymentDetails.$.paymentMode":{
        type:String,
        optional:true
    },

    "paymentDetails.$.promotionCode":{
        type:String,
        optional:true
    },

    "paymentDetails.$.codeAmount":{
        type:String,
        optional:true
    },

    "paymentDetails.$.promoCodeStatus":{
        type:String,
        optional:true
    },

    "paymentDetails.$.vochureCode":{
        type:String,
        optional:true
    },

    "paymentDetails.$.paymentStatus":{
        type:String,
        optional:true
    },

    orderSubscriptionDetails:{
        type:Object,
        optional:true
    },

    "orderSubscriptionDetails.$.orderId":{
        type:String,
        optional:true
    },

    "orderSubscriptionDetails.$.SubscriptionName":{
        type:String,
        optional:true
    },

    "orderSubscriptionDetails.$.SubscriptionCode":{
        type:String,
        optional:true
    },

    "orderSubscriptionDetails.$.cost":{
        type:String,
        optional:true
    },

    "orderSubscriptionDetails.$.isTaxInclusive":{
        type:String,
        optional:true
    },

    "orderSubscriptionDetails.$.about":{
        type:String,
        optional:true
    },

    deviceDetails:{
        type:Object,
        optional:true
    },

    "deviceDetails.$.devieName":{
        type:Object,
        optional:true
    },

    "deviceDetails.$.deviceId":{
        type:Object,
        optional:true
    },

    "deviceDetails.$.ipAddress":{
        type:Object,
        optional:true
    },

    "deviceDetails.$.location":{
        type:Object,
        optional:true
    }


})

MlOffice.attachSchema(OfficeSchema);
MlCollections['MlOffice'] = MlOffice;
