import MlResolver from '../../commons/mlResolverDef';

MlResolver.MlMutationResolver['updatePayment'] = (obj, args, context, info) => {
  console.log(args);
  let paymentId = args.transactionId;
  if(!paymentId) {
    return ;
  }

  let paymentSuccess = args.paymentStatus;
  if(!paymentSuccess){
    return ;
  }

  let paymentInfo =mlDBController.findOne('MlPayment',{paymentId: paymentId}, context);
  if(!paymentInfo) {
    return
  }

  let activityType = paymentInfo.activityType;

  let response;
  switch (activityType) {
    case "OFFICE-PURCHASED":
      let paymentUpdate =mlDBController.update('MlPayment',{paymentId: paymentId}, { status: paymentSuccess }, context);
      let officeDate = {
        officeId: paymentInfo.resourceId,
        amount: paymentInfo.amount,
        transactionId: paymentInfo.activityId
      };
      if(paymentUpdate && paymentSuccess === "Success") {
        response = MlResolver.MlMutationResolver['officeTransactionPayment'](null, officeDate, context, null);
      }
      break;
    case "SERVICE-PURCHASED":
      return ;
      break;
  }
  return response;
};
