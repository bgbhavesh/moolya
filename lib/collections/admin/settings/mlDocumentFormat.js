
MlDocumentFormat = new Mongo.Collection('mlDocumentFormat');

MlDocumentFormantSchema = new SimpleSchema({
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


MlDocumentFormat.attachSchema(MlDocumentFormantSchema);
