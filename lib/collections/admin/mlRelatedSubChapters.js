import SimpleSchema from "simpl-schema";
import MlSchemas from "../../common/commonSchemas";
import MlCollections from "../../common/commonSchemas";
/**
 * Created by vishwadeep on 11/08/17.
 */

MlRelatedSubChapters = new Mongo.Collection('mlRelatedSubChapters');

MlRelatedSubChaptersSchema = new SimpleSchema({
  subChapters: {
    type: Array,
    optional: true
  },
  'subChapters.$': {
    type: Object,
    optional: true
  },
  'subChapters.$.chapterId': {
    type: String,
    optional: true
  },

  'subChapters.$.subChapterId': {
    type: String,
    optional: true
  },
  internalSubChapterAccess: {
    type: Object,
    optional: true
  },
  'internalSubChapterAccess.backendUser': {
    type: Object,
    optional: true
  },
  'internalSubChapterAccess.backendUser.canSearch': {
    type: Boolean,
    optional: true
  },
  'internalSubChapterAccess.backendUser.canView': {
    type: Boolean,
    optional: true
  },
  'internalSubChapterAccess.backendUser.canTransact': {
    type: Boolean,
    optional: true
  },
  'internalSubChapterAccess.externalUser': {
    type: Object,
    optional: true
  },
  'internalSubChapterAccess.externalUser.canSearch': {
    type: Boolean,
    optional: true
  },
  'internalSubChapterAccess.externalUser.canView': {
    type: Boolean,
    optional: true
  },
  'internalSubChapterAccess.externalUser.canTransact': {
    type: Boolean,
    optional: true
  },
  moolyaSubChapterAccess: {
    type: Object,
    optional: true
  },
  'moolyaSubChapterAccess.externalUser': {
    type: Object,
    optional: true
  },
  'moolyaSubChapterAccess.externalUser.canSearch': {
    type: Boolean,
    optional: true
  },
  'moolyaSubChapterAccess.externalUser.canView': {
    type: Boolean,
    optional: true
  },
  'moolyaSubChapterAccess.externalUser.canTransact': {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date()
  }
})

MlRelatedSubChapters.attachSchema(MlRelatedSubChaptersSchema);
MlSchemas["MlRelatedSubChapters"] = MlRelatedSubChaptersSchema;
MlCollections['MlRelatedSubChapters'] = MlRelatedSubChapters;

