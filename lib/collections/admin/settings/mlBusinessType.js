
MlBusinessType = new Mongo.Collection('mlBusinessType');

MlBusinessTypeSchema = new SimpleSchema({
  businessTypeName:{
    type:String,
    optional:true
  },
  businessTypeDisplayName:{
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


MlBusinessType.attachSchema(MlBusinessTypeSchema);
