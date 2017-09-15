/**
 * Created by kanwarjeet on 9/15/17.
 */
import SimpleSchema from 'simpl-schema';
import MlSchemas from '../common/commonSchemas'
import MlCollections from '../common/commonSchemas'
MlSitemap = new Mongo.Collection('mlSitemap');

MlSitemapDetails = new SimpleSchema({
  userId:{
    type:String,
    optional:true
  },
  seoUrl:{
    type:String,
    optional:true
  },
  uniqueSeoName:{
    type:String,
    optional:true
  },
  incrementalId:{
    type:Number,
    optional:true
  },
  priority:{
    type:Number,
    optional:true
  },
  createdBy:{
    type:String,
    optional:true
  },
  timestamp:{
    type:Date,
    optional: true,
    defaultValue: new Date()
  }
})
MlSitemap.attachSchema(MlSitemapDetails);
MlSchemas["MlSitemap"] = MlSitemapDetails;
MlCollections['MlSitemap'] = MlSitemap;
