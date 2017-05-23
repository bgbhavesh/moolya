import '../mlHierarchyAssigments.js';

describe('Hierarchy Assignment Schema', function(){

  it('should verify the schema of MlHierarchyAssignments', function () {

    var schema = MlHierarchyAssignments.simpleSchema();

    expect(schema._schema.parentDepartment.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.parentDepartment.optional).to.be.equal(true);

    expect(schema._schema.parentSubDepartment.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.parentSubDepartment.optional).to.be.equal(true);

    expect(schema._schema.clusterId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.clusterId.optional).to.be.equal(true);

    expect(schema._schema.subChapterId.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.subChapterId.optional).to.be.equal(true);

    expect(schema._schema.isDefaultSubChapter.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isDefaultSubChapter.optional).to.be.equal(true);

    expect(schema._schema.teamStructureAssignment.type.definitions[0].type.name).to.be.equal("Array");
    expect(schema._schema.teamStructureAssignment.optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.roleId"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.roleId"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.roleName"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.roleName"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.displayName"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.displayName"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.roleType"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.roleType"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.isAssigned"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema["teamStructureAssignment.$.isAssigned"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.assignedLevel"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.assignedLevel"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.levelCode"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.levelCode"].optional).to.be.equal(true);

    expect(schema._schema["teamStructureAssignment.$.reportingRole"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["teamStructureAssignment.$.reportingRole"].optional).to.be.equal(true);

    expect(schema._schema.finalApproval.type.definitions[0].type.name).to.be.equal("Object");
    expect(schema._schema.finalApproval.optional).to.be.equal(true);

    expect(schema._schema["finalApproval.department"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["finalApproval.department"].optional).to.be.equal(true);

    expect(schema._schema["finalApproval.subDepartment"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["finalApproval.subDepartment"].optional).to.be.equal(true);

    expect(schema._schema["finalApproval.role"].type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema["finalApproval.role"].optional).to.be.equal(true);

    expect(schema._schema["finalApproval.isChecked"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema["finalApproval.isChecked"].optional).to.be.equal(true);


  })

});
