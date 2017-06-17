/**
 * Created by venkatsrinag on 7/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlLibrary = new Mongo.Collection('mlLibrary');

MlLibrarySchema = new SimpleSchema({

  userId:{
    type:String,
    optional:true
  },

  images:{
    type:Array,
    optional:true
  },

  documents:{
    type:Array,
    optional:true
  },

  videos:{
    type:Array,
    optional:true
  },

  templates:{
    type:Array,
    optional:true
  },

  'images.$':{
    type:Object,
    optional:true
  },

  'images.$.fileType':{
    type:String,
    optional:true
  },

  'images.$.fileName':{
    type:String,
    optional:true
  },

  'images.$.fileUrl':{
    type:String,
    optional:true
  },
  'images.$.isPrivate':{
    type:Boolean,
    optional:true
  },

  'videos.$':{
    type:Object,
    optional:true
  },

  'videos.$.fileType':{
    type:String,
    optional:true
  },

  'videos.$.fileName':{
    type:String,
    optional:true
  },

  'videos.$.fileUrl':{
    type:String,
    optional:true
  },

  'videos.$.isPrivate':{
    type:Boolean,
    optional:true
  },


  'templates.$':{
    type:Object,
    optional:true
  },

  'templates.$.fileType':{
    type:String,
    optional:true
  },

  'templates.$.fileName':{
    type:String,
    optional:true
  },
  'templates.$.fileUrl':{
    type:String,
    optional:true
  },
  'templates.$.isPrivate':{
    type:Boolean,
    optional:true
  },
  'documents.$':{
    type:Object,
    optional:true
  },
  'documents.$.fileType':{
    type:String,
    optional:true
  },
  'documents.$.fileName':{
    type:String,
    optional:true
  },

  'documents.$.fileUrl':{
    type:String,
    optional:true
  },
  'documents.$.isPrivate':{
    type:Boolean,
    optional:true
  }

})

MlLibrary.attachSchema(MlLibrarySchema);
MlCollections['MlLibrary'] = MlLibrary;

