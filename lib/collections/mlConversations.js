/**
 * Created by venkatsrinag on 8/21/17.
 */
import SimpleSchema from 'simpl-schema';

MlConversations = new Mongo.Collection('mlConversations');

MlConversationSchema = new SimpleSchema({
  apiKey:{
    type:String,
    optional: true
  },

  isActive:{
    type:String,
    optional:true
  }
});


MlConversations.attachSchema(MlConversationSchema);
