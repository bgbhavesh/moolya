import SimpleSchema from 'simpl-schema';
/**
 * Created by mohammed.mohasin on 21/3/17.
 */
MlTemplateAssignment = new Mongo.Collection('mlTemplateAssignment');

MlTemplateAssignmentSchema = new SimpleSchema({

  process: {
    type: String,
    optional: false
  },
  subProcess: {
    type: String,
    optional: true
  },
  userType: {
    type: String,
    optional: true
  },
  identity: {
    type: String,
    optional: true
  },
  clusterId:{
    type: String,
    optional: true
  },
  clusterName:{
    type: String,
    optional: true
  },
  chapterId:{
    type: String,
    optional: true
  },
  chapterName:{
    type: String,
    optional: true
  },
  chapterId:{
    type: String,
    optional: true
  },
  subChapterId:{
    type: String,
    optional: true
  },
  subChapterName:{
    type: String,
    optional: true
  },
  communityId:{
    type: String,
    optional: true
  },
  communityName:{
    type: String,
    optional: true
  },
  communityType:{
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  },
  templates:{
    type: Array,
    optional: true
  },
  'assignedTemplates.$':{
    type: Object,
    optional: true
  },
  'assignedTemplates.$.stageName':{
    type: String,
    optional: true
  },
  'assignedTemplates.$.stageCode':{
    type: String,
    optional: true
  },
  'assignedTemplates.$.templateCode':{
    type: String,
    optional: true
  },
  'assignedTemplates.$.templateName':{
    type: String,
    optional: true
  }

})

MlTemplateAssignment.attachSchema(MlTemplateAssignmentSchema);
