import SimpleSchema from 'simpl-schema';
/**
 * Created by mohammed.mohasin on 21/3/17.
 */
MlTemplates = new Mongo.Collection('mlTemplates');

MlTemplatesSchema = new SimpleSchema({

  process: {
    type: String,
    optional: false
  },
  subProcess: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  }

})

MlTemplates.attachSchema(MlTemplatesSchema);
