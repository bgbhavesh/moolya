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
  let task = taskInfo.filter(function (data) {
    data.sessions = data.sessions ? data.sessions : [];
    return data.sessions.some(function (session) {
      return session.id == sessionId;
    });
  });

  if(!task.length){
    let code = 400;
    let response = new MlRespPayload().errorPayload("Session id is not attached in order", code);
    return response;
  }

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let appointment = MlAppointment.bookAppointment('appointmentId', sessionId, 9, 0, day, month, year);
  if(appointment.success){
    let userId = context.userId;
    let profileId = new MlUserContext().userProfileDetails(userId).profileId;
    let service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
    let appointmentData = {
      seeker: {
        userId: userId,
        profileId: profileId
      },
      provider: {
        userId: service.userId,
        profileId: service.profileId
      },
      serviceId: SCOrderDetails.serviceId,
      serviceName: SCOrderDetails.serviceName,
      sessionId: sessionId,
      startDate: appointment.start,
      endDate: appointment.end,
      isActive: true,
      isInternal: false,
      createdAt: new Date()
    };
    let result = mlDBController.insert('MlAppointments', appointmentData, context);
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload("Appointment book successfully", code);
      return response;
    }
  } else {
    console.log('MlAppointment', appointment);
  }
};
