/**
 * Created by pankaj on 24/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchMyCalendarSetting'] = (obj, args, context, info) => {
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
  return mlDBController.findOne('MlCalendarSettings',{userId:userId, profileId:profileId}, context);

}

MlResolver.MlMutationResolver['updateMyCalendarSetting'] = (obj, args, context, info) => {
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
  return MlResolver.MlMutationResolver['updateMyCalendarWorkingDays'](obj, {workingDays: [args.workingDay]}, context, info);
}

MlResolver.MlMutationResolver['updateMyCalendarVacation'] = (obj, args, context, info) => {
  let vacation = args.vacation;
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
        if( vacationStartDate.getTime() >= startDate.getTime() && startDate.getTime() <=  vacationEndDate.getTime() || vacationStartDate.getTime() >= endDate.getTime() && endDate.getTime() <=  vacationEndDate.getTime() ){
          isAlreadyOnVacation = true;
        }
    });
    if(isAlreadyOnVacation){
      let code = 400;
      let response = new MlRespPayload().errorPayload('Vacation Overlapping', code);
      return response;
    } else {
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
