/**
 * Created by venkatasrinag on 3/4/17.
 */
import SimpleSchema from 'simpl-schema';

MlAnnotatorComments = new Mongo.Collection('mlAnnotatorComments');

MlAnnotatorCommentsSchema = new SimpleSchema({
    annotatorId:{
        type:String,
        optional:true
    },
    portfolioId:{
        type:String,
        optional:true
    },

    referenceDocId:{
        type:String,
        optional:true
    },

    comment:{
        type:String,
        optional:true
    }
})

MlAnnotatorComments.attachSchema(MlAnnotatorCommentsSchema);