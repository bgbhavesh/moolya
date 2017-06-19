/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';
/*
*
* View resolver should be called when external user views a portfolio*/
MlResolver.MlMutationResolver['createView'] = (obj, args, context, info) =>{
    if(args && context && context.userId){
      var resp=null;
        try {
          var contextDetails=mlInteractionService.fetchContextUserDetails(context);

          let viewRequest={resourceId:args.resourceId,resourceType:args.resourceType,userId:contextDetails.contextUserId,
                       userEmail:contextDetails.username,updatedOn:new Date()};

          resp = mlDBController.update('MlViews',{'resourceId':args.resourceId,'resourceType':args.resourceType,'userId':contextDetails.contextUserId},viewRequest,{$set: true,upsert: true},context);

          if(resp){
            //transaction Log
          }

        }catch (e){
            let code = 400;
            let response = new MlRespPayload().errorPayload(e.message, code);
            return response;
        }
        let code = 200;
        let response = new MlRespPayload().successPayload(resp, code);
        return response;
    }
}
