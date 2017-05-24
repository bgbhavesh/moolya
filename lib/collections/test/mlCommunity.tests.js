/**
 * Created by Shubhankit on 24/5/17.
 */

import '../admin/mlCommunity.js';

describe('MlCommunity Schema', function() {
  beforeEach(function(){
  });
  it('tests schema definition', function(){
    var mlschema = MlCommunity.simpleSchema();

    expect(mlschema._schema.communityName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityName.optional).to.be.equal(false);

    expect(mlschema._schema.communityDisplayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityDisplayName.optional).to.be.equal(true);

    expect(mlschema._schema.communityDescription.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityDescription.optional).to.be.equal(true);

    expect(mlschema._schema.communityDefId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityDefId.optional).to.be.equal(false);

    expect(mlschema._schema.communityDefCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityDefCode.optional).to.be.equal(false);

    expect(mlschema._schema.communityDefName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityDefName.optional).to.be.equal(false);

    expect(mlschema._schema.clusterId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.clusterId.optional).to.be.equal(false);

    expect(mlschema._schema.clusterName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.clusterName.optional).to.be.equal(true);

    expect(mlschema._schema.chapterId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.chapterId.optional).to.be.equal(false);

    expect(mlschema._schema.chapterName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.chapterName.optional).to.be.equal(true);

    expect(mlschema._schema.subChapterId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.subChapterId.optional).to.be.equal(true);

    expect(mlschema._schema.communityCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityCode.optional).to.be.equal(true);

    expect(mlschema._schema.communityAccessId.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityAccessId.optional).to.be.equal(true);

    expect(mlschema._schema.subChapterName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.subChapterName.optional).to.be.equal(true);

    expect(mlschema._schema.communityImageLink.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.communityImageLink.optional).to.be.equal(true);

    expect(mlschema._schema.showOnMap.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.showOnMap.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);

    expect(mlschema._schema.hierarchyLevel.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.hierarchyLevel.optional).to.be.equal(true);

    expect(mlschema._schema.hierarchyCode.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.hierarchyCode.optional).to.be.equal(true);

    expect(mlschema._schema.status.type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema.status.optional).to.be.equal(true);

    expect(mlschema._schema['status.code'].type.definitions[0].type.name).to.be.equal("Number");
    expect(mlschema._schema['status.code'].optional).to.be.equal(true);

    expect(mlschema._schema['status.description'].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema['status.description'].optional).to.be.equal(true);
   });
});