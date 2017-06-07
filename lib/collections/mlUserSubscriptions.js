/**
 * Created by venkatsrinag on 7/6/17.
 */
import SimpleSchema from "simpl-schema";

MlUserSubscriptions = new Mongo.Collection('mlUserSubscriptions');

UserSubscriptionSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },
    resId:{
        type:String,
        optional:true
    },
    resType:{
        type:String,
        optional:true
    },
    transcId:{
        type:String,
        optional:true
    },
    orderId:{
        type:String,
        optional:true
    },
    subscriptionDate:{
        type:Date,
        optional:true
    },
    subscriptionEndDate:{
        type:Date,
        optional:true
    }
});


MlUserSubscriptions.attachSchema(UserSubscriptionSchema);
