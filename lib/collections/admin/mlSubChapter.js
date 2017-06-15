import SimpleSchema from "simpl-schema";
import MlSchemas from "../../common/commonSchemas";
import MlCollections from "../../common/commonSchemas";
/**
 * Created by muralidhar on 14/02/17.
 */

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
    stateName: {
      type: String,
      optional: true
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
    associatedSubChapters: {   //associatedChapters
      type: Array,
      optional: true
    },
    'associatedSubChapters.$': {   //associatedChapters
      type: String,   //Object
      optional: true
    },
    // 'associatedChapters.$.subChapterId':{
    //   type:String,
    //   optional:true
    // },
    subChapterUrl:{
      type:String,
      optional:true
    },
    isUrlNotified:{
        type:Boolean,
        optional:true
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
      optional:true
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
      type:Number,
      optional:true
    },
    longitude:{
      type:Number,
      optional:true
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
    'internalSubChapterAccess.backendUser.canTransact':{
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
    'internalSubChapterAccess.externalUser.canTransact':{
      type:Boolean,
      optional:true
    },
    moolyaSubChapterAccess:{
      type:Object,
      optional:true
    },
    // 'moolyaSubChapterAccess.backendUser':{
    //   type:Object,
    //   optional:true
    // },
    // 'moolyaSubChapterAccess.backendUser.canSearch':{
    //   type:Boolean,
    //   optional:true
    // },
    // 'moolyaSubChapterAccess.backendUser.canView':{
    //   type:Boolean,
    //   optional:true
    // },
    // 'moolyaSubChapterAccess.backendUser.canTransact':{
    //   type:Boolean,
    //   optional:true
    // },
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
    'moolyaSubChapterAccess.externalUser.canTransact':{
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
    }
})

MlSubChapters.attachSchema(MlSubChaptersSchema);
MlSchemas["MlSubChapters"] = MlSubChaptersSchema;
MlCollections['MlSubChapters'] = MlSubChapters;

