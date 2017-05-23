/**
 * Created by Shubhankit on 22/5/17.
 */

import '../mlConnections.js';

describe('MlConnections Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlConnections.simpleSchema();

    expect(mlschema._schema.users.type.definitions[0].type.name).to.be.equal("Array");
    expect(mlschema._schema.users.optional).to.be.equal(true);

    expect(mlschema._schema["users.$"].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema["users.$"].optional).to.be.equal(true);

    expect(mlschema._schema["users.$.userid"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["users.$.userid"].optional).to.be.equal(true);

    expect(mlschema._schema["users.$.userName"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["users.$.userName"].optional).to.be.equal(true);

    expect(mlschema._schema["users.$.isFavourite"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema["users.$.isFavourite"].optional).to.be.equal(true);

    expect(mlschema._schema["users.$.isBlock"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema["users.$.isBlock"].optional).to.be.equal(true);

    expect(mlschema._schema.requestedFrom.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.requestedFrom.optional).to.be.equal(true);

    expect(mlschema._schema.createdBy.type.definitions[0].type.name).to.be.equal("Date");
    expect(mlschema._schema.createdBy.optional).to.be.equal(true);

    expect(mlschema._schema.updatedBy.type.definitions[0].type.name).to.be.equal("Date");
    expect(mlschema._schema.updatedBy.optional).to.be.equal(true);

    expect(mlschema._schema.isAccepted.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isAccepted.optional).to.be.equal(true);

    expect(mlschema._schema.isDenied.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isDenied.optional).to.be.equal(true);

    expect(mlschema._schema.resendCount.type.definitions[0].type.name).to.be.equal("Number");
    expect(mlschema._schema.resendCount.optional).to.be.equal(true);
   });
});