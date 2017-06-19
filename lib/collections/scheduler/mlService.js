/**
 * Created by pankaj on 14/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlService = new Mongo.Collection('mlService');
MlServiceSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  profileId: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  displayName: {
    type: String,
    optional: true
  },
  noOfSession: {
    type: Number,
    optional: true
  },
  sessionFrequency:{
    type: String,
    optional: true
  },
  duration:{
    type: Object,
    optional: true
  },
  'duration.hours':{
    type: Number,
    optional: true
  },
  'duration.minutes':{
    type: Number,
    optional: true
  },
  status:{
    type: Boolean,
    optional:true
  },
  validTill:{
    type:Date,
    optional:true
  },
  tasks:{
    type:Array,
    optional: true
  },
  'tasks.$':{
    type:String,  // tasks ids
    optional: true
  },
  termsAndCondition:{
    type:Object,
    optional:true
  },
  'termsAndCondition.isCancelable':{
    type:Boolean,
    optional:true
  },
  'termsAndCondition.isRefundable':{
    type:Boolean,
    optional:true
  },
  'termsAndCondition.isReschedulable':{
    type:Boolean,
    optional:true
  },
  'termsAndCondition.noOfReschedulable':{
    type:Number,
    optional:true
  },
  'attachments':{
    type: Array,
    optional:true
  },
  'attachments.$':{
    type: Object,
    optional:true
  },
  'attachments.$.name':{
    type: String,
    optional:true
  },
  'attachments.$.info':{
    type: String,
    optional:true
  },
  'attachments.$.isMandatory':{
    type: Boolean,
    optional:true
  },
  payment: {
    type: Object,
    optional: true
  },
  'payment.amount': {
    type: Number,
    optional: true
  },
  'payment.isDiscount': {
    type: Boolean,
    optional: true
  },
  'payment.discountAmount': {
    type: Number,
    optional: true
  },
  'payment.discountPercentage': {
    type: Number,
    optional: true
  },
  'payment.isTaxInclusive': {
    type: Number,
    optional: true
  },
  'payment.isPromoCodeApplicable': {
    type: Boolean,
    optional: true
  },
  facilitationCharge:{
    type: Object,
    optional: true
  },
  'facilitationCharge.amount':{
    type: Number,
    optional: true
  },
  'facilitationCharge.percentage':{
    type: Number,
    optional: true
  },
  'facilitationCharge.derivedAmount':{
    type: Number,
    optional: true
  },
  createdAt:{
    type: Date,
    optional: true
  },
  updatedAt:{
    type: Date,
    optional: true
  }
});

MlService.attachSchema(MlServiceSchema);
MlCollections['MlService'] = MlService;