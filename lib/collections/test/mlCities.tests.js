/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlCities.js';

describe('MlCities Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlCities.simpleSchema();

    expect(mlschema._schema.name.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.name.optional).to.be.equal(false);

    expect(mlschema._schema.stateId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.stateId.optional).to.be.equal(false);

    expect(mlschema._schema.countryId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.countryId.optional).to.be.equal(false);

    expect(mlschema._schema.countryCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.countryCode.optional).to.be.equal(false);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(true);

    expect(mlschema._schema.about.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.about.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);
   });
});