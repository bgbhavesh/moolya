/**
 * Created by venkatsrinag on 2/5/17.
 */
import SimpleSchema from 'simpl-schema';

MlIdeas = new Mongo.Collection('mlIdeas');

ideaSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },
    portfolioId:{
        type:String,
        optional:true
    },
    title:{
        type:String,
        optional:true
    },
    isIdeaTitlePrivate: {
        type: Boolean,
        optional: true
    },
    description:{
        type:String,
        optional:true
    },
    isIdeaDescriptionPrivate: {
        type: Boolean,
        optional: true
    },
    isIdeaPrivate: {
      type: Boolean,
      optional: true
    },
    isActive: {
        type: Boolean,
        optional: true
    }
})

MlIdeas.attachSchema(ideaSchema);
