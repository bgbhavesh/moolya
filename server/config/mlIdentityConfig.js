/**
 * Added by mohdmohasin on 2/04/2017
 */

MlIdentityTypes = new Mongo.Collection('mlIdentityTypes');
const identites = [{
  _id: 'individual', identityTypeName: 'Individual', identityTypeDisplayName: 'Individual', isActive: true, communities: ['IDE', 'FUN', 'SPS']
},
{
  _id: 'company', identityTypeName: 'Company', identityTypeDisplayName: 'Company', isActive: true, communities: ['FUN', 'STU', 'CMP', 'SPS', 'INS']
}];

Meteor.startup(() => {
  for (let i = 0; i < identites.length; i++) {
    const mlIdentityType = MlIdentityTypes.findOne({ _id: identites[i]._id });
    if (!mlIdentityType) {
      MlIdentityTypes.insert(identites[i]);
    }
  }
})

