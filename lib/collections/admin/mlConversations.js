import SimpleSchema from 'simpl-schema';
MlConversations = new Mongo.Collection('mlConversations');

MlConversationsSchema = new SimpleSchema({
})

MlConversations.attachSchema(MlConversationsSchema);
