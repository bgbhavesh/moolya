/**
 * Created by pankaj on 17/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchStage'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId
  };
  let result = mlDBController.find('MlStage', query , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['fetchStage'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlStage', {_id:args.StageId} , context)
}

MlResolver.MlMutationResolver['createStage'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profile = new MlUserContext(userId).userProfileDetails(userId);
  let stage = args.stage;
  stage.userId = userId;
  stage.profileId = profile.profileId;
  stage.createdAt = new Date();
  result = mlDBController.insert('MlStage' ,stage, context);
  if(true || result) {
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateStage'] = (obj, args, context, info) => {
  result = mlDBController.update('MlStage', {_id:args.stageId} ,args.stage, {$set:true}, context);
  if(result){
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
