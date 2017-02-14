/**
 * Created by venkatasrinag on 25/1/17.
 */

import MlSchemas from '../../common/commonSchemas'


MlChapters = new Mongo.Collection('mlChapter');

MlChapterSchema = new SimpleSchema({
    chapterId:{
        type:String,
        optional:false
    },

    clusterId:{
        type:String,
        optional:false
    },

    chapterName:{
        type:String,
        optional:false
    },

    diplayName:{
        type:String,
        optional:true
    },

    about:{
        type:String,
        optional:false
    },

    link:{
        type:String,
        optional:true
    },

    id:{
        type:String,
        optional:true
    },
    state:{
        type:String,
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
    email:{
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
    }
})

MlChapters.attachSchema(MlChapterSchema);
MlSchemas["MlChapters"] = MlChapterSchema;
