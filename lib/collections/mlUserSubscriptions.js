/**
 * Created by venkatsrinag on 7/6/17.
 */
import SimpleSchema from "simpl-schema";
import MlCollections from '../common/commonSchemas'

MlUserSubscriptions = new Mongo.Collection('mlUserSubscriptions');

UserSubscriptionSchema = new SimpleSchema({
    userId:{   //login userId
        type:String,
        optional:true
    },
    resId:{   //trans  _id
        type:String,
        optional:true
    },
    resType:{  // office/process
        type:String,
        optional:true
    },
    transactionId:{   //transid
        type:String,
        optional:true
    },
    profileId:{           //will be gen later
        type:String,
        optional:true
    },
    subscriptionDate:{    //new date()
        type:Date,
        optional:true
    },
    subscriptionEndDate:{    // new date() + 365
        type:Date,
        optional:true
    }
});


MlUserSubscriptions.attachSchema(UserSubscriptionSchema);
MlCollections['MlUserSubscriptions'] = MlUserSubscriptions;
