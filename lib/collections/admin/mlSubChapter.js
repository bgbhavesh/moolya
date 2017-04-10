import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 14/02/17.
 */

import MlSchemas from '../../common/commonSchemas'
import MlCollections from '../../common/commonSchemas'

MlSubChapters = new Mongo.Collection('mlSubChapters');

MlSubChaptersSchema = new SimpleSchema({

    clusterId:{
        type:String,
        optional:true
    },

    clusterName:{
        type:String,
        optional:true
    },

    stateId:{
        type:String,
        optional:true
    },

    chapterId:{
        type:String,
        optional:true
    },

    chapterName:{
        type:String,
        optional:false
    },

    subChapterCode:{
        type:String,
        optional:true
    },

    subChapterName:{
        type:String,
        optional:true
    },
    subChapterDisplayName:{
        type:String,
        optional:true
    },
    associatedChapters:{
        type:Array,
        optional:true
    },
    'associatedChapters.$':{
      type:Object,
      optional:true
    },
    'associatedChapters.$.chapterId':{
      type:String,
      optional:true
    },
    subChapterUrl:{
      type:String,
      optional:true
    },
    isUrlNotified:{
        type:Boolean,
        optional:false
    },
    isDefaultSubChapter:{
        type:Boolean,
        optional:true
    },
    subChapterEmail:{
      type:String,
      optional:true
    },
    isEmailNotified:{
      type:Boolean,
      optional:false
    },
    aboutSubChapter:{
      type:String,
      optional:true
    },
    subChapterImageLink:{
      type:String,
      optional:true
    },
    showOnMap:{
        type: Boolean,
        optional:true
    },
    isActive:{
        type: Boolean,
        optional:true
    },
    latitude:{
      type:String,
      optional:false
    },
    longitude:{
      type:String,
      optional:false
    },
    isBespokeRegistration:{
      type: Boolean,
      optional:true
    },
    isBespokeWorkFlow:{
      type: Boolean,
      optional:true
    },
    internalSubChapterAccess:{
      type:Object,
      optional:true
    },
    'internalSubChapterAccess.backendUser':{
      type:Object,
      optional:true
    },
    'internalSubChapterAccess.backendUser.canSearch':{
      type:Boolean,
      optional:true
    },
    'internalSubChapterAccess.backendUser.canView':{
      type:Boolean,
      optional:true
    },
    'internalSubChapterAccess.backendUser.canDiscover':{
      type:Boolean,
      optional:true
    },
    'internalSubChapterAccess.externalUser':{
      type:Object,
      optional:true
    },
    'internalSubChapterAccess.externalUser.canSearch':{
      type:Boolean,
      optional:true
    },
    'internalSubChapterAccess.externalUser.canView':{
      type:Boolean,
      optional:true
    },
    'internalSubChapterAccess.externalUser.canDiscover':{
      type:Boolean,
      optional:true
    },
    moolyaSubChapterAccess:{
      type:Object,
      optional:true
    },
    'moolyaSubChapterAccess.backendUser':{
      type:Object,
      optional:true
    },
    'moolyaSubChapterAccess.backendUser.canSearch':{
      type:Boolean,
      optional:true
    },
    'moolyaSubChapterAccess.backendUser.canView':{
      type:Boolean,
      optional:true
    },
    'moolyaSubChapterAccess.backendUser.canDiscover':{
      type:Boolean,
      optional:true
    },
    'moolyaSubChapterAccess.externalUser':{
      type:Object,
      optional:true
    },
    'moolyaSubChapterAccess.externalUser.canSearch':{
      type:Boolean,
      optional:true
    },
    'moolyaSubChapterAccess.externalUser.canView':{
      type:Boolean,
      optional:true
    },
    'moolyaSubChapterAccess.externalUser.canDiscover':{
      type:Boolean,
      optional:true
    },
    status:{
      type:Object,
      optional:true
    },
    "status.code":{
      type:Number,
      optional:true
    },
    "status.description":{
      type:String,
      optional:true
    },

})

MlSubChapters.attachSchema(MlSubChaptersSchema);
MlSchemas["MlSubChapters"] = MlSubChaptersSchema;
MlCollections['MlSubChapters'] = MlSubChapters;

