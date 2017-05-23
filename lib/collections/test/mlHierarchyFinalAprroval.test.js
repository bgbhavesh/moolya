import '../mlHierarchyFinalApproval.js';

describe('Hierarchy Final Approval Schema', function () {

     it('should verify the schema of MlHierarchyFinalApproval', function () {

         var schema = MlHierarchyFinalApproval.simpleSchema();

       expect(schema._schema.parentDepartment.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.parentDepartment.optional).to.be.equal(false);

       expect(schema._schema.parentSubDepartment.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.parentSubDepartment.optional).to.be.equal(true);

       expect(schema._schema.clusterId.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.clusterId.optional).to.be.equal(true);

       expect(schema._schema.department.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.department.optional).to.be.equal(true);

       expect(schema._schema.subDepartment.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.subDepartment.optional).to.be.equal(true);

       expect(schema._schema.role.type.definitions[0].type.name).to.be.equal("String");
       expect(schema._schema.role.optional).to.be.equal(true);
     });

});
