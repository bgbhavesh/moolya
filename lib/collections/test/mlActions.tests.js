/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlActions.js';

describe('MlActions Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlActions.simpleSchema();

    expect(mlschema._schema.name.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.name.optional).to.be.equal(false);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(false);

    expect(mlschema._schema.code.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.code.optional).to.be.equal(false);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(false);
   });
});