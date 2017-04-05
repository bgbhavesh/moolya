import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlConversations = new Mongo.Collection('mlConversations');

MlConversationsSchema = new SimpleSchema({
})

MlConversations.attachSchema(MlConversationsSchema);
MlCollections['MlConversations'] = MlConversations;

