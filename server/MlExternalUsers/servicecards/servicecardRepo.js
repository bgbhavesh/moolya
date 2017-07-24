/**
 * Created by venkatsrinag on 21/7/17.
 */
import MlUserContext from '../mlUserContext'
import MlRespPayload from '../../commons/mlPayload'
import _ from 'lodash'

const INITIAL_VERSION = 0.001;

class MlServiceCardRepo{
    constructor(){
      this.profile = {};
    }

    validateServiceCardActions(userId, resourceName, userAction, payload){
        var defaultProfile = new MlUserContext().userProfileDetails(userId);
        if(!defaultProfile)
            return {success:false, msg:"Invalid User Details"};

        this.profile = defaultProfile;

        switch (userAction){
            case 'CREATESERVICEDEF':{
              return true;
            }
            break;
            case 'UPDATESERVICEDEF':{
              return true
            }
            break;
            case 'CREATESERVICEORDER':{
              return true
            }
            break
        }
        return false
    }


    createServiceCardDefinition(service, context){
        var result;
        try {
            var serviceCard                 = service;
            serviceCard["createdAt"]        = new Date();
            serviceCard['userId']           =  context.userId;
            serviceCard['profileId']        =  service.profileId;
            serviceCard["versions"]         =  INITIAL_VERSION;
            serviceCard["isApproved"]       =  false;
            serviceCard["isCurrentVersion"] =  true;
            orderNumberGenService.createServiceId(serviceCard);
            result = mlDBController.insert('MlServiceCardDefinition' , serviceCard, context)
            if(!result){
              let code = 400;
              return new MlRespPayload().errorPayload(result, code);
            }
        }catch (e){
          return new MlRespPayload().errorPayload(e.message, 400);
        }
        return new MlRespPayload().successPayload(result, 200);
    }

    createBespokeServiceCardDefinition(service, context){
      var result;
      var defaultProfile = new MlUserContext().userProfileDetails(context.userId);
      try {
        var serviceCard                     = service;
        serviceCard["createdAt"]            = new Date();
        serviceCard["beSpokeCreatorUserId"] = context.userId;
        serviceCard["beSpokeCreatorProfileId"] = service.profileId;
        serviceCard['isBeSpoke']             = true;
        serviceCard["versions"]             =  INITIAL_VERSION;
        orderNumberGenService.createServiceId(serviceCard);
        var portfolioDetailsTransactions = mlDBController.findOne('MlPortfolioDetails', {_id: servicecard.profileId}, context)
        if(portfolioDetailsTransactions){
          serviceCard["userId"]     = portfolioDetailsTransactions.userId
          serviceCard["profileId"]  = portfolioDetailsTransactions.profileId
        }

        result = mlDBController.insert('MlServiceCardDefinition' , serviceCard, context)
        if(!result){
          let code = 400;
          return new MlRespPayload().errorPayload(result, code);
        }
      }catch (e){
        return new MlRespPayload().errorPayload(e.message, 400);
      }
      return new MlRespPayload().successPayload(result, 200);
    }

    updateServiceCardDefinition(servicecard, serviceId, context){
      var service;
      if(_.isEmpty(servicecard) || _.isEmpty(serviceId)) {
        return new MlRespPayload().errorPayload("Invalid Service Card", 400);
      }
      try{
        service = mlDBController.findOne('MlServiceCardDefinition', {_id: serviceId}, context);
        if(!service){
          return new MlRespPayload().errorPayload("Invalid Service Card", 400);
        }

        if(servicecard.tasks){
          let taskIds = servicecard.tasks.map(function (task) { return task.id; });
          let tasks = mlDBController.find('MlTask', {_id: { $in : taskIds } }, context).fetch();
          let taskAmount = 0;
          let noOfSession = 0;
          let taskDerivedAmount = 0;
          tasks.forEach(function (task) {
            noOfSession += task.noOfSession ? task.noOfSession : 0;
            taskAmount += task.payment && task.payment.amount ? task.payment.amount : 0;
            taskDerivedAmount += task.payment && task.payment.derivedAmount ? task.payment.derivedAmount : 0;
          });
          let totalMinutes = tasks.reduce((sum, value) => {
            let duration = value.duration ? value.duration : {};
            return sum + (duration.hours ? duration.hours : 0)*60 + ( duration.minutes ? duration.minutes : 0 ) ;
          }, 0);
          let duration = {
            hours: parseInt(totalMinutes/60),
            minutes: totalMinutes % 60
          };
          servicecard.duration = servicecard.duration ? servicecard.duration : {};
          servicecard.duration['hours'] = duration.hours;
          servicecard.duration['minutes'] = duration.minutes;
          servicecard.noOfSession = noOfSession;
          servicecard.payment = servicecard.payment ? servicecard.payment : {};
          servicecard.payment["tasksAmount"] = taskAmount;
          servicecard.payment["tasksDiscount"] = taskAmount - taskDerivedAmount;
          servicecard.payment["tasksDerived"] = taskDerivedAmount;
        }
        if (servicecard.termsAndCondition) {
          service.termsAndCondition = servicecard.termsAndCondition;
        }
        service.tasks       = servicecard.tasks;
        service.duration    = servicecard.duration;
        service.noOfSession = servicecard.noOfSession;
        service.payment     = servicecard.payment;
        service.finalAmount = servicecard.finalAmount
        let result = mlDBController.update('MlServiceCardDefinition', {_id: service._id}, service, {$set: 1}, context);
        if(!result){
          return new MlRespPayload().errorPayload("Error In Updating The Service Card", 400);
        }
      }catch (e){
        return new MlRespPayload().errorPayload(e.message, 400);
      }

      return new MlRespPayload().successPayload("Service Card Updated Successfully", 200);
    }

    updateServiceCardDefinitionForVersion(servicecard, serviceId, context){
      var service;
      if(_.isEmpty(servicecard) || _.isEmpty(serviceId)) {
        return new MlRespPayload().errorPayload("Invalid Service Card", 400);
      }
      try {
        let oldService = mlDBController.findOne('MlServiceCardDefinition', {_id: serviceId}, context);
        if(!oldService){
          return new MlRespPayload().errorPayload("Invalid Service Card", 400);
        }
        let query = {transactionId: oldService.transactionId,isCurrentVersion: true};
        service = mlDBController.findOne('MlServiceCardDefinition', query, context);
        if(!service){
          return new MlRespPayload().errorPayload("Invalid Service Card", 400);
        }

        if(servicecard.tasks){
          let taskIds = servicecard.tasks.map(function (task) { return task.id; });
          let tasks = mlDBController.find('MlTask', {_id: { $in : taskIds } }, context).fetch();
          let taskAmount = 0;
          let noOfSession = 0;
          let taskDerivedAmount = 0;
          tasks.forEach(function (task) {
            noOfSession += task.noOfSession ? task.noOfSession : 0;
            taskAmount += task.payment && task.payment.amount ? task.payment.amount : 0;
            taskDerivedAmount += task.payment && task.payment.derivedAmount ? task.payment.derivedAmount : 0;
          });
          let totalMinutes = tasks.reduce((sum, value) => {
            let duration = value.duration ? value.duration : {};
            return sum + (duration.hours ? duration.hours : 0)*60 + ( duration.minutes ? duration.minutes : 0 ) ;
          }, 0);
          let duration = {
            hours: parseInt(totalMinutes/60),
            minutes: totalMinutes % 60
          };
          servicecard.duration = servicecard.duration ? servicecard.duration : {};
          servicecard.duration['hours'] = duration.hours;
          servicecard.duration['minutes'] = duration.minutes;
          servicecard.noOfSession = noOfSession;
          servicecard.payment = servicecard.payment ? servicecard.payment : {};
          servicecard.payment["tasksAmount"] = taskAmount;
          servicecard.payment["tasksDiscount"] = taskAmount - taskDerivedAmount;
          servicecard.payment["tasksDerived"] = taskDerivedAmount;
          servicecard.payment["finalAmount"] = taskDerivedAmount;
        }
        service.isCurrentVersion = false;
        servicecard.userId          = context.userId;
        servicecard.updatedAt       = new Date();
        servicecard.transactionId   = service.transactionId;
        servicecard.versions        = service.versions + INITIAL_VERSION;
        servicecard.isCurrentVersion = true;

        // de activating older version service card def
        let result = mlDBController.update('MlServiceCardDefinition', {_id: service._id}, service, {$set: 1}, context);

        // Creating new version service card def
        let newScVersion = mlDBController.insert('MlServiceCardDefinition', args.Services , context);
        if(!newScVersion){
          return new MlRespPayload().errorPayload("Error In Updating The Service Card", 400);
        }
      }catch (e){
        return new MlRespPayload().errorPayload(e.message, 400);
      }
      return new MlRespPayload().successPayload("Service Card Updated Successfully", 200);
    }

    createServiceCardOrder(payload, context) {
      var defaultProfile = new MlUserContext().userProfileDetails(context.userId);
      var serviceId = payload.serviceId;
      var tax = 0; // Need to update later
      var discountAmount = 0; // Need to update later
      var result;

      /**
       * Define data to insert in service card order
       * Note :: start date and end data will update when user create payment
       */

      try {
        var service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
        if (!service) {
          return new MlRespPayload().errorPayload("Invalid Service", 400);
        }

        var dataToInsert = {
          userId: context.userId,
          profileId: defaultProfile.profileId,
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
          tasks: service.tasks
        }
        orderNumberGenService.createUserServiceOrderId(dataToInsert);
        result = mlDBController.insert('MlScOrder', dataToInsert, context);
        if (!result) {
          return new MlRespPayload().errorPayload('Error In Booking Service Card', 400);
        }

      } catch (e) {
        return new MlRespPayload().errorPayload(e.message, 400);
      }
      return new MlRespPayload().successPayload(dataToInsert.orderId, 200);
    }

    updateServiceCardOrder(payload, context)
    {
      let orderId = payload.userServiceCardPaymentInfo.orderId;
      let userId = context.userId;

      try {
        let service = mlDBController.findOne('MlScOrder', {orderId: orderId}, context);
        let dataToInsert = {
          paymentId         : payload.userServiceCardPaymentInfo.paymentId,
          paymentMethod     : payload.userServiceCardPaymentInfo.paymentMethod,
          amount            : payload.userServiceCardPaymentInfo.amount,
          currencyId        : payload.userServiceCardPaymentInfo.currencyCode,
          resourceId        : orderId,
          resourceType      : "UserServiceCard",
          userId            : userId,
          createdAt         : new Date()
        };
        let paymentResponse = mlDBController.insert('MlPayment', dataToInsert, context);
        if(!paymentResponse){
          return new MlRespPayload().errorPayload(paymentResponse, 400);
        }
        let serviceResponse = mlDBController.update('MlScOrder', service._id, {paymentStatus: 'paid'}, {$set: 1}, context);
        if(!serviceResponse){
          return new MlRespPayload().errorPayload("Error In Payment", 400);
        }
      }catch (e){
        return new MlRespPayload().errorPayload(e.message, 400)
      }
      return new MlRespPayload().successPayload("Payment Updated", 200);
    }

    createServiceCard(serviceDefId, context){
        try {
          var defaultProfile = new MlUserContext().userProfileDetails(context.userId);
          var serviceDef = mlDBController.findOne('MlServiceCardDefinition', {_id:serviceDefId}, context)
          if(!serviceDef)
            return new MlRespPayload().errorPayload("Error In Fetching Service Card Definition", 400)

          var serviceCard = {};
          serviceCard["userId"] = context.userId;
          serviceCard["profileId"] = defaultProfile.profileId;
          serviceCard["serviceDefId"] = serviceDefId;
          serviceCard["isActive"] = true;
          serviceCard["tasks"] = serviceDef.tasks;
          serviceCard["isExpired"] = false;
          serviceCard["startDate"] = new Date();

          // Need to add these three fields
          //serviceCard["expiryDate"] = new Date();
          //serviceCard["transactionId"] = new Date();
          //serviceCard["serviceName"] = new Date();
          result = mlDBController.insert('MlServiceCards' , serviceCard, context)
          if(!result)
            return new MlRespPayload().errorPayload(e.message, 400)

        }catch (e){
          return new MlRespPayload().errorPayload(e.message, 400)
        }

        return new MlRespPayload().successPayload(result, 200);
    }

    updateServiceCard(context){

    }

    createServiceLedger(serviceId, context){
      try {
        var defaultProfile = new MlUserContext().userProfileDetails(context.userId);
        var service = mlDBController.findOne('MlServiceCards', {serviceDefId: serviceId}, context)
        if(!service)
          return new MlRespPayload().errorPayload("Error In Updating Ledger Balance", 400)

        var serviceCard = {};
        serviceCard["userId"]         = context.userId;
        serviceCard["profileId"]      = defaultProfile.profileId;
        serviceCard["serviceId"]      = serviceId;
        serviceCard["serviceCard"]    = {tasks: service.tasks};
        // Need to Update
        // serviceCard["serviceType"]      = serviceType

        result = mlDBController.insert('MlServiceLedger' , serviceCard, context)
        if(!result)
          return new MlRespPayload().errorPayload(e.message, 400)

      }catch (e){
        return new MlRespPayload().errorPayload(e.message, 400)
      }

      return new MlRespPayload().successPayload("Service Card Created Successfully", 200);
    }

    updateServiceLedger(serviceId, context){
    }
}

const mlServiceCardRepo = new MlServiceCardRepo();
Object.freeze(mlServiceCardRepo);

export default mlServiceCardRepo;

