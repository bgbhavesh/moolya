/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import passwordUtil from "../../../../commons/passwordUtil";
import MlAdminUserContext from "../../../../mlAuthorization/mlAdminUserContext";
import getQuery from "../../genericSearch/queryConstructor";
import _ from "lodash";
import _underscore from "underscore";
import geocoder from 'geocoder'

MlResolver.MlQueryResolver['fetchUserTypeFromProfile'] = (obj, args, context, info) => {
    let user=Meteor.users.findOne(context.userId);
    return user&&user.profile&&user.profile.isInternaluser?"internal":"external";
}

MlResolver.MlQueryResolver['fetchMapCenterCordsForUser'] = (obj, args, context, info) => {
  //Resolve the context of the User and hierarchy
  //todo: check internal /external user
  var clusterId=args.id||null;

  if(!clusterId){
  let userProfile=new MlAdminUserContext().userProfileDetails(context.userId);
  if(userProfile&&userProfile.defaultProfileHierarchyRefId&&userProfile.defaultProfileHierarchyRefId!==null) {
    clusterId=userProfile.defaultProfileHierarchyRefId;
    }
  }

  let clusterDetails = MlClusters.findOne(clusterId);
  if (clusterDetails && clusterDetails.latitude && clusterDetails.longitude) {
    return {lat: clusterDetails.latitude, lng: clusterDetails.longitude};
  }
}

MlResolver.MlMutationResolver['createUser'] = (obj, args, context, info) => {
    //todo: tocheck the Auth with roles and permission
    // let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    // if (!isValidAuth) {
    //   let code = 401;
    //   let response = new MlRespPayload().errorPayload("Not Authorized", code);
    //   return response;
    // }

    if(!args.user.username){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Username is required", code);
      return response;
    }
  let backEndUserExist = mlDBController.findOne('users', {'profile.email':args.user.profile.email}, context)
  let registrationExist =   mlDBController.findOne('MlRegistration', {'registrationInfo.email':args.user.profile.email}, context)
    if((backEndUserExist && backEndUserExist._id) || (registrationExist && registrationExist._id)){
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
                  }else if(userRoles[key]) {
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
    // let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    // if (!isValidAuth) {
    //   let code = 401;
    //   let response = new MlRespPayload().errorPayload("Not Authorized", code);
    //   return response;
    // }
  let salted = passwordUtil.hashPassword(args.password);
    let resp = mlDBController.update('users', context.userId, {"services.password.bcrypt": salted}, {$set: true}, context)
    if (resp) {
      let code = 200;
      let response = new MlRespPayload().successPayload("Password Reset complete", code);
      return response

  }
};

MlResolver.MlMutationResolver['updateUser'] = (obj, args, context, info) => {
  //TODO: Auth to be here with roles and permission
  // let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  // if (!isValidAuth) {
  //   let code = 401;
  //   let response = new MlRespPayload().errorPayload("Not Authorized", code);
  //   return response;
  // }

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
        if(Rdoc.hierarchyCode == "CHAPTER" ){
          const chapterData = mlDBController.findOne('MlChapters', {_id: Rdoc.chapterId}, context) || [];
          Rdoc.chapterName = chapterData.chapterName;
        }
        if(Rdoc.communityId != 'all'){
          const communityData= mlDBController.findOne('MlCommunityDefinition', {code: Rdoc.communityCode}, context)||[];
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
                  let roleCombination;
                  if(role.subChapterId != 'all'){
                    const subChapterData = mlDBController.findOne('MlSubChapters', {_id: role.subChapterId}, context) || [];
                    roleCombination = subChapterData.clusterName +' - '+ subChapterData.chapterName + ' - ' + subChapterData.subChapterName
                  } else if(role.chapterId !='all'){
                    const chapterData = mlDBController.findOne('MlChapters', {_id: role.chapterId}, context) || [];
                    roleCombination = chapterData.clusterName +' - '+ chapterData.chapterName
                  } else if (role.clusterId !='all') {
                    const clusterData = mlDBController.findOne('MlClusters', {_id: role.clusterId}, context) || [];
                    roleCombination = clusterData.clusterName
                  }

                  assignedRoles += role.roleName+" ("+ roleCombination + ")"+","
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
    users = mlDBController.find('users', {"$and": [{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId": args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId": args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId": args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.communityCode": args.communityId}]}, context).fetch();
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && !args.subChapterName.startsWith("Moolya-")){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.InternalUprofile.moolyaProfile.userType":'non-moolya'},{"profile.isActive":true}]}).fetch();
    users = mlDBController.find('users', {"$and": [{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId": args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId": args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId": args.subChapterId}, {'profile.isMoolya': false}]}, context).fetch();   //InternalUprofile.moolyaProfile.userType
  }
  else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName.startsWith("Moolya-")){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userType":'moolya'},{"profile.isActive":true}]}).fetch();
    users = mlDBController.find('users', {"$and": [{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId": args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId": args.chapterId}, {'profile.isMoolya': true}]}, context).fetch(); //InternalUprofile.moolyaProfile.userType
  }
  else if(args.clusterId){
      // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.isActive":true}]}).fetch();
    users = mlDBController.find('users', {"$and": [{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId": args.clusterId}]}, context).fetch();
  }
  users.map(function (user) {
    user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
  })
  return users;
}

MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'] = (obj, args, context, info) => {
  let users = [];
  if (args.clusterId) {
    var clusterActive = mlDBController.findOne('MlClusters', {_id: args.clusterId, isActive: true}, context)
    if (clusterActive) {
      if (args.subChapterId) {
        let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId, isActive: true}, context)
        if (subChapter) {
          var isMoolya = subChapter.isDefaultSubChapter
          let departments = mlDBController.find('MlDepartments', {'$or':[{isSystemDefined: true, isActive : true}, {$and: [{isMoolya: isMoolya}, {"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}]}]}, context).fetch();
          if (departments && departments.length > 0) {
            departments.map(function (department) {

              if (isMoolya) {
                var moolyaUsersQuery = {"$and": [{"$or": [{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department": department._id}, {"profile.InternalUprofile.moolyaProfile.globalAssignment": true}]}, {'profile.isMoolya': true}]}
                let depUsers = mlDBController.find('users', moolyaUsersQuery, context).fetch();
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
                        user.username = user.profile.InternalUprofile.moolyaProfile.firstName + " " + user.profile.InternalUprofile.moolyaProfile.lastName;
                        if (_.isEmpty(_.find(users, user))) {
                          users.push(user)
                        }
                      }
                    })
                  }
                })
              } else {
                var nonMoolyaUsersQuery = {"$and": [{'profile.InternalUprofile.moolyaProfile.assignedDepartment.department': department._id}, {'profile.InternalUprofile.moolyaProfile.subChapter': subChapter._id}, {'profile.isMoolya': false}]}
                let depUsersNon = mlDBController.find('users', nonMoolyaUsersQuery, context).fetch();
                if (depUsersNon && depUsersNon.length > 0) {
                  _.each(depUsersNon, function (user, key) {
                    user.username = user.profile.InternalUprofile.moolyaProfile.firstName + " " + user.profile.InternalUprofile.moolyaProfile.lastName;
                    users.push(user)
                  })
                }
                users = _.uniqBy(users, '_id')
              }
            })
          }
          // users = _.uniqBy(users, '_id')
        }
      } else {
        let departments = mlDBController.find('MlDepartments', {"$or": [{"depatmentAvailable.cluster": args.clusterId}, {"depatmentAvailable.cluster": "all"}]}, context).fetch();
        if (departments && departments.length > 0) {
          // {"$or": [{"profile.InternalUprofile.moolyaProfile.assignedDepartment.department": department._id}, {"profile.InternalUprofile.moolyaProfile.globalAssignment": true}]
          departments.map(function (department) {
            let depUsers = mlDBController.find('users', {
              "$and": [{
                "$or": [{
                  "profile.InternalUprofile.moolyaProfile.assignedDepartment.department": department._id
                }, {
                  "profile.InternalUprofile.moolyaProfile.globalAssignment": true
                }]
              }, {
                'profile.isMoolya': true
              }]
            }, context).fetch();
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

MlResolver.MlQueryResolver['fetchUsersBysubChapterDepSubDep'] = (obj, args, context, info) => {
  let users = [];
  if (args.subChapterId) {
    let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId}, context)
    if (subChapter && subChapter.isActive) {
      if (subChapter.isDefaultSubChapter) {
        users = MlResolver.MlQueryResolver['fetchUsersByClusterDepSubDep'](obj, {
          clusterId: subChapter.clusterId,
          subChapterId: args.subChapterId ? args.subChapterId : ""
        }, context, info)
      } else {
        let departments = mlDBController.find('MlDepartments', {
          $or: [{$and: [{isMoolya: false}, {depatmentAvailable: {$elemMatch: {subChapter: {$in: ['all', subChapter._id]}}}}]}, {
            isSystemDefined: true,
            isActive: true
          }]
        }, context).fetch();
        if (departments && departments.length > 0) {
          for (var i = 0; i < departments.length; i++) {
            let depusers = mlDBController.find('users', {
              $and: [{
                "profile.InternalUprofile.moolyaProfile.assignedDepartment.department": departments[i]._id
              }, {
                'profile.isMoolya': false
              },{'profile.InternalUprofile.moolyaProfile.subChapter':subChapter._id}]
            }, context).fetch();
            if (depusers && depusers.length > 0) {
              _.each(depusers,function (user,key) {
                user.username = user.profile.InternalUprofile.moolyaProfile.firstName + " " + user.profile.InternalUprofile.moolyaProfile.lastName;
                users.push(user)
              })
              // users = users.concat(depusers)
            }
          }
        }
        users = _.uniqBy(users, '_id')
      }
    }
  }
  return users;
}

MlResolver.MlQueryResolver['fetchsubChapterUserDepSubDep'] = (obj, args, context, info) => {
  let depts = []
  let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId}, context)
  if (subChapter && subChapter.isDefaultSubChapter) {
    depts = MlResolver.MlQueryResolver['fetchUserDepSubDep'](obj, {
      userId: args.userId,
      clusterId: subChapter.clusterId
    }, context, info)
  } else if (subChapter && !subChapter.isDefaultSubChapter) {
    let user = mlDBController.findOne('users', {_id: args.userId}, context)
    // let subChapterDep = MlDepartments.find({"depatmentAvailable.subChapter":subChapter._id}).fetch();

    let subChapterDep = mlDBController.find('MlDepartments', {
      $or: [{$and: [{isMoolya: false}, {depatmentAvailable: {$elemMatch: {subChapter: {$in: ['all', subChapter._id]}}}}]}, {
        isSystemDefined: true,
        isActive: true
      }]
    }, context).fetch();

    if (user && subChapterDep && subChapterDep.length > 0) {
      let userDep = (user.profile && user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.assignedDepartment);
      userDep.map(function (userDept) {
        let result = _.find(subChapterDep, {"_id": userDept.department});
        userDept.isAvailiable = result.isActive;
        depts.push(userDept)
      })
    }
    depts.map(function (dept) {
      let departmentName = mlDBController.findOne('MlDepartments', {_id: dept.department}, context).departmentName;
      let subDepartmentName = mlDBController.findOne('MlSubDepartments', {_id: dept.subDepartment}, context).subDepartmentName;
      dept.departmentName = departmentName;
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
        //community Admin @ subChapter level
          if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") &&
            (role.communityId && role.communityId != "all")) {
            levelCode = "COMMUNITY"
            let community = mlDBController.findOne('MlCommunity', {"$and":[{"clusterId":role.clusterId},{"chapterId":role.chapterId},{"subChapterId":role.subChapterId},{"communityDefCode":role.communityId},{"hierarchyCode":"SUBCHAPTER"}]}, context);
            if(community){
              role.communityCode = role.communityId;
              role.communityId = community._id;
              role.communityHierarchyLevel = 1
            }
          }
          //sub chapter Admin
          else if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") && !args.user.isChapterAdmin) {
            levelCode = "SUBCHAPTER"
            role.communityId = "all";
            role.communityCode = "all";
          }
          //chapter Admin
          else if ((role.clusterId && role.clusterId != "all") && (role.chapterId && role.chapterId != "all") && (role.subChapterId && role.subChapterId != "all") &&
            args.user.isChapterAdmin) {
            if (role.departmentName == "operations") {
              // let chapterAdminRole = MlRoles.findOne({roleName: 'chapteradmin'})
              let chapterAdminRole = mlDBController.findOne('MlRoles', {roleName: 'chapteradmin'}, context)
              levelCode = "CHAPTER"
              role.roleId = chapterAdminRole._id
              role.subChapterId = "all"
              role.communityId = "all"
              role.communityCode = "all";
            } else {
              levelCode = "SUBCHAPTER"
              role.communityId = "all"
              role.communityCode = "all";
            }
          }

          //community Admin @ cluster level
          else if ((role.clusterId && role.clusterId != "all") && (role.communityId && role.communityId != "all")) {
            levelCode = "COMMUNITY"
            role.chapterId = "all"
            role.subChapterId = "all"
            // let community = mlDBController.findOne('MlCommunity', {"$and":[{"clusterId":role.clusterId},{"communityDefCode":role.communityId},{"hierarchyCode":"SUBCHAPTER"}]}, context);
            // if(community){
              role.communityCode = role.communityId;
              role.communityId = "all";
              role.communityHierarchyLevel = 3
            // }
          }
          //cluster Admin
          else if (role.clusterId && role.clusterId != "all") {
            levelCode = "CLUSTER"
            role.chapterId = "all"
            role.subChapterId = "all"
            role.communityId = "all"
            role.communityCode = "all";
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

    var totalRecords=0;
    var findOptions = {};

    if(args.offset && args.offset >0){   // `offset` may be `null`
      findOptions.skip=args.offset;
    };

    if (args.limit&&args.limit > 0) { // `limit` may be `null`
      findOptions.limit = args.limit;
    }

    let userFilterQuery={}; //'filter' applied by user
    if (args.fieldsData){
      userFilterQuery = getQuery.searchFunction(args);
    }

  var userType = args.userType; // Backend, Funder, Ideator, Startup, etc.

  var loggedInUser = new MlAdminUserContext().userProfileDetails(context.userId);

  // If selecting Cluster, Chapter And Subachapter and then coming to Community Priming
  var clusterId = args.clusterId?args.clusterId:"";
  var chapterId = args.chapterId?args.chapterId:"";
  var subChapterId = args.subChapterId?args.subChapterId:"";
  var communityCode = args.communityCode?args.communityCode:"";

  // Directly clicking on Community Priming
  if(!args.clusterId){

      // If Other Admins logs in and directly clicks on Community Priming
      if(loggedInUser.hierarchyCode != "PLATFORM"){

        clusterId = loggedInUser.defaultProfileHierarchyRefId;

          if(loggedInUser.defaultChapters[0] != "all"){
              chapterId = loggedInUser.defaultChapters[0];
          }
          if(loggedInUser.defaultSubChapters[0] != "all"){
              subChapterId = loggedInUser.defaultSubChapters[0];
          }
        if(loggedInUser.defaultCommunities[0].communityCode != "all"){
          communityCode = loggedInUser.defaultCommunities[0].communityCode;
        }
      }
  }
  var users = [];

  if(clusterId != "" && chapterId != "" && subChapterId != "" && communityCode != ""){
    let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
    let chapter = mlDBController.findOne('MlChapters', {_id: chapterId}, context)
    let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context)
    if(cluster.isActive && chapter.isActive && subChapter.isActive){
        let externalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isExternaluser":true}]}, context).fetch();
        if(externalUsers && externalUsers.length>0) {
          _.each(externalUsers, function (user) {
            let userProfiles = user.profile.externalUserProfiles;
            if (userProfiles) {
              let profile = _.find(userProfiles, {
                clusterId: clusterId,
                chapterId: chapterId,
                subChapterId: subChapterId,
                communityDefCode:(communityCode||"all"),
              });
              if (profile) {
                if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                  user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                  user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                users.push(user);
              }
            }
          })
        }
      //   // FOR Internal Users
        let internalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
        _.each(internalUsers, function (user){
          let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
          let profile = _.find(userProfiles, {clusterId:clusterId});
          if(profile){
            let roles = _.find(profile.userRoles, {chapterId:(chapterId||"all"), subChapterId:(subChapterId||"all"), communityCode:(communityCode||"all")});
            if(roles){
              if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
              }
              user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
              users.push(user);
            }
          }
        })
    }

  }else if(clusterId != "" && chapterId != "" && subChapterId != ""){
      let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
      let chapter = mlDBController.findOne('MlChapters', {_id: chapterId}, context)
      let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context)
      if(cluster.isActive && chapter.isActive && subChapter.isActive){
          if(userType == "All"){
              // FOR External Users
              let externalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
              if(externalUsers && externalUsers.length>0) {
                _.each(externalUsers, function (user) {
                  let userProfiles = user.profile.externalUserProfiles;
                  if (userProfiles) {
                    let profile = _.find(userProfiles, {
                      clusterId: clusterId,
                      chapterId: chapterId,
                      subChapterId: subChapterId
                    });
                    if (profile) {
                      if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                        user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                        user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                      }
                      user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                      users.push(user);
                    }
                  }
                })
              }
              // FOR Internal Users
              let internalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
              _.each(internalUsers, function (user){
                  let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
                  let profile = _.find(userProfiles, {clusterId:clusterId});
                  if(profile){
                    let roles = _.find(profile.userRoles, {chapterId:(chapterId||"all"), subChapterId:(subChapterId||"all")});
                    if(roles){
                      if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                        user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                        user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                      }
                      user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                      users.push(user);
                    }
                  }
              })
              // For Browsers
              let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
              if(browserUsers && browserUsers.length>0) {
                _.each(browserUsers, function (user) {
                  let userProfiles = user.profile.externalUserProfiles;
                  if (!userProfiles || userProfiles.length<1) {
                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                    }
                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                      users.push(user);
                  }
                })
              }
          }
          else if(userType == "BackendUsers"){
              let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context).fetch();
              _.each(allUsers, function (user){
                  let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
                  let profile = _.find(userProfiles, {clusterId:clusterId});
                  if(profile){
                    let roles = _.find(profile.userRoles, {chapterId:(chapterId||"all"),subChapterId:(subChapterId||"all")});
                    if(roles){
                      if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                        user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                        user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                      }
                      user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                      users.push(user);
                    }
                  }
              })
          }
          else if (userType == "Ideators" || userType =="Funders" || userType =="Startups" || userType =="Service Providers" || userType =="Companies" || userType =="Institutions"){
              let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
              _.each(allUsers, function (user){
                let userProfiles = user.profile.externalUserProfiles;
                let profile = _.filter(userProfiles, {clusterId:clusterId,chapterId:chapterId,subChapterId:subChapterId});
                if(profile && profile.length>0) {
                  _.each(profile, function (profile) {
                    if (profile.communityId && profile.communityId != "all") {
                      let community = mlDBController.findOne('MlCommunity', {"$and": [{"_id": profile.communityId}]}, context);
                      if (community && community.communityName == userType) {
                        if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                          user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                          user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                        }
                        user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                        users.push(user);
                      }
                    } else if(profile.communityId && profile.communityId == "all") {
                      if (profile) {
                        if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                          user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                          user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                        }
                        user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                        users.push(user);
                      }
                    }

                  })
                }
              })
          }
          else{
            let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
            if(browserUsers && browserUsers.length>0) {
              _.each(browserUsers, function (user) {
                let userProfiles = user.profile.externalUserProfiles;
                if (!userProfiles || userProfiles.length<1) {
                  if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                    user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                    user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                  }
                  user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
                }
              })
            }
          }
      }

  } else if(clusterId != "" && chapterId != ""){

    let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
    let chapter = mlDBController.findOne('MlChapters', {_id: chapterId}, context)
    if(cluster.isActive && chapter.isActive){
      if(userType == "All"){
          // FOR External Users
          let externalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
          if(externalUsers && externalUsers.length>0){
            _.each(externalUsers, function (user){
              let userProfiles = user.profile.externalUserProfiles;
              if(userProfiles){
                let profile = _.find(userProfiles, {clusterId:clusterId,chapterId:chapterId});
                if(profile){
                  if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                    user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                    user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                  }
                  user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
                }
              }
            })
          }
          // FOR Internal Users
          let internalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(internalUsers, function (user){
              let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
              let profile = _.find(userProfiles, {clusterId:clusterId});
              if(profile){
                let roles = _.find(profile.userRoles, {chapterId:(chapterId||"all")});
                if(roles){
                  if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                    user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                    user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                  }
                  user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
                }
              }
          })
          // For Browsers
          let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
          if(browserUsers && browserUsers.length>0) {
            _.each(browserUsers, function (user) {
              let userProfiles = user.profile.externalUserProfiles;
              if (!userProfiles || userProfiles.length<1) {
                if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                  user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                  user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                users.push(user);
              }
            })
          }
      }
      else if(userType == "BackendUsers"){
        //   // UserType needed to be introduced
          let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(allUsers, function (user){
              let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
              let profile = _.find(userProfiles, {clusterId:clusterId});
              if(profile){
                let roles = _.find(profile.userRoles, {chapterId:(chapterId||"all")});
                if(roles){
                  if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                    user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                    user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                  }
                  user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
                }
              }
          })
      }
      else if (userType == "Ideators" || userType =="Funders" || userType =="Startups" || userType =="Service Providers" || userType =="Companies" || userType =="Institutions"){
          let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(allUsers, function (user){
            let userProfiles = user.profile.externalUserProfiles;
            let profile = _.filter(userProfiles, {clusterId:clusterId,chapterId:chapterId});
            if(profile && profile.length>0) {
              _.each(profile, function (profile) {
                if (profile.communityId && profile.communityId != "all") {
                  let community = mlDBController.findOne('MlCommunity', {"$and": [{"_id": profile.communityId}]}, context);
                  if (community && community.communityName == userType) {
                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                    }
                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                    users.push(user);
                  }
                } else if(profile.communityId && profile.communityId == "all") {
                  if (profile) {
                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                    }
                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                    users.push(user);
                  }
                }

              })
            }
          })
      }
      else{
        let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
        if(browserUsers && browserUsers.length>0) {
          _.each(browserUsers, function (user) {
            let userProfiles = user.profile.externalUserProfiles;
            if (!userProfiles || userProfiles.length<1) {
              if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
              }
              user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
              users.push(user);
            }
          })
        }
      }
    }

  }else if(clusterId != "" && communityCode != ""){
    let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
    if(cluster.isActive ){
        let externalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
        if(externalUsers && externalUsers.length>0) {
          _.each(externalUsers, function (user) {
            let userProfiles = user.profile.externalUserProfiles;
            if (userProfiles) {
              let profile = _.find(userProfiles, {
                clusterId: clusterId,
                communityDefCode:(communityCode||"all"),
              });
              if (profile) {
                if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                  user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                  user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                users.push(user);
              }
            }
          })
        }
      //   // FOR Internal Users
        let internalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
        _.each(internalUsers, function (user){
          let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
          let profile = _.find(userProfiles, {clusterId:clusterId});
          if(profile){
            let roles = _.find(profile.userRoles, {communityCode:(communityCode||"all")});
            if(roles){
              if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
              }
              user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
              users.push(user);
            }
          }
        })
    }

  }else if(clusterId != ""){

    let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
    if(cluster.isActive ){
      if(userType == "All"){
          // FOR External Users
          let externalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isActive":true},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
          if(externalUsers && externalUsers.length>0){
            _.each(externalUsers, function (user){
              let userProfiles = user.profile.externalUserProfiles;
              if(userProfiles){
                let profile = _.find(userProfiles, {clusterId:clusterId});
                if(profile){
                  if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                    user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                    user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                  }
                  user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
                }
              }
            })
          }
          // FOR Internal Users
          let internalUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(internalUsers, function (user){
              let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
              let profile = _.find(userProfiles, {clusterId:clusterId});
              if(profile){
                if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                  user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                  user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
              }
          })
          // For Browsers
          let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
          if(browserUsers && browserUsers.length>0) {
            _.each(browserUsers, function (user) {
              let userProfiles = user.profile.externalUserProfiles;
              if (!userProfiles || userProfiles.length<1) {
                if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                  user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                  user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                users.push(user);
              }
            })
          }
      }
      else if(userType == "BackendUsers"){
        //   // UserType needed to be introduced
          let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(allUsers, function (user){
              let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
              let profile = _.find(userProfiles, {clusterId:clusterId});
              if(profile){
                if(user.profile.addressInfo && user.profile.addressInfo.length>0){
                  user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
                  user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
                }
                user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                  users.push(user);
              }
          })
      }
      else if (userType == "Ideators" || userType =="Funders" || userType =="Startups" || userType =="Service Providers" || userType =="Companies" || userType =="Institutions"){
          let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(allUsers, function (user){
            let userProfiles = user.profile.externalUserProfiles;
            let profile = _.filter(userProfiles, {clusterId:clusterId});
            if(profile && profile.length>0) {
              _.each(profile, function (profile) {
                if (profile.communityId && profile.communityId != "all") {
                  let community = mlDBController.findOne('MlCommunity', {"$and": [{"_id": profile.communityId}]}, context);
                  if (community && community.communityName == userType) {
                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                    }
                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                    users.push(user);
                  }
                } else if(profile.communityId && profile.communityId == "all") {
                  if (profile) {
                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                    }
                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                    users.push(user);
                  }
                }

              })
            }
          })
      }
      else{
        let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
        if(browserUsers && browserUsers.length>0) {
          _.each(browserUsers, function (user) {
            let userProfiles = user.profile.externalUserProfiles;
            if (!userProfiles || userProfiles.length<1) {
              if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
              }
              user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
              users.push(user);
            }
          })
        }
      }
    }

  } else{

      if(userType == "All"){
        let internal = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isInternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
        let external = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
        _.each(internal, function (user){
          if(user.profile.addressInfo && user.profile.addressInfo.length>0){
            user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
            user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
          }
          user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
          users.push(user);
        })
        _.each(external, function (user){
          if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
            user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
            user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
          }
          user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
          users.push(user);
        })

      }
      else if(userType == "BackendUsers"){
        var internalUsers = mlDBController.find('users', {"$and":[{"profile.isInternaluser":true},{"profile.isActive":true},{"profile.isSystemDefined":{$exists:false}}]}, context, findOptions).fetch();
        _.each(internalUsers, function (user){
            if(user.profile.addressInfo && user.profile.addressInfo.length>0){
              user.latitude = user.profile.addressInfo[0].latitude?user.profile.addressInfo[0].latitude:null;
              user.longitude = user.profile.addressInfo[0].longitude?user.profile.addressInfo[0].longitude:null;
            }
          user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
            users.push(user);
        })
      }
      else if(userType == "Ideators" || userType =="Funders" || userType =="Startups" || userType =="Service Providers" || userType =="Companies" || userType =="Institutions"){
          let allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true},{"profile.isActive":true}]}, context, findOptions).fetch();
          _.each(allUsers, function (user){

                  let userProfiles = user.profile.externalUserProfiles;
                  if(userProfiles && userProfiles.length>0) {
                      _.each(userProfiles, function (profile) {
                          if (profile && profile.communityId) {
                              if (profile.communityId && profile.communityId != "all") {
                                  let community = mlDBController.findOne('MlCommunity', {"$and": [{"_id": profile.communityId}]}, context);
                                  if (community && community.communityName == userType) {
                                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                                    }
                                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                                      users.push(user);
                                  }
                              } else if(profile.communityId && profile.communityId == "all") {
                                  if (profile) {
                                    if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                                      user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                                      user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
                                    }
                                    user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                                      users.push(user);
                                  }
                              }
                          }
                      })
                  }
          })
      }
      else{
        let browserUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":null},{"profile.isExternaluser":true}]}, context, findOptions).fetch();
        if(browserUsers && browserUsers.length>0) {
          _.each(browserUsers, function (user) {
            let userProfiles = user.profile.externalUserProfiles;
            if (!userProfiles || userProfiles.length<1) {
              if(user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length>0 && user.profile.externalUserAdditionalInfo[0].addressInfo && user.profile.externalUserAdditionalInfo[0].addressInfo.length>0){
                user.latitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].latitude:null;
                user.longitude = user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude?user.profile.externalUserAdditionalInfo[0].addressInfo[0].longitude:null;
              }
              user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
              users.push(user);
            }
          })
        }
      }
  }

  context.module = "Users";
  return {data:users, totalRecords:users&&users.length?users.length:0};
}


MlResolver.MlQueryResolver['fetchUserForReistration'] = (obj, args, context, info) => {

  let query = ""
  let users = [];
 /*   let clusterId=args.clusterId;
    let chapterId=args.chapterId;
    let subChapterId=args.subChapterId;
    let departmentId=args.departmentId*/
  if(args.clusterId && args.chapterId&& args.subChapterId&&args.departmentId&&args.subDepartmentId&&args.roleId){

    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.departmentId":args.departmentId},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subDepartmentId":args.subDepartmentId},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":args.roleId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId&&args.chapterId&&args.subChapterId &&args.departmentId&args.subDepartmentId){
    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.departmentId":args.departmentId},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subDepartmentId":args.subDepartmentId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId&& args.chapterId&& args.subChapterId&&args.departmentId){
    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.departmentId":args.departmentId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId&& args.chapterId&& args.subChapterId){
    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subChapterId":args.subChapterId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId&&args.chapterId){
    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId}, {"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.chapterId":args.chapterId},{"profile.isActive":true}]}, context).fetch();
  }
  else if(args.clusterId){
    // users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.isActive":true}]}).fetch();
    users = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId},{"profile.isActive":true}]}, context).fetch();
  }
  users.map(function (user) {
    user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
  })
  return users;
}


MlResolver.MlMutationResolver['updateDataEntry'] = (obj, args, context, info) => {
  // let user = Meteor.users.findOne({_id: args.userId});
  let user = mlDBController.findOne('users', {_id: context.userId}, context)
  let resp;
  if(user){
    // resp = Meteor.users.update({_id:args.userId}, {$set:{"profile.isActive":args.isActive}});
    resp = mlDBController.update('users', args.userId,{"profile.profileImage":args.attributes.profileImage,"profile.InternalUprofile.moolyaProfile.firstName":args.attributes.firstName,"profile.InternalUprofile.moolyaProfile.middleName":args.attributes.middleName, "profile.InternalUprofile.moolyaProfile.lastName":args.attributes.lastName,  "profile.InternalUprofile.moolyaProfile.displayName": args.attributes.userName, "profile.genderType": args.attributes.genderType, "profile.dateOfBirth": args.attributes.dateOfBirth},{$set:true}, context)
  }
  if(resp){
    resp = new MlRespPayload().successPayload("User Profile Updated Successfully", 200);
    return resp
  }
  resp = new MlRespPayload().errorPayload("Unable to save Profile", 400);
  return resp
}


MlResolver.MlMutationResolver['updateSettings'] = (obj, args, context, info) => {
  // let user = Meteor.users.findOne({_id: args.userId});
  let user = mlDBController.findOne('users', {_id: context.userId}, context)
  let resp;
  if(user){
    // resp = Meteor.users.update({_id:args.userId}, {$set:{"profile.isActiv`e":args.isActive}});
    resp = mlDBController.update('users', context.userId,{"profile.numericalFormat":args.settingsAttributes.numericalFormat,"profile.currencyTypes":args.settingsAttributes.currencyTypes},{$set:true}, context)
  }
  if(resp){
    resp = new MlRespPayload().successPayload("User Profile Updated Successfully", 200);
    return resp
  }
  resp = new MlRespPayload().errorPayload("Unable to save Profile", 400);
  return resp
}


MlResolver.MlMutationResolver['updateAddressBookInfo'] = (obj, args, context, info) => {
  let id = " "
  let user = mlDBController.findOne('users', {_id: context.userId}, context) || {};
  if (args && args.addressBook) {
    if (args.type == "CONTACTTYPE") {
        let contactTypes = []
        contactTypes = user.profile.contactInfo?user.profile.contactInfo:[];
        contactTypes.push(args.addressBook.contactInfo[0]);
      id = mlDBController.update('users', context.userId, {"profile.contactInfo": contactTypes}, {$set: true}, context)
    } else if (args.type == "ADDRESSTYPE") {
        let addressTypes = []
        addressTypes = user.profile.addressInfo?user.profile.addressInfo:[];

        // Fetching Lat Lng from Address
        let city = args.addressBook.addressInfo[0].addressCity
        let area = args.addressBook.addressInfo[0].addressArea
        let locality = args.addressBook.addressInfo[0].addressLocality
        let pin =args.addressBook.addressInfo[0].addressPinCode
        geocoder.geocode(locality+","+area+","+city+","+pin, Meteor.bindEnvironment(function ( err, data ) {
          if(err){
            throw new Error("Invalid Locality selection "+e);
          }
          args.addressBook.addressInfo[0].latitude = data.results[0].geometry.location.lat;
          args.addressBook.addressInfo[0].longitude = data.results[0].geometry.location.lng;

          try{
            // let id = MlClusters.insert(cluster);
            addressTypes.push(args.addressBook.addressInfo[0]);
            let id = mlDBController.update('users', context.userId, {"profile.addressInfo": addressTypes}, {$set: true}, context)

            if(id){
              let code = 200;
              let result = {addressId: id}
              let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
              return response
            }
          }catch(e){
            throw new Error("Error while updating address "+e);
          }

        }),{key:Meteor.settings.private.googleApiKey});

    } else if (args.type == "EMAILTYPE") {
        let emailTypes = []
        emailTypes = user.profile.emailInfo?user.profile.emailInfo:[];
        emailTypes.push(args.addressBook.emailInfo[0]);
      id = mlDBController.update('users', context.userId, {"profile.emailInfo": emailTypes}, {$set: true}, context)
    }
    if (id) {
      let code = 200;
      //let insertedData = users.findOne(id) || {};
      let result = {update: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}



MlResolver.MlQueryResolver['fetchAddressBookInfo'] = (obj, args, context, info) => {
  let rest = null;
  let user = mlDBController.findOne('users', {_id: context.userId}, context);
  return user.profile;
}


MlResolver.MlQueryResolver['findUserOnToken'] = (obj, args, context, info) => {
  const hashedToken = Accounts._hashLoginToken(args.token)
  const user = Meteor.users.findOne({'services.resume.loginTokens.hashedToken':hashedToken})    //
  if(user){
    let code = 200;
    let result = user.profile.isExternaluser
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }else{
    let code = 401;
    let result = "Not a valid User token"
    let response = new MlRespPayload().errorPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver['passwordVerification'] = (obj, args, context, info) => {
  if (context.userId) {
    var user = mlDBController.findOne('users', {_id: context.userId}, context);
    let pwd = {digest: args.Details, algorithm: 'sha-256'};
    var result = Accounts._checkPassword(user, pwd);
    if(result.error) {
      let code = 404;
      let errorResponse = new MlRespPayload().errorPayload(result, code);
      return errorResponse
    }else{

        let code = 200;
        let successResponse = new MlRespPayload().successPayload(result, code);
        return successResponse
    }
  }else{
    return false;
  }
}


MlResolver.MlMutationResolver['uploadUserImage'] = (obj, args, context, info) => {
  const user = Meteor.users.findOne({'_id':args.userId})
  if(user){
    let result = Meteor.users.update({'_id': args.userId}, {$set:{'profile.profileImage':args.userProfilePic}})
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver['fetchInternalUserProfiles'] = (obj, args, context, info) => {
  let userId=context.userId
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user){
    var internalUserProfile = user&&user.profile&&user.profile.isInternaluser?user.profile.InternalUprofile:{};
    let moolyaProfile = internalUserProfile&&internalUserProfile.moolyaProfile?internalUserProfile.moolyaProfile:{}
    let userProfiles = moolyaProfile&&moolyaProfile.isActive&&moolyaProfile.userProfiles?moolyaProfile.userProfiles:[]
   /* for (var k = 0; k < userProfiles.length; k++) {

      let cName = "";
      if(userProfiles[k]){
        const clusterData = mlDBController.findOne('MlClusters', {_id: userProfiles[k].clusterId}, context) || {};
        cName = clusterData.displayName;
      }else if( userProfiles[k].clusterId == 'all'){
        cName = "All";
      }
      userProfiles[k].clusterName = cName
    }*/

    userProfiles.map(function (user,index) {
      let cName = null
      let cFlag = null
      if(user &&  user.clusterId  && user.clusterId != 'all'){
        let clusterData = mlDBController.findOne('MlClusters', {_id: user.clusterId}, context) || {};
        cName = clusterData.displayName;
        cFlag = clusterData.countryFlag;

      }else if( user.clusterId == 'all'){
        cName = "All";
      }
      userProfiles[index].clusterName = cName
      userProfiles[index].clusterFlag = cFlag
    })


    /* userProfiles=_.filter(userProfiles, {'isDefault': true })||[];*/
    return userProfiles;
  }else {
    let code = 409;
    let response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

}

MlResolver.MlMutationResolver['setAdminDefaultProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  var update=null;
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user&&args&&args.clusterId){

    let result= mlDBController.update('users', {'_id':userId,'profile.InternalUprofile.moolyaProfile.userProfiles':{$elemMatch: {'isDefault': true}}},
      {"profile.InternalUprofile.moolyaProfile.userProfiles.$.isDefault": false}, {$set: true,multi:true}, context);
    result= mlDBController.update('users',{'_id':userId,'profile.InternalUprofile.moolyaProfile.userProfiles':{$elemMatch: {'clusterId': args.clusterId}}},
      {"profile.InternalUprofile.moolyaProfile.userProfiles.$.isDefault": true}, {$set: true}, context);
    response = new MlRespPayload().successPayload({}, 200);


  }else {
    let code = 409;
    response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
  return response;
}

MlResolver.MlMutationResolver['deActivateAdminUserProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user&&args&&args.clusterId){
    result = mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'clusterId': args.clusterId}}},
      {"profile.externalUserProfiles.$.isActive": true}, {$set: true}, context);
    response = new MlRespPayload().successPayload({}, 200);
  }else {
    let code = 409;
    response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

  return response;

}


MlResolver.MlQueryResolver['fetchUserRoleDetails'] = (obj, args, context, info) => {
  let userId=context.userId
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user){
    var internalUserProfile = user&&user.profile&&user.profile.isInternaluser?user.profile.InternalUprofile:{};
    let moolyaProfile = internalUserProfile&&internalUserProfile.moolyaProfile?internalUserProfile.moolyaProfile:{}
    let userProfiles = moolyaProfile&&moolyaProfile.isActive&&moolyaProfile.userProfiles?moolyaProfile.userProfiles:[]
    if(args&&args.clusterId){
      userProfiles=_.filter(userProfiles, {'clusterId':args.clusterId})||[]
    }
    let hirarichyLevel = [];
    let userProfileData = userProfiles&&userProfiles[0]?userProfiles[0]:{}
    let userRolesData = userProfileData&&userProfileData.userRoles?userProfileData.userRoles:[];
    hirarichyLevel = _underscore.pluck(userRolesData, 'hierarchyLevel') || [];
    hirarichyLevel.sort(function (a, b) {
      return b - a
    });
    let defaultRole = {}
    for (let i = 0; i < userRolesData.length; i++) {
      if (userRolesData[i].hierarchyLevel == hirarichyLevel[0]) {
        defaultRole = userRolesData[i]
        break
      }
    }

    if(defaultRole && defaultRole.clusterId && defaultRole.clusterId != 'all'){
      const clusterData = mlDBController.findOne('MlClusters', {_id: defaultRole.clusterId}, context) || {};
      defaultRole.clusterName = clusterData.displayName;
    }else if( defaultRole.clusterId == 'all'){
      defaultRole.clusterName = "All";
    }

    if(defaultRole && defaultRole.subChapterId && defaultRole.subChapterId != 'all'){
      const subChapterData = mlDBController.findOne('MlSubChapters', {_id: defaultRole.subChapterId}, context) || {};
      defaultRole.subChapterName = subChapterData.subChapterDisplayName;
    }else if( defaultRole.subChapterId == 'all'){
      defaultRole.subChapterName = "All";
    }

    if(defaultRole && defaultRole.chapterId && defaultRole.chapterId != 'all'){
      const chapterData = mlDBController.findOne('MlChapters', {_id: defaultRole.chapterId}, context) || {};
      defaultRole.chapterName = chapterData.chapterName;
    }else if( defaultRole.chapterId == 'all'){
      defaultRole.chapterName = "All";
    }

    if(defaultRole && defaultRole.communityId && defaultRole.communityId != 'all'){
      const communityData= mlDBController.findOne('MlCommunityDefinition', {code: defaultRole.communityId}, context)|| {};
      defaultRole.communityName = communityData.name;
    }else if( defaultRole.communityId == 'all'){
      defaultRole.communityName = "All";
    }

/*    if(defaultRole && defaultRole.departmentId && defaultRole.departmentId != 'all'){
      const departmentData= MlDepartments.findOne({_id:defaultRole.departmentId}) || {}
      defaultRole.departmentName = departmentData.displayName;
    }else if( defaultRole.departmentId == 'all'){
      defaultRole.departmentName = "All";
    }

    if(defaultRole && defaultRole.subDepartmentId && defaultRole.subDepartmentId != 'all'){
      const subdepartmentData= MlSubDepartments.findOne({_id:defaultRole.subDepartmentId}) || {}
      defaultRole.subDepartmentName = subdepartmentData.displayName;
    }else if( defaultRole.subDepartmentId == 'all'){
      defaultRole.subDepartmentName = "All";
    }*/



    /* userProfiles=_.filter(userProfiles, {'isDefault': true })||[];*/
    return defaultRole;
  }else {
    let code = 409;
    let response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

}


MlResolver.MlQueryResolver['fetchMoolyaInternalUsers'] = (obj, args, context, info) => {
  var getUsers = mlDBController.find('users', {
      'profile.isActive': true, 'profile.isExternaluser': false, 'profile.isMoolya': true
    }, context).fetch() || [];
  return getUsers
}
