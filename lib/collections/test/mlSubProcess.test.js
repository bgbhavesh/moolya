import '../mlSubProcess.js';

describe('Sub Process Schema', function () {
   it('should verify the schema of MlSubProcess', function () {
     var schema = MlSubProcess.simpleSchema();

     expect(schema._schema.processName.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.processName.optional).to.be.equal(false);

     expect(schema._schema.procesId.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.procesId.optional).to.be.equal(true);

     expect(schema._schema.subProcessName.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.subProcessName.optional).to.be.equal(true);

     expect(schema._schema.subProcessDescription.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.subProcessDescription.optional).to.be.equal(true);

     expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
     expect(schema._schema.isActive.optional).to.be.equal(true);

     expect(schema._schema.steps.type.definitions[0].type.name).to.be.equal("Array");
     expect(schema._schema.steps.optional).to.be.equal(true);

     expect(schema._schema['steps.$.isActive'].type.definitions[0].type.name).to.be.equal("Boolean");
     expect(schema._schema['steps.$.isActive'].optional).to.be.equal(true);

     expect(schema._schema['steps.$.stepName'].type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema['steps.$.stepName'].optional).to.be.equal(true);

     expect(schema._schema['steps.$.stepCode'].type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema['steps.$.stepCode'].optional).to.be.equal(true);

     expect(schema._schema['steps.$.stepId'].type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema['steps.$.stepId'].optional).to.be.equal(true);

     expect(schema._schema.createdBy.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.createdBy.optional).to.be.equal(true);

     expect(schema._schema.createdDate.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.createdDate.optional).to.be.equal(true);

     expect(schema._schema.modifiedBy.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.modifiedBy.optional).to.be.equal(true);

     expect(schema._schema.modifiedDate.type.definitions[0].type.name).to.be.equal("String");
     expect(schema._schema.modifiedDate.optional).to.be.equal(true);



   });

});
