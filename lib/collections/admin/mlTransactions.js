import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlTransactions = new Mongo.Collection('mlTransactions');

MlTransactionsSchema = new SimpleSchema({

  transactionTypeName:{
    type:String,
    optional:true
  },
  transactionTypeId:{
    type:String,
    optional:true
  },
  requestTypeName:{
    type:String,
    optional:true
  },
  requestTypeId:{
    type:String,
    optional:true
  },
  transactionStatus:{
    type:MlStatusSchema,
    optional:true
  },
  hierarchy:{
    type:String,
    optional:true
  }

})

let BySchema = new SimpleSchema({
  type: {
    type: String,
    optional: true
  },
  id: {
    type: String,
    optional: true
  }
});

let StatusSchemaTmpl = {
  "status.code": {
    type: Number
  },
  "status.description": {
    type: String
  },
  "at": {
    type: Date,
    optional: true

  },
  "by": {
    type: BySchema,
    optional: true
  }
};

StatusTrailSchema = new SimpleSchema(StatusSchemaTmpl);
MlStatusSchema = new SimpleSchema({
  "code": {
    type: Number
  },
  "description": {
    type: String
  },
  trail: {
    type: [StatusTrailSchema],
    optional: true
  }
});


MlTransactions.attachSchema(MlTransactionsSchema);

MlSchemas["MlTransactions"] = MlTransactionsSchema;
MlCollections['MlTransactions'] = MlTransactions;
