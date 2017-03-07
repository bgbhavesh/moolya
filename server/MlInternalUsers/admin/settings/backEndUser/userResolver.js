/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var _ = require('lodash');
MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

    if(Meteor.users.find({username:args.user.username}).count() > 0) {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response;
    }

    let userId = Accounts.createUser(args.user);
    if(userId){
        let code = 200;
        let result = {userId: userId}
        let response = new MlRespPayload().successPayload(result, code);
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
            let roles     = profile.userRoles;
            let userRoles = userProfiles[index].userRoles;
            // _.merge(userRoles, roles)
            roles.map(function (role) {
                  let action =_.find(userRoles, {"roleId": role.roleId, "chapterId":role.chapterId, "subChapterId":role.subChapterId, "communityId":role.communityId});
                  if(!action){
                      userRoles.push(role)
                  }

            })
            userProfiles[index].userRoles = userRoles;
        }else{
            userProfiles.push(profile);
        }
    }else{
        userProfiles.push(profile);
    }
    user.profile.InternalUprofile.moolyaProfile.userProfiles = userProfiles;
    if(args.moolyaProfile && args.moolyaProfile.displayName){
      user.profile.InternalUprofile.moolyaProfile.displayName = args.moolyaProfile.displayName
    }
    let resp = Meteor.users.update({_id:args.userId}, {$set:user}, {upsert:true})
    if(resp){
      let code = 200;
      let result = {user: resp}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }
  let response = new MlRespPayload().errorPayload("User Not Found", 404);
  return response
}

MlResolver.MlMutationResolver['updateUser'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

    let user = Meteor.users.findOne({_id: args.userId});
    if(user){


          for(key in args.user){
            user[key] = args.user[key]
          }
          if(!args.user.username){
            let code = 409;
            let response = new MlRespPayload().errorPayload("Email/Username is required", code);
            return response;
          }
          let resp = Meteor.users.update({_id:args.userId}, {$set:user}, {upsert:true})
          if(resp){
            let code = 200;
            let result = {user: resp};
            let response = new MlRespPayload().successPayload(result, code);
            return response
          }


    }
};

MlResolver.MlQueryResolver['fetchUser'] = (obj, args, context, info) => {
    let user = Meteor.users.findOne({_id: args.userId});
    return user;
}
MlResolver.MlQueryResolver['fetchClusterBasedRoles'] = (obj, args, context, info) => {
  let user = Meteor.users.findOne({_id: args.userId});
  if (user && user.profile && user.profile.isInternaluser == true) {
    let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
    for (var i = 0; i < user_profiles.length; i++) {
      let clusterId = user_profiles[i].clusterId;
      if (clusterId == args.clusterId) {
         return user_profiles[i];
      }
    }
  }
}

MlResolver.MlQueryResolver['fetchAssignedUsers'] = (obj, args, context, info) => {

  let query = ""
  let users = [];

  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.communityId != ""){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.communityId":args.communityId}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.subChapterName !="Moolya"){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName=="Moolya"){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userType":'moolya'}]}).fetch();
  }
  else if(args.clusterId != "" ){
      users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}).fetch();
  }
  return users;
}

MlResolver.MlQueryResolver['fetchAssignedAndUnAssignedUsers'] = (obj, args, context, info) => {

  let users = [];
  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.subChapterName !="Moolya"){
    users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName=="Moolya"){
    users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userType":'moolya'}).fetch();
  }
  return users;
}

MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'] = (obj, args, context, info) =>{
    console.log(args);
    let users = [];
    if(args.clusterId){
        let departments = MlDepartments.find({"$or":[{"depatmentAvailable.cluster":args.clusterId}, {"depatmentAvailable.cluster":"all"}]}).fetch();
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
  let clusterDep = MlDepartments.find({"$or":[{"depatmentAvailable.cluster":args.clusterId}, {"depatmentAvailable.cluster":"all"}]}).fetch();
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
  for(var i = 0; i < dep.length; i++){
    depId = dep[i].department;
    subDeptId = dep[i].subDepartment;
    let departmentName = MlDepartments.findOne({"_id":depId}).departmentName;
    let subDepartmentName = MlSubDepartments.findOne({"_id":subDeptId}).subDepartmentName;
    dep[i].departmentName =departmentName;
    dep[i].subDepartmentName = subDepartmentName;
  }
  return dep
}

MlResolver.MlQueryResolver['fetchUsersBysubChapterDepSubDep'] = (obj, args, context, info) =>{
  console.log(args);
  let users = [];
  if(args.subChapterId){
    let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
    if(subChapter.subChapterName=='Moolya'){
      let departments = MlDepartments.find({"depatmentAvailable.cluster":subChapter.clusterId}).fetch();
      if(departments && departments.length > 0){
        for(var i = 0; i < departments.length; i++){
          let depusers = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id},{"profile.InternalUprofile.moolyaProfile.globalAssignment":true}).fetch();
          if(depusers && depusers.length > 0){
            users = users.concat(depusers)
          }
        }
      }
    }else{
      let departments = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();
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
  let clusterDep = MlDepartments.find({"depatmentAvailable.cluster":subChapter.clusterId}).fetch();
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
    let clusterDep = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();
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
  for(var i = 0; i < dep.length; i++){
    depId = dep[i].department;
    subDeptId = dep[i].subDepartment;
    let departmentName = MlDepartments.findOne({"_id":depId}).departmentName;
    let subDepartmentName = MlSubDepartments.findOne({"_id":subDeptId}).subDepartmentName;
    dep[i].departmentName =departmentName;
    dep[i].subDepartmentName = subDepartmentName;
  }
  return dep
}

// MlResolver.MlQueryResolver['fetchUserRoles'] = (obj, args, context, info) => {
//   // let roleId = Meteor.users.findOne({"_id":args.userId}).profile.InternalUprofile.moolyaProfile.userProfiles[0].userroles;
//   var user = Meteor.users.findOne({_id: args.userId});
//   var roles = [];
//   if (user && user.profile && user.profile.isInternaluser == true) {
//     let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
//     let user_roles;
//     // Selecting Default Profile
//     for (var i = 0; i < user_profiles.length; i++) {
//       let user_roles = user_profiles[i].userRoles;
//         if (user_profiles[i].userRoles && user_profiles[i].userRoles.length > 0) {
//           for (var j = 0; j < user_roles.length; j++) {
//            roles.push(user_roles[j]);
//           }
//         }
//     }
//   }
//   return roles;
// }

MlResolver.MlMutationResolver['assignUsers'] = (obj, args, context, info) => {
  let moduleName = args.moduleName
  let actionName = args.actionName
  let userId = args.userId;
  let data = args.user;
  let roles  = data && data.profile && data.profile.InternalUprofile &&  data.profile.InternalUprofile.moolyaProfile.userProfiles && data.profile.InternalUprofile.moolyaProfile.userProfiles.userRoles;
  let levelCode = ""
  if(!userId){
    let response = new MlRespPayload().errorPayload("No User Found", 404);
    return response
  }
  if(!roles){
    let response = new MlRespPayload().errorPayload("No Roles Found", 404);
    return response
  }
  let hierarchy = "";
  roles.map(function (role)
  {
    if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" && role.communityId != ""){
      levelCode = "COMMUNITY"
    }
    else if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" ){
      levelCode = "SUBCHAPTER"
      role.communityId = "all"
    }
    else if(role.clusterId != "" && role.chapterId != "" ){
      levelCode = "CHAPTER"
      role.subChapterId = "all"
      role.communityId = "all"
    }
    else if(role.clusterId != ""){
      levelCode = "CLUSTER"
      role.chapterId = "all"
      role.subChapterId = "all"
      role.communityId = "all"
    }

    hierarchy = MlHierarchy.findOne({code:levelCode})
    role.hierarchyLevel = hierarchy.level;
    role.hierarchyCode  = hierarchy.code;
  })

  let userProfile = {
    clusterId:  data.profile.InternalUprofile.moolyaProfile.userProfiles.clusterId,
    userRoles:  roles,
    isDefault: false
  }

  let resp = MlResolver.MlMutationResolver['addUserProfile'](null, {userId:userId, userProfile:userProfile}, context, null)
  return resp;
}
