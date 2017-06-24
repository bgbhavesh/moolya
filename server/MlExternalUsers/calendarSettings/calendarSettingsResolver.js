/**
 * Created by pankaj on 24/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlMutationResolver['updateMyCalendarSetting'] = (obj, args, context, info) => {
  console.log(args);
  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  console.log(userId, profileId);
  if(!args.calendarSetting){
    let code = 400;
    let result = 'Calendar setting is missing';
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
  // args.Details.userId = context.userId;
  // args.Details.createdAt = new Date();
  if('result'){
    let code = 200;
    let result = 'result';
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
