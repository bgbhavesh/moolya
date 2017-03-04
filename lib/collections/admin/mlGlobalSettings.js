import SimpleSchema from 'simpl-schema';
/**
 * Created by murali on 14/2/17.
 */
MlGlobalSettings = new Mongo.Collection('mlGlobalSettings');
MlMasterData = new Mongo.Collection('mlMasterData');

MlGlobalHierarchySpecs=new SimpleSchema({
  hierarchyLevel:{
    type:SimpleSchema.Integer,
    optional:false
  },
  hierarchyCode:{
    type:String,
    optional:false
  },
  hierarchyRefId:{
    type:String,
    optional:false
  },
  hierarchyRefName:{
    type:String,
    optional:false
  },
  type:{
    type:String,
    optional:false
  },
  isActive:{
    type:String,
    optional:true
  }
});

regionalSchema = new SimpleSchema({
  clusterName:{
    type:String,
    optional:true
  },
  capitalName:{
    type:String,
    optional:true
  },
  regionalPhoneNumber:{
    type:String,
    optional:true
  },
  regionalCurrencyName:{
    type:String,
    optional:true
  },
  regionalCurrencyMarking:{
    type:String,
    optional:true
  },
  regionalFlag:{
    type:String,
    optional:true
  },
  aboutRegion:{
    type:String,
    optional:true
  },
  regionalZipFormat:{
    type:String,
    optional:true
  },
  regionalCurrencySymbol:{
    type:String,
    optional:true
  },
  regionalCurrencyValue:{
    type:String,
    optional:true
  }
});

dateAndTimeSchema = new SimpleSchema({
  timeFormat:{
    type:String,
    optional:true
  },
  amSymbol:{
    type:String,
    optional:true
  },
  pmSymbol:{
    type:String,
    optional:true
  },
  dateFormat:{
    type:String,
    optional:true
  },
 numberOfDaysInWeek:{
    type:String,
    optional:true
  },
firstDayOfWeek:{
    type:String,
    optional:true
  }
});


numericalFormatSchema = new SimpleSchema({
 numberOfDigitsAfterDecimal:{
    type:String,
    optional:true
  },
  firstDayOfWeek:{
    type:String,
    optional:true
  },
  currencySymbol:{
    type:String,
    optional:true
  },
  measurementSystem:{
    type:String,
    optional:true
  },
  currencyFormat:{
    type:String,
    optional:true
  },
  valueSeparator:{
    type:String,
    optional:true
  }
});
MlGlobalSettingsSchema=new SimpleSchema({
  numericalFormatInfo:{
    type:numericalFormatSchema,
    optional:true
  },
  dateAndTimeInfo:{
    type:dateAndTimeSchema,
    optional:true
  },
  regionalInfo:{
    type:regionalSchema,
    optional:true
  }
});

//MlGlobalSettingsSchema.extend(regionalSchema);
//MlGlobalSettingsSchema.extend(dateAndTimeSchema);
//MlGlobalSettingsSchema.extend(numericalFormatSchema);
MlGlobalSettingsSchema.extend(MlGlobalHierarchySpecs);
MlGlobalSettings.attachSchema(MlGlobalSettingsSchema);



languageSchema = new SimpleSchema({
  languageInfo:{
    type:Object,
    optional:true
  },
  'languageInfo.languageName':{
    type:String,
    optional:false
  },
  'languageInfo.aboutLanguage':{
    type:String,
    optional:true
  },
  'languageInfo.languageDisplayName':{
    type:String,
    optional:true
  }
});

addressTypeSchema = new SimpleSchema({
  addressTypeInfo:{
    type:Object,
    optional:true
  },
  'addressTypeInfo.addressName':{
    type:String,
    optional:true
  },
    'addressTypeInfo.aboutAddress':{
    type:String,
    optional:true
  },
    'addressTypeInfo.addressDisplayName':{
    type:String,
    optional:true
  },
  'addressTypeInfo.addressUploadIcon':{
    type:String,
    optional:true
  }
});

emailTypeSchema = new SimpleSchema({
  emailTypeInfo:{
    type:Object,
    optional:true
  },
  'emailTypeInfo.emailName':{
    type:String,
    optional:true
  },
  'emailTypeInfo.aboutEmail':{
    type:String,
    optional:true
  },
  'emailTypeInfo.emailDisplayName':{
    type:String,
    optional:true
  },
  'emailTypeInfo.emailUploadIcon':{
    type:String,
    optional:true
  }
})


contactTypeSchema = new SimpleSchema({
  contactTypeInfo:{
    type:Object,
    optional:true
  },
  'contactTypeInfo.contactName':{
    type:String,
    optional:true
  },
    'contactTypeInfo.aboutContact':{
    type:String,
    optional:true
  },
    'contactTypeInfo.contactDisplayName':{
    type:String,
    optional:true
  },
  'contactTypeInfo.contactUploadIcon':{
    type:String,
    optional:true
  }
});

socialLinksSchema = new SimpleSchema({
  socialLinksInfo:{
    type:Object,
    optional:true
  },
  'socialLinksInfo.socialName':{
    type:String,
    optional:true
  },
  'socialLinksInfo.aboutSocial':{
    type:String,
    optional:true
  },
  'socialLinksInfo.socialDisplayName':{
    type:String,
    optional:true
  },
  'socialLinksInfo.socialUploadIcon':{
    type:String,
    optional:true
  }
})

titleSchema = new SimpleSchema({
  titleInfo:{
    type:Object,
    optional:true
  },
  'titleInfo.titleName':{
    type:String,
    optional:true
  },
    'titleInfo.aboutTitle':{
    type:String,
    optional:true
  },
  'titleInfo.titleDisplayName':{
    type:String,
    optional:true
  }
});

genderSchema = new SimpleSchema({
  genderInfo:{
    type:Object,
    optional:true
  },
  'genderInfo.genderName':{
    type:String,
    optional:true
  },
  'genderInfo.aboutGender':{
    type:String,
    optional:true
  },
  'genderInfo.genderDisplayName':{
    type:String,
    optional:true
  },
  'genderInfo.genderUploadIcon':{
    type:String,
    optional:true
  }
});

employmentTypeSchema = new SimpleSchema({
  employmentTypeInfo:{
    type:Object,
    optional:true
  },
  'employmentTypeInfo.employmentName':{
    type:String,
    optional:true
  },
    'employmentTypeInfo.aboutEmployment':{
    type:String,
    optional:true
  },
  'employmentTypeInfo.employmentDisplayName':{
    type:String,
    optional:true
  }
});

companyTypeSchema = new SimpleSchema({
  companyTypeInfo:{
    type:Object,
    optional:true
  },
  'companyTypeInfo.companyName':{
    type:String,
    optional:true
  },
  'companyTypeInfo.aboutCompany':{
    type:String,
    optional:true
  },
  'companyTypeInfo.companyDisplayName':{
    type:String,
    optional:true
  }
});

taxTypeSchema = new SimpleSchema({
  taxTypeInfo:{
    type:Object,
    optional:true
  },
    'taxTypeInfo.taxName':{
    type:String,
    optional:true
  },
    'taxTypeInfo.aboutTax':{
    type:String,
    optional:true
  },
  'taxTypeInfo.taxDisplayName':{
    type:String,
    optional:true
  }
});


MlMasterDataSchema=new SimpleSchema({

});
MlMasterDataSchema.extend(MlGlobalHierarchySpecs);
MlMasterDataSchema.extend(languageSchema);
MlMasterDataSchema.extend(addressTypeSchema);
MlMasterDataSchema.extend(emailTypeSchema);
MlMasterDataSchema.extend(contactTypeSchema);
MlMasterDataSchema.extend(socialLinksSchema);
MlMasterDataSchema.extend(titleSchema);
MlMasterDataSchema.extend(genderSchema);
MlMasterDataSchema.extend(employmentTypeSchema);
MlMasterDataSchema.extend(companyTypeSchema);
MlMasterDataSchema.extend(taxTypeSchema);

MlMasterData.attachSchema(MlMasterDataSchema);
