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
      createdAt: new Date()
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
      }
    ];
  let result = mlDBController.aggregate('MlAppointments', pipeLine);
  return result;
};
