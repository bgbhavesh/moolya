import SimpleSchema from 'simpl-schema';
MlTransactionTypes = new Mongo.Collection('mlTransactionTypes');

MlTransactionTypesSchema = new SimpleSchema({
  name:{
    type:String,
    optional:false
  },
  displayName:{
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


MlTransactionTypes.attachSchema(MlTransactionTypesSchema);
