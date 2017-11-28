/** ************************************************************
 * Date: 26 Jun, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Appointments Query and mutation definition
 * JavaScript XML file appointmentResolver.js
 * *************************************************************** */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
import MlUserContext from '../../MlExternalUsers/mlUserContext';
import MlAppointment from './appointment';
import mlServiceCardRepo from '../servicecards/servicecardRepo'

MlResolver.MlMutationResolver.bookUserServiceCard = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;
  const serviceId = args.serviceId;
  const service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  const tax = 0; // Need to update later
  const discountAmount = 0; // Need to update later

  /**
   * Define data to insert in service card order
   * Note :: start date and end data will update when user create payment
   */
  const dataToInsert = {
    userId,
    profileId,
    serviceId,
    serviceName: service.name,
    amount: service.finalAmount,
    tax,
    promoCode: '', // Need to update later
    discountedAmount: discountAmount,
    totalAmount: service.finalAmount + tax - discountAmount,
    isActive: false,
    isExpired: false,
    paymentStatus: 'unpaid',
    createdAt: new Date(),
    taskDetails: args.taskDetails
  };
  orderNumberGenService.createUserServiceOrderId(dataToInsert);
  const result = mlDBController.insert('MlUserServiceCardOrder', dataToInsert, context);
  if (typeof result === 'string') {
    const code = 200;
    const response = new MlRespPayload().errorPayload(dataToInsert.transactionId, code);
    return response;
  }
  const code = 400;
  const response = new MlRespPayload().errorPayload(result, code);
  return response;
};

MlResolver.MlMutationResolver.userServiceCardPayment = (obj, args, context, info) => {
  const orderId = args.userServiceCardPaymentInfo.orderId;
  const userId = context.userId;
  const service = mlDBController.findOne('MlUserServiceCardOrder', { transactionId: orderId }, context);
  const dataToInsert = {
    paymentId: args.userServiceCardPaymentInfo.paymentId,
    paymentMethod: args.userServiceCardPaymentInfo.paymentMethod,
    amount: args.userServiceCardPaymentInfo.amount,
    currencyId: args.userServiceCardPaymentInfo.currencyCode,
    resourceId: orderId,
    resourceType: 'UserServiceCard',
    userId,
    createdAt: new Date()
  };
  const paymentResponse = mlDBController.insert('MlPayment', dataToInsert, context);
  if (typeof paymentResponse === 'string') {
    const serviceResponse = mlDBController.update('MlUserServiceCardOrder', service._id, { paymentStatus: 'paid' }, { $set: 1 }, context);
    if (serviceResponse) {
      // Add leader balance
      const code = 200;
      const response = new MlRespPayload().errorPayload('Payment Updated', code);
      return response;
    }
    const code = 400;
    const response = new MlRespPayload().errorPayload(paymentResponse, code);
    return response;
  }
  const code = 400;
  const response = new MlRespPayload().errorPayload(paymentResponse, code);
  return response;
};

MlResolver.MlMutationResolver.bookUserServiceCardAppointment = (obj, args, context, info) => {
  const orderId = args.userServiceCardAppointmentInfo.orderId;
  const sessionId = args.userServiceCardAppointmentInfo.sessionId;
  const SCOrderDetails = mlDBController.findOne('MlScOrder', { orderId }, context);
  const extraUsers = args.userServiceCardAppointmentInfo.extraUsers ? args.userServiceCardAppointmentInfo.extraUsers : [];
  if (!SCOrderDetails) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Order is not valid', code);
    return response;
  }

  const serviceId = SCOrderDetails.serviceId;
  if (!serviceId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload("'Service Id' is not attached in this order", code);
    return response;
  }

  const serviceLedgerBalance = mlDBController.findOne('MlServiceLedger', { serviceId }, context);
  const taskInfo = serviceLedgerBalance.serviceCard.tasks; // Update task fetch info in case serviceLedgerBalance schema update
  const task = taskInfo.find((data) => {
    data.sessions = data.sessions ? data.sessions : [];
    return data.sessions.some(session => session.id == sessionId);
  });

  if (!task) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Task id is not attached in this order', code);
    return response;
  }

  const taskId = task.id;

  if (!taskId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Task id is not attached in service card definition', code);
    return response;
  }

  const day = args.userServiceCardAppointmentInfo.day; // date.getDate();
  const month = args.userServiceCardAppointmentInfo.month; // date.getMonth();
  const year = args.userServiceCardAppointmentInfo.year; // date.getFullYear();
  const hours = args.userServiceCardAppointmentInfo.hours; // 9;
  const minutes = args.userServiceCardAppointmentInfo.minutes; // 0;
  const appointment = MlAppointment.bookAppointment('appointmentId', taskId, sessionId, hours, minutes, day, month, year);
  if (appointment.success) {
    const taskDoc = mlDBController.findOne('MlTask', taskId, context);
    const session = taskDoc.session.find(data => data.sessionId == sessionId);

    session.activities = session.activities ? session.activities : [];

    const activities = mlDBController.find('MlActivity', { _id: { $in: session.activities } }, context).fetch();

    const attendees = activities.reduce((attendee, data) => {
      data.teams = data.teams ? data.teams : [];
      data.teams.forEach((team) => {
        team.users = team.users ? team.users : [];
        team.users = team.users.filter((user) => {
          const isFind = attendee.find(data => user.profileId == data.profileId && user.userId == user.profileId);
          if (isFind) {
            return false;
          }
          return true;
        });
        attendee = attendee.concat(team.users);
      });
      return attendee;
    }, extraUsers);

    const userId = context.userId;
    const profileId = new MlUserContext().userProfileDetails(userId).profileId;
    const service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
    const appointmentData = {
      appointmentType: 'SERVICE-TASK',
      startDate: appointment.start,
      endDate: appointment.end,
      duration: session.duration ? session.duration : {},
      timeZone: '+05:30', // to do
      provider: {
        userId: service.userId,
        profileId: service.profileId
      },
      client: {
        userId: SCOrderDetails.userId,
        profileId: SCOrderDetails.profileId
      },
      appointmentInfo: {
        resourceType: 'ServiceCard',
        resourceId: SCOrderDetails.serviceId,
        serviceCardId: SCOrderDetails.serviceId,
        serviceName: SCOrderDetails.serviceName,
        taskId,
        sessionId,
        serviceOrderId: orderId
      },
      status: 'Pending',
      isCancelled: false,
      isSelf: false,
      isRescheduled: false,
      isInternal: false,
      createdAt: new Date(),
      createdBy: userId
    };

    orderNumberGenService.createAppointmentId(appointmentData);

    const result = mlDBController.insert('MlAppointments', appointmentData, context);

    if (result) {
      /**
       * Insert appointment member info
       */
      attendees.forEach((attendee) => {
        if (attendee.userId === SCOrderDetails.userId && attendee.profileId === SCOrderDetails.profileId) {
          return true;
        }
        if (attendee.userId === service.userId && attendee.profileId === service.profileId) {
          return true;
        }
        const attendeeData = {
          appointmentId: appointmentData.appointmentId,
          appointmentUniqueId: result,
          userId: attendee.userId,
          profileId: attendee.profileId,
          status: attendee.isMandatory ? 'Accepted' : 'Pending',
          isProvider: false,
          isClient: false,
          isAttendee: true,
          createdAt: new Date(),
          createdBy: userId
        };
        const resp = mlDBController.insert('MlAppointmentMembers', attendeeData, context);
      });

      /**
       * Insert client data as appointment member
       */
      const clientData = {
        appointmentId: appointmentData.appointmentId,
        appointmentUniqueId: result,
        userId: SCOrderDetails.userId,
        profileId: SCOrderDetails.profileId,
        status: 'Accepted',
        isProvider: false,
        isClient: true,
        isAttendee: false,
        createdAt: new Date(),
        createdBy: userId
      };
      let resp = mlDBController.insert('MlAppointmentMembers', clientData, context);

      /**
       * Insert provider data as appointment member
       */
      const providerData = {
        appointmentId: appointmentData.appointmentId,
        appointmentUniqueId: result,
        userId: service.userId,
        profileId: service.profileId,
        status: 'Accepted',
        isProvider: true,
        isClient: false,
        isAttendee: false,
        createdAt: new Date(),
        createdBy: userId
      };
      resp = mlDBController.insert('MlAppointmentMembers', providerData, context);

      mlServiceCardRepo.createTransactionRequest(service.userId, 'sessionAppointment', appointmentData.appointmentId, SCOrderDetails.serviceId, SCOrderDetails.userId, 'user', context)
      const code = 200;
      const response = new MlRespPayload().successPayload('Appointment book successfully', code);
      return response;
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().errorPayload(appointment.message, code);
    return response;
  }
};

MlResolver.MlQueryResolver.fetchMyAppointmentByStatus = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;
  const appointments = mlDBController.aggregate('MlAppointments', [
    {
      $lookup: {
        from: 'mlAppointmentMembers',
        localField: 'appointmentId',
        foreignField: 'appointmentId',
        as: 'members'
      }
    },
    { $unwind: '$members' },
    { $match: { 'members.userId': userId, 'members.profileId': profileId, 'members.status': args.status } }
  ]);
  return appointments;
};

MlResolver.MlQueryResolver.fetchAllProfileAppointmentCounts = (obj, args, context, info) => {
  const userId = context.userId;
  const date = new Date();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const timeZoneOffsetInMinutes = 330;
  const pipeLine = [
    {
      $lookup: {
        from: 'mlAppointmentMembers', localField: 'appointmentId', foreignField: 'appointmentId', as: 'members'
      }
    },
    { $unwind: '$members' },
    { $match: { 'members.userId': userId, 'members.status': { $ne: 'Rejected' } } },
    { $addFields: { startDate: { $add: ['$startDate', timeZoneOffsetInMinutes * 60 * 1000] } } },
    {
      $project: {
        yearMonthDay: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
        time: { $dateToString: { format: '%H:%M:%S:%L', date: '$Date' } },
        appointmentInfo: 1,
        members: 1,
        userId: '$members.userId',
        profileId: '$members.profileId',
        appointmentId: 1
      }
    },
    {
      $group: {
        _id: { date: '$yearMonthDay', userId: '$userId', profileId: '$profileId' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        userId: '$_id.userId',
        profileId: '$_id.profileId',
        count: '$count'
      }
    },
    {
      $group: {
        _id: null,
        profileId: { $first: '$profileId' },
        events: { $push: '$$ROOT' }
      }
    }
  ];
  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  result = result && result[0] ? result[0] : [];
  return result;
};

MlResolver.MlQueryResolver.fetchProfileAppointmentCounts = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = args.profileId;
  const date = new Date();
  let month = args.month ? args.month : date.getMonth();
  month += 1;
  const year = args.year ? args.year : date.getFullYear();
  const timeZoneOffsetInMinutes = 330;
  const pipeLine = [
    {
      $lookup: {
        from: 'mlAppointmentMembers', localField: 'appointmentId', foreignField: 'appointmentId', as: 'members'
      }
    },
    { $unwind: '$members' },
    { $match: { 'members.userId': userId, 'members.profileId': profileId, 'members.status': { $ne: 'Rejected' } } },
    { $addFields: { startDate: { $add: ['$startDate', timeZoneOffsetInMinutes * 60 * 1000] } } },
    {
      $project: {
        yearMonthDay: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
        time: { $dateToString: { format: '%H:%M:%S:%L', date: '$Date' } },
        appointmentInfo: 1,
        members: 1,
        userId: '$members.userId',
        profileId: '$members.profileId',
        appointmentId: 1
      }
    },
    {
      $group: {
        _id: { date: '$yearMonthDay', userId: '$userId', profileId: '$profileId' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        userId: '$_id.userId',
        profileId: '$_id.profileId',
        count: '$count'
      }
    },
    {
      $group: {
        _id: null,
        profileId: { $first: '$profileId' },
        events: { $push: '$$ROOT' }
      }
    },
    {
      $lookup: {
        from: 'mlCalendarSettings', localField: 'profileId', foreignField: 'profileId', as: 'days'
      }
    },
    {
      $unwind: {
        path: '$days',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: { days: { $cond: [{ $isArray: '$days.vacations' }, '$days.vacations', []] } }
    },
    {
      $project: {
        events: 1,
        days: {
          $filter: {
            input: '$days',
            as: 'day',
            cond: {
              $and: [
                {
                  $or: [
                    { $cond: [{ $eq: [{ $month: '$$day.start' }, month] }, true, false] },
                    { $cond: [{ $eq: [{ $month: '$$day.end' }, month] }, true, false] }
                  ]
                },
                { $eq: ['$$day.isActive', true] }
              ]
            }
          }
        }
      }
    }
  ];

  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  result = result && result[0] ? result[0] : [];

  if (!result.events) {
    const vacationPipeline = [
      { $match: { userId, profileId } },
      {
        $project: {
          events: [],
          days: {
            $filter: {
              input: '$vacations',
              as: 'day',
              cond: {
                $and: [
                  {
                    $or: [
                      { $cond: [{ $eq: [{ $month: '$$day.start' }, month] }, true, false] },
                      { $cond: [{ $eq: [{ $month: '$$day.end' }, month] }, true, false] }
                    ]
                  },
                  { $eq: ['$$day.isActive', true] }
                ]
              }
            }
          }
        }
      }
    ];
    result = mlDBController.aggregate('MlCalendarSettings', vacationPipeline);

    result = result && result[0] ? result[0] : [];
  }

  return result;
};

MlResolver.MlQueryResolver.fetchOfficeMemberAppointmentCounts = (obj, args, context, info) => {
  const userId = args.userId;
  const profileId = args.profileId;
  const date = new Date();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const timeZoneOffsetInMinutes = 330;
  const pipeLine = [
    {
      $lookup: {
        from: 'mlAppointmentMembers', localField: 'appointmentId', foreignField: 'appointmentId', as: 'members'
      }
    },
    { $unwind: '$members' },
    { $match: { 'members.userId': userId, 'members.profileId': profileId, 'members.status': { $ne: 'Rejected' } } },
    { $addFields: { startDate: { $add: ['$startDate', timeZoneOffsetInMinutes * 60 * 1000] } } },
    {
      $project: {
        yearMonthDay: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
        time: { $dateToString: { format: '%H:%M:%S:%L', date: '$Date' } },
        appointmentInfo: 1,
        members: 1,
        userId: '$members.userId',
        profileId: '$members.profileId',
        appointmentId: 1
      }
    },
    {
      $group: {
        _id: { date: '$yearMonthDay', userId: '$userId', profileId: '$profileId' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        userId: '$_id.userId',
        profileId: '$_id.profileId',
        count: '$count'
      }
    },
    {
      $group: {
        _id: null,
        profileId: { $first: '$profileId' },
        events: { $push: '$$ROOT' }
      }
    },
    {
      $lookup: {
        from: 'mlCalendarSettings', localField: 'profileId', foreignField: 'profileId', as: 'days'
      }
    },
    {
      $unwind: {
        path: '$days',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: { days: { $cond: [{ $isArray: '$days.vacations' }, '$days.vacations', []] } }
    },
    {
      $project: {
        events: 1,
        days: {
          $filter: {
            input: '$days',
            as: 'day',
            cond: {
              $and: [
                {
                  $or: [
                    { $cond: [{ $eq: [{ $month: '$$day.start' }, month] }, true, false] },
                    { $cond: [{ $eq: [{ $month: '$$day.end' }, month] }, true, false] }
                  ]
                },
                { $eq: ['$$day.isActive', true] }
              ]
            }
          }
        }
      }
    }
  ];

  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  result = result && result[0] ? result[0] : [];

  if (!result.events) {
    const vacationPipeline = [
      { $match: { userId, profileId } },
      {
        $project: {
          events: [],
          days: {
            $filter: {
              input: '$vacations',
              as: 'day',
              cond: {
                $and: [
                  {
                    $or: [
                      { $cond: [{ $eq: [{ $month: '$$day.start' }, month] }, true, false] },
                      { $cond: [{ $eq: [{ $month: '$$day.end' }, month] }, true, false] }
                    ]
                  },
                  { $eq: ['$$day.isActive', true] }
                ]
              }
            }
          }
        }
      }
    ];
    result = mlDBController.aggregate('MlCalendarSettings', vacationPipeline);
    result = result && result[0] ? result[0] : [];
  }
  return result;
};

MlResolver.MlQueryResolver.fetchAllOfficeMemberAppointmentCounts = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;
  const date = new Date();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const timeZoneOffsetInMinutes = 330;
  const pipeLine = [
    {
      $lookup: {
        from: 'mlOffice', localField: 'officeId', foreignField: '_id', as: 'office'
      }
    },
    { $match: { 'office.userId': userId, 'office.profileId': profileId, 'members.status': { $ne: 'Rejected' } } },
    {
      $lookup:
      {
      	from: 'users',
      	localField: 'emailId',
      	foreignField: 'username',
      	as: 'user'
      }
    },
    { $unwind: '$user' },
    { $match: { 'user.profile.isActive': true } },
    {
      $project: {
        name: 1, profileId: 1, userId: '$user._id', profileImage: '$user.profile.profileImage'
      }
    },
    {
      $lookup: {
        from: 'mlAppointmentMembers', localField: 'profileId', foreignField: 'profileId', as: 'appointments'
      }
    },
    { $unwind: '$appointments' },
    {
      $lookup: {
        from: 'mlAppointments', localField: 'appointments.appointmentId', foreignField: 'appointmentId', as: 'appointmentData'
      }
    },
    { $unwind: '$appointmentData' },
    { $replaceRoot: { newRoot: '$appointmentData' } },
    { $addFields: { startDate: { $add: ['$startDate', timeZoneOffsetInMinutes * 60 * 1000] } } },
    {
      $project: {
        yearMonthDay: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
        time: { $dateToString: { format: '%H:%M:%S:%L', date: '$Date' } },
        appointmentInfo: 1,
        appointmentId: 1
      }
    },
    {
      $group: {
        _id: { date: '$yearMonthDay', userId: '$userId', profileId: '$profileId' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        count: '$count'
      }
    },
    {
      $group: {
        _id: null,
        events: { $push: '$$ROOT' }
      }
    }
  ];

  let result = mlDBController.aggregate('MlOfficeMembers', pipeLine);
  result = result && result[0] ? result[0] : [];
  return result;
};

MlResolver.MlMutationResolver.bookTaskInternalAppointment = (obj, args, context, info) => {
  const taskId = args.taskInternalAppointmentInfo.taskId;
  const sessionId = args.taskInternalAppointmentInfo.sessionId;
  const day = args.taskInternalAppointmentInfo.day; // date.getDate();
  const month = args.taskInternalAppointmentInfo.month; // date.getMonth();
  const year = args.taskInternalAppointmentInfo.year; // date.getFullYear();
  const hours = args.taskInternalAppointmentInfo.hours; // 9;
  const minutes = args.taskInternalAppointmentInfo.minutes; // 0;
  const extraUsers = args.taskInternalAppointmentInfo.extraUsers ? args.taskInternalAppointmentInfo.extraUsers : [];

  const startDate = new Date();
  startDate.setDate(day);
  startDate.setMonth(month);
  startDate.setYear(year);
  startDate.setHours(hours);
  startDate.setMinutes(minutes);
  startDate.setSeconds(0, 0);

  const taskDoc = mlDBController.findOne('MlTask', taskId, context);
  const session = taskDoc.session.find(data => data.sessionId == sessionId);

  session.activities = session.activities ? session.activities : [];

  const activities = mlDBController.find('MlActivity', { _id: { $in: session.activities } }, context).fetch();

  const attendees = activities.reduce((attendee, data) => {
    data.teams = data.teams ? data.teams : [];
    data.teams.forEach((team) => {
      team.users = team.users ? team.users : [];
      team.users = team.users.filter((user) => {
        const isFind = attendee.find(data => user.profileId == data.profileId && user.userId == user.profileId);
        if (isFind) {
          return false;
        }
        return true;
      });
      attendee = attendee.concat(team.users);
    });
    return attendee;
  }, extraUsers);

  const userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  profileId = taskDoc.userId == userId ? taskDoc.profileId : profileId;

  session.duration = session.duration ? session.duration : {};
  const sessionHours = session.duration.hours ? session.duration.hours : 0;
  const sessionMinutes = session.duration.minutes ? session.duration.minutes : 0;
  const endDate = new Date(startDate);
  endDate.setHours(hours + sessionHours);
  endDate.setMinutes(minutes + sessionMinutes);

  const appointmentData = {
    appointmentType: 'INTERNAL-TASK',
    startDate,
    endDate,
    duration: session.duration ? session.duration : {},
    timeZone: '+05:30', // to do
    provider: {
      userId: taskDoc.userId,
      profileId: taskDoc.profileId
    },
    appointmentInfo: {
      resourceType: 'Task',
      resourceId: taskId,
      taskId,
      taskName: taskDoc.displayName,
      sessionId
    },
    status: 'Pending',
    isCancelled: false,
    isSelf: false,
    isRescheduled: false,
    isInternal: true,
    createdAt: new Date(),
    createdBy: userId
  };

  orderNumberGenService.createAppointmentId(appointmentData);

  const result = mlDBController.insert('MlAppointments', appointmentData, context);

  if (result) {
    /**
     * Insert appointment creater data as appointment member
     */
    const providerData = {
      appointmentId: appointmentData.appointmentId,
      appointmentUniqueId: result,
      userId,
      profileId,
      status: 'Accepted',
      isProvider: profileId == taskDoc.profileId,
      isClient: false,
      isAttendee: false,
      createdAt: new Date(),
      createdBy: userId
    };
    resp = mlDBController.insert('MlAppointmentMembers', providerData, context);

    /**
     * Insert appointment member info
     */
    attendees.forEach((attendee) => {
      if (attendee.userId === userId && attendee.profileId === profileId) {
        return true;
      }
      const attendeeData = {
        appointmentId: appointmentData.appointmentId,
        appointmentUniqueId: result,
        userId: attendee.userId,
        profileId: attendee.profileId,
        status: attendee.isMandatory ? 'Accepted' : 'Pending',
        isProvider: false,
        isClient: false,
        isAttendee: true,
        createdAt: new Date(),
        createdBy: userId
      };
      const resp = mlDBController.insert('MlAppointmentMembers', attendeeData, context);
    });

    const code = 200;
    const response = new MlRespPayload().successPayload('Appointment booked successfully', code);
    return response;
  }
};

MlResolver.MlMutationResolver.bookSelfTaskInternalAppointment = (obj, args, context, info) => {
  const day = args.selfInternalAppointmentInfo.day; // date.getDate();
  const month = args.selfInternalAppointmentInfo.month; // date.getMonth();
  const year = args.selfInternalAppointmentInfo.year; // date.getFullYear();
  const hours = args.selfInternalAppointmentInfo.hours; // 9;
  const minutes = args.selfInternalAppointmentInfo.minutes; // 0;

  const taskDetails = args.selfInternalAppointmentInfo.taskDetails;

  const taskId = mlDBController.insert('MlAppointmentTask', taskDetails, context);

  const startDate = new Date();
  startDate.setDate(day);
  startDate.setMonth(month);
  startDate.setYear(year);
  startDate.setHours(hours);
  startDate.setMinutes(minutes);
  startDate.setSeconds(0, 0);

  taskDetails.duration = taskDetails.duration ? taskDetails.duration : {};

  const sessionHours = taskDetails.duration.hours ? taskDetails.duration.hours : 0;
  const sessionMinutes = taskDetails.duration.minutes ? taskDetails.duration.minutes : 0;

  const endDate = new Date(startDate);
  endDate.setHours(hours + sessionHours);
  endDate.setMinutes(minutes + sessionMinutes);

  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;

  const appointmentData = {
    appointmentType: 'SELF-TASK',
    startDate,
    endDate,
    duration: taskDetails.duration ? taskDetails.duration : {},
    timeZone: '+05:30', // to do
    provider: {
      userId,
      profileId
    },
    appointmentInfo: {
      resourceType: 'Task',
      resourceId: taskId,
      taskId,
      taskName: taskDetails.name
    },
    status: 'Pending',
    isCancelled: false,
    isSelf: true,
    isRescheduled: false,
    isInternal: true,
    createdAt: new Date(),
    createdBy: userId
  };

  orderNumberGenService.createAppointmentId(appointmentData);

  const result = mlDBController.insert('MlAppointments', appointmentData, context);

  if (result) {
    /**
     * Insert provider data as appointment member
     */
    const providerData = {
      appointmentId: appointmentData.appointmentId,
      appointmentUniqueId: result,
      userId,
      profileId,
      status: 'Accepted',
      isProvider: true,
      isClient: false,
      isAttendee: false,
      createdAt: new Date(),
      createdBy: userId
    };
    const resp = mlDBController.insert('MlAppointmentMembers', providerData, context);


    const code = 200;
    const response = new MlRespPayload().successPayload('Appointment booked successfully', code);
    return response;
  }
};

MlResolver.MlQueryResolver.fetchServiceSeekerList = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = args.profileId;

  const pipeLine = [
    { $match: { profileId: userId, profileId } }
  ];

  if (args.serviceId) {
    pipeLine.push({
      $match: { serviceId: args.serviceId }
    });
  }

  pipeLine.push({
    $lookup: {
      from: 'mlScOrder', localField: '_id', foreignField: 'serviceId', as: 'orders'
    }
  });

  pipeLine.push({
    $unwind: '$orders'
  });

  pipeLine.push({
    $lookup: {
      from: 'users', localField: 'orders.userId', foreignField: '_id', as: 'users'
    }
  });

  pipeLine.push({ $unwind: '$users' });

  pipeLine.push({
    $project:
    {
    	name: '$users.profile.displayName',
    	userId: '$orders.userId',
    	profileId: '$orders.profileId',
    	transId: '$orders.orderId',
    	orderId: '$orders.orderId',
    	serviceId: '$orders.serviceId'
    }
  });

  const result = mlDBController.aggregate('MlServiceCardDefinition', pipeLine);

  return result;
};

MlResolver.MlQueryResolver.fetchSlotDetails = (obj, args, context, info) => {
  const userId = context.userId;
  const appointmentId = args.appointmentId;

  const pipeLine = [
    { $match: { appointmentId: { $in: appointmentId } } },
    {
      $lookup: {
        from: 'mlServiceCardDefinition',
        localField: 'appointmentInfo.resourceId',
        foreignField: '_id',
        as: 'service'
      }
    },
    { $unwind: { path: '$service', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'mlTask',
        localField: 'appointmentInfo.taskId',
        foreignField: '_id',
        as: 'taskInfo'
      }
    },
    {
      $lookup: {
        from: 'mlAppointmentTask',
        localField: 'appointmentInfo.taskId',
        foreignField: '_id',
        as: 'internalTaskInfo'
      }
    },
    {
      $addFields: {
        taskInfo: {
          $cond: [{ $size: '$taskInfo' }, '$taskInfo', '$internalTaskInfo']
        }
      }
    },
    { $unwind: '$taskInfo' },
    {
      $lookup: {
        from: 'mlAppointmentMembers',
        localField: 'appointmentId',
        foreignField: 'appointmentId',
        as: 'attendeeDetails'
      }
    },
    { $unwind: { path: '$attendeeDetails', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'attendeeDetails.userId',
        foreignField: '_id',
        as: 'attendeeInfo'
      }
    },
    { $unwind: { path: '$attendeeInfo', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$$ROOT._id',
        appointmentType: { $first: '$appointmentType' },
        startDate: { $first: '$startDate' },
        endDate: { $first: '$endDate' },
        timeZone: { $first: '$timeZone' },
        provider: { $first: '$provider' },
        client: { $first: '$client' },
        appointmentInfo: { $first: '$appointmentInfo' },
        status: { $first: '$status' },
        isCancelled: { $first: '$isCancelled' },
        isSelf: { $first: '$isSelf' },
        isRescheduled: { $first: '$isRescheduled' },
        isInternal: { $first: '$isInternal' },
        createdAt: { $first: '$createdAt' },
        createdBy: { $first: '$createdBy' },
        appointmentId: { $first: '$appointmentId' },
        userImage: { $first: '$userInfo.profile.profileImage' },
        userEmail: { $first: '$userInfo.username' },
        userCommunity: { $first: '$userInfo.profile.externalUserProfiles.communityName' },
        userMobileNumber: { $first: '$userInfo.profile.mobileNumber' },
        taskName: { $first: '$taskInfo.name' },
        sessions: { $first: '$taskInfo.session' },
        serviceTasks: { $first: '$service.tasks' },
        attendeeDetails: {
          $push: {
            firstName: '$attendeeInfo.profile.firstName',
            lastName: '$attendeeInfo.profile.lastName',
            profileImage: '$attendeeInfo.profile.profileImage',
            userId: '$attendeeInfo._id',
            isProvider: '$attendeeDetails.isProvider',
            isClient: '$attendeeDetails.isClient',
            isAttendee: '$attendeeDetails.isAttendee',
            status: '$attendeeDetails.status'
          }
        }
      }
    }
  ];

  const result = mlDBController.aggregate('MlAppointments', pipeLine);

  result.forEach((data, index, arr) => {
    let totalSessions = 0;
    let currentSession = 0;
    if (data.appointmentType === 'SERVICE-TASK') {
      if (data.serviceTasks) {
        data.serviceTasks.sort((a, b) => a.sequence >= b.sequence).forEach((task, index, array) => {
          array[index].sessions = array[index].sessions ? array[index].sessions : [];
          array[index].sessions = task.sessions.sort((a, b) => a.sequence >= b.sequence);
          const sessionId = data.appointmentInfo ? data.appointmentInfo.sessionId : '';
          const sessionIndex = array[index].sessions.findIndex(session => session.id === sessionId);
          if (sessionIndex > -1) {
            currentSession += totalSessions + sessionIndex + 1;
          }
          totalSessions += array[index].sessions.length;
        });
        console.log('data.serviceTasks', data.serviceTasks);
      }
    } else if (data.appointmentType === 'INTERNAL-TASK') {
      data.sessions = data.sessions ? data.sessions : [];
      const sessionId = data.appointmentInfo ? data.appointmentInfo.sessionId : '';
      const sessionIndex = data.sessions.findIndex(data => data.sessionId === sessionId);
      totalSessions = data.sessions.length;
      currentSession = sessionIndex + 1;
    } else {
      totalSessions = 1;
      currentSession = 1;
    }
    arr[index].totalSessions = totalSessions;
    arr[index].currentSession = currentSession;
    console.log('Find Task', totalSessions, currentSession);
  });
  console.log(result);
  return result;
};

MlResolver.MlQueryResolver.fetchMyAppointment = (obj, args, context, info) => {
  const userId = args.userId ? args.userId : context.userId;
  const profileId = args.profileId;
  const date = new Date();
  const day = args.day ? args.day : date.getDate();
  const month = args.month ? args.month : date.getMonth();
  const year = args.year ? args.year : date.getFullYear();
  const response = MlAppointment.getUserAppointments(userId, profileId, day, month, year);
  return response;
};

MlResolver.MlQueryResolver.fetchMyAppointmentBetweenTwoDates = (obj, args, context, info) => {
  const userId = args.userId ? args.userId : context.userId;
  const profileId = args.profileId;
  const date = new Date();

  const startDay = args.startDay ? args.startDay : date.getDate();
  const startMonth = args.startMonth ? args.startMonth : date.getMonth();
  const startYear = args.startYear ? args.startYear : date.getFullYear();

  const endDay = args.endDay ? args.endDay : date.getDate();
  const endMonth = args.endMonth ? args.endMonth : date.getMonth();
  const endYear = args.endYear ? args.endYear : date.getFullYear();

  const response = MlAppointment.getUserAppointmentsBetweenTwoDates(userId, profileId, startDay, startMonth, startYear, endDay, endMonth, endYear);
  return response;
};

MlResolver.MlMutationResolver.updateAppointmentByStatus = (obj, args, context, info) => {
  const userId = context.userId;
  const profileId = new MlUserContext().userProfileDetails(userId).profileId;
  const query = {
    userId,
    profileId,
    appointmentId: args.appointmentId
  };
  if (!_.isEmpty(args.appointmentId)) {
    const appointmentMember = mlDBController.findOne('MlAppointmentMembers', query, context);
    if (appointmentMember) {
      appointmentMember.status = args.status;
      const updatedAppointmentMember = mlDBController.update('MlAppointmentMembers', appointmentMember._id, appointmentMember, { $set: 1 }, context);
      if (appointmentMember.createdBy === userId) {
        let status;
        switch (args.status) {
          case 'Pending':
            status = 'Pending';
            break;
          case 'Accepted':
            status = 'Started';
            break;
          case 'Completed':
            status = 'Completed';
            break;
          default:
          // do nothing
        }
        let updateData = {};
        if (args.status === 'Rejected') {
          updateData = { isCancelled: true };
        } else {
          updateData = { status }
        }
        const updatedAppointment = mlDBController.update('MlAppointments', { appointmentId: args.appointmentId }, updateData, { $set: 1 }, context);
      }
      if (updatedAppointmentMember) {
        const code = 200;
        const response = new MlRespPayload().successPayload('Successfully updated', code);
        return response
      }
    } else {
      const code = 400;
      const response = new MlRespPayload().errorPayload('Require a valid appointment', code);
      return response
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Cannot save empty appointment', code);
    return response
  }
};

MlResolver.MlQueryResolver.fetchSelfTask = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlAppointmentTask', { _id: args.selfTaskId }, context);
  if (result) {
    return result;
  }
  const code = 404;
  const response = new MlRespPayload().errorPayload('Appointment self-task not found', code);
  return response;
};

MlResolver.MlMutationResolver.fetchAdminServiceAppointment = (obj, args, context, info) => {
  const orderId = args.orderId;
  const pipeline = [
    { $match: { orderId } },
    {
      $lookup:
      {
      	from: 'mlServiceCardDefinition',
      	localField: 'serviceId',
      	foreignField: '_id',
      	as: 'service'
      }
    },
    { $unwind: '$service' },
    { $addFields: { sessionInfo: '$service.tasks' } },
    { $unwind: '$sessionInfo' },
    {
      $lookup:
      {
      	from: 'mlTask',
      	localField: 'sessionInfo.id',
      	foreignField: '_id',
      	as: 'task'
      }
    },
    { $unwind: '$task' },
    { $unwind: '$sessionInfo.sessions' },
    { $unwind: '$task.session' },
    { $addFields: { isSameSession: { $eq: ['$sessionInfo.sessions.id', '$task.session.sessionId'] } } },
    { $match: { isSameSession: true } },
    {
      $addFields: {
        'sessionInfo.duration': '$task.session.duration',
        owner: {
          userId: '$service.userId',
          profileId: '$service.profileId'
        },
        client: {
          userId: '$userId',
          profileId: '$profileId'
        }
      }
    },
    { $project: { task: 0, isSameSession: 0 } },
    {
      $lookup:
      {
      	from: 'mlAppointments',
      	localField: 'sessionInfo.sessions.id',
      	foreignField: 'appointmentInfo.sessionId',
      	as: 'appointment'
      }
    },
    {
      $unwind:
      {
      	path: '$appointment',
      	preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $or: [
          { 'appointment.appointmentInfo.serviceOrderId': orderId },
          { appointment: { $exists: false } }
        ]
      }
    },
    {
      $addFields: {
        'sessionInfo.status': '$appointment.status',
        'sessionInfo.startDate': '$appointment.startDate'
      }
    },
    {
      $group: {
        _id: '$_id',
        orderId: { $first: '$orderId' },
        serviceId: { $first: '$serviceId' },
        service: { $first: '$service' },
        serviceName: { $first: '$serviceName' },
        amount: { $first: '$amount' },
        tax: { $first: '$tax' },
        discountedAmount: { $first: '$discountedAmount' },
        totalAmount: { $first: '$totalAmount' },
        isActive: { $first: '$isActive' },
        paymentStatus: { $first: '$paymentStatus' },
        createdAt: { $first: '$createdAt' },
        owner: { $first: '$owner' },
        client: { $first: '$client' },
        sessionInfo: { $push: '$sessionInfo' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner.userId',
        foreignField: '_id',
        as: 'ownerInfo'
      }
    },
    { $unwind: '$ownerInfo' },
    { $unwind: '$ownerInfo.profile.externalUserProfiles' },
    {
      $lookup: {
        from: 'users',
        localField: 'client.userId',
        foreignField: '_id',
        as: 'clientInfo'
      }
    },
    { $unwind: '$clientInfo' },
    { $unwind: '$clientInfo.profile.externalUserProfiles' },
    {
      $addFields: {
        isSameOwnerProfile: { $eq: ['$ownerInfo.profile.externalUserProfiles.profileId', '$owner.profileId'] },
        isSameClientProfile: { $eq: ['$clientInfo.profile.externalUserProfiles.profileId', '$client.profileId'] }
      }
    },
    { $match: { isSameOwnerProfile: true, isSameClientProfile: true } },
    {
      $project: {
        _id: 1,
        orderId: 1,
        service: 1,
        serviceId: 1,
        serviceName: 1,
        amount: 1,
        tax: 1,
        discountedAmount: 1,
        totalAmount: 1,
        isActive: 1,
        paymentStatus: 1,
        createdAt: 1,
        sessionInfo: 1,
        owner: {
          userId: '$owner.userId',
          profileId: '$owner.profileId',
          name: '$ownerInfo.profile.displayName',
          cluster: '$ownerInfo.profile.externalUserProfiles.clusterName',
          chapter: '$ownerInfo.profile.externalUserProfiles.chapterName',
          subChapter: '$ownerInfo.profile.externalUserProfiles.subChapterName',
          community: '$ownerInfo.profile.externalUserProfiles.communityName',
          email: '$ownerInfo.profile.email',
          phoneNo: '$ownerInfo.profile.mobileNumber',
          gender: '$ownerInfo.profile.genderType'
        },
        client: {
          userId: '$client.userId',
          profileId: '$client.profileId',
          name: '$clientInfo.profile.displayName',
          cluster: '$clientInfo.profile.externalUserProfiles.clusterName',
          chapter: '$clientInfo.profile.externalUserProfiles.chapterName',
          subChapter: '$clientInfo.profile.externalUserProfiles.subChapterName',
          community: '$clientInfo.profile.externalUserProfiles.communityName',
          email: '$clientInfo.profile.email',
          phoneNo: '$clientInfo.profile.mobileNumber',
          gender: '$clientInfo.profile.genderType'
        }
      }
    }
  ];
  let result = mlDBController.aggregate('MlScOrder', pipeline);
  result = JSON.stringify(result);
  const code = 200;
  const response = new MlRespPayload().successPayload(result, code);
  return response;
};

MlResolver.MlMutationResolver.fetchAdminSessionAppointment = (obj, args, context, info) => {
  const orderId = args.orderId;
  const pipeline = [
    { $match: { appointmentId: orderId } },
    {
      $lookup:
      {
      	from: 'mlServiceCardDefinition',
      	localField: 'appointmentInfo.serviceCardId',
      	foreignField: '_id',
      	as: 'service'
      }
    },
    { $unwind: '$service' },
    {
      $lookup: {
        from: 'users',
        localField: 'provider.userId',
        foreignField: '_id',
        as: 'ownerInfo'
      }
    },
    { $unwind: '$ownerInfo' },
    { $unwind: '$ownerInfo.profile.externalUserProfiles' },
    {
      $lookup: {
        from: 'users',
        localField: 'client.userId',
        foreignField: '_id',
        as: 'clientInfo'
      }
    },
    { $unwind: '$clientInfo' },
    { $unwind: '$clientInfo.profile.externalUserProfiles' },
    {
      $addFields: {
        isSameOwnerProfile: { $eq: ['$ownerInfo.profile.externalUserProfiles.profileId', '$provider.profileId'] },
        isSameClientProfile: { $eq: ['$clientInfo.profile.externalUserProfiles.profileId', '$client.profileId'] }
      }
    },
    { $match: { isSameOwnerProfile: true, isSameClientProfile: true } },
    {
      $project: {
        _id: 1,
        orderId: 1,
        serviceId: 1,
        serviceName: 1,
        service: 1,
        amount: 1,
        tax: 1,
        discountedAmount: 1,
        totalAmount: 1,
        isActive: 1,
        paymentStatus: 1,
        createdAt: 1,
        appointmentInfo: 1,
        owner: {
          userId: '$owner.userId',
          profileId: '$owner.profileId',
          name: '$ownerInfo.profile.displayName',
          cluster: '$ownerInfo.profile.externalUserProfiles.clusterName',
          chapter: '$ownerInfo.profile.externalUserProfiles.chapterName',
          subChapter: '$ownerInfo.profile.externalUserProfiles.subChapterName',
          community: '$ownerInfo.profile.externalUserProfiles.communityName',
          email: '$ownerInfo.profile.email',
          phoneNo: '$ownerInfo.profile.mobileNumber',
          gender: '$ownerInfo.profile.genderType'
        },
        client: {
          userId: '$client.userId',
          profileId: '$client.profileId',
          name: '$clientInfo.profile.displayName',
          cluster: '$clientInfo.profile.externalUserProfiles.clusterName',
          chapter: '$clientInfo.profile.externalUserProfiles.chapterName',
          subChapter: '$clientInfo.profile.externalUserProfiles.subChapterName',
          community: '$clientInfo.profile.externalUserProfiles.communityName',
          email: '$clientInfo.profile.email',
          phoneNo: '$clientInfo.profile.mobileNumber',
          gender: '$clientInfo.profile.genderType'
        }
      }
    }
  ];
  let result = mlDBController.aggregate('MlAppointments', pipeline);
  result = JSON.stringify(result);
  const code = 200;
  const response = new MlRespPayload().successPayload(result, code);
  return response;
};

MlResolver.MlMutationResolver.fetchAppAppointmentByTransactionId = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlTransactionsLog', { _id: args.transactionId }, context);
  if (result.activity === 'Service-Purchased') { return MlResolver.MlMutationResolver.fetchAdminServiceAppointment(obj, { orderId: result.docId }, context, info); }
  return MlResolver.MlMutationResolver.fetchAdminSessionAppointment(obj, { orderId: result.docId }, context, info);
};

MlResolver.MlMutationResolver.cancelUserServiceCardAppointment = (obj, args, context, info) => {
  const appointmentId = args.appointmentId;
  const appointmentInfo = mlDBController.findOne('MlAppointments', { appointmentId }, context);
  if (!appointmentInfo || !appointmentInfo.appointmentInfo || appointmentInfo.appointmentInfo.resourceType !== 'ServiceCard') {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment not found', code);
    return response;
  }

  const serviceId = appointmentInfo.appointmentInfo.serviceCardId;
  const serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!serviceInfo) {
    const code = 400;
    const response = new MlRespPayload().errorPayload("'Service-Id' not found", code);
    return response;
  }

  if (!serviceInfo.termsAndCondition || !serviceInfo.termsAndCondition.isReschedulable) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment not allow to reschedule', code);
    return response;
  }

  const noOfReschedule = serviceInfo.termsAndCondition.noOfReschedulable || 0;
  const rescheduleTrails = appointmentInfo.rescheduleTrail ? rescheduleTrail.rescheduleTrail.length : 0;
  if (noOfReschedule <= rescheduleTrails) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment could not be rescheduled since reschedule limit is reached', code);
    return response;
  }

  const memberResponse = mlDBController.update('MlAppointmentMembers', { appointmentId }, { isCancelled: true }, { $set: true, multi: true }, context);
  if (!memberResponse) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Unable to cancel appointment', code);
    return response;
  }
  const appointmentResponse = mlDBController.update('MlAppointments', { appointmentId }, { isCancelled: true }, { $set: true, multi: true }, context);
  if (!appointmentResponse) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Unable to cancel appointment', code);
    return response;
  }

  const result = new MlRespPayload().successPayload('Appointment cancelled successfully', 200);
  return result;
};

MlResolver.MlMutationResolver.rescheduleUserServiceCardAppointment = (obj, args, context, info) => {
  const appointmentId = args.appointmentId;
  const appointmentInfo = mlDBController.findOne('MlAppointments', { appointmentId }, context);
  if (!appointmentInfo || !appointmentInfo.appointmentInfo || appointmentInfo.appointmentInfo.resourceType !== 'ServiceCard') {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment not found', code);
    return response;
  }

  const serviceId = appointmentInfo.appointmentInfo.serviceCardId;
  const serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!serviceInfo) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Service-Id not found', code);
    return response;
  }

  if (!serviceInfo.termsAndCondition || !serviceInfo.termsAndCondition.isReschedulable) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment could not be rescheduled', code);
    return response;
  }

  const noOfReschedule = serviceInfo.termsAndCondition ? serviceInfo.termsAndCondition.noOfReschedulable : 0;
  const rescheduleTrails = appointmentInfo.rescheduleTrail ? rescheduleTrail.rescheduleTrail.length : 0;
  if (noOfReschedule <= rescheduleTrails) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Appointment could not be rescheduled since reschedule limit is reached', code);
    return response;
  }
  const taskId = appointmentInfo.appointmentInfo.taskId;
  const sessionId = appointmentInfo.appointmentInfo.sessionId;

  const day = args.userServiceCardAppointmentInfo.day; // date.getDate();
  const month = args.userServiceCardAppointmentInfo.month; // date.getMonth();
  const year = args.userServiceCardAppointmentInfo.year; // date.getFullYear();
  const hours = args.userServiceCardAppointmentInfo.hours; // 9;
  const minutes = args.userServiceCardAppointmentInfo.minutes; // 0;
  const appointment = MlAppointment.bookAppointment('appointmentId', taskId, sessionId, hours, minutes, day, month, year);
  if (!appointment.success) {
    const code = 400;
    const response = new MlRespPayload().errorPayload(appointment.message, code);
    return response;
  }

  const update = mlDBController.update('MlAppointments', {
    $set: {
      isRescheduled: true,
      startDate: appointment.start,
      endDate: appointment.end
    },
    $push: {
      rescheduleTrail: {
        startDate: appointmentInfo.startDate,
        endDate: appointmentInfo.endDate,
        rescheduleBy: context.userId,
        rescheduleAt: new Date()
      }
    }
  }, { blackbox: true }, context);

  if (!update) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Unable to reschedule appointment', code);
    return response;
  }
  const code = 400;
  const response = new MlRespPayload().errorPayload('Appointment rescheduled successfully', code);
  return response;
};

MlResolver.MlMutationResolver.cancelUserServiceCardOrder = (obj, args, context, info) => {
  const orderId = args.orderId;
  const orderInfo = mlDBController.findOne('MlUserServiceCardOrder', { orderId }, context);
  const serviceId = orderInfo.serviceId;
  const serviceInfo = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!serviceInfo) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Service-Id not found', code);
    return response;
  }

  if (!serviceInfo.termsAndCondition || !serviceInfo.termsAndCondition.isCancelable || !serviceInfo.termsAndCondition.noOfDaysBeforeCancelation) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Order cannot be cancelled', code);
    return response;
  }

  const currentDate = new Date();
  const orderCancelableDate = new Date(orderInfo.createdAt);
  orderCancelableDate.setDate(orderCancelableDate.getDate() + serviceInfo.termsAndCondition.noOfDaysBeforeCancelation);
  if (currentDate.getTime() > orderCancelableDate.getTime()) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Order cannot be cancelled. Please contact admin.', code);
    return response;
  }
  const findAppoinmtent = mlDBController.findOne('MlAppointments', { 'appointmentInfo.serviceOrderId': orderId }, context);

  if (findAppoinmtent) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Order cannot be cancelled since you have already availed the service', code);
    return response;
  }

  const orderResponse = mlDBController.update('MlUserServiceCardOrder', { orderId }, { isCancelled: true }, { $set: true }, context);
  if (!orderResponse) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Unable to cancel appointment', code);
    return response;
  }

  const result = new MlRespPayload().successPayload('Order cancelled successfully', 200);
  return result;
};

MlResolver.MlMutationResolver.signOffUserServiceCardOrder = (obj, args, context, info) => {
  const orderId = args.orderId;
  const orderResponse = mlDBController.update('MlUserServiceCardOrder', { orderId }, { isSignOff: true }, { $set: true }, context);
  if (!orderResponse) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Unable to sign off', code);
    return response;
  }
  const result = new MlRespPayload().successPayload('Sign-Off successful', 200);
  return result;
};
