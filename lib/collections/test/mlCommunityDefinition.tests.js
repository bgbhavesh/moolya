/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlCommunityDefinition.js';

describe('MlCommunityDefinition Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlCommunityDefinition.simpleSchema();

    expect(mlschema._schema.name.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.name.optional).to.be.equal(false);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(true);

    expect(mlschema._schema.code.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.code.optional).to.be.equal(false);

    expect(mlschema._schema.communityImageLink.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityImageLink.optional).to.be.equal(true);

    expect(mlschema._schema.showOnMap.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.showOnMap.optional).to.be.equal(true);

    expect(mlschema._schema.aboutCommunity.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.aboutCommunity.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);
   });
});