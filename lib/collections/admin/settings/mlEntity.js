
MlEntity = new Mongo.Collection('mlEntity');

MlEntitySchema = new SimpleSchema({
  entityName:{
    type:String,
    optional:true
  },
  entityDisplayName:{
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


MlEntity.attachSchema(MlEntitySchema);
