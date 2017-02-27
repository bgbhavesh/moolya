import SimpleSchema from 'simpl-schema';
MlLookingFor = new Mongo.Collection('mlLookingFor');

MlLookingForSchema = new SimpleSchema({
  lookingForName:{
    type:String,
    optional:false
  },
  lookingForDisplayName:{
    type:String,
    optional:true
  },
  communityCode:{
    type:String,
    optional:true
  },
  communityName:{
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


MlLookingFor.attachSchema(MlLookingForSchema);
