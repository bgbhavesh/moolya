import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlTransactionsLog = new Mongo.Collection('mlTransactionsLog');

MlTransactionsLogSchema = new SimpleSchema({

  createdAt:{
    type:Date,
    optional: true
  },

  emailId:{
    type:String,
    optional:false
  },

  userId:{
    type:String,
    optional:true
  },

  userName:{
    type:String,
    optional:true
  },

  moduleName:{
    type:String,
    optional:true
  },

  docId:{
    type:String,
    optional:true
  },

  action:{
    type:String,
    optional:true
  },

  'userAgent':{
    type: Object,
    optional:true
  },
  'userAgent.ipAddress':{
    type:String,
    optional:false
  },
  'userAgent.OS':{
    type:String,
    optional:true
  },
  'userAgent.browser':{
    type:String,
    optional:true
  },
  'userAgent.deviceModel':{
    type:String,
    optional:true
  },
  'userAgent.deviceType':{
    type:String,
    optional:true
  },
  'userAgent.deviceVendor':{
    type:String,
    optional:true
  },

  transactionDetails:{
    type:String,
    optional:true
  },

  clusterId : {
    type:String,
    optional:true
  },

  clusterName : {
    type:String,
    optional:true
  },

  chapterId : {
    type:String,
    optional:true
  },

  chapterName : {
    type:String,
    optional:true
  },

  subChapterId : {
    type:String,
    optional:true
  },

  subChapterName : {
    type:String,
    optional:true
  },


  communityId : {
    type : String,
    optional : true
  }

})
MlTransactionsLog.attachSchema(MlTransactionsLogSchema);
MlCollections['MlTransactionsLog'] = MlTransactionsLog;
