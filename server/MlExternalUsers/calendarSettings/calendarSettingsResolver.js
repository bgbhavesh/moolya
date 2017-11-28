/**
 * Created by pankaj on 24/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
import MlAppointment from './appointment';
const extendify = require('extendify');
const _ = require('lodash')

MlResolver.MlQueryResolver.fetchMyCalendarSetting = (obj, args, context, info) => {
  const userId = context.userId;
  let profileId;
  if (args.profileId) {
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  }
  if (!userId) {
    const code = 400;
    const result = 'User ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!profileId) {
    const code = 400;
    const result = 'Profile ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  const result = mlDBController.findOne('MlCalendarSettings', { userId, profileId }, context);
  const pipeline = [
    {
      $match: {
        startDate: { $gte: new Date() },
        $or: [
          { 'provider.profileId': profileId },
          { 'client.profileId': profileId }
        ]
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: '$startDate' },
        ids: { $push: '$appointmentId' }
      }
    },
    {
      $unwind: '$ids'
    },
    {
      $group: {
        _id: null,
        ids: { $push: '$ids' }
      }
    }
  ];
  const appointmentData = mlDBController.aggregate('MlAppointments', pipeline, context);
  result.hasAppointment = !!(appointmentData && appointmentData.length);
  return result;
};

MlResolver.MlQueryResolver.getMyCalendar = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;
  if (!userId) {
    const code = 400;
    const result = 'User ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!profileId) {
    const code = 400;
    const result = 'Profile ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  // let mlAppointment = new MlAppointment();
  const date = new Date();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  return MlAppointment.getUserCalendar(userId, profileId, month, year);
};

MlResolver.MlQueryResolver.getServiceProviderCalendar = (obj, args, context, info) => {
  const portfolioId = args.portfolioId;
  const portfolioInfo = mlDBController.findOne('MlPortfolioDetails', portfolioId, context);

  if (!portfolioInfo) {
    const code = 400;
    const result = 'Portfolio is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  const userId = portfolioInfo.userId;
  const profileId = portfolioInfo.profileId ? portfolioInfo.profileId : ' ';
  if (!userId) {
    const code = 400;
    const result = 'User ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!profileId) {
    const code = 400;
    const result = 'Profile ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  // let mlAppointment = new MlAppointment();
  const date = new Date();
  const day = args.month == date.getMonth() ? date.getDate() : 1;
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  let finalResponse = {};
  if (month >= date.getMonth() && year >= date.getFullYear()) {
    finalResponse = MlAppointment.getUserCalendar(userId, profileId, month, year, day);
  }

  const orderId = args.orderId;
  if (orderId) {
    const serviceOrder = mlDBController.findOne('MlServiceCards', { orderId }, context);
    if (serviceOrder && serviceOrder.expiryDate) {
      finalResponse.expiryDate = serviceOrder.expiryDate;
    }
  }
  console.log(finalResponse);
  return finalResponse
};

MlResolver.MlQueryResolver.getMyCalendarDayAvailable = (obj, args, context, info) => {
  const date = new Date();
  const day = args.day ? args.day : date.getDate();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const sessionId = '123';
  return mlAppointment.getSessionTimeSlots(sessionId, day, month, year);
};

MlResolver.MlQueryResolver.getSessionDayAvailable = (obj, args, context, info) => {
  const date = new Date();
  // let mlAppointment = new MlAppointment();
  const day = args.day ? args.day : date.getDate();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const sessionId = args.sessionId;
  const orderId = args.orderId;

  const SCOrderDetails = mlDBController.findOne('MlScOrder', { orderId }, context);

  if (!SCOrderDetails) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Order is not valid', code);
    return response;
  }

  const serviceId = SCOrderDetails.serviceId;
  if (!serviceId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Service id is not attached in order', code);
    return response;
  }

  const serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);

  if (!serviceInfo) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Service id is not attached in service card definition', code);
    return response;
  }

  const tasks = serviceInfo.tasks ? serviceInfo.tasks : [];

  const task = tasks.find(task => task.sessions.some(session => session.id == sessionId));
  if (!task) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Session id is not attached in service card definition', code);
    return response;
  }

  const taskId = task.id;

  if (!task.id) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Task id is not attached in service card definition', code);
    return response;
  }

  return MlAppointment.getSessionTimeSlots(null, taskId, sessionId, day, month, year);
};

MlResolver.MlMutationResolver.updateMyCalendarSetting = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = args.profileId ? args.profileId
    : new MlUserContext().userProfileDetails(userId).profileId;
  if (!userId || !profileId) {
    const result = `${!userId ? 'User ID' : 'Profile ID'} is not defined for this user`;
    return new MlRespPayload().errorPayload(result, 400);
  }
  if (!args.calendarSetting) {
    return new MlRespPayload().errorPayload('Calendar settings are missing', 400);
  }
  delete args.calendarSetting.vacations;
  delete args.calendarSetting.workingDays;
  const userSettingsInfo = mlDBController.find('MlCalendarSettings', { userId }, context).fetch();
  const currentProfileIndex = _.findIndex(userSettingsInfo, ['profileId', profileId]);
  if (currentProfileIndex > -1) {
    let overlappingSlots = false;
    const currentUserSettings = userSettingsInfo[currentProfileIndex];
    if (currentUserSettings.workingDays && !args.calendarSetting.isOverlappingSchedule) {
      for (let i = 0; i < userSettingsInfo.length; i++) {
        for (let j = i + 1; j < userSettingsInfo.length; j++) {
          userSettingsInfo[j].workingDays.forEach((day) => {
            const dayInDb = _.find(userSettingsInfo[i].workingDays, ['dayName', day.dayName]);
            if (dayInDb && areSlotsOverlapping(dayInDb, day)) {
              overlappingSlots = true;
            }
          });
        }
      }
      if (overlappingSlots) {
        return new MlRespPayload().errorPayload('Settings cannot be updated as there are overlapping schedules', 400);
      }
    }
    args.calendarSetting.updatedAt = new Date();
    const result = mlDBController.update('MlCalendarSettings', currentUserSettings._id, args.calendarSetting, { $set: true }, context);
    const result2 = mlDBController.update('MlCalendarSettings', { userId }, { isOverlappingSchedule: args.calendarSetting.isOverlappingSchedule }, { $set: true, multi: true }, context);
    if (result) {
      const cancelAppointmentQuery = {
        startDate: { $gte: new Date() },
        $or: [
          { 'provider.profileId': profileId },
          { 'client.profileId': profileId }
        ]
      };
      mlDBController.update('MlAppointments', cancelAppointmentQuery, { isCancelled: true }, { $set: true, multi: true }, context);
      // To do for handle Appointment members collections
      const code = 200;
      const response = new MlRespPayload().successPayload('Calendar settings updated successfully', code);
      return response;
    }
  } else {
    args.calendarSetting.userId = userId;
    args.calendarSetting.profileId = profileId;
    args.calendarSetting.createdAt = new Date();
    const result = mlDBController.insert('MlCalendarSettings', args.calendarSetting, context);
    const result2 = mlDBController.update('MlCalendarSettings', { userId }, { isOverlappingSchedule: args.calendarSetting.isOverlappingSchedule }, { $set: true, multi: true }, context);
    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload('Calendar settings updated successfully', code);
      return response;
    }
  }
}

const areSlotsOverlapping = (daysInDb, days) => {
  let splittedDbSlots = [];
  let isOverlapping = false;
  if (daysInDb.slots) {
    daysInDb.slots.forEach((slot) => {
      splittedDbSlots.push({
        startHour: Number(slot.start.split(':')[0]),
        startMinute: Number(slot.start.split(':')[1]),
        endHour: Number(slot.end.split(':')[0]),
        endMinute: Number(slot.end.split(':')[1])
      });
    });
  }
  splittedDbSlots = _.sortBy(splittedDbSlots, 'startHour');
  let splittedGivenSlots = [];
  if (days.slots) {
    days.slots.forEach((slot) => {
      splittedGivenSlots.push({
        startHour: Number(slot.start.split(':')[0]),
        startMinute: Number(slot.start.split(':')[1]),
        endHour: Number(slot.end.split(':')[0]),
        endMinute: Number(slot.end.split(':')[1])
      });
    });
  }
  splittedGivenSlots = _.sortBy(splittedGivenSlots, 'startHour');
  splittedGivenSlots.forEach((givenSlot) => {
    if (isOverlapping) return;
    splittedDbSlots.forEach((dbSlot) => {
      const isStartBefore = !!((dbSlot.startHour > givenSlot.startHour
        || (dbSlot.startHour == givenSlot.startHour
          && dbSlot.startMinute >= givenSlot.startMinute)));
      const isEndBefore = !!(((dbSlot.endHour > givenSlot.endHour)
        || (dbSlot.endHour === givenSlot.endHour
          && dbSlot.endMinute >= givenSlot.endMinute)));
      if (isStartBefore && isEndBefore) {
        if (dbSlot.startHour < givenSlot.endHour
          || (dbSlot.startHour === givenSlot.endHour
            && dbSlot.startMinute < givenSlot.endMinute)) {
          isOverlapping = true;
        }
      }
      if (isStartBefore && !isEndBefore) {
        isOverlapping = true;
      }
      if (!isStartBefore && isEndBefore) {
        isOverlapping = true;
      }
      if (!isStartBefore && !isEndBefore) {
        if (dbSlot.endHour > givenSlot.startHour
          || (dbSlot.endHour === givenSlot.startHour
            && dbSlot.endMinute > givenSlot.startMinute)) {
          isOverlapping = true;
        }
      }
    });
  });
  return isOverlapping;
}

MlResolver.MlMutationResolver.updateMyCalendarWorkingDays = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = args.profileId ? args.profileId : new MlUserContext().userProfileDetails(userId).profileId;
  if (!userId || !profileId) {
    const result = `${!userId ? 'User ID' : 'Profile ID'} is not defined for this user`;
    return new MlRespPayload().errorPayload(result, 400);
  }
  if (!args.workingDays) {
    return new MlRespPayload().errorPayload('Working days is missing', 400);
  }
  const userSettingsInfo = mlDBController.find('MlCalendarSettings', { userId }, context).fetch();
  const currentProfileIndex = _.findIndex(userSettingsInfo, ['profileId', profileId]);
  if (currentProfileIndex > -1) {
    const workingDays = args.workingDays;
    let overlappingSlots = false;
    if (workingDays && !userSettingsInfo[currentProfileIndex].isOverlappingSchedule) {
      userSettingsInfo.forEach((userSettings) => {
        if (userSettings.profileId === profileId) {
          return;
        }
        workingDays.forEach((day) => {
          const dayInDb = _.find(userSettings.workingDays, ['dayName', day.dayName]);
          if (dayInDb && areSlotsOverlapping(dayInDb, day)) {
            overlappingSlots = true;
          }
        });
      });
    }
    if (overlappingSlots) {
      return new MlRespPayload().errorPayload('Overlapping of slots is not allowed', 400);
    }
    const existingSettings = userSettingsInfo[currentProfileIndex];
    existingSettings.workingDays = existingSettings.workingDays ? existingSettings.workingDays : [];
    const daysArray = workingDays.map(day => day.dayName + 1);
    existingSettings.workingDays = existingSettings.workingDays.map((day) => {
      const isFind = workingDays.find(arr => arr.dayName == day.dayName);
      if (isFind) {
        workingDays.splice(workingDays.indexOf(isFind), 1);
        return isFind;
      }
      return day;
    });
    existingSettings.workingDays = existingSettings.workingDays.concat(workingDays);
    const pipeline = [
      {
        $match: {
          startDate: { $gte: new Date() },
          $or: [
            { 'provider.profileId': profileId },
            { 'client.profileId': profileId }
          ]
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$startDate' },
          ids: { $push: '$appointmentId' }
        }
      },
      {
        $match: { _id: { $in: daysArray } }

      },
      {
        $unwind: '$ids'
      },
      {
        $group: {
          _id: null,
          ids: { $push: '$ids' }
        }
      }
    ];
    const appointmentData = mlDBController.aggregate('MlAppointments', pipeline, context);
    if (appointmentData && appointmentData.ids && appointmentData.ids.length) {
      mlDBController.update('MlAppointments', { appointmentId: { $in: appointmentData.ids } }, { isCancelled: true }, { $set: true, multi: true });
    }
    const result = mlDBController.update('MlCalendarSettings', existingSettings._id, { workingDays: existingSettings.workingDays, updatedAt: new Date() }, { $set: true }, context);
    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload('Calendar settings updated successfully', code);
      return response;
    }
  } else {
    const dataToInsert = {
      userId,
      profileId,
      createdAt: new Date(),
      workingDays: args.workingDays
    };
    const result = mlDBController.insert('MlCalendarSettings', dataToInsert, context);
    if (result) {
      return new MlRespPayload().successPayload('Calendar settings updated successfully', 200);
    }
  }
}

MlResolver.MlMutationResolver.updateMyCalendarWorkingDay = (obj, args, context, info) => {
  if (!args.workingDay) {
    const code = 400;
    const result = 'Working day is missing';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  return MlResolver.MlMutationResolver.updateMyCalendarWorkingDays(obj, { profileId: args.profileId, workingDays: [args.workingDay] }, context, info);
};

MlResolver.MlMutationResolver.updateMyCalendarVacation = (obj, args, context, info) => {
  const vacation = args.vacation;
  const userId = context.userId;
  // let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profileId;
  if (args.profileId) {
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  }
  if (!userId) {
    const code = 400;
    const result = 'User ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!profileId) {
    const code = 400;
    const result = 'Profile ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!vacation) {
    const code = 400;
    const result = 'Vacation data is missing';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  vacation.start = new Date(vacation.start);
  vacation.end = new Date(vacation.end);
  const isAlreadyExist = mlDBController.findOne('MlCalendarSettings', { userId, profileId }, context);
  if (isAlreadyExist) {
    isAlreadyExist.vacations = isAlreadyExist.vacations ? isAlreadyExist.vacations : [];
    const startDate = new Date(vacation.start);
    const endDate = new Date(vacation.end);
    let isAlreadyOnVacation = false;
    isAlreadyExist.vacations.forEach((vacationInfo) => {
      const vacationStartDate = new Date(vacationInfo.start);
      const vacationEndDate = new Date(vacationInfo.end);
      if (vacationStartDate.getTime() <= startDate.getTime() && startDate.getTime() <= vacationEndDate.getTime() || vacationStartDate.getTime() <= endDate.getTime() && endDate.getTime() <= vacationEndDate.getTime()) {
        isAlreadyOnVacation = true;
      }
    });
    if (isAlreadyOnVacation) {
      const code = 400;
      const response = new MlRespPayload().errorPayload('Vacation dates are overlapping', code);
      return response;
    }
    orderNumberGenService.createVactionId(vacation);
    isAlreadyExist.vacations.push(vacation);
    const result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, { vacations: isAlreadyExist.vacations, updatedAt: new Date() }, { $set: true }, context);
    if (result) {
      const code = 200;
      if (vacation.isAutoCancelAppointment) {
        cancelAppointmentsOnVacation(userId, startDate, endDate, obj, context, info);
      }

      const response = new MlRespPayload().successPayload('Vacation added successfully', code);
      return response;
    }
  } else {
    const dataToInsert = {
      userId,
      profileId,
      createdAt: new Date(),
      vacations: [vacation]
    };
    const result = mlDBController.insert('MlCalendarSettings', dataToInsert, context);
    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload('Calendar settings updated successfully', code);
      return response;
    }
  }
}

let cancelAppointmentsOnVacation = (userId, startDate, endDate, obj, context, info) => {
  const pipeline = [
    {
      $match: {
        $or: [{ status: 'Pending' }, { status: 'Accepted' }]
      }
    },
    {
      $lookup: {
        from: 'mlAppointments',
        localField: 'appointmentId',
        foreignField: 'appointmentId',
        as: 'appointment'
      }
    },
    {
      $unwind: '$appointment'
    },
    {
      $match: {
        $and: [
          { 'appointment.isCancelled': false },
          {
            $or: [
              {
                $and: [
                  { 'appointment.startDate': { $gte: startDate } },
                  { 'appointment.startDate': { $lt: endDate } }
                ]
              },
              {
                $and: [
                  { 'appointment.endDate': { $gt: startDate } },
                  { 'appointment.endDate': { $lte: endDate } }
                ]
              },
              {
                $and: [
                  { 'appointment.startDate': { $lte: startDate } },
                  { 'appointment.endDate': { $gte: endDate } }
                ]
              },
              {
                $and: [
                  { 'appointment.startDate': { $gte: startDate } },
                  { 'appointment.endDate': { $lte: endDate } }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      $project: {
        appointmentId: 1, _id: 0, 'appointment.createdBy': 1
      }
    }

  ];

  const res = mlDBController.aggregate('MlAppointmentMembers', pipeline, context);

  const arrayOfId = res.map(obj => obj.appointmentId);
  const uniqueArrayOfId = arrayOfId.filter((v, i, a) => a.indexOf(v) === i);

  if (uniqueArrayOfId && uniqueArrayOfId.length) {
    const dbres1 = mlDBController.update(
      'MlAppointmentMembers', { appointmentId: { $in: uniqueArrayOfId } }, { status: 'Rejected' },
      { $set: true, multi: true }, context
    );

    const appointmentsByCreator = res.filter((v, i, a) => v.appointment.createdBy === userId)

    // let dbres2 = mlDBController.update('MlAppointments',{
    //     $and:[
    //       {appointmentId: { $in : uniqueArrayOfId }},
    //       {createdBy : userId}
    //     ]
    //   },  { isCancelled:true},
    //   {$set:true,multi:true}, context);

    appointmentsByCreator.map((obj) => {
      cancelUSerServiceCardAppointment(obj.appointmentId, context);
    });
  }
}

let cancelUSerServiceCardAppointment = (appointmentId, context) => {
  const appointmentInfo = mlDBController.findOne('MlAppointments', { appointmentId }, context);
  if (!appointmentInfo || !appointmentInfo.appointmentInfo || appointmentInfo.appointmentInfo.resourceType !== 'ServiceCard') {
    return;
  }

  const serviceId = appointmentInfo.appointmentInfo.serviceCardId;
  const serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!serviceInfo) {
    return;
  }

  if (!serviceInfo.termsAndCondition || !serviceInfo.termsAndCondition.isReschedulable) {
    return;
  }

  const noOfReschedule = serviceInfo.termsAndCondition.noOfReschedulable || 0;
  const rescheduleTrails = appointmentInfo.rescheduleTrail ? rescheduleTrail.rescheduleTrail.length : 0;
  if (noOfReschedule <= rescheduleTrails) {
    return;
  }

  const memberResponse = mlDBController.update('MlAppointmentMembers', { appointmentId }, { isCancelled: true }, { $set: true, multi: true }, context);
  if (!memberResponse) {
    return;
  }
  const appointmentResponse = mlDBController.update('MlAppointments', { appointmentId }, { isCancelled: true }, { $set: true, multi: true }, context);
}

MlResolver.MlMutationResolver.updateCalendarVacationByVacationId = (obj, args, context, info) => {
  const vacation = args.vacation;
  const userId = context.userId;
  // let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profileId;
  if (args.profileId) {
    profileId = args.profileId;
  } else {
    profileId = new MlUserContext().userProfileDetails(userId).profileId;
  }
  if (!userId) {
    const code = 400;
    const result = 'User ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!profileId) {
    const code = 400;
    const result = 'Profile ID is not defined for this user';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  if (!vacation) {
    const code = 400;
    const result = 'Vacation data is missing';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  vacation.start = new Date(vacation.start);
  vacation.end = new Date(vacation.end);
  vacation.vacationId = args.vacationId || '';
  const isAlreadyExist = mlDBController.findOne('MlCalendarSettings', { userId, profileId }, context);
  if (isAlreadyExist) {
    isAlreadyExist.vacations = isAlreadyExist.vacations ? isAlreadyExist.vacations : [];
    const startDate = new Date(vacation.start);
    const endDate = new Date(vacation.end);
    let isAlreadyOnVacation = false;
    isAlreadyExist.vacations.forEach((vacationInfo) => {
      if (vacationInfo.vacationId !== args.vacationId) {
        const vacationStartDate = new Date(vacationInfo.start);
        const vacationEndDate = new Date(vacationInfo.end);
        if (vacationStartDate.getTime() <= startDate.getTime() && startDate.getTime() <= vacationEndDate.getTime() || vacationStartDate.getTime() <= endDate.getTime() && endDate.getTime() <= vacationEndDate.getTime()) {
          isAlreadyOnVacation = true;
        }
      }
    });
    if (isAlreadyOnVacation) {
      const code = 400;
      const response = new MlRespPayload().errorPayload('Vacation dates are overlapping', code);
      return response;
    }
    // isAlreadyExist.vacations.push(vacation);
    const newVacationData = isAlreadyExist.vacations.map((vactionData) => {
      if (vactionData.vacationId === args.vacationId) {
        return vacation;
      }
      return vactionData;
    });
    const result = mlDBController.update('MlCalendarSettings', isAlreadyExist._id, { vacations: newVacationData, updatedAt: new Date() }, { $set: true }, context);
    if (result) {
      if (vacation.isAutoCancelAppointment) {
        cancelAppointmentsOnVacation(userId, startDate, endDate, obj, context, info);
      }

      const code = 200;
      const response = new MlRespPayload().successPayload('Calendar settings updated successfully', code);
      return response;
    }
  } else {
    const code = 400;
    const result = 'Calendar Setting not found';
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
};


MlResolver.MlQueryResolver.getUserProfileDetails = (obj, args, context, info) => {
  const userId = args.userId ? args.userId : context.userId;
  const pipleline = [
    { $match: { _id: userId } },
    { $unwind: '$profile.externalUserProfiles' },
    {
      $lookup: {
        from: 'mlSubChapters',
        localField: 'profile.externalUserProfiles.subChapterId',
        foreignField: '_id',
        as: 'subDepartment'
      }
    },
    { $unwind: '$subDepartment' },
    {
      $project: {
        userId: '$_id',
        firstName: '$profile.firstName',
        lastName: '$profile.lastName',
        displayName: '$profile.displayName',
        profileId: '$profile.externalUserProfiles.profileId',
        profileImage: '$profile.profileImage',
        clusterId: '$profile.externalUserProfiles.clusterId',
        clusterName: '$profile.externalUserProfiles.clusterName',
        chapterId: '$profile.externalUserProfiles.chapterId',
        chapterName: '$profile.externalUserProfiles.chapterName',
        subChapterId: '$profile.externalUserProfiles.subChapterId',
        subChapterName: '$profile.externalUserProfiles.subChapterName',
        communityId: '$profile.externalUserProfiles.communityId',
        communityName: '$profile.externalUserProfiles.communityName',
        communityDefCode: '$profile.externalUserProfiles.communityDefCode',
        communityDefName: '$profile.externalUserProfiles.communityDefName',
        isActive: '$profile.externalUserProfiles.isActive',
        isApprove: '$profile.externalUserProfiles.isApprove',
        isMoolya: '$subDepartment.isDefaultSubChapter'
      }
    },
    {
      $lookup: {
        from: 'mlResourceConfig', localField: 'communityDefCode', foreignField: 'community.communityCode', as: 'resource'
      }
    },
    {
      $addFields: {
        resource: {
          $reduce: {
            input: '$resource',
            initialValue: [],
            in: { $concatArrays: ['$$value', ['$$this.resourceCode']] }
          }
        }
      }
    },
    {
      $addFields: {
        isHasManageSchedule: { $in: ['MANAGESCHEDULE', '$resource'] },
        isHasOffice: { $in: ['OFFICE', '$resource'] }
      }
    },
    {
      $lookup: {
        from: 'mlOffice', localField: 'profileId', foreignField: 'profileId', as: 'offices'
      }
    }
  ];
  return mlDBController.aggregate('users', pipleline, context);
};

MlResolver.MlQueryResolver.getUserActiveProfileDetails = (obj, args, context, info) => {
  const userId = args.userId ? args.userId : context.userId;
  const pipleline = [
    { $match: { _id: userId } },
    { $unwind: '$profile.externalUserProfiles' },
    {
      $lookup: {
        from: 'mlRegistration',
        localField: 'profile.externalUserProfiles.registrationId',
        foreignField: '_id',
        as: 'regInfo'
      }
    },
    { $unwind: '$regInfo' },
    { $match: { 'regInfo.status': 'REG_USER_APR' } },
    {
      $lookup: {
        from: 'mlSubChapters',
        localField: 'profile.externalUserProfiles.subChapterId',
        foreignField: '_id',
        as: 'subDepartment'
      }
    },
    { $unwind: '$subDepartment' },
    {
      $project: {
        userId: '$_id',
        firstName: '$profile.firstName',
        lastName: '$profile.lastName',
        displayName: '$profile.displayName',
        profileId: '$profile.externalUserProfiles.profileId',
        profileImage: '$profile.profileImage',
        clusterId: '$profile.externalUserProfiles.clusterId',
        clusterName: '$profile.externalUserProfiles.clusterName',
        chapterId: '$profile.externalUserProfiles.chapterId',
        chapterName: '$profile.externalUserProfiles.chapterName',
        subChapterId: '$profile.externalUserProfiles.subChapterId',
        subChapterName: '$profile.externalUserProfiles.subChapterName',
        communityId: '$profile.externalUserProfiles.communityId',
        communityName: '$profile.externalUserProfiles.communityName',
        communityDefCode: '$profile.externalUserProfiles.communityDefCode',
        communityDefName: '$profile.externalUserProfiles.communityDefName',
        isActive: '$profile.externalUserProfiles.isActive',
        isApprove: '$profile.externalUserProfiles.isApprove',
        isMoolya: '$subDepartment.isDefaultSubChapter'
      }
    },
    { $match: { isActive: true } },
    {
      $lookup: {
        from: 'mlResourceConfig', localField: 'communityDefCode', foreignField: 'community.communityCode', as: 'resource'
      }
    },
    {
      $addFields: {
        resource: {
          $reduce: {
            input: '$resource',
            initialValue: [],
            in: { $concatArrays: ['$$value', ['$$this.resourceCode']] }
          }
        }
      }
    },
    {
      $addFields: {
        isHasManageSchedule: { $in: ['MANAGESCHEDULE', '$resource'] },
        isHasOffice: { $in: ['OFFICE', '$resource'] }
      }
    },
    {
      $lookup: {
        from: 'mlOffice', localField: 'profileId', foreignField: 'profileId', as: 'offices'
      }
    }
  ];
  return mlDBController.aggregate('users', pipleline, context);
};
