import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
MlResolver.MlMutationResolver.updatePayment = (obj, args, context, info) => {
  console.log(args);
  const paymentId = args.transID;
  if (!paymentId) {
    return;
  }

  const paymentSuccess = args.paymentStatus;
  if (!paymentSuccess) {
    return;
  }

  const paymentInfo = mlDBController.findOne('MlPayment', { paymentId }, context);
  if (!paymentInfo) {
    return
  }
  const activityType = paymentInfo.activityType;
  let response = null;
  switch (activityType) {
    case 'OFFICE-PURCHASED':
      console.log('update mlPayment');
      const paymentUpdate = mlDBController.update('MlPayment', { paymentId }, { status: paymentSuccess }, { $set: true }, context);
      const officeDate = {
        officeId: paymentInfo.resourceId,
        amount: paymentInfo.amount,
        transactionId: paymentInfo.activityId
      };
      context.userId = paymentInfo.userId;
      console.log(paymentSuccess);
      if (paymentUpdate && paymentSuccess.toLowerCase() === 'success') {
        console.log('inside success');
        response = MlResolver.MlMutationResolver.officeTransactionPayment(null, officeDate, context, null);
      } else {
        const code = 400;
        response = new MlRespPayload().errorPayload('Payment not successful!!!', code);
      }
      break;
    case 'SERVICE-PURCHASED':
      return;
      break;
  }
  if (response) {
    return paymentInfo.resourceId;
  }
  return response;

  // return response;
};
