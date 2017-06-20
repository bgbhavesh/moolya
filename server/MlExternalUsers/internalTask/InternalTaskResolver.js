/**
 * Created by pankaj on 19/6/17.
 */
import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";

MlResolver.MlQueryResolver['fetchInternalTask'] = (obj, args, context, info) => {
  let internalTask = [];
  if (context.userId) {
    internalTask = mlDBController.find('MlInternalTask', {userId: context.userId}).fetch();
    return internalTask
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
};

MlResolver.MlQueryResolver['fetchInternalTaskById'] = (obj, args, context, info) => {
  let internalTask = [];
  if (args.internalTaskId) {
    internalTask = mlDBController.find('MlInternalTask', {_id: args.internalTaskId}).fetch();
    return internalTask;
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Internal task id is required", code);
    return response;
  }
};

MlResolver.MlMutationResolver['createInternalTask'] = (obj, args, context, info) => {
    if(args.internalTask){
      if(args.internalTask.attendees && args.internalTask.attendees.length){
        orderNumberGenService.createinternalTaskId(args.internalTask);
        // Add task status time line
        args.internalTask.attendees.forEach(function (attendee) {
          let dataToInsert = args.internalTask;
          dataToInsert.userId = context.userId;
          dataToInsert.attendee = attendee;
          dataToInsert.status = 'pending';
          mlDBController.insert('MlInternalTask', dataToInsert , context);
        });
        let code = 200;
        let response = new MlRespPayload().successPayload("Internal task inserted", code);
        return response;
      } else {
        let code = 400;
        let response = new MlRespPayload().errorPayload("Internal task attendees is required", code);
        return response;
      }
    } else {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Internal task data is required", code);
      return response;
    }
};

MlResolver.MlMutationResolver['updateInternalTask'] = (obj, args, context, info) => {
    if(args.internalTaskId){
      if(args.internalTask){
        let resp = mlDBController.update('MlInternalTask', { _id: args.internalTaskId}, args.internalTask, {$set:1}, context );
        if(resp){
          let code = 200;
          let response = new MlRespPayload().successPayload("Internal task updated", code);
          return response;
        }
      } else {
        let code = 400;
        let response = new MlRespPayload().errorPayload("Internal task data is required", code);
        return response;
      }
    } else {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Internal task id is required", code);
      return response;
    }
};
