import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

/**
 * Created by muralidhar on 14/02/17.
 */
MlTransactions = new Mongo.Collection('mlTransactionType');

MlTransactionsSchema = new SimpleSchema({
  transactionName:{
    type : String,
    optional:false
  },

  transactionDisplayName:{
    type : String,
    optional:true
  },

  transactionDescription:{
    type : String,
    optional:true
  },
  createdDateTime:{
    type : String,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})

MlTransactions.attachSchema(MlTransactionsSchema);
MlCollections['MlTransactions'] = MlTransactions;

