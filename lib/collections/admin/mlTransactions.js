/**
 * Created by muralidhar on 14/02/17.
 */
MlTransactions = new Mongo.Collection('mlTransactions');

MlTransactionsSchema = new SimpleSchema({
})

MlTransactions.attachSchema(MlTransactionsSchema);
