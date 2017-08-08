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

MlResolver.MlMutationResolver["bookUserServiceCard"] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let serviceId = args.serviceId;
  let service = mlDBController.findOne('MlService', serviceId , context);
  let tax = 0; // Need to update later
  let discountAmount = 0; // Need to update later

  /**
   * Define data to insert in service card order
   * Note :: start date and end data will update when user create payment
   */
  let dataToInsert = {
    userId: userId,
    profileId: profileId,
    serviceId: serviceId,
    serviceName: service.name,
    amount: service.finalAmount,
    tax: tax,
    promoCode: "", // Need to update later
    discountedAmount: discountAmount,
    totalAmount: service.finalAmount + tax - discountAmount,
    isActive: false,
    isExpired: false,
    paymentStatus: 'unpaid',
    createdAt: new Date(),
    taskDetails:args.taskDetails
  };
  orderNumberGenService.createUserServiceOrderId(dataToInsert);
  let result = mlDBController.insert('MlUserServiceCardOrder', dataToInsert , context);
  if(typeof result === "string") {
    let code = 200;
    let response = new MlRespPayload().errorPayload(dataToInsert.transactionId, code);
    return response;
  }
  let code = 400;
  let response = new MlRespPayload().errorPayload(result, code);
  return response;
};

MlResolver.MlMutationResolver["userServiceCardPayment"] = (obj, args, context, info) => {
  let orderId = args.userServiceCardPaymentInfo.orderId;
  let userId = context.userId;
  let service = mlDBController.findOne('MlUserServiceCardOrder', {transactionId: orderId}, context);
  let dataToInsert = {
    paymentId: args.userServiceCardPaymentInfo.paymentId,
    paymentMethod: args.userServiceCardPaymentInfo.paymentMethod,
    amount: args.userServiceCardPaymentInfo.amount,
    currencyId: args.userServiceCardPaymentInfo.currencyCode,
    resourceId: orderId,
    resourceType: "UserServiceCard",
    userId: userId,
    createdAt: new Date()
  };
  let paymentResponse = mlDBController.insert('MlPayment', dataToInsert, context);
  if(typeof paymentResponse === "string" ) {
    let serviceResponse = mlDBController.update('MlUserServiceCardOrder', service._id, {paymentStatus: 'paid'}, {$set: 1}, context);
    if(serviceResponse) {
      //Add leader balance
      let code = 200;
      let response = new MlRespPayload().errorPayload("Payment Updated", code);
      return response;
    } else {
      let code = 400;
      let response = new MlRespPayload().errorPayload(paymentResponse, code);
      return response;
    }
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload(paymentResponse, code);
    return response;
  }
};

MlResolver.MlMutationResolver["bookUserServiceCardAppointment"] = (obj, args, context, info) => {
  let orderId = args.userServiceCardAppointmentInfo.orderId;
  let sessionId = args.userServiceCardAppointmentInfo.sessionId;
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

  let serviceLedgerBalance = mlDBController.findOne('MlServiceLedger', {serviceId: serviceId}, context);
  let taskInfo = serviceLedgerBalance.serviceCard.tasks; // Update task fetch info in case serviceLedgerBalance schema update
  let task = taskInfo.find(function (data) {
    data.sessions = data.sessions ? data.sessions : [];
    return data.sessions.some(function (session) {
      return session.id == sessionId;
    });
  });

  if(!task){
    let code = 400;
    let response = new MlRespPayload().errorPayload("Task id is not attached in order", code);
    return response;
  }

  let taskId = task.id;

  if(!taskId) {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Task id is not attached in service card definition", code);
    return response;
  }

  let day = args.userServiceCardAppointmentInfo.day; //date.getDate();
  let month = args.userServiceCardAppointmentInfo.month; //date.getMonth();
  let year = args.userServiceCardAppointmentInfo.year; //date.getFullYear();
  let hours = args.userServiceCardAppointmentInfo.hours; //9;
  let minutes = args.userServiceCardAppointmentInfo.minutes; // 0;
  let appointment = MlAppointment.bookAppointment('appointmentId', taskId, sessionId, hours, minutes, day, month, year);
  if(appointment.success) {
    let taskDoc = mlDBController.findOne('MlTask', taskId, context);
    let session = taskDoc.session.find(function (data) {
        return data.sessionId == sessionId;
    });

    session.activities = session.activities ? session.activities : [];

    let activities = mlDBController.find('MlActivity', { _id : { $in : session.activities } }, context).fetch();

    let attendees = activities.reduce(function(attendee, data) {
      data.teams = data.teams ? data.teams : [];
      data.teams.forEach(function (team) {
        team.users = team.users ? team.users : [];
        team.users = team.users.filter(function (user) {
          let isFind = attendee.find(function (data) {
            return user.profileId == data.profileId && user.userId == user.profileId;
          });
          if (isFind) {
            return false;
          } else {
            return true;
          }
        });
        attendee = attendee.concat(team.users);
      });
      return attendee;
    }, []);

    let userId = context.userId;
    let profileId = new MlUserContext().userProfileDetails(userId).profileId;
    let service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
    let appointmentData = {
      appointmentType: 'SERVICE-TASK',
      startDate: appointment.start,
      endDate: appointment.end,
      duration: session.duration ? session.duration : {},
      timeZone: '+05:30', //to do
      provider: {
        userId: service.userId,
        profileId: service.profileId
      },
      client: {
        userId: userId,
        profileId: profileId
      },
      appointmentInfo: {
        resourceType: 'ServiceCard',
        resourceId: SCOrderDetails.serviceId,
        serviceCardId: SCOrderDetails.serviceId,
        serviceName: SCOrderDetails.serviceName,
        taskId: taskId,
        sessionId: sessionId,
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

    let result = mlDBController.insert('MlAppointments', appointmentData, context);

    if(result){

      /**
       * Insert appointment member info
       */
      attendees.forEach(function (attendee) {
        let attendeeData = {
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
        let resp = mlDBController.insert('MlAppointmentMembers', attendeeData, context);
      });

      /**
       * Insert client data as appointment member
       */
      let clientData = {
        appointmentId: appointmentData.appointmentId,
        appointmentUniqueId: result,
        userId: service.userId,
        profileId: service.profileId,
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
      let providerData = {
        appointmentId: appointmentData.appointmentId,
        appointmentUniqueId: result,
        userId: userId,
        profileId: profileId,
        status: 'Accepted',
        isProvider: true,
        isClient: false,
        isAttendee: false,
        createdAt: new Date(),
        createdBy: userId
      };
      resp = mlDBController.insert('MlAppointmentMembers', providerData, context);

      let code = 200;
      let response = new MlRespPayload().successPayload("Appointment book successfully", code);
      return response;
    }
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload(appointment.message, code);
    return response;
  }
};

MlResolver.MlQueryResolver["fetchMyAppointment"] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let appointments = mlDBController.aggregate( 'MlAppointments', [
    {
      $lookup: {
        from: "mlAppointmentMembers",
        localField: "appointmentId",
        foreignField: "appointmentId",
        as: "members"
      }
    },
    { "$unwind": "$members" },
    { "$match": {'members.userId':userId, 'members.profileId':profileId } }
  ]);
  return appointments;
};

MlResolver.MlQueryResolver["fetchAllProfileAppointmentCounts"] = (obj, args, context, info) => {
  let userId = context.userId;
  let pipeLine = [
      { $lookup: { from: "mlAppointmentMembers", localField: "appointmentId", foreignField: "appointmentId", as: "members"}},
      { $unwind: "$members"},
      { $match : { "members.userId" : userId } },
      { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
        time: { $dateToString: { format: "%H:%M:%S:%L", date: "$Date" } },
        appointmentInfo: 1,
          members: 1,
          userId: "$members.userId",
          profileId: "$members.profileId",
          appointmentId: 1 } },
      {
        $group : {
          _id : { date : "$yearMonthDay", "userId":"$userId", "profileId": "$profileId" },
          count: { $sum: 1 }
        }
      },
      {
        $project : {
          _id:0,
          date: "$_id.date",
          userId: "$_id.userId",
          profileId: "$_id.profileId",
          count: "$count"
        }
      },
      {
        $group: {
          _id: null,
          profileId: { $first : "$profileId" },
          events: { $push: "$$ROOT" }
        }
      }
    ];
  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  result = result && result[0] ? result[0] : [];
  return result;
};

MlResolver.MlQueryResolver["fetchProfileAppointmentCounts"] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId = args.profileId;
  let pipeLine = [
    { $lookup: { from: "mlAppointmentMembers", localField: "appointmentId", foreignField: "appointmentId", as: "members"}},
    { $unwind: "$members"},
    { $match : { "members.userId" : userId, "members.profileId" : profileId } },
    { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
      time: { $dateToString: { format: "%H:%M:%S:%L", date: "$Date" } },
      appointmentInfo: 1,
      members: 1,
      userId: "$members.userId",
      profileId: "$members.profileId",
      appointmentId: 1 } },
    {
      $group : {
        _id : { date : "$yearMonthDay", "userId":"$userId", "profileId": "$profileId" },
        count: { $sum: 1 }
      }
    },
    {
      $project : {
        _id:0,
        date: "$_id.date",
        userId: "$_id.userId",
        profileId: "$_id.profileId",
        count: "$count"
      }
    },
    {
      $group: {
        _id: null,
        profileId: { $first : "$profileId" },
        events: { $push: "$$ROOT" }
      }
    },
    {
      $lookup:  { from: "mlCalendarSettings", localField: "profileId", foreignField: "profileId", as: "days"}
    },
    { "$unwind": {
      "path": "$days",
      "preserveNullAndEmptyArrays": true
    }
    },
    {
      "$addFields": { "days" : { $cond: [ { $isArray: "$days.vacations"}, "$days.vacations", [] ] } }
    },
    {
      $project: {
        events: 1,
        days: {
          "$filter" : {
            "input": "$days",
            "as": "day",
            "cond": {
              "$and":[
                {"$or": [
                  { "$cond": [ { "$eq" : [{ "$month":"$$day.start" }, 8 ] }, true, false ] },
                  { "$cond": [ { "$eq" : [{ "$month":"$$day.end" }, 8 ] }, true, false ] }
                ]},
                { "$eq" : ["$$day.isActive", true] }
              ]
            }
          }
        }
      }
    }
  ];

  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  result = result && result[0] ? result[0] : [];
    return result;

};

MlResolver.MlMutationResolver["bookTaskInternalAppointment"] = (obj, args, context, info) => {
  let taskId = args.taskInternalAppointmentInfo.taskId;
  let sessionId = args.taskInternalAppointmentInfo.sessionId;
  let day = args.taskInternalAppointmentInfo.day; //date.getDate();
  let month = args.taskInternalAppointmentInfo.month; //date.getMonth();
  let year = args.taskInternalAppointmentInfo.year; //date.getFullYear();
  let hours = args.taskInternalAppointmentInfo.hours; //9;
  let minutes = args.taskInternalAppointmentInfo.minutes; // 0;

  let startDate = new Date();
  startDate.setDate(day);
  startDate.setMonth(month);
  startDate.setYear(year);
  startDate.setHours(hours);
  startDate.setMinutes(minutes);
  startDate.setSeconds(0,0);

  let taskDoc = mlDBController.findOne('MlTask', taskId, context);
  let session = taskDoc.session.find(function (data) {
    return data.sessionId == sessionId;
  });

  session.activities = session.activities ? session.activities : [];

  let activities = mlDBController.find('MlActivity', { _id : { $in : session.activities } }, context).fetch();

  let attendees = activities.reduce(function(attendee, data) {
    data.teams = data.teams ? data.teams : [];
    data.teams.forEach(function (team) {
      team.users = team.users ? team.users : [];
      team.users = team.users.filter(function (user) {
        let isFind = attendee.find(function (data) {
          return user.profileId == data.profileId && user.userId == user.profileId;
        });
        if (isFind) {
          return false;
        } else {
          return true;
        }
      });
      attendee = attendee.concat(team.users);
    });
    return attendee;
  }, []);

  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;

  session.duration = session.duration ? session.duration : {}
  let sessionHours = session.duration.hours ? session.duration.hours : 0;
  let sessionMinutes = session.duration.minutes ? session.duration.minutes : 0;
  let endDate = new Date(startDate);
  endDate.setHours(hours+sessionHours);
  endDate.setMinutes(minutes+sessionMinutes);

  let appointmentData = {
    appointmentType: 'INTERNAL-TASK',
    startDate: startDate,
    endDate: endDate,
    duration: session.duration ? session.duration : {},
    timeZone: '+05:30', //to do
    provider: {
      userId: taskDoc.userId,
      profileId: taskDoc.profileId
    },
    appointmentInfo: {
      resourceType: 'Task',
      resourceId: taskId,
      taskId: taskId,
      taskName: taskId.displayName,
      sessionId: sessionId
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

  let result = mlDBController.insert('MlAppointments', appointmentData, context);

  if(result){

    /**
     * Insert appointment member info
     */
    attendees.forEach(function (attendee) {
      let attendeeData = {
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
      let resp = mlDBController.insert('MlAppointmentMembers', attendeeData, context);
    });

    let code = 200;
    let response = new MlRespPayload().successPayload("Appointment book successfully", code);
    return response;
  }
};

MlResolver.MlMutationResolver["bookSelfTaskInternalAppointment"] = (obj, args, context, info) => {
  let day = args.selfInternalAppointmentInfo.day; //date.getDate();
  let month = args.selfInternalAppointmentInfo.month; //date.getMonth();
  let year = args.selfInternalAppointmentInfo.year; //date.getFullYear();
  let hours = args.selfInternalAppointmentInfo.hours; //9;
  let minutes = args.selfInternalAppointmentInfo.minutes; // 0;

  let taskDetails = args.selfInternalAppointmentInfo.taskDetails;

  let taskId = mlDBController.insert('MlAppointmentTask', taskDetails, context);

  let startDate = new Date();
  startDate.setDate(day);
  startDate.setMonth(month);
  startDate.setYear(year);
  startDate.setHours(hours);
  startDate.setMinutes(minutes);
  startDate.setSeconds(0,0);

  taskDetails.duration = taskDetails.duration ? taskDetails.duration : {};

  let sessionHours = taskDetails.duration.hours ? taskDetails.duration.hours : 0;
  let sessionMinutes = taskDetails.duration.minutes ? taskDetails.duration.minutes : 0;

  let endDate = new Date(startDate);
  endDate.setHours(hours+sessionHours);
  endDate.setMinutes(minutes+sessionMinutes);

  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;

  let appointmentData = {
    appointmentType: 'SELF-TASK',
    startDate: startDate,
    endDate: endDate,
    duration: taskDetails.duration ? taskDetails.duration : {},
    timeZone: '+05:30', //to do
    provider: {
      userId: userId,
      profileId: profileId
    },
    appointmentInfo: {
      resourceType: 'Task',
      resourceId: taskId,
      taskId: taskId,
      taskName: taskDetails.name,
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

  let result = mlDBController.insert('MlAppointments', appointmentData, context);

  if(result){

    /**
     * Insert provider data as appointment member
     */
    let providerData = {
      appointmentId: appointmentData.appointmentId,
      appointmentUniqueId: result,
      userId: userId,
      profileId: profileId,
      status: 'Accepted',
      isProvider: true,
      isClient: false,
      isAttendee: false,
      createdAt: new Date(),
      createdBy: userId
    };
    let resp = mlDBController.insert('MlAppointmentMembers', providerData, context);


    let code = 200;
    let response = new MlRespPayload().successPayload("Appointment book successfully", code);
    return response;
  }
};

MlResolver.MlQueryResolver["fetchServiceSeekerList"] = (obj, args, context, info) => {

  let userId = context.userId;
  let profileId = args.profileId;

  let pipeLine = [
    {"$match":{"profileId": userId, "profileId": profileId}}
  ];

  if(args.serviceId) {
    pipeLine.push({
      "$match" : { "serviceId": args.serviceId }
    });
  }

  pipeLine.push({
    "$lookup": { from: "mlScOrder", localField: "_id", foreignField: "serviceId", as: "orders" }
  });

  pipeLine.push({
    "$unwind" : "$orders"
  });

  pipeLine.push({
    "$lookup": { from: "users", localField: "orders.userId", foreignField: "_id", as: "users" }
  });

  pipeLine.push({ "$unwind" : "$users" });

  pipeLine.push({
    "$project" :
      {
        "name": "$users.profile.displayName",
        "userId": "$orders.userId",
        "profileId": "$orders.profileId",
        "transId": "$orders.orderId"
      }
  });

  let result = mlDBController.aggregate('MlServiceCardDefinition', pipeLine );

  return result;

};

MlResolver.MlQueryResolver["fetchMyAppointment"] = (obj, args, context, info) => {
  let userId = context.userId;
  let profileId = args.profileId;
  let date = new Date();
  let day = args.day ? args.day : date.getDate();
  let month = args.month ? args.month : date.getMonth();
  let year = args.year ? args.year : date.getFullYear();
  let response = MlAppointment.getUserAppointments(userId, profileId, day, month, year);
  return response;
};
