MlRoles = new Mongo.Collection('mlRoles');

MlRoleSchema = new SimpleSchema({
  name:{
    type:String,
    optional:false
  },
  role:{
    type:[Object],
    optional:true,
    blackbox:true
  }
})



MlRoles.attachSchema(MlRoleSchema);
