/**
 * Created by pankaj on 14/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlActivity = new Mongo.Collection('mlActivity');
MlActivitySchema = new SimpleSchema({
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
  mode: {
    type: String,
    allowedValues:['online','offline'],
    optional: true
  },
  isServiceCardElligible:{
    type: Boolean,
    optional: true
  },
  conversation: {
    type: Object,
    optional: true
  },
  'conversation.isAudio': {
    type: Boolean,
    optional: true
  },
  'conversation.isVideo': {
    type: Boolean,
    optional: true
  },
  'conversation.isMeetup': {
    type: Boolean,
    optional: true
  },
  industryTypes: {
    type: Array,
    optional: true
  },
  'industryTypes.$': {
    type: String,
    optional: true
  },
  note: {
    type: String,
    optional: true
  },
  imageLink: {
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
  deliverable:{
    type:Array,
    optional: true
  },
  'deliverable.$':{
    type:String,
    optional: true
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
  'payment.discountType': {
    type: Boolean,
    allowedValues:['percent','amount'],
    optional: true
  },
  'payment.discountValue': {
    type: Number,
    optional: true
  },
  'payment.isTaxInclusive': {
    type: Boolean,
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
  teams:{
    type: Array,
    optional:true
  },
  'teams.$':{
    type: Object,
    optional:true
  },
  'teams.$.branch':{
    type: String,
    optional:true
  },
  'teams.$.communityType':{
    type: String,
    optional:true
  },
  'teams.$.users':{
    type: Array,
    optional:true
  },
  'teams.$.users.$':{
    type: String,
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

MlActivity.attachSchema(MlActivitySchema);
MlCollections['MlActivity'] = MlActivity;
