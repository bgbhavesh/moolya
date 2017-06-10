/**
 * Created by mohammed.mohasin on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';

MlViews = new Mongo.Collection('mlViews');


MlViewSchema = new SimpleSchema({
  resourceId:{
    type:String,
    optional:true
  },
  resourceType:{
    type:String,
    optional:true
  },
  userId:{
    type:String,
    optional:true
  },
  userEmail:{
    type:String,
    optional:true
  },
  createdOn:{
    type:String,
    optional:true
  }
});
