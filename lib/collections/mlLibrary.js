/**
 * Created by Mukhil on 1/7/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlLibrary = new Mongo.Collection('mlLibrary');

MlLibrarySchema = new SimpleSchema({

  userId:{
    type:String,
    optional: true
  },
  fileName:{
    type: String,
    optional: true
  },
  fileUrl:{
    type: String,
    optional: true
  },
  fileType:{
    type: String,
    optional: true
  },
  isPrivate:{
    type: String,
    optional: true
  },
  libraryType: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    defaultValue: true,
    optional: true
  }
})

MlLibrary.attachSchema(MlLibrarySchema);
MlCollections['MlLibrary'] = MlLibrary;

