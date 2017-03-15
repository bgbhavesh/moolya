/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import passwordUtil from '../../../../commons/passwordUtil'

var _ = require('lodash');
MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

    if(!args.user.username){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Username is required", code);
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
  if(user){
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

MlResolver.MlMutationResolver['resetPassword'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
  let salted = passwordUtil.hashPassword(args.password);
  let resp = Meteor.users.update({_id: args.userId}, {
    $set: {"services.password.bcrypt": salted}
  });
  if (resp) {
    let code = 200;
    let response = new MlRespPayload().successPayload("Password Reset complete", code);
    return response
  }
};

MlResolver.MlMutationResolver['updateUser'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let user = Meteor.users.findOne({_id: args.userId});
  if (user) {
    if (user.profile.isSystemDefined) {
      let code = 409;
      let response = new MlRespPayload().errorPayload("Cannot edit system defined User", code);
      return response;
    } else {
      if (args.user.profile) {
        for (key in args.user) {
          user[key] = args.user[key]
        }

        if (!args.user.username) {
          let code = 409;
          let response = new MlRespPayload().errorPayload("Email/Username is required", code);
          return response;
        }

        let resp = Meteor.users.update({_id: args.userId}, {$set: {profile: user.profile}}, {upsert: true})
        if (resp) {
          let code = 200;
          let result = {user: resp};
          let response = new MlRespPayload().successPayload(result, code);
          return response
        }
      } else {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Profile is required", code);
        return response;
      }
    }
  }
};

MlResolver.MlQueryResolver['fetchUser'] = (obj, args, context, info) => {
    let user = Meteor.users.findOne({_id: args.userId});

    let roleIds=[]
    let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
    userProfiles.map(function (doc,index) {
      let clusterName=doc.clusterId
      const clusterData=MlClusters.findOne({ _id:clusterName} )||[];
      doc.clusterName=clusterData.clusterName||[]
      let  userRoles=doc&&doc.userRoles?doc.userRoles:[];
      userRoles.map(function (Rdoc,key) {
        let roleName=Rdoc.roleId
        const rolesData =  MlRoles.findOne({ _id:roleName} )||[];
        Rdoc.roleName=rolesData.roleName||[]
      });
    });
    return user;
};

MlResolver.MlQueryResolver['fetchUserDetails'] = (obj, args, context, info) =>
{
    let userDetails = {};
    if(args.userId){
        user = Meteor.users.findOne({_id: args.userId});
        let assignedRoles = "";
        let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
        let displayName = user.profile.InternalUprofile.moolyaProfile.displayName;
        let deActive = user.profile.isActive
        userProfiles.map(function (profile, index) {
            let userRoles = profile.userRoles;
            const clusterData = MlClusters.findOne({ _id:profile.clusterId})||[];
            if(clusterData){
                userRoles.map(function (role) {
                    const rolesData =  MlRoles.findOne({ _id:role.roleId})||[];
                    if(rolesData){
                        assignedRoles += rolesData.roleName+","
                    }
                });
            }
        });

        userDetails['alsoAssignedas'] = assignedRoles;
        userDetails['displayName'] = displayName;
        userDetails['userName'] = user.username;
        userDetails['deActive'] = deActive;
    }
    return userDetails;
};

MlResolver.MlQueryResolver['fetchClusterBasedRoles'] = (obj, args, context, info) =>{
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

MlResolver.MlQueryResolver['fetchChapterBasedRoles'] = (obj, args, context, info) =>{
  let user = Meteor.users.findOne({_id: args.userId});
  if (user && user.profile && user.profile.isInternaluser == true) {
    let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
    let response =[];
    _.each(user_profiles, function (s,v) {
      if(s.clusterId==args.clusterId){
        _.each(s.userRoles,function (item,value) {
          if(item.roleName == "chpateradmin"){
            s.isChapterAdmin=true;
          }
        })
        response.push(s);
      }
    })
    return response;
    // for (var i = 0; i < user_profiles.length; i++) {
    //   let clusterId = user_profiles[i].clusterId;
    //   if (clusterId == args.clusterId) {
    //     return user_profiles[i];
    //   }
    // }
  }
}

MlResolver.MlQueryResolver['fetchAssignedUsers'] = (obj, args, context, info) => {

  let query = ""
  let users = [];

  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.communityId != ""){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.communityId":args.communityId},{"profile.InternalUprofile.moolyaProfile.isActive":true}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && !args.subChapterName.startsWith("Moolya-")){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},{"profile.InternalUprofile.moolyaProfile.isActive":true}]}).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName.startsWith("Moolya-")){
      users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userType":'moolya'},{"profile.InternalUprofile.moolyaProfile.isActive":true}]}).fetch();
  }
  else if(args.clusterId != "" ){
      users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.InternalUprofile.moolyaProfile.isActive":true}).fetch();
  }
  users.map(function (user) {
    user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
  })
  return users;
}

MlResolver.MlQueryResolver['fetchAssignedAndUnAssignedUsers'] = (obj, args, context, info) => {

  let users = [];
  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && !args.subChapterName.startsWith("Moolya-")){
    //users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},]}).fetch();
      let departments = MlDepartments.find({"$or":[{"depatmentAvailable.subChapter":args.subChapterId}, {"depatmentAvailable.subChapter":"all"}]}).fetch();
    if(departments && departments.length > 0){
      for(var i = 0; i < departments.length; i++){
        let depusers = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},{"profile.isActive":true}]}).fetch();
        depusers.map(function (user) {
          user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
          if(_.isEmpty(_.find(users, user))){
            users.push(user)
          }
        })
      }
    }
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName.startsWith("Moolya-")){
    //users = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.userType":'moolya'}).fetch();
    let departments = MlDepartments.find({"$or":[{"depatmentAvailable.cluster":args.clusterId}, {"depatmentAvailable.cluster":"all"}]}).fetch();
    if(departments && departments.length > 0){
      for(var i = 0; i < departments.length; i++){
        let depusers = Meteor.users.find({"$and":[{"$or":[{"$and":[{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id}]},{"profile.InternalUprofile.moolyaProfile.globalAssignment":true}]},{"profile.InternalUprofile.moolyaProfile.userType":'moolya'},{"profile.isActive":true}]}).fetch();
        depusers.map(function (user) {
          user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
          if(_.isEmpty(_.find(users, user))){
            users.push(user)
          }
        })
      }
    }
  }
  return users;
}

MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'] = (obj, args, context, info) =>{
    console.log(args);
    let users = [];
    if(args.clusterId){
        let departments = MlDepartments.find({"$or":[{"depatmentAvailable.cluster":args.clusterId}, {"depatmentAvailable.cluster":"all"}]}).fetch();
        if(departments && departments.length > 0){
            departments.map(function (department) {
                let depUsers = Meteor.users.find({"$and":[{"$or":[{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":department._id}, {"profile.InternalUprofile.moolyaProfile.globalAssignment":true}]},{"profile.InternalUprofile.moolyaProfile.userType":'moolya'}]}).fetch();
                depUsers.map(function (user)
                {
                    let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
                    if((user.profile.InternalUprofile.moolyaProfile.globalAssignment || user.profile.InternalUprofile.moolyaProfile.userProfiles.length == 0) && (user.profile.isActive)){
                        user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
                        if(_.isEmpty(_.find(users, user))){
                          users.push(user)
                        }
                    }
                    else if(!user.profile.InternalUprofile.moolyaProfile.globalAssignment && userProfiles.length > 0 && user.profile.isActive){
                        userProfiles.map(function (profile) {
                            if(profile.clusterId == args.clusterId){
                                let userRoles = profile.userRoles;
                                let activeRoles = _.find(userRoles, {"isActive":true});
                                user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
                                if(_.isEmpty(_.find(users, user))){
                                  users.push(user)
                                }
                            }
                        })
                    }
                })
            })
        }
    }
    return users;
}

MlResolver.MlQueryResolver['fetchUserDepSubDep'] = (obj, args, context, info) =>
{
    let depts = []
    let user = Meteor.users.findOne({"_id": args.userId})
    let clusterDepts = MlDepartments.find({"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}).fetch();
    if (user && clusterDepts && clusterDepts.length > 0) {
        let userDepts = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);
        userDepts.map(function (userDept) {
          let result = _.find(clusterDepts, {"_id":userDept.department});
          if(result && result.isActive){
            userDept.isAvailiable = true;
          }
          else
            userDept.isAvailiable = false;

          depts.push(userDept)
        })
    }
    depts.map(function (dept) {
        let departmentName = MlDepartments.findOne({"_id":dept.department}).departmentName;
        let subDepartmentName = MlSubDepartments.findOne({"_id":dept.subDepartment}).subDepartmentName;
        dept.departmentName =departmentName;
        dept.subDepartmentName = subDepartmentName;
    })
    return depts
}

MlResolver.MlQueryResolver['fetchUsersBysubChapterDepSubDep'] = (obj, args, context, info) =>
{
    console.log(args);
    let users = [];
    if(args.subChapterId){
        let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
        if(subChapter && subChapter.isDefaultSubChapter){
            users = MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'](obj, {clusterId:subChapter.clusterId}, context, info)
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
  let depts = []
  let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
  if(subChapter && subChapter.isDefaultSubChapter) {
      depts = MlResolver.MlQueryResolver['fetchUserDepSubDep'](obj, {
        userId: args.userId,
        clusterId: subChapter.clusterId
      }, context, info)
  }else{
    let user = Meteor.users.findOne({"_id":args.userId})
    let subChapterDep = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();
    if(user && subChapterDep && subChapterDep.length > 0) {
      let userDep = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);
      for (var i = 0; i < subChapterDep.length; i++) {
        for (var j = 0; j < userDep.length; j++) {
          if (userDep[j].department == subChapterDep[i]._id) {
            depts.push(userDep[j]);
          }
        }
      }
    }
    depts.map(function (dept) {
      let departmentName = MlDepartments.findOne({"_id":dept.department}).departmentName;
      let subDepartmentName = MlSubDepartments.findOne({"_id":dept.subDepartment}).subDepartmentName;
      dept.departmentName =departmentName;
      dept.subDepartmentName = subDepartmentName;
    })
  }
  return depts
}

MlResolver.MlMutationResolver['deActivateUser'] = (obj, args, context, info) => {
    let user = Meteor.users.findOne({_id: args.userId});
    let resp;
    if(user){
        resp = Meteor.users.update({_id:args.userId}, {$set:{"profile.isActive":args.isActive}});
    }

    if(resp){
        resp = new MlRespPayload().successPayload("User Deactivated Successfully", 200);
        return resp
    }

    resp = new MlRespPayload().errorPayload("Unable to deactivate", 400);
    return resp
}

MlResolver.MlMutationResolver['assignUsers'] = (obj, args, context, info) => {
  let moduleName = args.moduleName
  let actionName = args.actionName
  let userId = args.userId;
  let data = args.user;
  let roles  = data && data.profile && data.profile.InternalUprofile &&  data.profile.InternalUprofile.moolyaProfile.userProfiles && data.profile.InternalUprofile.moolyaProfile.userProfiles.userRoles;
  // let deActive = data.profile.deActive;
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
      else if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" && !args.user.isChapterAdmin){
          levelCode = "SUBCHAPTER"
          role.communityId = "all"
      }
      else if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" && args.user.isChapterAdmin)
      {
          let chapterAdminRole = MlRoles.findOne({roleName:'chapteradmin'})
          levelCode = "CHAPTER"
          role.roleId = chapterAdminRole._id
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
