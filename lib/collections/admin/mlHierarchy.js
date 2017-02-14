/**
 * Created by venkatasrinag on 27/1/17.
 */
MlHierarchy = new Mongo.Collection('mlHierarchy');


MlHierarchySchema = new SimpleSchema({
    roleName:{
        type:String,
        optional:false
    },

    hierarchyLevel:{
        type: Number,
        optional:false
    }
})


MlHierarchy.attachSchema(MlHierarchySchema);
