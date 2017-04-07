import SimpleSchema from 'simpl-schema';

MlHierarchyFinalApproval = new Mongo.Collection('mlHierarchyFinalApproval');

MlHierarchyFinalApprovalSchema = new SimpleSchema({
  parentDepartment: {
    type: String,
    optional: false
  },
  parentSubDepartment: {
    type: String,
    optional: true
  },
  department: {
    type: String,
    optional: true
  },
  subDepartment:{
    type:String,
    optional:true
  },
  role:{
    type:String,
    optional:true
  }
})

MlHierarchyFinalApproval.attachSchema(MlHierarchyFinalApprovalSchema);
