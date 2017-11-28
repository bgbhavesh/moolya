/**
 * Created by venkatsrinag on 28/7/17.
 */

const serviceCardType = [
  {
    name: 'officecard', displayName: 'Office Card', description: '', code: 'OFFICECARD', isActive: true
  },
  {
    name: 'providercard', displayName: 'Service Card', description: '', code: 'PROVIDERCARD', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < serviceCardType.length; i++) {
    const servicecardtype = MlServiceCardType.findOne({ code: serviceCardType[i].code });
    if (!servicecardtype) {
      MlServiceCardType.insert(serviceCardType[i]);
    }
  }
})
