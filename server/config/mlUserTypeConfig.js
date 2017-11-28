/**
 * Created by vishwadeep.kapoor on 14/2/17.
 */

const userType = [
  {
    _id: 'angle', userTypeName: 'angle', displayName: 'Angle', userTypeDesc: '', isActive: true
  },
  {
    _id: 'ventureCapitalist', userTypeName: 'venture capitalist', displayName: 'venture Capitalist', userTypeDesc: '', isActive: true
  },
  {
    _id: 'privateEquity', userTypeName: 'private equity', displayName: 'private equity', userTypeDesc: '', isActive: true
  }
];

Meteor.startup(() => {
  for (let i = 0; i < userType.length; i++) {
    const userTypeData = MlUserTypes.findOne({ _id: userType[i]._id });
    if (!userTypeData) {
      MlUserTypes.insert(userType[i]);
    }
  }
})
