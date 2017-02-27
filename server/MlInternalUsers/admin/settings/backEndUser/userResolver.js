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
   /* let cluster = args.cluster;
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args.cluster);
    if(!isValidAuth)
      return "Not Authorized"*/
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

MlResolver.MlMutationResolver['addUserProfile'] = (obj, args, context, info) => {
  let user = Meteor.users.findOne({_id: args.userId});
  if(user)
  {

    let profile = args.userProfile;
    let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;

    if(userProfiles && userProfiles.length > 0){
        let index = _.findIndex(userProfiles, {clusterId:profile.clusterId})
        if(index >= 0)
        {
            // userProfiles[index].userroles.push(profile.userroles)
            let roles     = profile.userroles;
            let userRoles = userProfiles[index].userroles;
            // _.merge(userRoles, roles)
            roles.map(function (role) {
                  let action =_.find(userRoles, {"roleId": role.roleId, "chapterId":role.chapterId, "subChapterId":role.subChapterId, "communityId":role.communityId});
                  if(!action){
                      userRoles.push(role)
                  }

            })
            userProfiles[index].userroles = userRoles;
        }else{
            userProfiles.push(profile);
        }
    }else{
        userProfiles.push(profile);
    }
    user.profile.InternalUprofile.moolyaProfile.userProfiles = userProfiles;
    let resp = Meteor.users.update({_id:args.userId}, {$set:user}, {upsert:true})
    if(resp){
      let code = 200;
      let result = {user: resp}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
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

MlResolver.MlQueryResolver['fetchAssignedUsers'] = (obj, args, context, info) => {

  let query = ""
  let users = [];

  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.communityId != ""){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.communityId":args.communityId}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != ""){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.subChapterId":args.subChapterId}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != ""){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.chapterId":args.chapterId}]}).fetch();
  }
  else if(args.clusterId != "" ){
      users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userProfiles.userroles.clusterId":args.clusterId}).fetch();
  }
  return users;
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

MlResolver.MlQueryResolver['fetchUsersBysubChapterDepSubDep'] = (obj, args, context, info) =>{
  console.log(args);
  let users = [];
  if(args.subChapterId){
    let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
    if(subChapter.subChapterName=='Moolya'){
      let departments = MlDepartments.find({"depatmentAvailable.cluster.clusterId":subChapter.clusterId}).fetch();
      if(departments && departments.length > 0){
        for(var i = 0; i < departments.length; i++){
          let depusers = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id},{"profile.InternalUprofile.moolyaProfile.globalAssignment":true}).fetch();
          if(depusers && depusers.length > 0){
            users = users.concat(depusers)
          }
        }
      }
    }else{
      let departments = MlDepartments.find({"depatmentAvailable.cluster.subChapterId":subChapter._id}).fetch();
      if(departments && departments.length > 0){
        for(var i = 0; i < departments.length; i++){
          let depusers = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id}).fetch();
          if(depusers && depusers.length > 0){
            users = users.concat(depusers)
          }
        }
      }
    }
  }
  return users;
}
MlResolver.MlQueryResolver['fetchsubChapterUserDepSubDep'] = (obj, args, context, info) =>{
  console.log(args);
  let dep = []
  let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});

  if(subChapter.subChapterName=='Moolya'){
  let user = Meteor.users.findOne({"_id":args.userId})
  let clusterDep = MlDepartments.find({"depatmentAvailable.cluster.clusterId":subChapter.clusterId}).fetch();
  if(user && clusterDep && clusterDep.length > 0) {
    let userDep = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);

    for (var i = 0; i < clusterDep.length; i++) {
      for (var j = 0; j < userDep.length; j++) {
        if (userDep[j].department == clusterDep[i]._id) {
          dep.push(userDep[j]);
        }
      }
    }
  }
  }else{
    let user = Meteor.users.findOne({"_id":args.userId})
    let clusterDep = MlDepartments.find({"depatmentAvailable.cluster.clusterId":subChapter.subChapterId}).fetch();
    if(user && clusterDep && clusterDep.length > 0) {
      let userDep = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);
      for (var i = 0; i < clusterDep.length; i++) {
        for (var j = 0; j < userDep.length; j++) {
          if (userDep[j].department == clusterDep[i]._id) {
            dep.push(userDep[j]);
          }
        }
      }
    }
  }
  return dep
}
