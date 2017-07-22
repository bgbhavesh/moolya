/**
 * Created by mohammed.mohasin on 22/07/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createNotificationTemplate'] = (obj, args, context, info) => {

  if(args && args.notificationTemplate){
    args.notificationTemplate.createdBy = context.userId;
    args.notificationTemplate.createdAt = new Date();
    try{
      let ret =mlDBController.insert('MlNotificationTemplates',{...args.notificationTemplate},context);
      //let ret = MlNotificationTemplates.insert({...args.notificationTemplate});
      if(ret){
        let response = new MlRespPayload().successPayload("Notification Template Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating Notification Template", 400);
        return response;
      }
    }
    catch (e){
      let response = new  MlRespPayload().errorPayload(e.message, 400);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateNotificationTemplate'] = (obj, args, context, info) => {

  if(context.userId&&args && args.notificationTemplateId && args.notificationTemplate){
    args.notificationTemplate.updatedBy = context.userId;
    args.notificationTemplate.updatedAt = new Date();
    try{
     // let resp = MlNotificationTemplates.update({_id: args.notificationTemplateId}, {$set: args.notificationTemplate});
      let resp = mlDBController.update('MlNotificationTemplates',args.notificationTemplateId, args.notificationTemplate, {$set:true},context);
      if(resp){
        let response = new MlRespPayload().successPayload("Notification Template Updated Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Updating Notification Template", 400);
        return response;
      }
    }
    catch (e){
      let response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver['fetchNotificationTemplate'] = (obj, args, context, info) => {
  if(args && args.notificationTemplateId){
   return mlDBController.findOne('MlNotificationTemplates',{"_id":args.notificationTemplateId},context);
   // return MlNotificationTemplates.findOne({"_id":args.notificationTemplateId})
  }
}


MlResolver.MlQueryResolver['fetchNotificationTemplates'] = (obj, args, context, info) => {
  return mlDBController.find('MlNotificationTemplates', {isActive:true}, context).fetch()
  //return MlNotificationTemplates.find({isActive : true}).fetch();
}
