import SimpleSchema from 'simpl-schema';
MlDocumentTypes = new Mongo.Collection('mlDocumentTypes');

MlDocumentTypeSchema = new SimpleSchema({
  docTypeName:{
    type:String,
    optional:false
  },
  docTypeDisplayName:{
    type:String,
    optional:true
  },
  about:{
    type: String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})


MlDocumentTypes.attachSchema(MlDocumentTypeSchema);
