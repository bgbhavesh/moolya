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
    return {contextUserId:contextUser._id,contextUserName:contextUser.username,contextUser:contextUser};
  }

  validateExternalUser(user){
    let userExternal = user.profile.isExternaluser;
    //check if email is verified.
    let emails=user&&user.emails?user.emails:[];
    var email = _.find(emails || [], function (e) { return (e.verified&&e.address===user.username);});
    if(!email){return false;}
    return userExternal;
  }

  //fetch the resourceOwnerId,resourceOwnerUserName,contextUserId,contextUserName based on resourceType and resourceId
  fetchResourceBasedUserDetails(resourceType,resourceId,context){
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

        return {resourceId:resourceId,resourceType:resourceType,resourceOwner:resourceOwnerUser,resourceOwnerId:resourceOwnerUser._id,resourceOwnerUserName:resourceOwnerUser.username,
          contextUserId:contextUser._id,contextUserName:contextUser.username,contextUser:contextUser};
    }
    getPipeline(resourceType){
      switch (resourceType){
        case 'portfolio':
          return [
            { $lookup: {
                from: "mlPortfolioDetails",
                localField: "resourceId",
                foreignField: "_id",
                as: "portfolio"
              }
            },
            {$unwind: "$portfolio"},
            { '$lookup':{
                from: "users",
                localField: "portfolio.userId",
                foreignField: "_id",
                as: "user"
              }
            },
            {$unwind: "$user"},
            { '$lookup': {
                from: "mlStage",
                localField: "resourceId",
                foreignField: "resourceId",
                as: "stage"
              }
            },
            { $project: {
                user:{
                  name:'$user.profile.displayName'
                },
                stage:1,
                portfolio:1,
                resourceId:1,
              }
            },
            // { $lookup:
            //   {
            //     from: "mlIdeatorPortfolio",
            //     localField: "resourceId",
            //     foreignField: "portfolioDetailsId",
            //     as: "ideator"
            //   }
            // },
            { $lookup:
                {
                  from: "mlIdeas",
                  localField: "resourceId",
                  foreignField: "portfolioId",
                  as: "idea"
                }
            },
            { $lookup:
              {
                from: "mlStartupPortfolio",
                localField: "resourceId",
                foreignField: "portfolioDetailsId",
                as: "startup"
              }
            },
            { $lookup:
              {
                from: "mlFunderPortfolio",
                localField: "resourceId",
                foreignField: "portfolioDetailsId",
                as: "funder"
              }
            },
          ]
        // To do : When all the communality portfolio done,  Will add remaining portfolio here.
        default:
          return [];
      }
    }

}
const mlInteractionService = new MlInteractionService();
Object.freeze(mlInteractionService);

export default mlInteractionService;

