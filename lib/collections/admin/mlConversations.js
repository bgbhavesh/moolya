import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlConversations = new Mongo.Collection('mlConversations');

MlConversationsSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true
  },
  appId: {
    type: String,
    optional: true
  },
  apiKey: {
    type: String,
    optional: true
  },
  timeStamp: {
    type: Date,
    optional: false,
    defaultValue: new Date()
  }
})

MlConversations.attachSchema(MlConversationsSchema);
MlCollections['MlConversations'] = MlConversations;

