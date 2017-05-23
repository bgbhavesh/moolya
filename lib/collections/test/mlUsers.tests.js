/**
 * Created by Shubhankit on 23/5/17.
 */

import '../mlUsers.js';

describe('MlUsers Schema', function() {
  beforeEach(function(){
    mlschema = moolyaProfile;
    iupschema = InternalUprofile;
    eupschema = externalUserProfile;
    contactschema = contactSchema;
    emailschema = emailSchema;
    addressschema = addressSchema;
    sociallinkschema = socialLinkSchema;
    kycdocumentschema = kycDocumentSchema;
    externaluserinfoschema = externalUserAdditionalInfo;
    userprofileschema = UserProfileSchema;
  });
  it('tests moolyaProfile schema definition', function(){

    expect(mlschema._schema.firstName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.firstName.optional).to.be.equal(false);

    expect(mlschema._schema.middleName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.middleName.optional).to.be.equal(false);

    expect(mlschema._schema.lastName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.lastName.optional).to.be.equal(false);

    expect(mlschema._schema.userType.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.userType.optional).to.be.equal(false);

    expect(mlschema._schema.roleType.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.roleType.optional).to.be.equal(false);

    expect(mlschema._schema.assignedDepartment.type.definitions[0].type.name).to.be.equal("Array");
    expect(mlschema._schema.assignedDepartment.optional).to.be.equal(true);

    expect(mlschema._schema["assignedDepartment.$"].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema["assignedDepartment.$"].optional).to.be.equal(true);

    expect(mlschema._schema["assignedDepartment.$.department"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["assignedDepartment.$.department"].optional).to.be.equal(true);

    expect(mlschema._schema["assignedDepartment.$.subDepartment"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["assignedDepartment.$.subDepartment"].optional).to.be.equal(true);

    expect(mlschema._schema.displayName.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.displayName.optional).to.be.equal(false);

    expect(mlschema._schema.email.type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema.email.optional).to.be.equal(false);

    expect(mlschema._schema.contact.type.definitions[0].type.name).to.be.equal("Array");
    expect(mlschema._schema.contact.optional).to.be.equal(false);

    expect(mlschema._schema["contact.$"].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema["contact.$"].optional).to.be.equal(true);

    expect(mlschema._schema["contact.$.contactNumberType"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["contact.$.contactNumberType"].optional).to.be.equal(true);

    expect(mlschema._schema["contact.$.contactType"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["contact.$.contactType"].optional).to.be.equal(true);

    expect(mlschema._schema["contact.$.countryCode"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["contact.$.countryCode"].optional).to.be.equal(true);

    expect(mlschema._schema["contact.$.number"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["contact.$.number"].optional).to.be.equal(true);

    expect(mlschema._schema["contact.$.isOTPValidated"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema["contact.$.isOTPValidated"].optional).to.be.equal(true);

    expect(mlschema._schema.globalAssignment.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.globalAssignment.optional).to.be.equal(true);

    expect(mlschema._schema.isActive.type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema.isActive.optional).to.be.equal(true);

    expect(mlschema._schema.userProfiles.type.definitions[0].type.name).to.be.equal("Array");
    expect(mlschema._schema.userProfiles.optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$"].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema["userProfiles.$"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.isDefault"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema["userProfiles.$.isDefault"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.clusterId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.clusterId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles"].type.definitions[0].type.name).to.be.equal("Array");
    expect(mlschema._schema["userProfiles.$.userRoles"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$"].type.definitions[0].type.name).to.be.equal("Object");
    expect(mlschema._schema["userProfiles.$.userRoles.$"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.roleId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.roleId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.roleName"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.roleName"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.departmentId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.departmentId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.departmentName"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.departmentName"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.subDepartmentId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.subDepartmentId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.subDepartmentName"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.subDepartmentName"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.clusterId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.clusterId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.chapterId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.chapterId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.subChapterId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.subChapterId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.communityId"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.communityId"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.isActive"].type.definitions[0].type.name).to.be.equal("Boolean");
    expect(mlschema._schema["userProfiles.$.userRoles.$.isActive"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.validFrom"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.validFrom"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.validTo"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.validTo"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.hierarchyLevel"].type.definitions[0].type).to.be.equal("SimpleSchema.Integer");
    expect(mlschema._schema["userProfiles.$.userRoles.$.hierarchyLevel"].optional).to.be.equal(true);

    expect(mlschema._schema["userProfiles.$.userRoles.$.hierarchyCode"].type.definitions[0].type.name).to.be.equal("String");
    expect(mlschema._schema["userProfiles.$.userRoles.$.hierarchyCode"].optional).to.be.equal(true);

   });

  it('test InternalUProfile schema definition', function () {

    expect(iupschema._schema.moolyaprofile.type.definitions[0].type._schema).to.be.equal(mlschema._schema);
    expect(iupschema._schema.moolyaprofile.optional).to.be.equal(false);
  });

  it('test externalUserProfile schema definition', function () {

    expect(eupschema._schema.registrationId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.registrationId.optional).to.be.equal(true);

    expect(eupschema._schema.portfolios.type.definitions[0].type.name).to.be.equal('Array');
    expect(eupschema._schema.portfolios.optional).to.be.equal(true);

    expect(eupschema._schema['portfolios.$'].type.definitions[0].type.name).to.be.equal('Object');
    expect(eupschema._schema['portfolios.$'].optional).to.be.equal(true);

    expect(eupschema._schema['portfolios.$.portfolioId'].type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema['portfolios.$.portfolioId'].optional).to.be.equal(true);

    expect(eupschema._schema['portfolios.$.isDefault'].type.definitions[0].type.name).to.be.equal('Boolean');
    expect(eupschema._schema['portfolios.$.isDefault'].optional).to.be.equal(true);

    expect(eupschema._schema.countryName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.countryName.optional).to.be.equal(true);

    expect(eupschema._schema.countryId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.countryId.optional).to.be.equal(true);

    expect(eupschema._schema.cityName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.cityName.optional).to.be.equal(true);

    expect(eupschema._schema.cityId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.cityId.optional).to.be.equal(true);

    expect(eupschema._schema.mobileNumber.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.mobileNumber.optional).to.be.equal(true);

    expect(eupschema._schema.clusterId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.clusterId.optional).to.be.equal(true);

    expect(eupschema._schema.clusterName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.clusterName.optional).to.be.equal(true);

    expect(eupschema._schema.chapterId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.chapterId.optional).to.be.equal(true);

    expect(eupschema._schema.chapterName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.chapterName.optional).to.be.equal(true);

    expect(eupschema._schema.subChapterId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.subChapterId.optional).to.be.equal(true);

    expect(eupschema._schema.subChapterName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.subChapterName.optional).to.be.equal(true);

    expect(eupschema._schema.communityId.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.communityId.optional).to.be.equal(true);

    expect(eupschema._schema.communityName.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.communityName.optional).to.be.equal(true);

    expect(eupschema._schema.communityType.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.communityType.optional).to.be.equal(true);

    expect(eupschema._schema.isDefault.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(eupschema._schema.isDefault.optional).to.be.equal(true);

    expect(eupschema._schema.isActive.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(eupschema._schema.isActive.optional).to.be.equal(true);

    expect(eupschema._schema.accountType.type.definitions[0].type.name).to.be.equal('String');
    expect(eupschema._schema.accountType.optional).to.be.equal(true);
  });

  it('test contactSchema definition', function () {

    expect(contactschema._schema.numberType.type.definitions[0].type.name).to.be.equal('String');
    expect(contactschema._schema.numberType.optional).to.be.equal(true);

    expect(contactschema._schema.numberTypeName.type.definitions[0].type.name).to.be.equal('String');
    expect(contactschema._schema.numberTypeName.optional).to.be.equal(true);

    expect(contactschema._schema.countryCode.type.definitions[0].type.name).to.be.equal('String');
    expect(contactschema._schema.countryCode.optional).to.be.equal(true);

    expect(contactschema._schema.contactNumber.type.definitions[0].type.name).to.be.equal('String');
    expect(contactschema._schema.contactNumber.optional).to.be.equal(true);
  });

  it('test emailSchema definition', function () {

    expect(emailschema._schema.emailIdType.type.definitions[0].type.name).to.be.equal('String');
    expect(emailschema._schema.emailIdType.optional).to.be.equal(true);

    expect(emailschema._schema.emailIdTypeName.type.definitions[0].type.name).to.be.equal('String');
    expect(emailschema._schema.emailIdTypeName.optional).to.be.equal(true);

    expect(emailschema._schema.emailId.type.definitions[0].type.name).to.be.equal('String');
    expect(emailschema._schema.emailId.optional).to.be.equal(true);
  });

  it('test addressSchema definition', function () {

    expect(addressschema._schema.addressType.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressType.optional).to.be.equal(true);

    expect(addressschema._schema.addressTypeName.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressTypeName.optional).to.be.equal(true);

    expect(addressschema._schema.name.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.name.optional).to.be.equal(true);

    expect(addressschema._schema.phoneNumber.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.phoneNumber.optional).to.be.equal(true);

    expect(addressschema._schema.addressFlat.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressFlat.optional).to.be.equal(true);

    expect(addressschema._schema.addressLocality.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressLocality.optional).to.be.equal(true);

    expect(addressschema._schema.addressLandmark.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressLandmark.optional).to.be.equal(true);

    expect(addressschema._schema.addressArea.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressArea.optional).to.be.equal(true);

    expect(addressschema._schema.addressCity.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressCity.optional).to.be.equal(true);

    expect(addressschema._schema.addressState.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressState.optional).to.be.equal(true);

    expect(addressschema._schema.addressCountry.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressCountry.optional).to.be.equal(true);

    expect(addressschema._schema.addressPinCode.type.definitions[0].type.name).to.be.equal('String');
    expect(addressschema._schema.addressPinCode.optional).to.be.equal(true);
  });

  it('test SocialLinkSchema definition', function () {

    expect(sociallinkschema._schema.socialLinkTypeName.type.definitions[0].type.name).to.be.equal('String');
    expect(sociallinkschema._schema.socialLinkTypeName.optional).to.be.equal(true);

    expect(sociallinkschema._schema.socialLinkType.type.definitions[0].type.name).to.be.equal('String');
    expect(sociallinkschema._schema.socialLinkType.optional).to.be.equal(true);

    expect(sociallinkschema._schema.socialLinkUrl.type.definitions[0].type.name).to.be.equal('String');
    expect(sociallinkschema._schema.socialLinkUrl.optional).to.be.equal(true);
  });

  it('test kycDocumentSchema definition', function () {

    expect(kycdocumentschema._schema.docTypeName.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.docTypeName.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.docTypeId.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.docTypeId.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.kycCategoryId.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.kycCategoryId.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.kycCategoryName.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.kycCategoryName.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.documentId.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.documentId.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.documentDisplayName.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.documentDisplayName.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.documentName.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.documentName.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.isMandatory.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(kycdocumentschema._schema.isMandatory.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.isActive.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(kycdocumentschema._schema.isActive.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.allowableFormat.type.definitions[0].type.name).to.be.equal('Array');
    expect(kycdocumentschema._schema.allowableFormat.optional).to.be.equal(true);

    expect(kycdocumentschema._schema['allowableFormat.$'].type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema['allowableFormat.$'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema.allowableMaxSize.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.allowableMaxSize.optional).to.be.equal(true);

    expect(kycdocumentschema._schema.docFiles.type.definitions[0].type.name).to.be.equal('Array');
    expect(kycdocumentschema._schema.docFiles.optional).to.be.equal(true);

    expect(kycdocumentschema._schema['docFiles.$'].type.definitions[0].type.name).to.be.equal('Object');
    expect(kycdocumentschema._schema['docFiles.$'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema['docFiles.$.fileId'].type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema['docFiles.$.fileId'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema['docFiles.$.fileUrl'].type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema['docFiles.$.fileUrl'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema['docFiles.$.fileName'].type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema['docFiles.$.fileName'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema['docFiles.$.fileSize'].type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema['docFiles.$.fileSize'].optional).to.be.equal(true);

    expect(kycdocumentschema._schema.status.type.definitions[0].type.name).to.be.equal('String');
    expect(kycdocumentschema._schema.status.optional).to.be.equal(true);
  });

  it('test externalUserAdditionalInfo definition', function () {

    expect(externaluserinfoschema._schema.clusterId.type.definitions[0].type.name).to.be.equal('String');
    expect(externaluserinfoschema._schema.clusterId.optional).to.be.equal(true);

    expect(externaluserinfoschema._schema.registrationId.type.definitions[0].type.name).to.be.equal('String');
    expect(externaluserinfoschema._schema.registrationId.optional).to.be.equal(true);

    expect(externaluserinfoschema._schema.profileId.type.definitions[0].type.name).to.be.equal('String');
    expect(externaluserinfoschema._schema.profileId.optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['contactInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(externaluserinfoschema._schema['contactInfo'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['contactInfo.$'].type.definitions[0].type._schema).to.be.equal(contactschema._schema);
    expect(externaluserinfoschema._schema['contactInfo.$'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['emailInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(externaluserinfoschema._schema['emailInfo'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['emailInfo.$'].type.definitions[0].type._schema).to.be.equal(emailschema._schema);
    expect(externaluserinfoschema._schema['emailInfo.$'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['addressInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(externaluserinfoschema._schema['addressInfo'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['addressInfo.$'].type.definitions[0].type._schema).to.be.equal(addressschema._schema);
    expect(externaluserinfoschema._schema['addressInfo.$'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['socialLinksInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(externaluserinfoschema._schema['socialLinksInfo'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['socialLinksInfo.$'].type.definitions[0].type._schema).to.be.equal(sociallinkschema._schema);
    expect(externaluserinfoschema._schema['socialLinksInfo.$'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['kycDocuments'].type.definitions[0].type.name).to.be.equal('Array');
    expect(externaluserinfoschema._schema['kycDocuments'].optional).to.be.equal(true);

    expect(externaluserinfoschema._schema['kycDocuments.$'].type.definitions[0].type._schema).to.be.equal(kycdocumentschema._schema);
    expect(externaluserinfoschema._schema['kycDocuments.$'].optional).to.be.equal(true);
  });

  it('test UserProfileSchema definition', function () {

    expect(userprofileschema._schema.isInternaluser.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(userprofileschema._schema.isInternaluser.optional).to.be.equal(false);

    expect(userprofileschema._schema.isExternaluser.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(userprofileschema._schema.isExternaluser.optional).to.be.equal(false);

    expect(userprofileschema._schema.city.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.city.optional).to.be.equal(true);

    expect(userprofileschema._schema.state.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.state.optional).to.be.equal(true);

    expect(userprofileschema._schema.country.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.country.optional).to.be.equal(true);

    expect(userprofileschema._schema.cluster.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.cluster.optional).to.be.equal(true);

    expect(userprofileschema._schema.chapter.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.chapter.optional).to.be.equal(true);

    expect(userprofileschema._schema.community.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.community.optional).to.be.equal(true);

    expect(userprofileschema._schema.InternalUprofile.type.definitions[0].type._schema).to.be.equal(iupschema._schema);
    expect(userprofileschema._schema.InternalUprofile.optional).to.be.equal(false);

    expect(userprofileschema._schema.externalUserProfiles.type.definitions[0].type.name).to.be.equal('Array');
    expect(userprofileschema._schema.externalUserProfiles.optional).to.be.equal(true);

    expect(userprofileschema._schema['externalUserProfiles.$'].type.definitions[0].type._schema).to.be.equal(eupschema._schema);
    expect(userprofileschema._schema['externalUserProfiles.$'].optional).to.be.equal(true);

    expect(userprofileschema._schema.externalUserAdditionalInfo.type.definitions[0].type._schema).to.be.equal(externaluserinfoschema._schema);
    expect(userprofileschema._schema.externalUserAdditionalInfo.optional).to.be.equal(true);

    expect(userprofileschema._schema['externalUserAdditionalInfo.$'].type.definitions[0].type._schema).to.be.equal(externaluserinfoschema._schema);
    expect(userprofileschema._schema['externalUserAdditionalInfo.$'].optional).to.be.equal(true);

    expect(userprofileschema._schema.firstName.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.firstName.optional).to.be.equal(false);

    expect(userprofileschema._schema.displayName.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.displayName.optional).to.be.equal(true);

    expect(userprofileschema._schema.isMoolya.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(userprofileschema._schema.isMoolya.optional).to.be.equal(true);

    expect(userprofileschema._schema.lastName.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.lastName.optional).to.be.equal(false);

    expect(userprofileschema._schema.isActive.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(userprofileschema._schema.isActive.optional).to.be.equal(true);

    expect(userprofileschema._schema.isSystemDefined.type.definitions[0].type.name).to.be.equal('Boolean');
    expect(userprofileschema._schema.isSystemDefined.optional).to.be.equal(true);

    expect(userprofileschema._schema.profileImage.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.profileImage.optional).to.be.equal(true);

    expect(userprofileschema._schema.numericalFormat.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.numericalFormat.optional).to.be.equal(true);

    expect(userprofileschema._schema.currencyType.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.currencyType.optional).to.be.equal(true);

    expect(userprofileschema._schema.genderType.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.genderType.optional).to.be.equal(true);

    expect(userprofileschema._schema.dateOfBirth.type.definitions[0].type.name).to.be.equal('String');
    expect(userprofileschema._schema.dateOfBirth.optional).to.be.equal(true);

    expect(userprofileschema._schema['contactInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(userprofileschema._schema['contactInfo'].optional).to.be.equal(true);

    expect(userprofileschema._schema['contactInfo.$'].type.definitions[0].type._schema).to.be.equal(contactschema._schema);
    expect(userprofileschema._schema['contactInfo.$'].optional).to.be.equal(true);

    expect(userprofileschema._schema['emailInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(userprofileschema._schema['emailInfo'].optional).to.be.equal(true);

    expect(userprofileschema._schema['emailInfo.$'].type.definitions[0].type._schema).to.be.equal(emailschema._schema);
    expect(userprofileschema._schema['emailInfo.$'].optional).to.be.equal(true);

    expect(userprofileschema._schema['addressInfo'].type.definitions[0].type.name).to.be.equal('Array');
    expect(userprofileschema._schema['addressInfo'].optional).to.be.equal(true);

    expect(userprofileschema._schema['addressInfo.$'].type.definitions[0].type._schema).to.be.equal(addressschema._schema);
    expect(userprofileschema._schema['addressInfo.$'].optional).to.be.equal(true);
  });

});
