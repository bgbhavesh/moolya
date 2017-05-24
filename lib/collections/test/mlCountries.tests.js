/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlCountries.js';

describe('MlCountries Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlCountries.simpleSchema();

    expect(mlschema._schema.country.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.country.optional).to.be.equal(false);

    expect(mlschema._schema.countryCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.countryCode.optional).to.be.equal(false);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(false);

    expect(mlschema._schema.about.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.about.optional).to.be.equal(true);

    expect(mlschema._schema.capital.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.capital.optional).to.be.equal(true);

    expect(mlschema._schema.url.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.url.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);

    expect(mlschema._schema.phoneNumberCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.phoneNumberCode.optional).to.be.equal(true);

    expect(mlschema._schema.status.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.status.optional).to.be.equal(true);
   });
});