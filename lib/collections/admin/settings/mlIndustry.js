import SimpleSchema from 'simpl-schema';
MlIndustries = new Mongo.Collection('mlIndustries');

MlIndustriesSchema = new SimpleSchema({
  industryName:{
    type:String,
    optional:true
  },
  industryDisplayName:{
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


MlIndustries.attachSchema(MlIndustriesSchema);
