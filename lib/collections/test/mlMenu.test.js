import '../mlMenu.js';

describe('Menu Schema', function(){

    it('should verify the Schema of mlMenu', function () {
        var schema = MlMenus.simpleSchema();

        expect(schema._schema.name.type.definitions[0].type.name).to.be.equal("String");
        expect(schema._schema.name.optional).to.be.equal(false);

        expect(schema._schema.menu.type.definitions[0].type.name).to.be.equal("Array");
        expect(schema._schema.menu.optional).to.be.equal(true);
        expect(schema._schema.menu.blackbox).to.be.equal(true);

    });
});
