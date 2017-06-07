/**
 * Created by venkatsrinag on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'

MlProcessTranscations = new Mongo.Collection('mlProcessTranscations');

ProcessTranscationsSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },

    clusterId:{
        type:String,
        optional:true
    },

    clusterName:{
        type:String,
        optional:true
    },

    chpaterId:{
        type:String,
        optional:true
    },

    chapterName:{
        type:String,
        optional:true
    },

    subChapterId:{
        type:String,
        optional:true
    },

    subChapterName:{
        type:String,
        optional:true
    },

    communityId:{
        type:String,
        optional:true
    },

    communityName:{
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

    transcationType:{
        type:String,
        optional:true
    },

    mobileNumber:{
        type:String,
        optional:true
    },

    paymentDetails:{
        type:Object,
        optional:true
    },

    "paymentDetails.subscriptionName":{
        type:Date,
        optional:true
    },

    "paymentDetails.cost":{
      type:Number,
      optional:true
    },

    "paymentDetails.about":{
      type:String,
      optional:true
    },

    "paymentDetails.isTaxInclusive":{
      type:Boolean,
      optional:true
    },

    "paymentDetails.dateTime":{
      type:String,
      optional:true
    },

    "paymentDetails.transcationId":{
      type:String,
      optional:true
    },

    "paymentDetails.totalAmountPaid":{
      type:Number,
      optional:true
    },

    "paymentDetails.paymentMode":{
      type:String,
      optional:true
    },

    "paymentDetails.cardNumber":{
      type:String,
      optional:true
    },

    "paymentDetails.cardHolderName":{
      type:String,
      optional:true
    },

    "paymentDetails.promotionCode":{
      type:String,
      optional:true
    },

    "paymentDetails.codeAmount":{
      type:Number,
      optional:true
    },

    "paymentDetails.promotionStatus":{
      type:String,
      optional:true
    },

    "paymentDetails.voucherCode":{
      type:String,
      optional:true
    },

    "paymentDetails.voucherAmount":{
      type:String,
      optional:true
    },

    "paymentDetails.voucherStatus":{
      type:String,
      optional:true
    },

    "paymentDetails.paymentStatus":{
      type:String,
      optional:true
    },

    deviceDetails:{
      type:Object,
      optional:true
    },

    "deviceDetails.devieName":{
      type:Object,
      optional:true
    },

    "deviceDetails.deviceId":{
      type:Object,
      optional:true
    },

    "deviceDetails.ipAddress":{
      type:Object,
      optional:true
    },

    "deviceDetails.location":{
      type:Object,
      optional:true
    },

    progress:{
        type:Number,
        optional:true
    }
})

MlProcessTranscations.attachSchema(ProcessTranscationsSchema);
MlCollections['MlProcessTranscations'] = MlProcessTranscations;
