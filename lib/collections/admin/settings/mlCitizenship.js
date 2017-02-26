import SimpleSchema from 'simpl-schema';
MlCitizenship = new Mongo.Collection('mlCitizenship');

MlCitizenshipSchema = new SimpleSchema({
  citizenshipTypeName:{
    type:String,
    optional:true
  },
  citizenshipTypeDisplayName:{
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


MlCitizenship.attachSchema(MlCitizenshipSchema);
