/**
 * Created by vishwadeep.kapoor on 14/2/17.
 */

let userType = [
  {_id:'individual',userTypeName:"Individual",displayName:"Individual",userTypeDesc:"","isActive":true},
  {_id:'company',userTypeName:"Company",displayName:"Company",userTypeDesc:"","isActive":true}
  ];

Meteor.startup(function () {
  for(var i = 0; i < userType.length; i++){
    let userTypeData = MlUserTypes.findOne({_id: userType[i]._id});
    if(!userTypeData){
      MlUserTypes.insert(userType[i]);
    }
  }
})
