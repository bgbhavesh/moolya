import '../mlMyOffice.js';

describe('My Office Schema', function () {


    it('should verify the schema of MlMyOfficeMembers', function(){
      let schema = MlMyOfficeMembers;

      expect(schema._schema.userId.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.userId.optional).to.be.equal(true);

      expect(schema._schema.firstName.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.firstName.optional).to.be.equal(true);

      expect(schema._schema.lastName.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.lastName.optional).to.be.equal(true);

      expect(schema._schema.mobileNumber.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.mobileNumber.optional).to.be.equal(true);

      expect(schema._schema.emailId.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.emailId.optional).to.be.equal(true);

      expect(schema._schema.userType.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.userType.optional).to.be.equal(true);

      expect(schema._schema.description.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.description.optional).to.be.equal(true);

      expect(schema._schema.name.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.name.optional).to.be.equal(true);

      expect(schema._schema.joiningDate.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.joiningDate.optional).to.be.equal(true);

      expect(schema._schema.role.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.role.optional).to.be.equal(true);

      expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isActive.optional).to.be.equal(true);

      expect(schema._schema.isPrincipal.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isPrincipal.optional).to.be.equal(true);

      expect(schema._schema.isIndependent.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isIndependent.optional).to.be.equal(true);

      expect(schema._schema.isInternalUserInteraction.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isInternalUserInteraction.optional).to.be.equal(true);

      expect(schema._schema.isFreeze.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isFreeze.optional).to.be.equal(true);

      expect(schema._schema.isRetire.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isRetire.optional).to.be.equal(true);

    });

    it('should verify the schema of MlMyOffice', function () {
      let schema = MlMyOffice.simpleSchema();

      expect(schema._schema.userId.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.userId.optional).to.be.equal(true);

      expect(schema._schema.totalCount.type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema.totalCount.optional).to.be.equal(true);

      expect(schema._schema.principalUserCount.type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema.principalUserCount.optional).to.be.equal(true);

      expect(schema._schema.teamUserCount.type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema.teamUserCount.optional).to.be.equal(true);

      expect(schema._schema.availableCommunities.type.definitions[0].type.name).to.be.equal("Array");
      expect(schema._schema.availableCommunities.optional).to.be.equal(true);

      expect(schema._schema['availableCommunities.$.communityName'].type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema['availableCommunities.$.communityName'].optional).to.be.equal(true);

      expect(schema._schema['availableCommunities.$.communityId'].type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema['availableCommunities.$.communityId'].optional).to.be.equal(true);

      expect(schema._schema['availableCommunities.$.userCount'].type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema['availableCommunities.$.userCount'].optional).to.be.equal(true);

      expect(schema._schema.barerCount.type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema.barerCount.optional).to.be.equal(true);

      expect(schema._schema.description.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.description.optional).to.be.equal(true);

      expect(schema._schema.branchType.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.branchType.optional).to.be.equal(true);

      expect(schema._schema.location.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.location.optional).to.be.equal(true);

      expect(schema._schema.streetLocality.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.streetLocality.optional).to.be.equal(true);

      expect(schema._schema.landmark.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.landmark.optional).to.be.equal(true);

      expect(schema._schema.area.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.area.optional).to.be.equal(true);

      expect(schema._schema.city.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.city.optional).to.be.equal(true);

      expect(schema._schema.state.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.state.optional).to.be.equal(true);

      expect(schema._schema.country.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.country.optional).to.be.equal(true);

      expect(schema._schema.zipCode.type.definitions[0].type.name).to.be.equal("Number");
      expect(schema._schema.zipCode.optional).to.be.equal(true);

      expect(schema._schema.about.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.about.optional).to.be.equal(true);

      expect(schema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
      expect(schema._schema.isActive.optional).to.be.equal(true);

      expect(schema._schema.officeMembers.type.definitions[0].type.name).to.be.equal("Array");
      expect(schema._schema.officeMembers.optional).to.be.equal(true);

      // console.log(schema._schema['officeMembers.$'].type.definitions[0].type['_schema']);
      // console.log(MlMyOfficeMembers._schema);

      expect(schema._schema['officeMembers.$'].type.definitions[0].type['_schema']).to.be.equal(MlMyOfficeMembers._schema);
      expect(schema._schema['officeMembers.$'].optional).to.be.equal(true);

      expect(schema._schema.paymentLink.type.definitions[0].type.name).to.be.equal("String");
      expect(schema._schema.paymentLink.optional).to.be.equal(true);


    });
});
