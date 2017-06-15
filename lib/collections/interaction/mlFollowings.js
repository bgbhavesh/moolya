/**
 * Created by mohammed.mohasin on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas';
MlFollowings = new Mongo.Collection('mlFollowings');


MlFollowingSchema = new SimpleSchema({
  followerId:{
    type:String,
    optional:true
  },
  followerEmail:{
    type:String,
    optional:true
  },
  followedBy:{
    type:String,
    optional:true
  },
  followedByEmail:{
    type:String,
    optional:true
  },
  createdOn:{
    type:Date,
    optional:true
  },
  createdBy:{
    type:String,
    optional:true
  },
  updatedOn:{
    type:Date,
    optional:true
  },
  updatedBy:{
    type:String,
    optional:true
  },
  isActive:{//isUnFollowed
    type:Boolean,
    optional:true
  }

});
MlCollections['MlFollowings']=MlFollowings;
