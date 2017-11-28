/**
 * Created by venkatsrinag on 9/3/17.
 */

const resources = [
  {
    name: 'office', code: 'OFFICE', displayName: 'Office', isActive: true
  },
  {
    name: 'manageschedule', code: 'MANAGESCHEDULE', displayName: 'Manage Schedule', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < resources.length; i++) {
    MlResources.update({ code: resources[i].code }, { $set: resources[i] }, { upsert: true })
  }
})
