
MlDocumentFormat = new Mongo.Collection('mlDocumentFormat');

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


MlDocumentFormat.attachSchema(MlDocumentFormatSchema);
