/**
 * Created by venkatsrinag on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlLikes = new Mongo.Collection('mlLikes');


MlLikeSchema = new SimpleSchema({
    resource:{
        type:String,
        optional:true
    }
});
