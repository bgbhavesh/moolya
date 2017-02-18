
MlDocumentFormats = new Mongo.Collection('mlDocumentFormats');

MlDocumentFormatSchema = new SimpleSchema({
  docFormatName:{
    type:String,
    optional:true
  },
  docFormatDisplayName:{
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


MlDocumentFormats.attachSchema(MlDocumentFormatSchema);
