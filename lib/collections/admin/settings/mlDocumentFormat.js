import SimpleSchema from 'simpl-schema';
MlDocumentFormats = new Mongo.Collection('mlDocumentFormats');

MlDocumentFormatSchema = new SimpleSchema({
  docFormatName:{
    type:String,
    optional:false
  },
  docFormatDisplayName:{
    type:String,
    optional:true
  },
  about:{
    type: String,
    optional:true
  },
  createdDateTime:{
    type : String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})


MlDocumentFormats.attachSchema(MlDocumentFormatSchema);
