/**
 * Created by pankaj on 14/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlTask = new Mongo.Collection('mlTask');
MlTaskSchema = new SimpleSchema({
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
  isInternal: {
    type: Boolean,
    optional: true
  },
  isExternal: {
    type: Boolean,
    optional: true
  },
  note: {
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
  isServiceCardEligible:{
    type: Boolean,
    optional: true
  },
  session:{
    type:Array,
    optional: true
  },
  'session.$':{
    type:Object,
    optional: true
  },
  'session.$.duration':{
    type:Object,
    optional: true
  },
  'session.$.duration.hours':{
    type:Number,
    optional: true
  },
  'session.$.duration.minutes':{
    type:Number,
    optional: true
  },
  'session.$.activities':{
    type:Array,
    optional: true
  },
  'session.$.activities.$':{
    type:String,  // Activities ids
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

MlTask.attachSchema(MlTaskSchema);
MlCollections['MlTask'] = MlTask;
