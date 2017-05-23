import '../mlUserType.js';

describe('User Type Schema', function(){
 beforeEach(function () {

 });
  it('should verify that the userTypeName is a string and not optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.userTypeName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.userTypeName.optional).to.be.equal(false);

  });
  it('should verify that the displayName is a string and optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.displayName.optional).to.be.equal(true);

  });
  it('should verify that the userType Description is a string and optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.userTypeDesc.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.userTypeDesc.optional).to.be.equal(true);

  });
  it('should verify that the communityCode is a string and optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.communityCode.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.communityCode.optional).to.be.equal(true);

  });
  it('should verify that the isActive is a Boolean and optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isActive.optional).to.be.equal(true);

  });
  it('should verify that the communityName is a String and optional ', function () {
    var schema = MlUserTypes.simpleSchema();
    expect(schema._schema.communityName.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.communityName.optional).to.be.equal(true);

  });
});
