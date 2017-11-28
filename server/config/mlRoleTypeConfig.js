/**
 * Created by vishwadeep.kapoor on 14/2/17.
 */

const userType = [
  {
    _id: 'internalRole', roleTypeName: 'Internal Role', roleTypeDisplayName: 'Internal', roleTypeDescription: '', isActive: true
  },
  {
    _id: 'externalRole', roleTypeName: 'External Role', roleTypeDisplayName: 'External', roleTypeDescription: '', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < userType.length; i++) {
    const userTypeData = MlRoleTypes.findOne({ _id: userType[i]._id });
    if (!userTypeData) {
      MlRoleTypes.insert(userType[i]);
    }
  }
})
