/**
 * Created by venkatasrinag on 28/1/17.
 */
MlModules = new Mongo.Collection('mlModules');

MlModulesSchema = new SimpleSchema({
    moduleName:{
        type:String,
        optional:false
    },

    isActive:{
        type:Boolean,
        optional:false
    }

})
