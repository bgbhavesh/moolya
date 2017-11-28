/**
 * Created by venkatsrinag on 9/1/17.
 */

const officeTypes = [
  {
    name: 'branch', code: 'BRANCH', displayName: 'Branch', isActive: true
  },
  {
    name: 'virtual', code: 'VIRTUAL', displayName: 'Virtual', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < officeTypes.length; i++) {
    MlOfficeType.update({ code: officeTypes[i].code }, { $set: officeTypes[i] }, { upsert: true })
  }
})
