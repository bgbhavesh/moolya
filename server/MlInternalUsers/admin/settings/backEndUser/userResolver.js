/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import passwordUtil from '../../../../commons/passwordUtil'

var _ = require('lodash');

MlResolver.MlQueryResolver['fetchUserTypeFromProfile'] = (obj, args, context, info) => {
   let user=Meteor.users.findOne(context.userId);
    return user&&user.profile&&user.profile.isInternaluser?"external":"internal";
}

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

      // if(Meteor.users.find({username:args.user.username}).count() > 0) {
    if(mlDBController.find('users', {username:args.user.username}, context).count() > 0){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response;
    }

    // let userId = Accounts.createUser(args.user);
    let userId = mlDBController.insert('users', args.user, context)
    if(userId){
        let code = 200;
        let result = {userId: userId}
        let response = new MlRespPayload().successPayload(result, code);
        return response
    }
}

MlResolver.MlMutationResolver['addUserProfile'] = (obj, args, context, info) => {
  // let user = Meteor.users.findOne({_id: args.userId});
  let user = mlDBController.findOne('users', {_id: args.userId}, context)
  if(user){
      let profile = args.userProfile;  //cl
      let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles; //db

      if(userProfiles && userProfiles.length > 0){
          let index = _.findIndex(userProfiles, {clusterId:profile.clusterId})     //db
          if(index >= 0){
              let roles     = profile.userRoles;                //cl
              let userRoles = userProfiles[index].userRoles;    //db
              roles.map(function (role, key){
                  let action =_.find(userRoles, {"roleId": role.roleId, "chapterId":role.chapterId, "subChapterId":role.subChapterId, "communityId":role.communityId, "departmentId":role.departmentId, "subDepartmentId":role.subDepartmentId});
                  if(!action){
                      userRoles.push(role)
                  }else {
                      userRoles[key].validTo = role.validTo;
                      userRoles[key].validFrom = role.validFrom;
                      userRoles[key].isActive = role.isActive;
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

    // let resp = Meteor.users.update({_id:args.userId}, {$set:user}, {upsert:true})
    // let resp = Meteor.users.update({_id:args.userId}, {$set:{"profile":user.profile}})
    let resp = mlDBController.update('users', args.userId, {"profile":user.profile}, {$set:true}, context)

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
  // let resp = Meteor.users.update({_id: args.userId}, {
  //   $set: {"services.password.bcrypt": salted}
  // });
  let resp = mlDBController.update('users', args.userId, {"services.password.bcrypt": salted}, {$set:true}, context)
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

  // let user = Meteor.users.findOne({_id: args.userId});
  let user = mlDBController.findOne('users', {_id: args.userId}, context)
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

        // let resp = Meteor.users.update({_id: args.userId}, {$set: {profile: user.profile}}, {upsert: true})
        let resp = mlDBController.update('users', args.userId, {profile: user.profile}, {$set:true}, context)
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
    // let user = Meteor.users.findOne({_id: args.userId});
  let user = mlDBController.findOne('users', {_id: args.userId}, context)
    let roleIds=[]
    let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
    userProfiles.map(function (doc,index) {
      let clusterName=doc.clusterId
      // const clusterData=MlClusters.findOne({ _id:clusterName})||[];
      const clusterData= mlDBController.findOne('MlClusters', {_id: clusterName}, context)||[];
      doc.clusterName=clusterData.clusterName||[]
      let  userRoles=doc&&doc.userRoles?doc.userRoles:[];
      userRoles.map(function (Rdoc,key) {
        let roleName=Rdoc.roleId
        // const rolesData =  MlRoles.findOne({ _id:roleName} )||[];
        // const rolesData = mlDBController.findOne('MlRoles', {_id: roleName}, context)||[];
        // Rdoc.roleName=rolesData.roleName||[]
        if(Rdoc.subChapterId != 'all') {
          const subChapterData = mlDBController.findOne('MlSubChapters', {_id: Rdoc.subChapterId}, context) || [];
          Rdoc.chapterName = subChapterData.chapterName;
          Rdoc.subChapterName = subChapterData.subChapterName;
        }
        if(Rdoc.communityId != 'all'){
          const communityData= mlDBController.findOne('MlCommunityDefinition', {code: Rdoc.communityId}, context)||[];
          Rdoc.communityName = communityData.name;
        }
      });
    });
    return user;
};

MlResolver.MlQueryResolver['fetchUserDetails'] = (obj, args, context, info) =>
{
    let userDetails = {};
    if(args.userId){
        // user = Meteor.users.findOne({_id: args.userId});
        user = mlDBController.findOne('users', {_id: args.userId}, context)
        let assignedRoles = "";
        let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
        let displayName = user.profile.InternalUprofile.moolyaProfile.displayName;
        let deActive = user.profile.isActive
        userProfiles.map(function (profile, index) {
            let userRoles = profile.userRoles;
            // const clusterData = MlClusters.findOne({_id:profile.clusterId})||[];
            const clusterData = mlDBController.findOne('MlClusters', {_id: profile.clusterId}, context)||[];
            if(clusterData){
                userRoles.map(function (role) {
                    // const rolesData =  MlRoles.findOne({ _id:role.roleId})||[];
                    // if(rolesData){
                    //     assignedRoles += rolesData.roleName+","
                    // }
                  assignedRoles += role.roleName+" ("+ clusterData.countryName +")"+","
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

MlResolver.MlQueryResolver['fetchUserRoles'] = (obj, args, context, info) => {
    let roles = [];
    if(args.userId){
        // let user = Meteor.users.findOne({_id: args.userId});
        let user = mlDBController.findOne('users', {_id: args.userId}, context)
        if (user && user.profile && user.profile.isInternaluser == true){
            let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
            _.each(user_profiles, function (profile)
            {
                _.each(profile.userRoles,function (item,value)
                {
                    let contextRole = {};
                    contextRole["roleId"] = item.roleId
                    contextRole["roleName"] = item.roleName
                    contextRole["isActive"] = item.isActive
                    contextRole["validFrom"] = item.validFrom
                    contextRole["validTo"] = item.validTo
                    contextRole["clusterId"] = item.clusterId
                    contextRole["chapterId"] = item.chapterId
                    contextRole["subChapterId"] = item.subChapterId
                    contextRole["communityId"] = item.communityId
                    contextRole["departmentId"] = item.departmentId;
                    contextRole["departmentName"] = item.departmentName;
                    contextRole["subDepartmentId"] = item.subDepartmentId;
                    contextRole["subDepartmentName"] = item.subDepartmentName;
                    contextRole["hierarchyLevel"] = item.hierarchyLevel;
                    contextRole["hierarchyCode"] = item.hierarchyCode;
                    if(item.roleName == "chapteradmin")
                        contextRole["isChapterAdmin"] = true;
                    else
                      contextRole["isChapterAdmin"] = false;
                    roles.push(contextRole)
                })

            })
        }
    }

    return roles;
}


MlResolver.MlQueryResolver['fetchAssignedUsers'] = (obj, args, context, info) => {

  let query = ""
  let users = [];

  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.communityId != ""){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.communityId":args.communityId},{"profile.isActive":true}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.communityId":args.communityId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && !args.subChapterName.startsWith("Moolya-")){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},{"profile.isActive":true}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName.startsWith("Moolya-")){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userType":'moolya'},{"profile.isActive":true}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userType":'moolya'},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId != "" ){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.isActive":true}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.isActive":true}]}, context).fetch();
  }
  users.map(function (user) {
    user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
  })
  return users;
}

MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'] = (obj, args, context, info) => {
  let users = [];
  if (args.clusterId) {
    // let cluster = MlClusters.findOne({_id: args.clusterId});
    let cluster = mlDBController.findOne('MlClusters', {_id: args.clusterId}, context)
    if(cluster.isActive){
      // let departments = MlDepartments.find({"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}).fetch();
      let departments = mlDBController.find('MlDepartments', {"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}, context).fetch();
      if (departments && departments.length > 0) {
        departments.map(function (department) {
          // let depUsers = Meteor.users.find({"$and": [{"$or": [{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department": department._id}, {"profile.InternalUprofile.moolyaProfile.globalAssignment": true}]}, {"profile.InternalUprofile.moolyaProfile.userType": 'moolya'}]}).fetch();
          let depUsers = mlDBController.find('users', {"$and": [{"$or": [{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department": department._id}, {"profile.InternalUprofile.moolyaProfile.globalAssignment": true}]}, {"profile.InternalUprofile.moolyaProfile.userType": 'moolya'}]}, context).fetch();
            depUsers.map(function (user) {
            let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
            if ((user.profile.InternalUprofile.moolyaProfile.globalAssignment || user.profile.InternalUprofile.moolyaProfile.userProfiles.length == 0) && (user.profile.isActive)) {
              user.username = user.profile.InternalUprofile.moolyaProfile.firstName + " " + user.profile.InternalUprofile.moolyaProfile.lastName;
              if (_.isEmpty(_.find(users, user))) {
                users.push(user)
              }
            }
            else if (!user.profile.InternalUprofile.moolyaProfile.globalAssignment && userProfiles.length > 0 && user.profile.isActive) {
              userProfiles.map(function (profile) {
                if (profile.clusterId == args.clusterId) {
                  let userRoles = profile.userRoles;
                  let activeRoles = _.find(userRoles, {"isActive": true});
                  user.username = user.profile.InternalUprofile.moolyaProfile.firstName + " " + user.profile.InternalUprofile.moolyaProfile.lastName;
                  if (_.isEmpty(_.find(users, user))) {
                    users.push(user)
                  }
                }
              })
            }
          })
        })
      }
    }
  }
    return users;
}

MlResolver.MlQueryResolver['fetchUserDepSubDep'] = (obj, args, context, info) =>
{
    let depts = []
    // let user = Meteor.users.findOne({"_id": args.userId})
    let user = mlDBController.findOne('users', {_id: args.userId}, context)
    // let clusterDepts = MlDepartments.find({"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}).fetch();
    let clusterDepts = mlDBController.find('MlDepartments', {"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}, context).fetch();
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
        // let departmentName = MlDepartments.findOne({"_id":dept.department}).departmentName;
        let departmentName = mlDBController.findOne('MlDepartments', {_id: dept.department}, context).departmentName;
        // let subDepartmentName = MlSubDepartments.findOne({"_id":dept.subDepartment}).subDepartmentName;
        let subDepartmentName = mlDBController.findOne('MlSubDepartments', {_id: dept.subDepartment}, context).subDepartmentName;
        dept.departmentName =departmentName;
        dept.subDepartmentName = subDepartmentName;
    })
    return depts
}

MlResolver.MlQueryResolver['fetchUsersBysubChapterDepSubDep'] = (obj, args, context, info) =>
{
    let users = [];
    if(args.subChapterId){
        // let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
      let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId}, context)
        if(subChapter && subChapter.isDefaultSubChapter){
            users = MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'](obj, {clusterId:subChapter.clusterId}, context, info)
        }else{
          // let departments = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();
          let departments = mlDBController.find('MlDepartments', {"depatmentAvailable.subChapter":subChapter._id}, context).fetch();
          if(departments && departments.length > 0){
            for(var i = 0; i < departments.length; i++){
              // let depusers = Meteor.users.find({"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id}).fetch();
              let depusers = mlDBController.find('users', {"profile.InternalUprofile.moolyaProfile.assignedDepartment.department":departments[i]._id}, context).fetch();
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
  let depts = []
  // let subChapter = MlSubChapters.findOne({"_id":args.subChapterId});
  let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId}, context)
  if(subChapter && subChapter.isDefaultSubChapter) {
      depts = MlResolver.MlQueryResolver['fetchUserDepSubDep'](obj, {
        userId: args.userId,
        clusterId: subChapter.clusterId
      }, context, info)
  }else{
    // let user = Meteor.users.findOne({"_id":args.userId})
    let user = mlDBController.findOne('users', {_id: args.userId}, context)
    // let subChapterDep = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();
    let subChapterDep = mlDBController.find('MlDepartments', {"depatmentAvailable.subChapter":subChapter._id}, context).fetch();
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
      // let departmentName = MlDepartments.findOne({"_id":dept.department}).departmentName;
      let departmentName = mlDBController.findOne('MlDepartments', {_id: dept.department}, context).departmentName;
      // let subDepartmentName = MlSubDepartments.findOne({"_id":dept.subDepartment}).subDepartmentName;
      let subDepartmentName = mlDBController.findOne('MlSubDepartments', {_id: dept.subDepartment}, context).subDepartmentName;
      dept.departmentName =departmentName;
      dept.subDepartmentName = subDepartmentName;
    })
  }
  return depts
}

MlResolver.MlMutationResolver['deActivateUser'] = (obj, args, context, info) => {
    // let user = Meteor.users.findOne({_id: args.userId});
    let user = mlDBController.findOne('users', {_id: args.userId}, context)
    let resp;
    if(user){
        // resp = Meteor.users.update({_id:args.userId}, {$set:{"profile.isActive":args.isActive}});
        resp = mlDBController.update('users', args.userId, {"profile.isActive":args.isActive}, {$set:true}, context)
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
      if(!role.hierarchyCode) {
          if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") &&
            (role.communityId && role.communityId != "all")) {
            levelCode = "COMMUNITY"
          }
          else if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") && !args.user.isChapterAdmin) {
            levelCode = "SUBCHAPTER"
            role.communityId = "all"
          }
          else if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") &&
            args.user.isChapterAdmin) {
            if (role.departmentName == "operations") {
              // let chapterAdminRole = MlRoles.findOne({roleName: 'chapteradmin'})
              let chapterAdminRole = mlDBController.findOne('MlRoles', {roleName: 'chapteradmin'}, context)
              levelCode = "CHAPTER"
              role.roleId = chapterAdminRole._id
              role.subChapterId = "all"
              role.communityId = "all"
            } else {
              levelCode = "SUBCHAPTER"
              role.communityId = "all"
            }
          }
          else if ((role.clusterId && role.clusterId != "all") && (role.communityId && role.communityId != "all")) {
            levelCode = "COMMUNITY"
            role.chapterId = "all"
            role.subChapterId = "all"
          }
          else if (role.clusterId && role.clusterId != "all") {
            levelCode = "CLUSTER"
            role.chapterId = "all"
            role.subChapterId = "all"
            role.communityId = "all"
          }

          if (levelCode) {
            // role.roleName = MlRoles.findOne({_id: role.roleId}).roleName;
            role.roleName = mlDBController.findOne('MlRoles', {_id: role.roleId}, context).roleName;
            // hierarchy = MlHierarchy.findOne({code: levelCode})
            hierarchy = mlDBController.findOne('MlHierarchy', {code: levelCode}, context)
            role.hierarchyLevel = hierarchy.level;
            role.hierarchyCode = hierarchy.code;
          }
      }

  })

  let userProfile = {
      clusterId:  data.profile.InternalUprofile.moolyaProfile.userProfiles.clusterId,
      userRoles:  roles,
      isDefault: false
  }

  let resp = MlResolver.MlMutationResolver['addUserProfile'](null, {userId:userId, userProfile:userProfile}, context, null)
  return resp;
}

MlResolver.MlQueryResolver['fetchUsersForDashboard'] = (obj, args, context, info) => {
  let userType = args.userType; // Backend, Funder, Ideator, Startup, etc.
  let clusterId = args.clusterId?args.clusterId:"";
  let chapterId = args.chapterId?args.chapterId:"";
  let subChapterId = args.subChapterId?args.subChapterId:"";

  let users = [];
  if(clusterId != "" && chapterId != "" && subChapterId != ""){
        if(userType == "All"){
          // users = Meteor.users.find({"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true}]}).fetch();

          // FOR ALL USERS
          let communityUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isInternaluser":false}]}, context).fetch();
          if(communityUsers && communityUsers.length>0){
            users.push(communityUsers);
          }

          // FOR BACKEND USERS
          let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context)
          clusterId = subChapter.clusterId;
          if(subChapter.isActive){
              let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true}]}, context).fetch();
              _.each(allUsers, function (user){
                  if(user.profile.isActive){
                      let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
                      let profile = _.find(userProfiles, {clusterId:clusterId});
                      if(profile){
                          let roles = _.find(profile.userRoles, {subChapterId:subChapterId});
                          if(roles){
                            users.push(user);
                          }
                      }
                  }
              })
          }
        }else if(userType == "BackendUsers"){
            //   // UserType needed to be introduced
            //   users = Meteor.users.find({"$and":[{"profile.isExternaluser":false},{"profile.isActive":true},{"profile.isSystemDefined":null}]}).fetch();
            let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context)
            clusterId = subChapter.clusterId;
            if(subChapter.isActive){
              let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true}]}, context).fetch();
              _.each(allUsers, function (user){
                if(user.profile.isActive){
                  let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
                  let profile = _.find(userProfiles, {clusterId:clusterId});
                  if(profile){
                    let roles = _.find(profile.userRoles, {subChapterId:subChapterId});
                    if(roles){
                      users.push(user);
                    }
                  }
                }
              })
            }
        }
  } else{
    if(userType == "All"){
      // users = Meteor.users.find({"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true}]}, context).fetch();
    }else if(userType == "BackendUsers"){
      // UserType needed to be introduced
      // users = Meteor.users.find({"$and":[{"profile.isExternaluser":false},{"profile.isActive":true},{"profile.isSystemDefined":null}]}).fetch();
      users = mlDBController.find('users', {"$and":[{"profile.isExternaluser":false},{"profile.isActive":true},{"profile.isSystemDefined":null}]}, context).fetch();
    }
  }

  return {data:users, totalRecords:users&&users.length?users.length:0};
}
