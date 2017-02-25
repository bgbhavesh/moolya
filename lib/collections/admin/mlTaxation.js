/**
 * Created by murali on 14/2/17.
 */
MlTaxation = new Mongo.Collection('mlTaxation');

MlTaxationSchema = new SimpleSchema({
    taxationName:{
      type : String,
      optional : true
    },
    taxationValidityFrom:{
      type : Date,
      optional : true
    },
    taxationValidityTo:{
      type : Date,
      optional : true
    },
    aboutTaxation:{
      type : String,
      optional : true
    },
    isActive:{
      type : Boolean,
      optional : true
    },
    taxInformation:{
      type : Array,
      optional : true
    },
    'taxInformation.$':{
      type : Object,
      optional : true
    },
    'taxInformation.$.taxName':{
      type : String,
      optional : true
    },
    'taxInformation.$.taxpercentage':{
      type : String,
      optional : true
    },
    'taxInformation.$.applicableStates':{
      type : Array,
      optional : true
    },
    'taxInformation.$.applicableStates.$':{
      type : Object,
      optional : true
    },
    'taxInformation.$.applicableStates.$.stateName':{
      type : String,
      optional : true
    },
    'taxInformation.$.applicableStates.$.taxPercentage':{
      type : String,
      optional : true
    }

})

MlTaxation.attachSchema(MlTaxationSchema);
