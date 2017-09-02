/**
 * Created by pankaj on 19/6/17.
 */
import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from "../../MlExternalUsers/mlUserContext";

MlResolver.MlQueryResolver['fetchInternalTask'] = (obj, args, context, info) => {
  let internalTask = [];
  if (context.userId) {
    internalTask = mlDBController.find('MlInternalTask', {userId: context.userId}).fetch();
    return internalTask
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
};

MlResolver.MlQueryResolver['fetchMyInternalTask'] = (obj, args, context, info) => {
  let internalTask = [];
  if (context.userId) {
    let userId = context.userId;
    let profile = new MlUserContext(userId).userProfileDetails(userId);
    let query = {
      attendee: userId,
      attendeeProfileId: profile.profileId
    };

    if(args.status && args.status.length) {

      if(args.status.indexOf('pending') >= 0){
        query.isSelfAssigned = false;
      }

      query['status']= {
        '$in': args.status
      }
    }
    internalTask = mlDBController.find('MlInternalTask', query).fetch();
    internalTask.map(function(data){
      if(data.attendeeProfileId === profile.profileId ) {
        let community = {name:""}
        community.name= profile.communityName
        data.community = community;
        data.attendeeName = profile.firstName+" "+profile.lastName;
      }
    })
    return internalTask
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
};

MlResolver.MlQueryResolver['fetchSelfCreatedInternalTask'] = (obj, args, context, info) => {
  let internalTask = [];
  let userId = context.userId;
  let profile = new MlUserContext(userId).userProfileDetails(userId);
  if (context.userId) {
    let query = {
      isSelfAssigned: true,
      userId: context.userId,
      attendeeProfileId: profile.profileId
    };
    if(args.status && args.status.length) {
      query['status']= {
        '$in': args.status
      }
    }
    internalTask = mlDBController.find('MlInternalTask', query).fetch();
    internalTask.map(function(data){
      if(data.attendeeProfileId === profile.profileId) {
        data.community.name = profile.communityName;
      }
    })
    return internalTask;
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
};

MlResolver.MlQueryResolver['fetchInternalTaskById'] = (obj, args, context, info) => {
  let internalTask = [];
  if (args.internalTaskId) {
    internalTask = mlDBController.findOne('MlInternalTask', {_id: args.internalTaskId});
    if(internalTask.stage){
      internalTask.stage = mlDBController.findOne('MlProcessStages', {_id: internalTask.stage}).displayName;
    }
    if(internalTask.community && internalTask.community.code == "IDE"){
      internalTask.client = mlDBController.findOne('MlIdeas', {portfolioId: internalTask.resourceId}).title;
    }

    internalTask.attendees = internalTask.attendees ? internalTask.attendees : [];

    let attendees = internalTask.attendees.map(function (attendee) {
      return attendee.userId
    });
    internalTask.userInfo = mlDBController.find('users', {_id: { $in: attendees }}).fetch().map(function(user){
      return {
        id: user._id,
        name: user.profile.displayName,
        profileUrl: user.profile.profileImage,
        communityName: user.profile.displayName,
      };
    });
    return internalTask;
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Internal task id is required", code);
    return response;
  }
};

MlResolver.MlMutationResolver['createInternalTask'] = (obj, args, context, info) => {
    if(args.internalTask){
      if(args.internalTask.attendees && args.internalTask.attendees.length){
        orderNumberGenService.createinternalTaskId(args.internalTask);
        args.internalTask.createdAt = new Date();
        // Add task status time line
        args.internalTask.attendees.forEach(function (attendee) {
          let dataToInsert = args.internalTask;
          dataToInsert.type = 'invest-task';
          dataToInsert.userId = context.userId;
          dataToInsert.attendee = attendee.userId;
          dataToInsert.attendeeProfileId = attendee.profileId;
          dataToInsert.isSelfAssigned = false;
          dataToInsert.status = 'pending';
          mlDBController.insert('MlInternalTask', dataToInsert , context);
        });
        let code = 200;
        let response = new MlRespPayload().successPayload("Internal task inserted", code);
        return response;
      } else {
        let code = 400;
        let response = new MlRespPayload().errorPayload("Internal task attendees is required", code);
        return response;
      }
    } else {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Internal task data is required", code);
      return response;
    }
};

MlResolver.MlMutationResolver['createSelfInternalTask'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profile = new MlUserContext(userId).userProfileDetails(userId);
  if(args.selfInternalTask){
      let users = args.selfInternalTask.users;
      let dataToInsert = args.selfInternalTask;
      dataToInsert.userId = context.userId;
      dataToInsert.createdAt = new Date();
      dataToInsert.status = 'pending';
      orderNumberGenService.createinternalTaskId(dataToInsert);

      if(users && users.length) {
        dataToInsert.type = 'assign-task';
        dataToInsert.attendees = users;
        users.forEach((user) => {
          dataToInsert.attendee = user.userId;
          dataToInsert.attendeeProfileId = user.profileId;
          dataToInsert.isSelfAssigned = false;
          let result = mlDBController.insert('MlInternalTask', dataToInsert , context);
        });
        let code = 200;
        let response = new MlRespPayload().successPayload("Internal task created", code);
        return response;
      } else {
        dataToInsert.type ='self-task';
        dataToInsert.attendee = context.userId;
        dataToInsert.attendeeProfileId = profile.profileId;
        dataToInsert.isSelfAssigned = true;
        let result = mlDBController.insert('MlInternalTask', dataToInsert , context);
        let code = 200;
        let response = new MlRespPayload().successPayload("Internal task created", code);
        return response;
      }


  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Internal task data is required", code);
    return response;
  }
};

MlResolver.MlMutationResolver['updateInternalTask'] = (obj, args, context, info) => {
    if(args.internalTaskId){
      if(args.internalTask){
        let resp = mlDBController.update('MlInternalTask', { _id: args.internalTaskId}, args.internalTask, {$set:1}, context );
        if(resp){
          let code = 200;
          let response = new MlRespPayload().successPayload("Internal task updated", code);
          return response;
        }
      } else {
        let code = 400;
        let response = new MlRespPayload().errorPayload("Internal task data is required", code);
        return response;
      }
    } else {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Internal task id is required", code);
      return response;
    }
};


