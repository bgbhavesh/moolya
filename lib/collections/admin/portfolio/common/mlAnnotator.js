/**
 * Created by venkatasrinag on 3/4/17.
 */
import SimpleSchema from 'simpl-schema';

MlAnnotator = new Mongo.Collection('mlAnnotator');

MlAnnotatorSchema = new SimpleSchema({
    portfolioId:{
        type:String,
        optional:true
    },

    referenceDocId:{
        type:String,
        optional:true
    },

    quote:{
        type:String,
        optional:true
    },

    isResolved:{
        type:Boolean,
        optional:true
    },

    isReopened:{
        type:Boolean,
        optional:true
    }
})

MlAnnotator.attachSchema(MlAnnotatorSchema);