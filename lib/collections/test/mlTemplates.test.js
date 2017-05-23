import '../mlTemplates.js';

describe('Templates Schema',function(){

  it('should verify the schema of mlTemplates',function(){

    var schema = MlTemplates.simpleSchema();

    expect(schema._schema.processName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.processName.optional).to.be.equal(false);

    expect(schema._schema.procesId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.procesId.optional).to.be.equal(true);

    expect(schema._schema.subProcessName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.subProcessName.optional).to.be.equal(false);

    expect(schema._schema.subProcessId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.subProcessId.optional).to.be.equal(true);

    expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isActive.optional).to.be.equal(true);

    expect(schema._schema.templates.type.definitions[0].type.name).to.be.equal("Array");
    expect(schema._schema.templates.optional).to.be.equal(true);

    expect(schema._schema["templates.$.id"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.id"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.templateCode"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.templateCode"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.templateName"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.templateName"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.templateDescription"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.templateDescription"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.isActive"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema["templates.$.isActive"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.stepName"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.stepName"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.stepCode"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.stepCode"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.createdDate"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.createdDate"].optional).to.be.equal(true);

    expect(schema._schema["templates.$.templateImage"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["templates.$.templateImage"].optional).to.be.equal(true);

    expect(schema._schema.createdBy.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.createdBy.optional).to.be.equal(true);

    expect(schema._schema.createdDate.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.createdDate.optional).to.be.equal(true);
  });

});
