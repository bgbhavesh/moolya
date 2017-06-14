/**
 * Created by mohammed.mohasin on 13/06/17.
 */
import _ from 'lodash';
class MlInteractionService{

  constructor(){
    if(! MlInteractionService.instance){
      MlInteractionService.instance = this;
    }
    return MlInteractionService.instance;
  }

  getUserDetails(userId){
    var user =mlDBController.findOne('users',{_id:userId}, context)||{};
    return user;
  }

  fetchContextUserDetails(context){
    var contextUserId=context?context.userId:null;
    var contextUser=this.getUserDetails(contextUserId)||{};
    return {contextUserId:contextUser._id,contextUserName:contextUser.username};
  }

  //fetch the resourceOwnerId,resourceOwnerUserName,contextUserId,contextUserName based on resourceType and resourceId
  fetchResourceDetails(resourceType,resourceId,context){
        var resourceOwnerId=null;
        var contextUserId=context?context.userId:null;
        switch(resourceType){
          case 'portfolio':
            var resourceData =mlDBController.findOne('MlPortfolioDetails',{_id:resourceId}, context)||null;
            resourceOwnerId=resourceData?resourceData.userId:null;
            break;
        }
        var resourceOwnerUser=this.getUserDetails(resourceOwnerId)||{};
        var contextUser=this.getUserDetails(contextUserId)||{};

        return {resourceId:resourceId,resourceType:resourceType,resourceOwnerId:resourceOwnerUser._id,resourceOwnerUserName:resourceOwnerUser.username,
          contextUserId:contextUser._id,contextUserName:contextUser.username};
    }


}
const mlInteractionService = new MlInteractionService();
Object.freeze(mlInteractionService);

export default mlInteractionService;

