import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlTransactions = new Mongo.Collection('mlTransactions');

MlTransactionsSchema = new SimpleSchema({

  transactionType:{
    type:String,
    optional:true
  },
  transactionStatus:{
    type:String,
    optional:true
  },
  transactionAssignedBy:{
    type:String,
    optional:true
  },
  transactionCompletedBy:{
    type:String,
    optional:true
  },
  hierarchy:{
    type:String,
    optional:true
  }

})

MlTransactions.attachSchema(MlTransactionsSchema);

MlSchemas["MlTransactions"] = MlTransactionsSchema;
MlCollections['MlTransactions'] = MlTransactions;
