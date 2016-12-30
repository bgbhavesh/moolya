/**
 * Created by venkatasrinag on 19/12/16.
 */

MlSoftRegistration = new Mongo.Collection("mlRegistration");

var MlUserRegistration = new SimpleSchema({
  fullName:{
    type: String,
    optional: true
  },
  companyName:{
    type: String,
    optional: true
  },
  companyUrl:{
    type: String,
    optional: true
  },
  mobileNumber:{
    type: String,
    optional: true
  },
  eMail:{
    type: String,
    optional: true,
    unique:true
  },
  country:{
    type: String,
    optional:true
  },
  countryId:{
    type: String,
    optional:true
  },
  countryCode:{
    type: String,
    optional:true
  },
  city:{
    type: String,
    optional:true
  },
  regType:{
    type:String,
    optional:true
  },
  userName:{
    type:String,
    optional:true
  },
  password:{
    type: String,
    optional:true
  },
  referralType:{
    type:[String],
    optional:true
  },
  linkedInUrl:{
    type:String,
    optional:true
  },
  message:{
    type:String,
    optional:true
  },
  registrationDate:{
    type:Date,
    optional:true,

  },
  remarks:{
    type:String,
    optional:true
  },
  uploadFile:{
    type:String,
    optional:true
  }
});

MlSoftRegistration.attachSchema(MlUserRegistration);
