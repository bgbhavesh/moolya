import '../mlTemplateAssignments.js';

describe('Template Assignments Schema', function () {
  it('should verify the schema of MlTemplateAssignment', function () {
    var schema = MlTemplateAssignment.simpleSchema();

    expect(schema._schema.templateprocess.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateprocess.optional).to.be.equal(true);

    expect(schema._schema.templatesubProcess.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatesubProcess.optional).to.be.equal(true);

    expect(schema._schema.templateProcessName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateProcessName.optional).to.be.equal(true);

    expect(schema._schema.templateSubProcessName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateSubProcessName.optional).to.be.equal(true);

    expect(schema._schema.templateuserType.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateuserType.optional).to.be.equal(true);

    expect(schema._schema.templateidentity.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateidentity.optional).to.be.equal(true);

    expect(schema._schema.templateclusterId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateclusterId.optional).to.be.equal(true);

    expect(schema._schema.templateclusterName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templateclusterName.optional).to.be.equal(true);

    expect(schema._schema.templatechapterId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatechapterId.optional).to.be.equal(true);

    expect(schema._schema.templatechapterName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatechapterName.optional).to.be.equal(true);

    expect(schema._schema.templatesubChapterId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatesubChapterId.optional).to.be.equal(true);

    expect(schema._schema.templatesubChapterName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatesubChapterName.optional).to.be.equal(true);

    expect(schema._schema.templatecommunityCode.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatecommunityCode.optional).to.be.equal(true);

    expect(schema._schema.templatecommunityName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatecommunityName.optional).to.be.equal(true);

    expect(schema._schema.templatecommunityType.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.templatecommunityType.optional).to.be.equal(true);

    expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isActive.optional).to.be.equal(true);

    expect(schema._schema.isSystemDefined.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isSystemDefined.optional).to.be.equal(true);

    expect(schema._schema.stepAvailability.type.definitions[0].type.name).to.be.equal("Array");
    expect(schema._schema.stepAvailability.optional).to.be.equal(true);

    expect(schema._schema.assignedTemplates.type.definitions[0].type.name).to.be.equal("Array");
    expect(schema._schema.assignedTemplates.optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.isActive'].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema['assignedTemplates.$.isActive'].optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.stepName'].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema['assignedTemplates.$.stepName'].optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.stepCode'].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema['assignedTemplates.$.stepCode'].optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.templateCode'].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema['assignedTemplates.$.templateCode'].optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.templateName'].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema['assignedTemplates.$.templateName'].optional).to.be.equal(true);

    expect(schema._schema['assignedTemplates.$.createdDate'].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema['assignedTemplates.$.createdDate'].optional).to.be.equal(true);

    expect(schema._schema.createdBy.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.createdBy.optional).to.be.equal(true);

    expect(schema._schema.createdDate.type.definitions[0].type.name).to.be.equal("Date");
    expect(schema._schema.createdDate.optional).to.be.equal(true);

    expect(schema._schema.modifiedBy.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.modifiedBy.optional).to.be.equal(true);

    expect(schema._schema.modifiedDate.type.definitions[0].type.name).to.be.equal("Date");
    expect(schema._schema.modifiedDate.optional).to.be.equal(true);



  });

});
