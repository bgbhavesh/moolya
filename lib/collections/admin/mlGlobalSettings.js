import SimpleSchema from 'simpl-schema';
/**
 * Created by murali on 14/2/17.
 */
MlGlobalSettings = new Mongo.Collection('mlGlobalSettings');

regional = new SimpleSchema({
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
})

MlGlobalSettings.attachSchema(regional);

language = new SimpleSchema({
  languageName:{
    type:String,
    optional:true
  },
  aboutLanguage:{
    type:String,
    optional:true
  },
  languageDisplayName:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(language);

dateAndTime = new SimpleSchema({
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
})

MlGlobalSettings.attachSchema(dateAndTime);

numericalFormat = new SimpleSchema({
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
})

MlGlobalSettings.attachSchema(numericalFormat);


addressType = new SimpleSchema({
  addressName:{
    type:String,
    optional:true
  },
  aboutAddress:{
    type:String,
    optional:true
  },
  addressDisplayName:{
    type:String,
    optional:true
  },
  addressUploadIcon:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(addressType);

emailType = new SimpleSchema({
  emailName:{
    type:String,
    optional:true
  },
  aboutEmail:{
    type:String,
    optional:true
  },
  emailDisplayName:{
    type:String,
    optional:true
  },
  emailUploadIcon:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(emailType);

contactType = new SimpleSchema({
  contactName:{
    type:String,
    optional:true
  },
  aboutContact:{
    type:String,
    optional:true
  },
  contactDisplayName:{
    type:String,
    optional:true
  },
  contactUploadIcon:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(contactType);

socialLinks = new SimpleSchema({
  socialName:{
    type:String,
    optional:true
  },
  aboutSocial:{
    type:String,
    optional:true
  },
  socialDisplayName:{
    type:String,
    optional:true
  },
  socialUploadIcon:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(socialLinks);

title = new SimpleSchema({
  titleName:{
    type:String,
    optional:true
  },
  aboutTitle:{
    type:String,
    optional:true
  },
  titleDisplayName:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(title);

gender = new SimpleSchema({
  genderName:{
    type:String,
    optional:true
  },
  aboutGender:{
    type:String,
    optional:true
  },
  genderDisplayName:{
    type:String,
    optional:true
  },
  genderUploadIcon:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(gender);

employmentType = new SimpleSchema({
  employmentName:{
    type:String,
    optional:true
  },
  aboutEmployment:{
    type:String,
    optional:true
  },
  employmentDisplayName:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(employmentType);

companyType = new SimpleSchema({
  companyName:{
    type:String,
    optional:true
  },
  aboutCompany:{
    type:String,
    optional:true
  },
  companyDisplayName:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(companyType);


taxType = new SimpleSchema({
  taxName:{
    type:String,
    optional:true
  },
  aboutTax:{
    type:String,
    optional:true
  },
  taxDisplayName:{
    type:String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})

MlGlobalSettings.attachSchema(taxType);
