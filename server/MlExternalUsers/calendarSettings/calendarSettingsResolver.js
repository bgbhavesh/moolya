/**
 * Created by pankaj on 24/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
import MlAppointment from './appointment';
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchMyCalendarSetting'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId;
  if(args.profileId){
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  }
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  return mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);

};

MlResolver.MlQueryResolver['getMyCalendar'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  // let mlAppointment = new MlAppointment();
  let date = new Date();
  let month = args.month ? args.month : date.getMonth();
  let year = args.year ? args.year : date.getFullYear();
  return MlAppointment.getUserCalendar(userId, profileId, month, year);
};

MlResolver.MlQueryResolver['getServiceProviderCalendar'] = (obj, args, context, info) => {
  let portfolioId = args.portfolioId;
  let portfolioInfo = mlDBController.findOne('MlPortfolioDetails', portfolioId, context);

  if(!portfolioInfo){
    let code = 400;
    let result = 'Portfolio is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  let userId = portfolioInfo.userId;
  let profileId = portfolioInfo.profileId?portfolioInfo.profileId:" ";
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  // let mlAppointment = new MlAppointment();
  let date = new Date();
  let day = args.month  == date.getMonth() ?  date.getDate() : 1;
  let month = args.month ? args.month : date.getMonth() ;
  let year = args.year ? args.year : date.getFullYear() ;
  let finalResponse = {};
  if(month >= date.getMonth() && year >= date.getFullYear() ){
    finalResponse = MlAppointment.getUserCalendar(userId, profileId, month, year, day);
  }

  let orderId = args.orderId;
  if(orderId){
    let serviceOrder = mlDBController.findOne('MlServiceCards', {orderId: orderId}, context);
    if(serviceOrder && serviceOrder.expiryDate){
      finalResponse.expiryDate = serviceOrder.expiryDate;
    }
  }
  console.log(finalResponse);
  return finalResponse
};

MlResolver.MlQueryResolver['getMyCalendarDayAvailable'] = (obj, args, context, info) => {
  let date = new Date();
  let day = args.day ? args.day : date.getDate();
  let month = args.month ? args.month : date.getMonth() ;
  let year = args.year ? args.year : date.getFullYear() ;
  let sessionId = '123';
  return mlAppointment.getSessionTimeSlots(sessionId, day, month, year);
};

  MlResolver.MlQueryResolver['getSessionDayAvailable'] = (obj, args, context, info) => {
  let date = new Date();
  // let mlAppointment = new MlAppointment();
  let day = args.day ? args.day : date.getDate();
  let month = args.month ? args.month : date.getMonth() ;
  let year = args.year ? args.year : date.getFullYear() ;
  let sessionId = args.sessionId;
  let orderId = args.orderId;

  let SCOrderDetails = mlDBController.findOne('MlScOrder', {orderId: orderId}, context);

  if(!SCOrderDetails) {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Order is not valid", code);
    return response;
  }

  let serviceId = SCOrderDetails.serviceId;
  if(!serviceId) {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Service id is not attached in order", code);
    return response;
  }

  let serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);

  if(!serviceInfo){
    let code = 400;
    let response = new MlRespPayload().errorPayload("Service id is not attached in service card definition", code);
    return response;
  }

  let tasks = serviceInfo.tasks ? serviceInfo.tasks : [];

  let task = tasks.find(function (task) {
    return task.sessions.some(function (session) {
      return session.id == sessionId;
    })
  });
  if(!task){
    let code = 400;
    let response = new MlRespPayload().errorPayload("Session id is not attached in service card definition", code);
    return response;
  }

  let taskId = task.id;

  if(!task.id) {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Task id is not attached in service card definition", code);
    return response;
  }

  return MlAppointment.getSessionTimeSlots(taskId, sessionId, day, month, year);
};

MlResolver.MlMutationResolver['updateMyCalendarSetting'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId;
  if(args.profileId){
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  };
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!args.calendarSetting){
    let code = 400;
    let result = 'Calendar setting is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  delete args.calendarSetting.vacations;
  delete args.calendarSetting.workingDays;
  let isAlreadyExist = mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);
  if(isAlreadyExist){
    args.calendarSetting.updatedAt = new Date();
    let result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, args.calendarSetting, {$set:true}, context);
    if(result){
      let cancelAppointmentQuery = {
        startDate: {"$gte": new Date()},
        "$or": [
            {"provider.profileId": profileId},
            {"client.profileId": profileId}
        ]
      };
      mlDBController.update( 'MlAppointments', cancelAppointmentQuery, { isCancelled: true }, { $set: true, multi: true });
      // To do for handle Appointment members collections
      let code = 200;
      let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
      return response;
    }
  } else {
    args.calendarSetting.userId = userId;
    args.calendarSetting.profileId = profileId;
    args.calendarSetting.createdAt = new Date();
    let result = mlDBController.insert('MlCalendarSettings', args.calendarSetting, context);
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
      return response;
    }
  }
}

MlResolver.MlMutationResolver['updateMyCalendarWorkingDays'] = (obj, args, context, info) => {
  let userId = context.userId;
  //let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profileId;
  if(args.profileId){
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  };
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!args.workingDays){
    let code = 400;
    let result = 'Working days is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  let isAlreadyExist = mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);
  if(isAlreadyExist){
    isAlreadyExist.workingDays = isAlreadyExist.workingDays ? isAlreadyExist.workingDays : [];
    let workingDays = args.workingDays;
    workingDays = workingDays ? workingDays : [];
    let daysArray = args.workingDays.map( (day)=> {
      return day.dayName + 1;
    });
    isAlreadyExist.workingDays = isAlreadyExist.workingDays.map(function(day){
      let isFind = workingDays.find(function(arr){ return arr.dayName == day.dayName });
      if(isFind){
        workingDays.splice(workingDays.indexOf(isFind),1);
        return isFind;
      } else {
        return day;
      }
    });
    isAlreadyExist.workingDays = isAlreadyExist.workingDays.concat(workingDays);
    let pipeline = [
      {
        "$match": {
          "startDate": {"$gte": new Date()},
          "$or": [
            {"provider.profileId": profileId},
            {"client.profileId": profileId}
          ]
        }
      },
      { "$group": {
        _id: { $dayOfWeek: "$startDate" },
        ids: { "$push": "$appointmentId" }
      }},
      {
        "$match": { "_id": { "$in": daysArray } }

      },
      {
        "$unwind": "$ids"
      },
      { "$group": {
        _id: null,
        ids: { "$push": "$ids" }
      }},
    ];
    let appointmentData = mlDBController.aggregate('MlAppointments', pipeline, context);
    if(appointmentData && appointmentData.ids && appointmentData.ids.length){
      mlDBController.update( 'MlAppointments', {appointmentId: { "$in": appointmentData.ids } }, { isCancelled: true }, { $set: true, multi: true });
    };
    console.log("appointmentData:", appointmentData);
    let result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, { workingDays: isAlreadyExist.workingDays ,updatedAt: new Date()}, {$set:true}, context);
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
      return response;
    }
  } else {
    let dataToInsert = {
      userId: userId,
      profileId: profileId,
      createdAt: new Date(),
      workingDays: args.workingDays
    };
    let result = mlDBController.insert('MlCalendarSettings', dataToInsert, context);
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
      return response;
    }
  }
}

MlResolver.MlMutationResolver['updateMyCalendarWorkingDay'] = (obj, args, context, info) => {
  if(!args.workingDay){
    let code = 400;
    let result = 'Working day is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  return MlResolver.MlMutationResolver['updateMyCalendarWorkingDays'](obj, { profileId:args.profileId,  workingDays: [args.workingDay]}, context, info);
};

MlResolver.MlMutationResolver['updateMyCalendarVacation'] = (obj, args, context, info) => {
  let vacation = args.vacation;
  let userId = context.userId;
  //let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profileId;
  if(args.profileId){
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  };
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!vacation){
    let code = 400;
    let result = 'Vacation data is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  vacation.start = new Date(vacation.start);
  vacation.end = new Date(vacation.end);
  let isAlreadyExist = mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);
  if(isAlreadyExist){
    isAlreadyExist.vacations = isAlreadyExist.vacations ? isAlreadyExist.vacations : [];
    let startDate = new Date(vacation.start);
    let endDate   = new Date(vacation.end);
    let isAlreadyOnVacation = false;
    isAlreadyExist.vacations.forEach(function (vacationInfo) {
        let vacationStartDate = new Date(vacationInfo.start);
        let vacationEndDate = new Date(vacationInfo.end);
        if( vacationStartDate.getTime() <= startDate.getTime() && startDate.getTime() <=  vacationEndDate.getTime() || vacationStartDate.getTime() <= endDate.getTime() && endDate.getTime() <=  vacationEndDate.getTime() ){
          isAlreadyOnVacation = true;
        }
    });
    if(isAlreadyOnVacation){
      let code = 400;
      let response = new MlRespPayload().errorPayload('Vacation Overlapping', code);
      return response;
    } else {
      orderNumberGenService.createVactionId(vacation);
      isAlreadyExist.vacations.push(vacation);
      let result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, { vacations: isAlreadyExist.vacations ,updatedAt: new Date()}, {$set:true}, context);
      if(result){
        let code = 200;
        let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
        return response;
      }
    }
  } else {
    let dataToInsert = {
      userId: userId,
      profileId: profileId,
      createdAt: new Date(),
      vacations: [vacation]
    };
    let result = mlDBController.insert('MlCalendarSettings', dataToInsert, context);
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
      return response;
    }
  }
}

MlResolver.MlMutationResolver['updateCalendarVacationByVacationId'] = (obj, args, context, info) => {
  let vacation = args.vacation;
  let userId = context.userId;
  // let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profileId;
  if(args.profileId){
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  };
  if(!userId){
    let code = 400;
    let result = 'User ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!profileId){
    let code = 400;
    let result = 'Profile ID is not defined for this user';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if(!vacation){
    let code = 400;
    let result = 'Vacation data is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  vacation.start = new Date(vacation.start);
  vacation.end = new Date(vacation.end);
  vacation.vacationId = args.vacationId || '';
  let isAlreadyExist = mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);
  if(isAlreadyExist){
    isAlreadyExist.vacations = isAlreadyExist.vacations ? isAlreadyExist.vacations : [];
    let startDate = new Date(vacation.start);
    let endDate   = new Date(vacation.end);
    let isAlreadyOnVacation = false;
    isAlreadyExist.vacations.forEach(function (vacationInfo) {
      if (vacationInfo.vacationId !== args.vacationId) {
        let vacationStartDate = new Date(vacationInfo.start);
        let vacationEndDate = new Date(vacationInfo.end);
        if( vacationStartDate.getTime() <= startDate.getTime() && startDate.getTime() <=  vacationEndDate.getTime() || vacationStartDate.getTime() <= endDate.getTime() && endDate.getTime() <=  vacationEndDate.getTime() ){
          isAlreadyOnVacation = true;
        }
      }
    });
    if(isAlreadyOnVacation){
      let code = 400;
      let response = new MlRespPayload().errorPayload('Vacation Overlapping', code);
      return response;
    } else {
      //isAlreadyExist.vacations.push(vacation);
      let newVacationData = isAlreadyExist.vacations.map((vactionData) => {
        if (vactionData.vacationId === args.vacationId) {
          return vacation;
        } else {
          return vactionData;
        }
      });
      let result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, { vacations: newVacationData ,updatedAt: new Date()}, {$set:true}, context);
      if(result){
        let code = 200;
        let response = new MlRespPayload().successPayload('Calendar Setting updated successfully', code);
        return response;
      }
    }
  } else {
    let code = 400;
    let result = 'Calendar Setting not found';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
};


MlResolver.MlQueryResolver['getUserProfileDetails'] = (obj, args, context, info) => {
  let userId = args.userId ? args.userId : context.userId;
  let pipleline = [
    { "$match": {_id: userId}},
    { "$unwind": "$profile.externalUserProfiles"},
    {
      "$lookup": {
        "from": "mlSubChapters",
        "localField":"profile.externalUserProfiles.subChapterId",
        "foreignField": "_id",
        "as": "subDepartment"
      }
    },
    { "$unwind": "$subDepartment" },
    {
      "$project": {
        "userId": "$_id",
        "firstName": "$profile.firstName",
        "lastName": "$profile.lastName",
        "displayName": "$profile.displayName",
        "profileId": "$profile.externalUserProfiles.profileId",
        "profileImage": "$profile.profileImage",
        "clusterId": "$profile.externalUserProfiles.clusterId",
        "clusterName": "$profile.externalUserProfiles.clusterName",
        "chapterId": "$profile.externalUserProfiles.chapterId",
        "chapterName": "$profile.externalUserProfiles.chapterName",
        "subChapterId": "$profile.externalUserProfiles.subChapterId",
        "subChapterName": "$profile.externalUserProfiles.subChapterName",
        "communityId": "$profile.externalUserProfiles.communityId",
        "communityName": "$profile.externalUserProfiles.communityName",
        "communityDefCode": "$profile.externalUserProfiles.communityDefCode",
        "communityDefName": "$profile.externalUserProfiles.communityDefName",
        "isActive": "$profile.externalUserProfiles.isActive",
        "isApprove": "$profile.externalUserProfiles.isApprove",
        "isMoolya": "$subDepartment.isDefaultSubChapter"
      }
    },
    {
      "$lookup": { "from": "mlResourceConfig", "localField":"communityDefCode", "foreignField": "community.communityCode", "as": "resource"  }
    },
    {
      "$addFields": {
        "resource" : { "$reduce": {
          "input": "$resource",
          "initialValue": [],
          "in": { "$concatArrays" : ["$$value", ["$$this.resourceCode"]] }
        }}
      }
    },
    {
      "$addFields": {
        "isHasManageSchedule" : { $in :[ "MANAGESCHEDULE", "$resource" ] },
        "isHasOffice": { $in :[ "OFFICE", "$resource" ] }
      }
    },
    {
      "$lookup": { "from": "mlOffice", "localField":"profileId", "foreignField": "profileId", "as": "offices"  }
    }
  ];
  return mlDBController.aggregate('users', pipleline, context);
};

MlResolver.MlQueryResolver['getUserActiveProfileDetails'] = (obj, args, context, info) => {
  let userId = args.userId ? args.userId : context.userId;
  let pipleline = [
    { "$match": {_id: userId}},
    { "$unwind": "$profile.externalUserProfiles"},
    {
      "$lookup": {
        "from": "mlSubChapters",
        "localField":"profile.externalUserProfiles.subChapterId",
        "foreignField": "_id",
        "as": "subDepartment"
      }
    },
    { "$unwind": "$subDepartment" },
    {
      "$project": {
        "userId": "$_id",
        "firstName": "$profile.firstName",
        "lastName": "$profile.lastName",
        "displayName": "$profile.displayName",
        "profileId": "$profile.externalUserProfiles.profileId",
        "profileImage": "$profile.profileImage",
        "clusterId": "$profile.externalUserProfiles.clusterId",
        "clusterName": "$profile.externalUserProfiles.clusterName",
        "chapterId": "$profile.externalUserProfiles.chapterId",
        "chapterName": "$profile.externalUserProfiles.chapterName",
        "subChapterId": "$profile.externalUserProfiles.subChapterId",
        "subChapterName": "$profile.externalUserProfiles.subChapterName",
        "communityId": "$profile.externalUserProfiles.communityId",
        "communityName": "$profile.externalUserProfiles.communityName",
        "communityDefCode": "$profile.externalUserProfiles.communityDefCode",
        "communityDefName": "$profile.externalUserProfiles.communityDefName",
        "isActive": "$profile.externalUserProfiles.isActive",
        "isApprove": "$profile.externalUserProfiles.isApprove",
        "isMoolya": "$subDepartment.isDefaultSubChapter"
      }
    },
    { "$match": { isActive: true } },
    {
      "$lookup": { "from": "mlResourceConfig", "localField":"communityDefCode", "foreignField": "community.communityCode", "as": "resource"  }
    },
    {
      "$addFields": {
        "resource" : { "$reduce": {
          "input": "$resource",
          "initialValue": [],
          "in": { "$concatArrays" : ["$$value", ["$$this.resourceCode"]] }
        }}
      }
    },
    {
      "$addFields": {
        "isHasManageSchedule" : { $in :[ "MANAGESCHEDULE", "$resource" ] },
        "isHasOffice": { $in :[ "OFFICE", "$resource" ] }
      }
    },
    {
      "$lookup": { "from": "mlOffice", "localField":"profileId", "foreignField": "profileId", "as": "offices"  }
    }
  ];
  return mlDBController.aggregate('users', pipleline, context);
};
