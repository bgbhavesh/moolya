import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 14/02/17.
 */

import MlSchemas from '../../common/commonSchemas'


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
      optional:false
    },
    subChapterImageLink:{
      type:String,
      optional:false
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
    subChapterDataAcessMatrix:{
      type:Array,
      optional:true
    },
    'subChapterDataAcessMatrix.$':{
      type:Object,
      optional:true
    },
    'subChapterDataAcessMatrix.$.roleType':{
      type:String,
      optional:true
    },
    'subChapterDataAcessMatrix.$.acessType':{
      type:String,
      optional:true
    },
    'subChapterDataAcessMatrix.$.canSearch':{
      type:Boolean,
      optional:true
    },
    'subChapterDataAcessMatrix.$.canView':{
      type:Boolean,
      optional:true
    },
    'subChapterDataAcessMatrix.$.canDiscover':{
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
