import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 14/02/17.
 */
MlTransactions = new Mongo.Collection('mlTransactions');

MlTransactionsSchema = new SimpleSchema({
  transactionName:{
    type : String,
    optional:true
  },

  transactionDisplayName:{
    type : String,
    optional:true
  },

  transactionDescription:{
    type : String,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})

MlTransactions.attachSchema(MlTransactionsSchema);
