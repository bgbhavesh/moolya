
MlDocumentType = new Mongo.Collection('mlDocumentType');

MlDocumentTypeSchema = new SimpleSchema({
  docTypeName:{
    type:String,
    optional:true
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


MlDocumentType.attachSchema(MlDocumentTypeSchema);
