/**
 * Created by mohammed.mohasin on 13/06/17.
 */
import _ from 'lodash';
import MlTransactionsHandler from '../../commons/mlTransactionsLog';
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
    buildAggregationQuery(resourceType, userId){
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
                stage: {
                  "$filter": {
                    input: "$stage",
                    as: "data",
                    cond: { "$eq": ["$$data.userId", userId] }
                  }
                },
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

    createTransactionRequest(userId,transType,resourceId,context) {
      try {
        var transactionType = transType;
        switch (transactionType) {
          case 'connectionRequest':
            new MlTransactionsHandler().recordTransaction({
              'moduleName': 'interaction',
              'activity': 'connection',
              'transactionType': 'connectionRequest',
              'userId': userId,
              'activityDocId': resourceId,
              'docId': resourceId,
              'transactionDetails': 'connection request',
              'context': context || {},
              'transactionTypeId': "connectionRequest"
            });
            break;
        }
      } catch (e) {
        //console
        console.log(e);
      }
    }

  fetchConnectionByTransaction(transactionId,transactionType) {
    try {
      switch (transactionType) {
        case 'connectionRequest':
          let transactionRec=new MlTransactionsHandler().readTransaction(transactionId);
          return transactionRec.docId;
          break;
      }
    } catch (e) {
      //console
      console.log(e);
    }
  }

}
const mlInteractionService = new MlInteractionService();
Object.freeze(mlInteractionService);

export default mlInteractionService;

