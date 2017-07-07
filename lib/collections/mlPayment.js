/**
 * Created by pankaj on 23/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlPayment = new Mongo.Collection('mlPayment');
MlPaymentSchema = new SimpleSchema({
    paymentId:{
      type: String,
      optional: true
    },
    paymentMethod:{
      type: String,
      optional: true
    },
    amount:{
      type: String,
      optional: true
    },
    currencyId:{
      type: String,
      optional: true
    },
    resourceId:{
      type: String,
      optional: true
    },
    resourceType:{
      type: String,
      optional: true
    },
    userId:{          //payee Id
      type: String,
      optional: true
    },
    createdAt:{
      type: Date,
      optional:true
    },
    updatedAt:{
      type: Date,
      optional: true
    }
});

MlPayment.attachSchema(MlPaymentSchema);
MlCollections['MlPayment'] = MlPayment;
