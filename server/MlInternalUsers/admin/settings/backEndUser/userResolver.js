/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var _ = require('lodash');
// MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
//         // TODO : Authorization
//     var userDetails = {
//         profile:{
//           isInternaluser : "yes",
//           isExternaluser : "no",
//           email: args.user.email,
//           InternalUprofile:{
//             moolyaProfile: args.user
//           }
//         },
//         username: args.user.email,
//         password: args.user.password,
//     };
//      let userId = Accounts.createUser(userDetails);
//      Accounts.setPassword(userId, adminPassword);
//         if(userId){
//             let code = 200;
//             let result = {userId: userId}
//             let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
//             return response
//         }
// }
// MlResolver.MlMutationResolver['assignUser'] = (obj, args, context, info) => {
//     // TODO : Authorization
//     Meteor.users.update({_id:args.user.id}, {$set:{"profile.InternalUprofile.moolyaProfile.userProfiles":args.user}})
//     response = JSON.stringify(new MlRespPayload().successPayload(result, code));
// }

MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
    if(Meteor.users.find({username:args.user.username}).count() > 0) {
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }

    let userId = Accounts.createUser(args.user);
    if(userId){
        let code = 200;
        let result = {userId: userId}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}

MlResolver.MlMutationResolver['updateUser'] = (obj, args, context, info) => {
    let user = Meteor.users.findOne({_id: args.userId});
    if(user){
        for(key in args.user){
          user[key] = args.user[key]
        }
        let resp = Meteor.users.update({_id:args.userId}, {$set:user}, {upsert:true})
        if(resp){
          let code = 200;
          let result = {user: resp}
          let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
          return response
        }
    }
}

MlResolver.MlQueryResolver['fetchUser'] = (obj, args, context, info) => {
    let user = Meteor.users.findOne({_id: args.userId});
    return user;
}

MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'] = (obj, args, context, info) =>{
    console.log(args);
    let users = [];
    if(args.clusterId){
        let departments = MlDepartments.find({"depatmentAvailable.cluster.clusterId":args.clusterId}).fetch();
        if(departments && departments.length > 0){
            for(var i = 0; i < departments.length; i++){
                let depusers = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id}).fetch();
                if(depusers && depusers.length > 0){
                    users = users.concat(depusers)
                }
            }
        }

    }
    return users;
}

MlResolver.MlQueryResolver['fetchUserDepSubDep'] = (obj, args, context, info) =>{
  console.log(args);
  let dep = []
  let user = Meteor.users.findOne({"_id":args.userId})
  let clusterDep = MlDepartments.find({"depatmentAvailable.cluster.clusterId":args.clusterId}).fetch();
  if(user && clusterDep && clusterDep.length > 0){
    let userDep = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);
    // let dep = _.intersectionWith(clusterDep, userDep, _.isEqual);
    // let dep = _.intersectionBy(clusterDep, userDep, 'myName');
    // let dep = clusterDep.filter(function (e) {
    //   return userDep.indexOf(e) > -1;
    // });

    for(var i = 0; i < clusterDep.length; i++){
      for(var j = 0; j<userDep.length; j++){
        if(userDep[j].department == clusterDep[i]._id){
          dep.push(userDep[j]);
        }
      }
    }

    console.log(dep)
  }
  return dep
}

/*
MlResolver.MlQueryResolver['fetchUsers'] = (obj, args, context, info) => {

}
*/
