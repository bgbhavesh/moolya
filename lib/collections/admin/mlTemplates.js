import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

/**
 * Created by muralidhar on 14/02/17.
 */
MlAccountTypes = new Mongo.Collection('mlAccountTypes');

MlAccountsSchema = new SimpleSchema({

  accountName:{
    type : String,
    optional:false
  },

  accountDisplayName:{
    type : String,
    optional:true
  },

  accountDescription:{
    type : String,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})

MlAccountTypes.attachSchema(MlAccountsSchema);
MlCollections['MlAccountTypes'] = MlAccountTypes;
