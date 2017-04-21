/**
 * Created by venkatsrinag on 21/4/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'
MlAssets = new Mongo.Collection('mlAssets');

MlAssetsSchema = new SimpleSchema({
    assetName:{
        type:String,
        optional:false
    },
    displayName:{
        type:String,
        optional:true
    },
    icon:{
        type:String,
        optional:true
    },
    about:{
        type: String,
        optional:true
    },
    isActive:{
        type:Boolean,
        optional:true
    }
})


MlAssets.attachSchema(MlAssetsSchema);
MlCollections['MlAssets'] = MlAssets;

