import SimpleSchema from 'simpl-schema';
MlDocuments = new Mongo.Collection('mlDocuments');

MlDocumentsSchema = new SimpleSchema({
})

MlDocuments.attachSchema(MlDocumentsSchema);
