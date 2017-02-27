import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 14/02/17.
 */
MlTemplates = new Mongo.Collection('mlTemplates');

MlTemplatesSchema = new SimpleSchema({

  templateName:{
    type : String,
    optional:false
  },

  templateDisplayName:{
    type : String,
    optional:true
  },

  templateDescription:{
    type : String,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})

MlTemplates.attachSchema(MlTemplatesSchema);
