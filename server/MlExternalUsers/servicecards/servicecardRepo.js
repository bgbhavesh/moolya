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
            case 'CREATESERVICE':{
              return true;
            }
            break;

          case 'UPDATESERVICE':{
            return true
          }
          break;
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

    createServiceCardOrder(){
    }

    updateServiceCardOrder(){
    }

    createServiceLedger(){
    }

    updateServiceLedger(){
    }
}

const mlServiceCardRepo = new MlServiceCardRepo();
Object.freeze(mlServiceCardRepo);

export default mlServiceCardRepo;

