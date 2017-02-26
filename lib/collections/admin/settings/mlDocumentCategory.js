import SimpleSchema from 'simpl-schema';
MlDocumentCategories = new Mongo.Collection('mlDocumentCategory');

MlDocumentCategoriesSchema = new SimpleSchema({
  docCategoryName:{
    type:String,
    optional:true
  },
  docCategoryDisplayName:{
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


MlDocumentCategories.attachSchema(MlDocumentCategoriesSchema);
