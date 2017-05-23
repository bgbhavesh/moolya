import '../mlDefaultMenus.js';

describe('Default Menus Schema', function(){

  it('should verify that the image is a string and not optional ', function () {
    var schema = MlDefaultMenus.simpleSchema();
    expect(schema._schema.image.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.image.optional).to.be.equal(false);

    expect(schema._schema.link.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.link.optional).to.be.equal(false);

    expect(schema._schema.name.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.name.optional).to.be.equal(false);

    expect(schema._schema.id.type.definitions[0].type.name).to.be.equal("String");
    expect(schema._schema.id.optional).to.be.equal(false);

    expect(schema._schema.isLink.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isLink.optional).to.be.equal(false);

    expect(schema._schema.isMenu.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(schema._schema.isMenu.optional).to.be.equal(false);

  });
});
