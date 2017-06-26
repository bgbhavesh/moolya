import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import MlEmailNotification from "../../../../mlNotifications/mlEmailNotifications/mlEMailNotification";

MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
  var departmentAvailableArray = args.department.depatmentAvailable;
  if (args.department && args.department.depatmentAvailable) {
    for (var i = 0; i < args.department.depatmentAvailable.length; i++) {
      var departmentClusterLength = args.department.depatmentAvailable[i].cluster
    }
    if (departmentClusterLength.length < 1) {
      let code = 409;
      let response = new MlRespPayload().errorPayload("Cluster name is mandatory!!!!", code);
      return response;
    }
  }
  /* if(MlDepartments.find({departmentName:args.department.departmentName}).count() > 0){
   let code = 409;
   return new MlRespPayload().errorPayload("Already Exist", code);
   }*/
  //MlDepartments.find( { $and: [ { depatmentAvailable.cluster : { $in: 1.99 } }, { price: { $exists: true } } ] } )

  if (args.department && args.department.depatmentAvailable) {
    for (var i = 0; i < args.department.depatmentAvailable.length; i++) {
      // var departmentExist = MlDepartments.find({
      //   $and: [
      //     {departmentName: args.department.departmentName},
      //     {"depatmentAvailable.cluster": {$in: ["all", args.department.depatmentAvailable[i].cluster]}},
      //     {
      //       "depatmentAvailable": {
      //         $elemMatch: {
      //           chapter: args.department.depatmentAvailable[i].chapter,
      //           subChapter: args.department.depatmentAvailable[i].subChapter,
      //         }
      //       }
      //     },
      //   ]
      // }).fetch()

      var departmentExist = mlDBController.find('MlDepartments', {
        $and: [
          {departmentName: args.department.departmentName},
          {displayName: args.department.displayName},
          // {"depatmentAvailable.cluster": {$in: ["all", args.department.depatmentAvailable[i].cluster]}},
          // {
          //   "depatmentAvailable": {
          //     $elemMatch: {
          //       chapter: args.department.depatmentAvailable[i].chapter,
          //       subChapter: args.department.depatmentAvailable[i].subChapter,
          //     }
          //   }
          // },
        ]
      }, context).fetch()




      if (departmentExist.length > 0) {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
        return response;
      }
    }
  }
  var firstName='';var lastName='';
  // let id = MlDepartments.insert({...args.department});
  if(Meteor.users.findOne({_id : context.userId}))
  {
    let user = Meteor.users.findOne({_id: context.userId}) || {}
    if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) {

      firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
      lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';
    }else if(user&&user.profile&&user.profile.isExternaluser) { //resolve external user context based on default profile
      firstName=(user.profile || {}).firstName||'';
      lastName =(user.profile || {}).lastName||'';
    }
  }
  let createdBy = firstName +' '+lastName
  args.department.createdBy = createdBy;
  args.department.createdDate = new Date();
  let id = mlDBController.insert('MlDepartments', args.department, context)
  if(id){
      MlEmailNotification.departmentVerficationEmail(id,context);
  }
  if (id) {
    let code = 200;
    let result = {clusterid: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateDepartment'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
  if (args.departmentId) {
    // let department = MlDepartments.findOne({_id: args.departmentId});
    let department = mlDBController.findOne('MlDepartments', {_id: args.departmentId}, context)
    // let deactivate = args.department.isActive;
    var firstName='';var lastName='';
    // let id = MlDepartments.insert({...args.department});
    if(Meteor.users.findOne({_id : context.userId}))
    {
      let user = Meteor.users.findOne({_id: context.userId}) || {}
      if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) {

        firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
        lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';
      }else if(user&&user.profile&&user.profile.isExternaluser) { //resolve external user context based on default profile
        firstName=(user.profile || {}).firstName||'';
        lastName =(user.profile || {}).lastName||'';
      }
    }
    let createdBy = firstName +' '+lastName
    args.department.updatedBy = createdBy;
    args.department.updatedDate = new Date();

    if (department) {
      if (department.isSystemDefined) {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Cannot edit system defined department", code);
        return response;
      } else {
        // let resp = MlDepartments.update({_id: args.departmentId}, {$set: args.department}, {upsert: true})
        let resp = mlDBController.update('MlDepartments', args.departmentId, args.department, {
          $set: true,
          multi: false,
          upsert: true
        }, context)
        //de-activate department should de-activate all subDepartments
        // if(!deactivate){
        //   let subDepartments = MlSubDepartments.find({"departmentId": args.departmentId}).fetch();
        //   subDepartments.map(function (subDepartment) {
        //     subDepartment.isActive=false
        //     let deactivate = MlSubDepartments.update({_id:subDepartment._id}, {$set:subDepartment}, {upsert:true})
        //   })
        // }
        // var firstName='';var lastName='';
        // // let id = MlDepartments.insert({...args.department});
        // if(Meteor.users.findOne({_id : context.userId}))
        // {
        //   let user = Meteor.users.findOne({_id: context.userId}) || {}
        //   if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) {
        //
        //     firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
        //     lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';
        //   }else if(user&&user.profile&&user.profile.isExternaluser) { //resolve external user context based on default profile
        //     firstName=(user.profile || {}).firstName||'';
        //     lastName =(user.profile || {}).lastName||'';
        //   }
        // }
        // let createdBy = firstName +' '+lastName
        // args.department.updatedBy = createdBy;
        // args.department.updatedDate = new Date();
        if (resp) {
          MlResolver.MlMutationResolver['updateSubDepartment'](obj, {
            departmentId: args.departmentId,
            depatmentAvailable: args.department.depatmentAvailable,
            moduleName: "SUBDEPARTMENT",
            actionName: "UPDATE"
          }, context, info)

            MlEmailNotification.departmentVerficationEmail( args.departmentId,context);

          let code = 200;
          let result = {cluster: resp}
          let response = new MlRespPayload().successPayload(result, code);
          return response
        }
      }
    }
  }
}

MlResolver.MlQueryResolver['fetchDepartments'] = (obj, args, context, info) => {
  // let result = MlDepartments.find({isActive: true}).fetch() || [];
  let result = mlDBController.find('MlDepartments', {isActive: true}, context).fetch() || [];
  return result;
}

MlResolver.MlQueryResolver['findDepartment'] = (obj, args, context, info) => {
  // let resp = MlDepartments.findOne({_id: args.departmentId});
  let resp = mlDBController.findOne('MlDepartments', {_id: args.departmentId}, context)
  return resp;
}

MlResolver.MlQueryResolver['fetchActiveDepartment'] = (obj, args, context, info) => {
  // let resp = MlDepartments.find({"isActive": true}).fetch();
  let resp = mlDBController.find('MlDepartments', {isActive: true}, context).fetch();
  return resp;
}

MlResolver.MlQueryResolver['fetchMoolyaBasedDepartment'] = (obj, args, context, info) => {
  // let resp = MlDepartments.find({isMoolya: args.isMoolya, isActive: true}).fetch();
  // let resp = mlDBController.find('MlDepartments', {isMoolya: args.isMoolya, isActive: true}, context).fetch();
  let resp = mlDBController.find('MlDepartments', {
    $or: [{
      isMoolya: args.isMoolya,
      isActive: true
    }, {isSystemDefined: true, isActive: true}]
  }, context).fetch();
  return resp;
}

MlResolver.MlQueryResolver['fetchMoolyaBasedDepartmentRoles'] = (obj, args, context, info) => {
  // let resp = MlDepartments.find({isMoolya: args.isMoolya, isActive: true}).fetch();
  if(!args.clusterId){
    return [];
  }
  let resp = mlDBController.find('MlDepartments', {
    $or: [{
      isMoolya: args.isMoolya,
      isActive: true,
      "depatmentAvailable.cluster": {$in: ["all", args.clusterId]}
    }, {isSystemDefined: true, isActive: true}]
  }, context).fetch();
    return resp;
}

MlResolver.MlQueryResolver['fetchNonMoolyaBasedDepartment'] = (obj, args, context, info) => {
  // let resp = MlDepartments.find({isMoolya: args.isMoolya, isActive: true}, {depatmentAvailable: {$elemMatch: {subChapter: args.subChapter}}}).fetch();
  let resp = MlDepartments.find({
    $or: [{
      $and: [{
        isMoolya: args.isMoolya,
        isActive: true
      }, {depatmentAvailable: {$elemMatch: {subChapter: {$in: ['all', args.subChapter]}, isActive: true}}}]
    }, {isSystemDefined: true, isActive: true}]
  }).fetch();


  // let resp = mlDBController.find('MlDepartments', {
  //   isMoolya: args.isMoolya,
  //   isActive: true
  // }, context, {depatmentAvailable: {$elemMatch: {subChapter: args.subChapter}}}).fetch();
  return resp;
}

MlResolver.MlQueryResolver['fetchDepartmentsForRegistration'] = (obj, args, context, info) => {
  //let resp = MlDepartments.find({},{ depatmentAvailable: { $elemMatch: { subChapter: args.clusterId } }} ).fetch();
  let resp = [];
  if (args.cluster && args.chapter && args.subChapter) {
    // resp = MlDepartments.find({
    //   $and: [{},
    //     {"depatmentAvailable.cluster": {$in: ["all", args.cluster]}},
    //     {
    //       "depatmentAvailable": {
    //         $elemMatch: {
    //           chapter: args.chapter,
    //           subChapter: args.subChapter,
    //         }
    //       }
    //     },
    //   ]
    // }).fetch()

    resp = mlDBController.find('MlDepartments', {
      $and: [{},
        {"depatmentAvailable.cluster": {$in: ["all", args.cluster]}},
        {
          "depatmentAvailable": {
            $elemMatch: {
              chapter: args.chapter,
              subChapter: args.subChapter,
            }
          }
        },
      ]
    }, context).fetch()

  } else if (args.cluster) {
    // resp = MlDepartments.find({"depatmentAvailable.cluster": {$in: ["all", args.cluster]}}).fetch()
    resp = mlDBController.find('MlDepartments', {"depatmentAvailable.cluster": {$in: ["all", args.cluster]}}, context).fetch()
  } else if (args.cluster && args.chapter) {
    // resp = MlDepartments.find({
    //   $and: [{},
    //     {"depatmentAvailable.cluster": {$in: ["all", args.cluster]}},
    //     {
    //       "depatmentAvailable": {
    //         $elemMatch: {
    //           chapter: args.chapter
    //         }
    //       }
    //     },
    //   ]
    // }).fetch()

    resp = mlDBController.find('MlDepartments', {
      $and: [{},
        {"depatmentAvailable.cluster": {$in: ["all", args.cluster]}},
        {
          "depatmentAvailable": {
            $elemMatch: {
              chapter: args.chapter
            }
          }
        },
      ]
    }, context).fetch()
  }
  return resp;
}

MlResolver.MlQueryResolver['fetchClusterChapterSubChapterBasedDepartmentRoles'] = (obj, args, context, info) => {
  if(!args.cluster || !args.chapter || !args.subChapter || typeof args.isMoolya == undefined ) {
    return [];
  }

  let pipeline = [
      { $match:
        {
          isActive: true,
          isMoolya: args.isMoolya,
          "depatmentAvailable.cluster": {$in: [ 'all', args.cluster ]},
          "depatmentAvailable.chapter": {$in: [ 'all', args.chapter ]},
          "depatmentAvailable.subChapter": {$in: [ 'all', args.subChapter ]}
        }
      },
      {$lookup:
        {
          from: "mlSubDepartments",
          localField: "_id",
          foreignField: "departmentId",
          as: "subDep"
        }
      },
      {$unwind: '$subDep'},
      {
        $project: {
          _id: 0,
          departmentId: '$_id',
          departmentName: '$displayName',
          subDepartmentId: '$subDep._id',
          subDepartmentName: '$subDep.displayName'
        }
      }
    ];
  let resp = mlDBController.aggregate('MlDepartments', pipeline, context);
  return resp;
}

MlResolver.MlQueryResolver['fetchHierarchyMoolyaDepartment'] = (obj, args, context, info) => {
  let resp = mlDBController.find('MlDepartments', {
      isMoolya: args.isMoolya,
      isActive: true,
      "depatmentAvailable.cluster": {$in: [ 'all', args.clusterId ]}
  }, context).fetch();
  return resp;
}
