import SimpleSchema from 'simpl-schema';
MlProfessions = new Mongo.Collection('mlProfessions');

MlProfessionSchema = new SimpleSchema({
  professionName:{
    type:String,
    optional:false
  },
  professionDisplayName:{
    type:String,
    optional:true
  },
  industryId:{
    type:String,
    optional:true
  },
  industryName:{
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


MlProfessions.attachSchema(MlProfessionSchema);
