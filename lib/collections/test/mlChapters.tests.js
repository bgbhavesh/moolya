/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlChapters.js';

describe('MlChapters Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlChapters.simpleSchema();

    expect(mlschema._schema.clusterId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.clusterId.optional).to.be.equal(false);

    expect(mlschema._schema.clusterName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.clusterName.optional).to.be.equal(false);

    expect(mlschema._schema.chapterCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.chapterCode.optional).to.be.equal(true);

    expect(mlschema._schema.chapterName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.chapterName.optional).to.be.equal(false);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(true);

    expect(mlschema._schema.about.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.about.optional).to.be.equal(true);

    expect(mlschema._schema.chapterImage.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.chapterImage.optional).to.be.equal(true);

    expect(mlschema._schema.stateName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.stateName.optional).to.be.equal(true);

    expect(mlschema._schema.stateId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.stateId.optional).to.be.equal(true);

    expect(mlschema._schema.cityId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.cityId.optional).to.be.equal(true);
    expect(mlschema._schema.cityId.unique).to.be.equal(true);

    expect(mlschema._schema.cityName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.cityName.optional).to.be.equal(true);

    expect(mlschema._schema.latitude.type.definitions[0].type.name).to.be.equal("Number");
    expect(mlschema._schema.latitude.optional).to.be.equal(false);

    expect(mlschema._schema.longitude.type.definitions[0].type.name).to.be.equal("Number");
    expect(mlschema._schema.longitude.optional).to.be.equal(false);

    expect(mlschema._schema.email.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.email.optional).to.be.equal(true);

    expect(mlschema._schema.showOnMap.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.showOnMap.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);

    expect(mlschema._schema.status.type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema.status.optional).to.be.equal(true);

    expect(mlschema._schema['status.code'].type.definitions[0].type.name).to.be.equal("Number");
    expect(mlschema._schema['status.code'].optional).to.be.equal(true);

    expect(mlschema._schema['status.description'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['status.description'].optional).to.be.equal(true);
   });
});