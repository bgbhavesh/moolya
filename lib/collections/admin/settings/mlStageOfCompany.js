import SimpleSchema from 'simpl-schema';
MlStageOfCompany = new Mongo.Collection('mlStageOfCompany');

MlStageOfCompanySchema = new SimpleSchema({
  stageOfCompanyName:{
    type:String,
    optional:true
  },
  stageOfCompanyDisplayName:{
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


MlStageOfCompany.attachSchema(MlStageOfCompanySchema);
