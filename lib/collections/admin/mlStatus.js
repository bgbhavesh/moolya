/**
 * Created by venkatasrinag on 3/4/17.
 */
import SimpleSchema from 'simpl-schema';
MlStatus = new Mongo.Collection('mlStatus');

MlStatusSchema = new SimpleSchema({
      code:{
          type:String,
          optional:true
      },

      description:{
          type:String,
          optional:true
      },

      isActive:{
          type:String,
          optional:true
      }
})