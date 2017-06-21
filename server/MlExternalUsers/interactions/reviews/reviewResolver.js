/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';

MlResolver.MlMutationResolver['createReview'] = (obj, args, context, info) =>{
    if(args && context && context.userId){
      var resp=null;
        try {
            let user =mlDBController.findOne('users',{_id:context.userId}, context);
          var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
          var fromuser = resourceDetails.contextUser;
          var toUser = resourceDetails.resourceOwner;
          if (!toUser._id || !fromuser._id || fromuser._id===toUser._id) {
            let code = 400;
            let response = new MlRespPayload().errorPayload('Invalid User', code);
            return response;
          }
          let review={resourceId:args.resourceId,resourceType:args.resourceType,message:args.message,userId:fromuser._id,userEmail:fromuser.username,createdOn:new Date()};

          resp=mlDBController.insert('MlReviews',review,context);

          if(resp){
            //create transaction and transaction Log

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
