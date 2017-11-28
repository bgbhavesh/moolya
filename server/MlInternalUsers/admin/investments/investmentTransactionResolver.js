/**
 * Created by venkatsrinag on 6/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef';
import MlRespPayload from '../../../commons/mlPayload';
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification';
import MlSMSNotification from '../../../mlNotifications/mlSmsNotifications/mlSMSNotification'

MlResolver.MlQueryResolver.fetchProcessTransactions = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver.fetchProcessStages = (obj, args, context, info) => {
  const processStage = mlDBController.find('MlProcessStages', { isActive: true }, context).fetch()
  if (processStage) {
    return processStage
  }
  return {};
}

MlResolver.MlQueryResolver.fetchProcessActions = (obj, args, context, info) => {
  const result = mlDBController.find('MlActions', { isActive: true, isProcessAction: true }).fetch() || []
  return result
}

MlResolver.MlQueryResolver.fetchProcessTransactionCustomerDetails = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver.fetchProcessSetup = (obj, args, context, info) => {
  if (args.processTransactionId) {
    const processSetup = mlDBController.findOne('MlProcessSetup', { processTransactionId: args.processTransactionId }, context)
    if (processSetup) {
      return processSetup
    }
  }
  return {};
}

MlResolver.MlQueryResolver.fetchUserProcessSetup = (obj, args, context, info) => {
  if (context.userId) {
    const Actions = mlDBController.find('MlActions', {}, context).fetch();
    const processSetup = mlDBController.findOne('MlProcessSetup', { userId: context.userId }, context)
    if (processSetup) {
      processSetup.processSteps.map((steps, index) => {
        if (processSetup.processSteps[index]) {
          const stageData = MlProcessStages.findOne({ _id: steps.stageId }) || {};
          processSetup.processSteps[index].stageName = stageData.displayName || '';
          processSetup.processSteps[index].stage = stageData.name || '';

          if (processSetup.processSteps[index].stageActions && processSetup.processSteps[index].stageActions.length) {
            processSetup.processSteps[index].stageActions = processSetup.processSteps[index].stageActions.map((action) => {
              const isFind = Actions.find(mlAction => mlAction._id == action.actionId);
              if (isFind) {
                action.actionName = isFind.name;
              }

              return action;
            });
          }
        }
      })
      return processSetup
    }
  }
  return {};
}

MlResolver.MlMutationResolver.createProcessTransaction = (obj, args, context, info) => {
  if (args.portfoliodetails) {
    let ret;
    try {
      const trans = mlDBController.findOne('MlProcessTransactions', {
        portfolioId: args.portfoliodetails.portfolioId
      }, context)
      if (!trans) {
        orderNumberGenService.assignProcessSetupTransaction(args.portfoliodetails)
        ret = mlDBController.insert('MlProcessTransactions', args.portfoliodetails, context)
      } else {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Process setup already exists', code);
        return response;
      }
    } catch (e) {
      const code = 409;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    const code = 200;
    const response = new MlRespPayload().successPayload(ret, code);
    return response;
  }
}

MlResolver.MlMutationResolver.updateProcessSetup = (obj, args, context, info) => {
  if (args.processTransactionId) {
    let ret;
    const processSetup = mlDBController.findOne('MlProcessSetup', { processTransactionId: args.processTransactionId }, context)

    if (processSetup) {
      try {
        ret = mlDBController.update('MlProcessSetup', { processTransactionId: args.processTransactionId }, args.processSetup, { $set: true }, context)
      } catch (e) {
        const code = 409;
        const response = new MlRespPayload().errorPayload(e.message, code);
        return response;
      }
    } else {
      try {
        const process = mlDBController.findOne('MlProcessTransactions', { _id: args.processTransactionId }, context)
        const users = mlDBController.findOne('users', { _id: process.userId }, context)
        if (users) { args.processSetup.username = users.username; }

        ret = mlDBController.insert('MlProcessSetup', args.processSetup, context)
      } catch (e) {
        const code = 409;
        const response = new MlRespPayload().errorPayload(e.message, code);
        return response;
      }
    }

    if (ret) {
      const userId = processSetup && processSetup.userId ? processSetup.userId : ''
      const userDetails = mlDBController.findOne('users', { _id: userId }, context)
      MlEmailNotification.processSetupCompletedByAdmin(userDetails)
      MlSMSNotification.processSetupCompleted(userId)
    }

    const code = 200;
    const response = new MlRespPayload().successPayload(ret, code);
    return response;
  }
}

MlResolver.MlMutationResolver.updateProcessTransaction = (obj, args, context, info) => {
  let ret = '';
  try {
    if (!args.processTransactions) {
      const code = 400;
      const response = new MlRespPayload().successPayload('Invalid Request', code);
      return response;
    }
    const deviceDetails = {
      ipAddress: context.ip,
      deviceName: context.browser
    }
    args.processTransactions.deviceDetails = deviceDetails;
    ret = mlDBController.update('MlProcessTransactions', { _id: args.processTransactionId }, args.processTransactions, { $set: true }, context)
    if (!ret) {
      const code = 200;
      const response = new MlRespPayload().errorPayload('Error', code);
      return response;
    }
  } catch (e) {
    const code = 400;
    const response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
  /* if(ret){
    MlEmailNotification.officePaymentLink()
  } */
  const code = 200;
  const response = new MlRespPayload().successPayload(`Payment link generated successfully${ret}`, code);
  return response;
}
