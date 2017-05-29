/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlAudit.js';

describe('MlAudit Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlAudit.simpleSchema();

    expect(mlschema._schema.userId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.userId.optional).to.be.equal(false);

    expect(mlschema._schema.userName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.userName.optional).to.be.equal(false);

    expect(mlschema._schema.moduleName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.moduleName.optional).to.be.equal(true);

    expect(mlschema._schema.collectionName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.collectionName.optional).to.be.equal(false);

    expect(mlschema._schema.url.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.url.optional).to.be.equal(false);

    expect(mlschema._schema.docId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.docId.optional).to.be.equal(true);

    expect(mlschema._schema.action.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.action.optional).to.be.equal(true);

    expect(mlschema._schema.field.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.field.optional).to.be.equal(true);

    expect(mlschema._schema.fieldName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.fieldName.optional).to.be.equal(true);

    expect(mlschema._schema.previousValue.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.previousValue.optional).to.be.equal(true);

    expect(mlschema._schema.currentValue.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.currentValue.optional).to.be.equal(true);

    expect(mlschema._schema.errorReason.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.errorReason.optional).to.be.equal(true);

    expect(mlschema._schema['userAgent'].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema['userAgent'].optional).to.be.equal(true);

    expect(mlschema._schema['userAgent.ipAddress'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.ipAddress'].optional).to.be.equal(false);

    expect(mlschema._schema['userAgent.OS'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.OS'].optional).to.be.equal(false);

    expect(mlschema._schema['userAgent.browser'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.browser'].optional).to.be.equal(false);

    expect(mlschema._schema['userAgent.deviceModel'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.deviceModel'].optional).to.be.equal(false);

    expect(mlschema._schema['userAgent.deviceType'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.deviceType'].optional).to.be.equal(false);

    expect(mlschema._schema['userAgent.deviceVendor'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['userAgent.deviceVendor'].optional).to.be.equal(false);

    expect(mlschema._schema.timeStamp.type.definitions[0].type.name).to.be.equal("Date");
    expect(mlschema._schema.timeStamp.optional).to.be.equal(false);
   });
});