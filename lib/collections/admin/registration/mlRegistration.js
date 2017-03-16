import SimpleSchema from 'simpl-schema';

/**
 * Created by Sireesha on 16/3/17.
 */

MlRegistration = new Mongo.Collection('mlRegistration');

//Address Schema
addressSchema = new SimpleSchema({
  addressType : {
    type : String,
    optional : true
  },
  name : {
    type : String,
    optional : true
  },
  phoneNumber : {
    type : String,
    optional : true
  },
  addressFlat : {
    type : String,
    optional : true
  },
  addressLocality : {
    type : String,
    optional : true
  },
  addressLandmark : {
    type : String,
    optional : true
  },
  addressArea : {
    type : String,
    optional : true
  },
  addressCity : {
    type : String,
    optional : true
  },
  addressState : {
    type: String,
    optional: true
  },
  addressCountry : {
    type: String,
    optional: true
  },
  addressPinCode : {
    type: String,
    optional: true
  }

})

//Contact Schema
contactSchema = new SimpleSchema({
  numberType : {
    type : String,
    optional : true
  },
  countryCode : {
    type :String,
    optional : true
  },
  contactNumebr : {
    type : String,
    optional : true
  }
})

//Email Schema
emailSchema = new SimpleSchema({
  emailIdType : {
    type : String,
    optional : true
  },
  emailId : {
    type : String,
    optional : true
  }
})

//Social Link Schema
socialLinkSchema = new SimpleSchema({
/*  linkedin : {
    type : String,
    optional : true
  },
  facebook : {
    type : String,
    optional : true
  },
  twitter : {
    type : String,
    optional : true
  },
  youtube : {
    type : String,
    optional : true
  },
  googlePlus : {
    type : String,
    optional : true
  },
  printInfo : {
    type : String,
    optional : true
  }*/
  socialLinkTypeName : {
    type : String,
    optional : true
  },
  socialLinkType : {
    type : String,
    optional : true
  },
  socialLinkUrl : {
    type : String,
    optional : true
  }

})

MlRegistrationSchema=new SimpleSchema({
  "contactInfo.$":{
    type:contactSchema,
    optional:true
  },
  "emailInfo.$":{
    type:emailSchema,
    optional:true
  },
  "addressInfo.$":{
    type:addressSchema,
    optional:true
  },
  "socialLinksInfo.$":{
    type:socialLinkSchema,
    optional:true

  }
});

MlRegistration.attachSchema(MlRegistrationSchema);
