/**
 * Created by  mohammed.mohasin on 19/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'


MlResolver.MlQueryResolver['fetchInteractionsCount'] = (obj, args, context, info) => {
  var counterList = [];
  if (context && context.userId) {
    var pipeline=[];
  }
  return counterList;
}
