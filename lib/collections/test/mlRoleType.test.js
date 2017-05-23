import '../mlRoleType.js';

describe('Role Type Schema', function () {
   it('should verify the schema of MlRoleTyes', function () {
      var schema = MlRoleTypes.simpleSchema();

     expect(schema._schema.roleTypeName.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.roleTypeName.optional).to.be.equal(false);

     expect(schema._schema.roleTypeDisplayName.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.roleTypeDisplayName.optional).to.be.equal(true);

     expect(schema._schema.roleTypeDescription.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.roleTypeDescription.optional).to.be.equal(true);

     expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
     expect(schema._schema.isActive.optional).to.be.equal(true);

   });
});
