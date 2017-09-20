/** ************************************************************
 * Date: 11 Jun, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Generic search engine app
 * JavaScript file mlAppGenericSearch.js
 * *************************************************************** */

/**
 * Import Graphql libs
 */
import MlResolver from "../../commons/mlResolverDef";
import MlUserContext from '../mlUserContext';
import MlSubChapterAccessControl from './../../mlAuthorization/mlSubChapterAccessControl';
import _ from "lodash";

MlResolver.MlUnionResolver['AppGenericSearchUnion'] =  {
  __resolveType(obj, context, info){
    let moduleName = info.variableValues ? info.variableValues.module : "";
    moduleName =moduleName.toUpperCase();
    switch (moduleName){
      case 'ACTIVITY':
        return 'Activity';
        break;
      case 'FUNDERPORTFOLIO':
        return 'FunderPortfolio';
        break;
      case "SERVICEPROVIDERPORTFOLIODETAILS":  //serviceProviderPortfolioDetails
        return'serviceProviderPortfolioDetails';
        break;
      case "STARTUPPORTFOLIODETAILS":  //startupPortfolioDetails
        return'startupPortfolioOutput';
        break;
      case "IDEATORPORTFOLIODETAILS":  //ideatorPortfolioDetails
        return'Ideator';
        break;
      case "INSTITUTIONPORTFOLIODETAILS":  //institutionPortfolioDetails
        return'InstitutionPortfolio';
        break;
      case "COMPANYPORTFOLIODETAILS":  //companyPortfolioDetails
        return'CompanyPortfolio';
        break;
      case "EXTERNALUSERS":
        return'Users';
        break;
      case "MYCONNECTIONS":
        return "ConnectedUser";
        break;
      case "MYFAVOURITES":
        return "FavouriteUser";
        break;
      case "MYFOLLOWERS":
      case "MYFOLLOWINGS":
        return "FollowUser";
        break;
      case "MYPENDINGAPPOINTMENT":
      case "MYCURRENTAPPOINTMENT":
      case "MYCOMPLETEDAPPOINTMENT":
      case "MYREJECTEDAPPOINTMENT":
        return "Appointment";
        break;
      case "MYREQUESTEDBESPOKESERVICE":
        return "Service";
        break;
      case "MYPENDINGINTERNALTASK":
      case "MYCURRENTINTERNALTASK":
      case "MYCOMPLETEDINTERNALTASK":
      case "MYREJECTEDINTERNALTASK":
      case "MYSELFINTERNALTASK":
        return "InternalTask";
        break;
      default:
        return 'Generic';
      case "CLUSTER":
        return "Cluster";
        break;
      case "CHAPTER":
        return "Chapter";
        break;
      case "SUBCHAPTER":
        return "SubChapter";
        break;
    }
  }
};

MlResolver.MlQueryResolver['AppGenericSearch'] = (obj, args, context, info) =>{

  let filterQuery = args.queryProperty && args.queryProperty.filterQuery ? JSON.parse(args.queryProperty.filterQuery) : {};
  let searchText = args.queryProperty && args.queryProperty.searchText ? args.queryProperty.searchText : '';
  let searchFields = args.queryProperty && args.queryProperty.searchFields ? args.queryProperty.searchFields : [];
  let alphabeticSearch = args.queryProperty && args.queryProperty.alphabeticSearch ? JSON.parse(args.queryProperty.alphabeticSearch) : {};

  console.log(alphabeticSearch);

  if( Object.keys(alphabeticSearch).length ){
    alphabeticSearch[Object.keys(alphabeticSearch)[0]] = new RegExp("^"+alphabeticSearch[Object.keys(alphabeticSearch)[0]], "i");
  }

  let searchQuery = {};
  if(searchText && searchFields.length){
    searchQuery = searchFields.map( (field) => {
      let res = {};
      res[field] = new RegExp(searchText, 'ig');
      return res;
    });
    searchQuery = { "$or" : searchQuery };
  }

  let mlSubChapterAccessControl = MlSubChapterAccessControl.getAccessControl('SEARCH', context);
  mlSubChapterAccessControl = mlSubChapterAccessControl ? mlSubChapterAccessControl : {};
  mlSubChapterAccessControl.subChapters = mlSubChapterAccessControl.subChapters ? mlSubChapterAccessControl.subChapters : [];
  let subChapterQuery = {};
  if(mlSubChapterAccessControl.isInclusive){
    subChapterQuery = { "$in" : mlSubChapterAccessControl.subChapters };
  } else {
    subChapterQuery = { "$nin" : mlSubChapterAccessControl.subChapters };
  }

  let moduleName = args ? args.module : "";
  moduleName =moduleName.toUpperCase();
  let count = 0;
  let data = [];
  let findOptions = {
    skip: args.queryProperty&&args.queryProperty.skip,
    limit: args.queryProperty&&args.queryProperty.limit
  };

  // Code Written for the requirement of 50k ventures
  var userProfile = new MlUserContext().userProfileDetails(context.userId);
  if(!userProfile){
    return {count : count,data : data}
  }

  let userId = context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;

  /**
   * @module ["portfolio"]
   * changed query for adding [chapter and accountType]
   * */
  if (moduleName == "FUNDERPORTFOLIO") {
   var query = [
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioDetailsId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "FUN", 'port.subChapterId': subChapterQuery}},
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        '$project': {
          portfolioDetailsId: 1,
          funderAbout: 1,
          chapterName: '$port.chapterName',
          accountType: '$port.accountType',
          communityType: '$port.communityType',
          firstName: '$user.profile.firstName',
          lastName: "$user.profile.lastName",
          clusterId: '$port.clusterId',
          chapterId: '$port.chapterId',
          communityCode: '$port.communityCode',
          industryId: '$port.industryId',
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlFunderPortfolio', query, context);
    count = data.length
  }

  else if (args.module == "serviceProviderPortfolioDetails") {
    let pipleline = [
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioDetailsId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "SPS", 'port.subChapterId': subChapterQuery}},
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        '$project': {
          portfolioDetailsId: 1,
          about: 1,
          chapterName: '$port.chapterName',
          accountType: '$port.accountType',
          communityType: '$port.communityType',
          firstName: '$user.profile.firstName',
          lastName: "$user.profile.lastName",
          clusterId: '$port.clusterId',
          chapterId: '$port.chapterId',
          communityCode: '$port.communityCode',
          industryId: '$port.industryId',
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlServiceProviderPortfolio', pipleline, context);
    count = data.length;
  }

  else if (args.module == "startupPortfolioDetails") {
    let pipleline = [
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioDetailsId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "STU", 'port.subChapterId': subChapterQuery}},
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        '$lookup': {
          from: 'mlLikes', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'likes'
        }
      },
      {
        "$addFields": {
          "likes": {
            "$filter":
            { input: "$likes",
              as: "data",
              cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
            }
          }
        }
      },
      {
        '$lookup': {
          from: 'mlConnections', localField: 'userId', foreignField: 'users.userId',
          as: 'connections'
        }
      },
      {
        "$addFields": {
          "connection": {
            "$filter":
            { input: "$connections",
              as: "data",
              cond: { "$eq": ["$$data.isAccepted", true] }
            }
          }
        }
      },
      // {
      //   $unwind:
      //   {
      //     path: "$connections",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      // {
      //   $unwind:
      //   {
      //     path: "$connections.users",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      // {
      //   "$addFields": {
      //     isConnection: { "$and": [{"$eq": [ "$userId", "$connections.users.userId" ]},
      //       { "$eq" :["$connections.users.isFavourite", true] },
      //       { "$eq" :["$connections.isAccepted", true] } ] }
      //   }
      // },
      // {
      //   "$group": {
      //     _id: "$_id",
      //     "data": { "$first": "$$ROOT" },
      //     "fav": { "$sum" : { "$cond": ["$isConnection", 1, 0] } }
      //   }
      // },
      // {
      //   "$addFields": {
      //     "data.favCount": { $trunc : "$fav" }
      //   }
      // },
      // {
      //   "$replaceRoot": { "newRoot" : "$data" }
      // },
      {
        '$lookup': {
          from: 'mlViews', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'views'
        }
      },
      {
        "$addFields": {
          "views": {
            "$filter":
            { input: "$views",
              as: "data",
              cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
            }

          }
        }
      },
      {
        '$lookup': {
          from: 'mlFollowings', localField: 'userId', foreignField: 'followerId',
          as: 'followings'
        }
      },
      {
        "$addFields": {
          "followings":  {
            "$filter":
            { input: "$followings",
              as: "data",
              cond: { "$eq": ["$$data.isActive", true] }
            }

          }
        }
      },
      {
        '$project': {
          portfolioDetailsId: 1,
          aboutUs: 1,
          chapterName: '$port.chapterName',
          accountType: '$port.accountType',
          communityType: '$port.communityType',
          firstName: '$user.profile.firstName',
          lastName: "$user.profile.lastName",
          clusterId: '$port.clusterId',
          chapterId: '$port.chapterId',
          communityCode: '$port.communityCode',
          industryId: '$port.industryId',
          likes:{"$size":"$likes"},
          connections: { "$size": "$connection" },
          views:{"$size":"$views"},
          followings:{"$size":"$followings"}

        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlStartupPortfolio', pipleline, context);
    count = data.length;
  }

  else if (args.module == "ideatorPortfolioDetails") {
    // var allIds = [];
    // var ideator = [];
    //
    // var allIdeas = MlIdeas.find({isActive: true}).fetch();
    // allIds = _.map(allIdeas, "userId");
    // allIds = _.uniq(allIds);
    //
    // _.each(allIds, function (userId) {
    //   var queryThis = {userId: userId, status: 'gone live', subChapterId: subChapterQuery }
    //
    //   let portfolios = MlPortfolioDetails.find(queryThis).fetch();
    //   var ideasArr = [];
    //   if (!_.isEmpty(portfolios)) {
    //     /**checking portfolio is there or not with this ID*/
    //     _.each(portfolios, function (portfolio) {
    //       let ideas = MlIdeas.findOne({portfolioId: portfolio._id}) || {};
    //       ideasArr.push(ideas);
    //     })
    //     let user = Meteor.users.findOne({_id: userId});
    //     let ideaObj = {
    //       userId: userId,
    //       ideas: ideasArr,
    //       chapterName: portfolios[0].chapterName,
    //       name: user.profile.firstName + " " + user.profile.lastName,
    //       accountType: portfolios[0].accountType
    //     }
    //     ideator.push(ideaObj)
    //   }
    // })
    //todo://need to include the search params in the query it self this is need to be change
    // data = ideator;
    // count = ideator.length;

    let pipeline = [
      {"$match": {isActive: true} },
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "IDE", 'port.subChapterId': subChapterQuery } },
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        "$project": {
          "userId": "$userId",
          "ideas": [{
            "title": "$title",
            "description": "$description",
            "portfolioId":"$portfolioId"
          }],
          "chapterName": "$port.chapterName",
          "name":{$concat: [ "$user.profile.firstName", " ", "$user.profile.lastName" ] },
          "accountType": "$port.accountType",
          "clusterId": '$port.clusterId',
          "chapterId": '$port.chapterId',
          "communityCode": '$port.communityCode',
          "industryId": '$port.industryId',
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlIdeas', pipeline, context);
    count = data.length;
  }
  else if (args.module == "institutionPortfolioDetails") {
    var pipleline = [
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioDetailsId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "INS", 'port.subChapterId': subChapterQuery}},
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        '$lookup': {
          from: 'mlLikes', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'likes'
        }
      },
      {
        "$addFields": {
          "likes": {
            "$filter":
              { input: "$likes",
                as: "data",
                cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
              }
          }
        }
      },
      {
        '$lookup': {
          from: 'mlConnections', localField: 'userId', foreignField: 'users.userId',
          as: 'connections'
        }
      },
      {
        "$addFields": {
          "connection": {
            "$filter":
              { input: "$connections",
                as: "data",
                cond: { "$eq": ["$$data.isAccepted", true] }
              }
          }
        }
      },
      {
        '$lookup': {
          from: 'mlViews', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'views'
        }
      },
      {
        "$addFields": {
          "views": {
            "$filter":
              { input: "$views",
                as: "data",
                cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
              }

          }
        }
      },
      {
        '$lookup': {
          from: 'mlFollowings', localField: 'userId', foreignField: 'followerId',
          as: 'followings'
        }
      },
      {
        "$addFields": {
          "followings":  {
            "$filter":
              { input: "$followings",
                as: "data",
                cond: { "$eq": ["$$data.isActive", true] }
              }

          }
        }
      },
      {
        '$project': {
          portfolioDetailsId: 1,
          about: 1,
          chapterName: '$port.chapterName',
          accountType: '$port.accountType',
          communityType: '$port.communityType',
          firstName: '$user.profile.firstName',
          lastName: "$user.profile.lastName",
          clusterId: '$port.clusterId',
          chapterId: '$port.chapterId',
          communityCode: '$port.communityCode',
          industryId: '$port.industryId',
          likes:{"$size":"$likes"},
          connections: { "$size": "$connection" },
          views:{"$size":"$views"},
          followings:{"$size":"$followings"}
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlInstitutionPortfolio', pipleline, context);
    count = data.length;
  }
  else if (args.module == "companyPortfolioDetails") {
    let pipleline = [
      {
        '$lookup': {
          from: 'mlPortfolioDetails', localField: 'portfolioDetailsId', foreignField: '_id',
          as: 'port'
        }
      },
      {'$unwind': {"path": "$port", "preserveNullAndEmptyArrays": true}},
      {'$match': {"port.status": "PORT_LIVE_NOW", 'port.communityCode': "CMP", 'port.subChapterId': subChapterQuery}},
      {
        '$lookup': {
          from: 'users', localField: 'userId', foreignField: '_id',
          as: 'user'
        }
      },
      {'$unwind': {"path": "$user", "preserveNullAndEmptyArrays": true}},
      {
        '$lookup': {
          from: 'mlLikes', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'likes'
        }
      },
      {
        "$addFields": {
          "likes": {
            "$filter":
              { input: "$likes",
                as: "data",
                cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
              }
          }
        }
      },
      {
        '$lookup': {
          from: 'mlConnections', localField: 'userId', foreignField: 'users.userId',
          as: 'connections'
        }
      },
      {
        "$addFields": {
          "connection": {
            "$filter":
              { input: "$connections",
                as: "data",
                cond: { "$eq": ["$$data.isAccepted", true] }
              }
          }
        }
      },
      {
        '$lookup': {
          from: 'mlViews', localField: 'portfolioDetailsId', foreignField: 'resourceId',
          as: 'views'
        }
      },
      {
        "$addFields": {
          "views": {
            "$filter":
              { input: "$views",
                as: "data",
                cond: { "$eq": ["$$data.resourceType", "$port.transactionType"] }
              }

          }
        }
      },
      {
        '$lookup': {
          from: 'mlFollowings', localField: 'userId', foreignField: 'followerId',
          as: 'followings'
        }
      },
      {
        "$addFields": {
          "followings":  {
            "$filter":
              { input: "$followings",
                as: "data",
                cond: { "$eq": ["$$data.isActive", true] }
              }

          }
        }
      },
      {
        '$project': {
          portfolioDetailsId: 1,
          about: 1,
          chapterName: '$port.chapterName',
          accountType: '$port.accountType',
          communityType: '$port.communityType',
          firstName: '$user.profile.firstName',
          lastName: "$user.profile.lastName",
          clusterId: '$port.clusterId',
          chapterId: '$port.chapterId',
          communityCode: '$port.communityCode',
          industryId: '$port.industryId',
          likes:{"$size":"$likes"},
          connections: { "$size": "$connection" },
          views:{"$size":"$views"},
          followings:{"$size":"$followings"}
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery, alphabeticSearch ] } }
    ];
    data = mlDBController.aggregate('MlCompanyPortfolio', pipleline, context);
    count = data.length;
  }
  /*********************************************end of all portfolio queries************************************/
  else if (args.module === "externalUsers"){

    // var userType = args.queryProperty.query; // Funder, Ideator, Startup, etc.

    var query = JSON.parse(args.queryProperty.query);

    var clusterId = query.clusterId?query.clusterId:"";
    var chapterId = query.chapterId?query.chapterId:"";
    var subChapterId = query.subChapterId?query.subChapterId:"";

    var userType = query.userType;

    // let loggedInUser = mlDBController.findOne('users', {'_id':context.userId}, context);
    // var externalProfile = _.find(loggedInUser.profile.externalUserProfiles, {'isDefault':true});
    // if(!externalProfile){
    //   externalProfile = loggedInUser.profile.externalUserProfiles[0];
    // }

    //   // TODO: Add Browser condition
    //
    // var clusterId = externalProfile.clusterId;
    // var chapterId = externalProfile.chapterId;
    // var subChapterId = externalProfile.subChapterId;
    // var communityCode = externalProfile.communityDefName;

    // Generic search query object for EXTERNAL Users
    var queryObj = {isActive: true};

    var users = [];

    // if(clusterId != "" && chapterId != "" && subChapterId != "" && communityCode != ""){
    if(clusterId != "" && chapterId != "" && subChapterId != ""){
      let cluster = mlDBController.findOne('MlClusters', {_id: clusterId}, context)
      let chapter = mlDBController.findOne('MlChapters', {_id: chapterId}, context)
      let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context)

      if(cluster.isActive && chapter.isActive && subChapter.isActive){

          queryObj.clusterId = clusterId;
          queryObj.isApprove = true;

          // FOR SPECIFIC COMMUNITY
          if (userType == "Ideators" || userType =="Investors" || userType =="Startups" || userType =="Service Providers" || userType =="Companies" || userType =="Institutions"){

            queryObj.communityDefName=userType;
            var pipeline=[
              {
                $match: {"profile.isSystemDefined":{$exists:false}, "profile.isExternaluser":true, 'profile.isActive':true, 'profile.externalUserProfiles':{$elemMatch:queryObj}}
              },
              { "$lookup": { from: "mlPortfolioDetails", localField: "_id", foreignField: "userId", as: "portfolio" } },
              { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
              { "$match" : {"portfolio.status":"PORT_LIVE_NOW"}},
              {
                $unwind :"$profile.externalUserProfiles"
              },
              {
                "$group": {
                  _id: "$_id",
                  data: {"$first": "$$ROOT"}
                }
              },
              { "$replaceRoot": { "newRoot" : "$data" }  },
              {
                $unwind :"$profile.externalUserProfiles"
              },
              {$match:{"profile.externalUserProfiles.clusterId":clusterId, "profile.externalUserProfiles.communityDefName":userType, "profile.externalUserProfiles.isApprove":true,"profile.externalUserProfiles.isActive":true}},  // Filter out specific community
              {
                $project:{
                  _id : 1,
                  name: "$profile.displayName",
                  portfolioId : '$portfolio._id',
                  communityCode: "$profile.externalUserProfiles.communityDefCode",
                  communityDefName: "$profile.externalUserProfiles.communityDefName",
                  chapterName: "$profile.externalUserProfiles.chapterName",
                  isActive: "$profile.isActive",
                  externalUserAdditionalInfo: {
                    $filter: {
                      input: "$profile.externalUserAdditionalInfo",
                      as: "item",
                      cond: { $eq: [ "$$item.profileId", "$profile.externalUserProfiles.profileId" ] }
                    }
                  }
                }
              },
              { "$unwind": {
                "path": "$externalUserAdditionalInfo",
                "preserveNullAndEmptyArrays": true
              }
              },
              {
                $project:{
                  _id : 1,
                  name: 1,
                  communityCode: 1,
                  communityDefName:1,
                  chapterName:1,
                  portfolioId : 1,
                  isActive: 1,
                  address: {
                    $filter: {
                      input: "$externalUserAdditionalInfo.addressInfo",
                      as: "item",
                      cond: { $eq: [ "$$item.isDefaultAddress", true ] }
                    }
                  }
                }
              },
              { "$unwind": {
                "path": "$address",
                "preserveNullAndEmptyArrays": true
              }
              },
              {
                $project:{
                  _id : 1,
                  name: 1,
                  communityCode: 1,
                  communityDefName:1,
                  portfolioId : 1,
                  chapterName:1,
                  isActive: 1,
                  latitude: "$address.latitude",
                  longitude: "$address.longitude"
                }
              }
            ];
            users=mlDBController.aggregate('users',pipeline,context);
          }

        // FOR All
        else{
            var pipeline=[
              {
                $match: {"profile.isSystemDefined":{$exists:false}, "profile.isExternaluser":true, 'profile.isActive':true, 'profile.externalUserProfiles':{$elemMatch:queryObj}}
              },
              { "$lookup": { from: "mlPortfolioDetails", localField: "_id", foreignField: "userId", as: "portfolio" } },
              { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
              { "$match" : {"portfolio.status":"PORT_LIVE_NOW"}},
              {
                $unwind :"$profile.externalUserProfiles"
              },
              {
                "$group": {
                  _id: "$_id",
                  data: {"$first": "$$ROOT"}
                }
              },
              { "$replaceRoot": { "newRoot" : "$data" }  },
              {
                $unwind :"$profile.externalUserProfiles"
              },
              {$match:{"profile.externalUserProfiles.clusterId":clusterId,"profile.externalUserProfiles.isApprove":true,"profile.externalUserProfiles.isActive":true}},
              {
                $project:{
                  _id : 1,
                  name: "$profile.displayName",
                  profile:{
                    profileImage:"$profile.profileImage"
                  },
                  portfolioId : '$portfolio._id',
                  communityCode: "$profile.externalUserProfiles.communityDefCode",
                  communityDefName: "$profile.externalUserProfiles.communityDefName",
                  chapterName: "$profile.externalUserProfiles.chapterName",
                  isActive: "$profile.isActive",
                  externalUserAdditionalInfo: {
                    $filter: {
                      input: "$profile.externalUserAdditionalInfo",
                      as: "item",
                      cond: { $eq: [ "$$item.profileId", "$profile.externalUserProfiles.profileId" ] }
                    }
                  }
                }
              },
              { "$unwind": {
                "path": "$externalUserAdditionalInfo",
                "preserveNullAndEmptyArrays": true
              }
              },
              {
                $project:{
                  _id : 1,
                  name: 1,
                  communityCode: 1,
                  communityDefName:1,
                  chapterName:1,
                  portfolioId : 1,
                  profile:1,
                  isActive: 1,
                  address: {
                    $filter: {
                      input: "$externalUserAdditionalInfo.addressInfo",
                      as: "item",
                      cond: { $eq: [ "$$item.isDefaultAddress", true ] }
                    }
                  }
                }
              },
              { "$unwind": {
                "path": "$address",
                "preserveNullAndEmptyArrays": true
              }
              },
              {
                $project:{
                  _id : 1,
                  name: 1,
                  profile:1,
                  communityCode: 1,
                  portfolioId : 1,
                  communityDefName:1,
                  chapterName:1,
                  isActive: 1,
                  latitude: "$address.latitude",
                  longitude: "$address.longitude"
                }
              }
            ];
            users=mlDBController.aggregate('users',pipeline,context);
        }
      }

    }
    // context.module = "Users";
    data=users;
    count=users&&users.length?users.length:0;
  }

  else if ( args.module === "myConnections" ){
    let pipeline=[{$match:{'users':{$elemMatch:{'userId':context.userId}},isAccepted:true}},
      {$unwind :"$users" },
      {$match:{'users.userId':{$ne:context.userId}}},
      {$lookup:{from:'users',localField:'users.userId',foreignField:'_id',as:'userDetails'}},//join with user
      {$unwind:'$userDetails'},{$unwind:'$userDetails.profile.externalUserProfiles'},
      //match the default profile of user //'userDetails.profile.externalUserProfiles.isDefault':true
      //todo:check with business to display multiple profiles for multiple users
      {$match:{'userDetails.profile.isActive':true,'userDetails.profile.externalUserProfiles.isActive':true}},
      {$group : {_id:'$connectionCode',// display first profile of user
        'id':{ $first: '$_id'},//connection Object Id
        'userId':{ $first: "$users.userId"},
        'userName':{ $first: "$users.userName"},
        'firstName':{ $first:'$userDetails.profile.firstName'},
        'lastName':{ $first:'$userDetails.profile.lastName'},
        'displayName':{ $first:'$userDetails.profile.displayName'},
        'profileImage':{ $first:"$userDetails.profile.profileImage"},
        'profileId':{ $first:"$userDetails.profile.profileId"},
        'countryName':{ $first:'$userDetails.profile.externalUserProfiles.countryName'},
        'communityName':{ $first:'$userDetails.profile.externalUserProfiles.communityName'},
        'communityCode':{ $first:'$userDetails.profile.externalUserProfiles.communityDefCode'}
      }},
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
      ];
    data=mlDBController.aggregate('MlConnections',pipeline,context);
    count = data.length;
  }

  else if ( args.module === "myFavourites" ){
    let pipeline=[{$match:{'isAccepted':true,'users':{$elemMatch:{'userId':context.userId,isFavourite:true}}}},
      {$unwind :"$users" },
      {$match:{'users.userId':{$ne:context.userId}}},
      {$lookup:{from:'users',localField:'users.userId',foreignField:'_id',as:'userDetails'}},//join with user
      {$unwind:'$userDetails'},{$unwind:'$userDetails.profile.externalUserProfiles'},
      //match the default profile of user //'userDetails.profile.externalUserProfiles.isDefault':true
      //todo:check with business to display multiple profiles for multiple users
      {$match:{'userDetails.profile.isActive':true,'userDetails.profile.externalUserProfiles.isActive':true}},
      {$group : {_id:'$connectionCode',// display first profile of user
        'id':{ $first: '$_id'},//connection Object Id
        'userId':{ $first: "$users.userId"},
        'userName':{ $first: "$users.userName"},
        'firstName':{ $first:'$userDetails.profile.firstName'},
        'lastName':{ $first:'$userDetails.profile.lastName'},
        'displayName':{ $first:'$userDetails.profile.displayName'},
        'profileImage':{ $first:"$userDetails.profile.profileImage"},
        'profileId':{ $first:"$userDetails.profile.profileId"},
        'countryName':{ $first:'$userDetails.profile.externalUserProfiles.countryName'},
        'communityName':{ $first:'$userDetails.profile.externalUserProfiles.communityName'},
        'communityCode':{ $first:'$userDetails.profile.externalUserProfiles.communityDefCode'}
      }},
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
      ];
    data=mlDBController.aggregate('MlConnections',pipeline,context);
    count = data.length;
  }

  else if ( args.module === "myFollowers" ){
    let pipeline=[
      {$match:{'followerId':context.userId,isActive:true}},
      {$lookup:{from:'users',localField:'followedBy',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails.profile.externalUserProfiles'},
      {$match:{'userDetails.profile.isActive':true,'userDetails.profile.externalUserProfiles.isActive':true}},
      {$group : {_id:'$followedBy',
        'userId':{ $first: "$userDetails._id"},
        'userName':{ $first: "$userDetails.username"},
        'firstName':{ $first:'$userDetails.profile.firstName'},
        'lastName':{ $first:'$userDetails.profile.lastName'},
        'displayName':{ $first:'$userDetails.profile.displayName'},
        'profileImage':{ $first:"$userDetails.profile.profileImage"},
        'profileId':{ $first:"$userDetails.profile.profileId"},
        'countryName':{ $first:'$userDetails.profile.externalUserProfiles.countryName'},
        'communityName':{ $first:'$userDetails.profile.externalUserProfiles.communityName'},
        'communityCode':{ $first:'$userDetails.profile.externalUserProfiles.communityDefCode'}
      }},
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data=mlDBController.aggregate('MlFollowings',pipeline,context);
    count = data.length;
  }

  else if ( args.module === "myFollowings" ){
    let pipeline=[
      {$match:{'followedBy':context.userId,isActive:true}},
      {$lookup:{from:'users',localField:'followerId',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails.profile.externalUserProfiles'},
      {$match:{'userDetails.profile.isActive':true,'userDetails.profile.externalUserProfiles.isActive':true}},
      {$group : {_id:'$followerId',
        'id':{$first:"$_id"}, //follow Object Id
        'userId':{ $first: "$userDetails._id"},
        'userName':{ $first: "$userDetails.username"},
        'firstName':{ $first:'$userDetails.profile.firstName'},
        'lastName':{ $first:'$userDetails.profile.lastName'},
        'displayName':{ $first:'$userDetails.profile.displayName'},
        'profileImage':{ $first:"$userDetails.profile.profileImage"},
        'profileId':{ $first:"$userDetails.profile.profileId"},
        'countryName':{ $first:'$userDetails.profile.externalUserProfiles.countryName'},
        'communityName':{ $first:'$userDetails.profile.externalUserProfiles.communityName'},
        'communityCode':{ $first:'$userDetails.profile.externalUserProfiles.communityDefCode'}
      }},
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data=mlDBController.aggregate('MlFollowings',pipeline,context);
    count = data.length;
  }

  else if ( args.module === "myPendingAppointment" ) {
    let pipeline = [
      {
        $lookup: {
          from: "mlAppointmentMembers",
          localField: "appointmentId",
          foreignField: "appointmentId",
          as: "members"
        }
      },
      { "$unwind": "$members" },
      { "$match": {'members.userId':userId, 'members.profileId':profileId, 'members.status': "Pending" } },
      { $addFields: { appointmentWith: {
        $cond: [
          { $eq: [ "$client.profileId", profileId] }, "$provider" , { $ifNull : ["$client", "$provider"] }
        ]
      } } },
      {$lookup:{from:'users',localField:'appointmentWith.userId',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails'},
      { "$addFields": { "appointmentWith.status": "Pending", "appointmentWith.displayName": "$userDetails.profile.displayName", "appointmentWith.userProfilePic": "$userDetails.profile.profileImage" } },
      { $project : { "userDetails": 0 } },
      { $match: { "$and":  [ searchQuery, filterQuery ] } },
    ];
    data = mlDBController.aggregate( 'MlAppointments', pipeline, context);
    count = data.length;
  }

  else if ( args.module === "myCurrentAppointment" ) {
    let pipeline = [
      {
        $lookup: {
          from: "mlAppointmentMembers",
          localField: "appointmentId",
          foreignField: "appointmentId",
          as: "members"
        }
      },
      { "$unwind": "$members" },
      { "$match": {'members.userId':userId, 'members.profileId':profileId, 'members.status': "Accepted" } },
      { $addFields: { appointmentWith: {
        $cond: [
          { $eq: [ "$client.profileId", profileId] }, "$provider" , { $ifNull : ["$client", "$provider"] }
        ]
      } } },
      {$lookup:{from:'users',localField:'appointmentWith.userId',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails'},
      { "$addFields": { "appointmentWith.status": "Accepted", "appointmentWith.displayName": "$userDetails.profile.displayName", "appointmentWith.userProfilePic": "$userDetails.profile.profileImage" } },
      { $project : { "userDetails": 0 } },
      { $match: { "$and":  [ searchQuery, filterQuery ] } },

    ];
    data = mlDBController.aggregate( 'MlAppointments', pipeline, context);
    count = data.length;
  }

  else if ( args.module === "myCompletedAppointment" ) {
    let pipeline = [
      {
        $lookup: {
          from: "mlAppointmentMembers",
          localField: "appointmentId",
          foreignField: "appointmentId",
          as: "members"
        }
      },
      { "$unwind": "$members" },
      { "$match": {'members.userId':userId, 'members.profileId':profileId, 'members.status': "Completed" } },
      { $addFields: { appointmentWith: {
        $cond: [
          { $eq: [ "$client.profileId", profileId] }, "$provider" , { $ifNull : ["$client", "$provider"] }
        ]
      } } },
      {$lookup:{from:'users',localField:'appointmentWith.userId',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails'},
      { "$addFields": { "appointmentWith.status": "Completed", "appointmentWith.displayName": "$userDetails.profile.displayName", "appointmentWith.userProfilePic": "$userDetails.profile.profileImage" } },
      { $project : { "userDetails": 0 } },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate( 'MlAppointments', pipeline, context);
    count = data.length;
  }

  else if ( args.module === "myRejectedAppointment" ) {
    let pipeline = [
      {
        $lookup: {
          from: "mlAppointmentMembers",
          localField: "appointmentId",
          foreignField: "appointmentId",
          as: "members"
        }
      },
      { "$unwind": "$members" },
      { "$match": {'members.userId':userId, 'members.profileId':profileId, 'members.status': "Rejected" } },
      { $addFields: { appointmentWith: {
        $cond: [
          { $eq: [ "$client.profileId", profileId] }, "$provider" , { $ifNull : ["$client", "$provider"] }
        ]
      } } },
      {$lookup:{from:'users',localField:'appointmentWith.userId',foreignField:'_id',as:'userDetails'}},
      {$unwind:'$userDetails'},{$unwind:'$userDetails'},
      { "$addFields": { "appointmentWith.status": "Rejected", "appointmentWith.displayName": "$userDetails.profile.displayName", "appointmentWith.userProfilePic": "$userDetails.profile.profileImage" } },
      { $project : { "userDetails": 0 } },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate( 'MlAppointments', pipeline, context);
    count = data.length;
  }

  else if ( args.module === "myRequestedBespokeService" ) {
    let query = {
      "$and":[
        {
          userId: userId,
          profileId: profileId,
          isCurrentVersion: true,
          isBeSpoke: true
        },
        searchQuery,
        filterQuery
      ]
    };
    data = mlDBController.find('MlServiceCardDefinition', query, context).fetch();
    count = data.length;
  }

  else if ( args.module === "myPendingInternalTask" ) {

    let query = {
      attendee: userId,
      attendeeProfileId: profileId,
      isSelfAssigned: false,
      status: { '$in': ["pending"] }
    };

    let pipeline = [
      { "$match": query },
      { "$lookup": { from: "mlPortfolioDetails", localField: "resourceId", foreignField: "_id", as: "portfolio" } },
      { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "users", localField: "portfolio.userId", foreignField: "_id", as: "portfolioUser" } },
      { "$unwind": { path: "$portfolioUser", preserveNullAndEmptyArrays: true } },
      { "$lookup":{ from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { "$unwind": { path: "$user", preserveNullAndEmptyArrays: true } },
      { "$addFields": {
        "userProfile" : { "$filter": {
          "input": "$user.profile.externalUserProfiles",
          "as": "profile",
          "cond": {"$eq" : ["$$profile.profileId", profileId ] } //"$profileId",
        }
        }
      }},
      { "$unwind": { path: "$userProfile", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlIdeas", localField: "resourceId", foreignField: "portfolioId", as: "idea" } },
      { "$unwind": { path: "$idea", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlStartupPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "startup" } },
      { "$unwind": { path: "$startup", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlFunderPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "funder" } },
      { "$unwind": { path: "$funder", preserveNullAndEmptyArrays: true } },
      { "$project": {
        "ownerName": { "$ifNull": ['$portfolioUser.profile.displayName', '$user.profile.displayName' ]},
        "name": 1,
        "type": 1,
        "isSelfAssigned":1,
        "status": 1,
        "communityName":  { "$ifNull": ["$portfolio.communityType",  "$userProfile.communityName" ] },
        "clusterName":  { "$ifNull": ["$portfolio.clusterName", "$userProfile.clusterName" ]},
        "idea": { "$ifNull": ["$idea.title", '']},
        "startup":  { "$ifNull": ["$startup.aboutUs.description", '']},
        "funder" : { "$ifNull": ["$mlFunderPortfolio.funderAbout.firstName"+"$mlFunderPortfolio.funderAbout.lastName", '']}
      }
      },
      {
        "$addFields": {
          "portfolioTitle": {"$concat": ["$idea","$startup","$funder"]},
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate("MlInternalTask", pipeline);
    count = data.length;
  }

  else if ( args.module === "myCurrentInternalTask" ) {

    let query = {
      attendee: userId,
      attendeeProfileId: profileId,
      status: { '$in': ['accepted', 'started'] }
    };

    let pipeline = [
      { "$match": query },
      { "$lookup": { from: "mlPortfolioDetails", localField: "resourceId", foreignField: "_id", as: "portfolio" } },
      { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "users", localField: "portfolio.userId", foreignField: "_id", as: "portfolioUser" } },
      { "$unwind": { path: "$portfolioUser", preserveNullAndEmptyArrays: true } },
      { "$lookup":{ from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { "$unwind": { path: "$user", preserveNullAndEmptyArrays: true } },
      { "$addFields": {
        "userProfile" : { "$filter": {
          "input": "$user.profile.externalUserProfiles",
          "as": "profile",
          "cond": {"$eq" : ["$$profile.profileId", profileId ] } //"$profileId",
        }
        }
      }},
      { "$unwind": { path: "$userProfile", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlIdeas", localField: "resourceId", foreignField: "portfolioId", as: "idea" } },
      { "$unwind": { path: "$idea", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlStartupPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "startup" } },
      { "$unwind": { path: "$startup", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlFunderPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "funder" } },
      { "$unwind": { path: "$funder", preserveNullAndEmptyArrays: true } },
      { "$project": {
        "ownerName": { "$ifNull": ['$portfolioUser.profile.displayName', '$user.profile.displayName' ]},
        "name": 1,
        "type": 1,
        "isSelfAssigned":1,
        "status": 1,
        "communityName":  { "$ifNull": ["$portfolio.communityType",  "$userProfile.communityName" ] },
        "clusterName":  { "$ifNull": ["$portfolio.clusterName", "$userProfile.clusterName" ]},
        "idea": { "$ifNull": ["$idea.title", '']},
        "startup":  { "$ifNull": ["$startup.aboutUs.description", '']},
        "funder" : { "$ifNull": ["$mlFunderPortfolio.funderAbout.firstName"+"$mlFunderPortfolio.funderAbout.lastName", '']}
      }
      },
      {
        "$addFields": {
          "portfolioTitle": {"$concat": ["$idea","$startup","$funder"]},
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate("MlInternalTask", pipeline);
    count = data.length;
  }

  else if ( args.module === "myCompletedInternalTask" ) {

    let query = {
      attendee: userId,
      attendeeProfileId: profileId,
      status: { '$in': ["completed"] }
    };

    let pipeline = [
      { "$match": query },
      { "$lookup": { from: "mlPortfolioDetails", localField: "resourceId", foreignField: "_id", as: "portfolio" } },
      { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "users", localField: "portfolio.userId", foreignField: "_id", as: "portfolioUser" } },
      { "$unwind": { path: "$portfolioUser", preserveNullAndEmptyArrays: true } },
      { "$lookup":{ from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { "$unwind": { path: "$user", preserveNullAndEmptyArrays: true } },
      { "$addFields": {
        "userProfile" : { "$filter": {
          "input": "$user.profile.externalUserProfiles",
          "as": "profile",
          "cond": {"$eq" : ["$$profile.profileId", profileId ] } //"$profileId",
        }
        }
      }},
      { "$unwind": { path: "$userProfile", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlIdeas", localField: "resourceId", foreignField: "portfolioId", as: "idea" } },
      { "$unwind": { path: "$idea", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlStartupPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "startup" } },
      { "$unwind": { path: "$startup", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlFunderPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "funder" } },
      { "$unwind": { path: "$funder", preserveNullAndEmptyArrays: true } },
      { "$project": {
        "ownerName": { "$ifNull": ['$portfolioUser.profile.displayName', '$user.profile.displayName' ]},
        "name": 1,
        "type": 1,
        "isSelfAssigned":1,
        "status": 1,
        "communityName":  { "$ifNull": ["$portfolio.communityType",  "$userProfile.communityName" ] },
        "clusterName":  { "$ifNull": ["$portfolio.clusterName", "$userProfile.clusterName" ]},
        "idea": { "$ifNull": ["$idea.title", '']},
        "startup":  { "$ifNull": ["$startup.aboutUs.description", '']},
        "funder" : { "$ifNull": ["$mlFunderPortfolio.funderAbout.firstName"+"$mlFunderPortfolio.funderAbout.lastName", '']}
      }
      },
      {
        "$addFields": {
          "portfolioTitle": {"$concat": ["$idea","$startup","$funder"]},
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate("MlInternalTask", pipeline);
    count = data.length;
  }

  else if ( args.module === "myRejectedInternalTask" ) {

    let query = {
      attendee: userId,
      attendeeProfileId: profileId,
      status: { '$in': ["rejected"] }
    };

    let pipeline = [
      { "$match": query },
      { "$lookup": { from: "mlPortfolioDetails", localField: "resourceId", foreignField: "_id", as: "portfolio" } },
      { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "users", localField: "portfolio.userId", foreignField: "_id", as: "portfolioUser" } },
      { "$unwind": { path: "$portfolioUser", preserveNullAndEmptyArrays: true } },
      { "$lookup":{ from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { "$unwind": { path: "$user", preserveNullAndEmptyArrays: true } },
      { "$addFields": {
        "userProfile" : { "$filter": {
          "input": "$user.profile.externalUserProfiles",
          "as": "profile",
          "cond": {"$eq" : ["$$profile.profileId", profileId ] } //"$profileId",
        }
        }
      }},
      { "$unwind": { path: "$userProfile", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlIdeas", localField: "resourceId", foreignField: "portfolioId", as: "idea" } },
      { "$unwind": { path: "$idea", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlStartupPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "startup" } },
      { "$unwind": { path: "$startup", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlFunderPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "funder" } },
      { "$unwind": { path: "$funder", preserveNullAndEmptyArrays: true } },
      { "$project": {
        "ownerName": { "$ifNull": ['$portfolioUser.profile.displayName', '$user.profile.displayName' ]},
        "name": 1,
        "type": 1,
        "isSelfAssigned":1,
        "status": 1,
        "communityName":  { "$ifNull": ["$portfolio.communityType",  "$userProfile.communityName" ] },
        "clusterName":  { "$ifNull": ["$portfolio.clusterName", "$userProfile.clusterName" ]},
        "idea": { "$ifNull": ["$idea.title", '']},
        "startup":  { "$ifNull": ["$startup.aboutUs.description", '']},
        "funder" : { "$ifNull": ["$mlFunderPortfolio.funderAbout.firstName"+"$mlFunderPortfolio.funderAbout.lastName", '']}
      }
      },
      {
        "$addFields": {
          "portfolioTitle": {"$concat": ["$idea","$startup","$funder"]},
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate("MlInternalTask", pipeline);
    count = data.length;
  }

  else if ( args.module === "mySelfInternalTask" ) {

    let query = {
      userId: userId,
      attendeeProfileId: profileId,
      isSelfAssigned: true,
      status: { '$in': ["pending"] }
    };

    let pipeline = [
      { "$match": query },
      { "$lookup": { from: "mlPortfolioDetails", localField: "resourceId", foreignField: "_id", as: "portfolio" } },
      { "$unwind": { path: "$portfolio", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "users", localField: "portfolio.userId", foreignField: "_id", as: "portfolioUser" } },
      { "$unwind": { path: "$portfolioUser", preserveNullAndEmptyArrays: true } },
      { "$lookup":{ from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { "$unwind": { path: "$user", preserveNullAndEmptyArrays: true } },
      { "$addFields": {
        "userProfile" : { "$filter": {
          "input": "$user.profile.externalUserProfiles",
          "as": "profile",
          "cond": {"$eq" : ["$$profile.profileId", profileId ] } //"$profileId",
        }
        }
      }},
      { "$unwind": { path: "$userProfile", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlIdeas", localField: "resourceId", foreignField: "portfolioId", as: "idea" } },
      { "$unwind": { path: "$idea", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlStartupPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "startup" } },
      { "$unwind": { path: "$startup", preserveNullAndEmptyArrays: true } },
      { "$lookup": { from: "mlFunderPortfolio", localField: "resourceId", foreignField: "portfolioDetailsId", as: "funder" } },
      { "$unwind": { path: "$funder", preserveNullAndEmptyArrays: true } },
      { "$project": {
        "ownerName": { "$ifNull": ['$portfolioUser.profile.displayName', '$user.profile.displayName' ]},
        "name": 1,
        "type": 1,
        "isSelfAssigned":1,
        "status": 1,
        "communityName":  { "$ifNull": ["$portfolio.communityType",  "$userProfile.communityName" ] },
        "clusterName":  { "$ifNull": ["$portfolio.clusterName", "$userProfile.clusterName" ]},
        "idea": { "$ifNull": ["$idea.title", '']},
        "startup":  { "$ifNull": ["$startup.aboutUs.description", '']},
        "funder" : { "$ifNull": ["$mlFunderPortfolio.funderAbout.firstName"+"$mlFunderPortfolio.funderAbout.lastName", '']}
      }
      },
      {
        "$addFields": {
          "portfolioTitle": {"$concat": ["$idea","$startup","$funder"]},
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate("MlInternalTask", pipeline);
    count = data.length;
  }
  else if(args.module === "cluster"){
    var activeClusters = [];
    // var user = Meteor.users.findOne({_id:context.userId});
    // if(user && user.profile && user.profile.isExternaluser === true && user.profile.isActive === true) {

      // var user_profiles = _.filter(user.profile.externalUserProfiles, {"isActive": true, "isApprove": true}) || [];

      // var clusterIds = _.map(user_profiles, "clusterId");
      // clusterIds = _.uniq(clusterIds);

      var clusters = mlDBController.find('MlClusters', {isActive:true}, context).fetch();

      _.each(clusters, function (cluster) {
        let country = mlDBController.findOne('MlCountries', {isActive: true, _id:cluster.countryId}, context, {sort: {country: 1}});
        if(country){
          activeClusters.push(cluster);
        }
      })
    // }

    const data = activeClusters;
    const totalRecords = activeClusters.length
    return {totalRecords: totalRecords, data: data};
  }
  else if(args.module === "chapter"){
    var activeChapters = [];
    // var user = Meteor.users.findOne({_id:context.userId});
    // if(user && user.profile && user.profile.isExternaluser === true && user.profile.isActive === true) {
    //
    //   var user_profiles = _.filter(user.profile.externalUserProfiles, {"isActive": true, "isApprove": true, "clusterId":args.queryProperty.query}) || [];
    //
    //   if(!user_profiles)
    //     throw new Error('Profile Not Found');
    //
    //   var chapterIds = _.map(user_profiles, "chapterId");
    //   chapterIds = _.uniq(chapterIds);

      var chapters = mlDBController.find('MlChapters', {clusterId:args.queryProperty.query, isActive:true}, context).fetch();

      _.each(chapters, function (chapter) {
        let city = mlDBController.findOne('MlCities', {isActive: true, _id:chapter.cityId}, context, {sort: {country: 1}});
        if(city){
          activeChapters.push(chapter);
        }
      })
    // }

    const data = activeChapters;
    const totalRecords = activeChapters.length
    return {totalRecords: totalRecords, data: data};
  }
  else if(args.module === "subChapter"){
    var activeChapters = [];
    // var user = Meteor.users.findOne({_id:context.userId});
    // if(user && user.profile && user.profile.isExternaluser === true && user.profile.isActive === true) {
    //
    //   var user_profiles = _.filter(user.profile.externalUserProfiles, {"isActive": true, "isApprove": true, "chapterId":args.queryProperty.query}) || [];
    //
    //   if(!user_profiles)
    //     throw new Error('Profile Not Found');
    //
    //   var subChapterIds = _.map(user_profiles, "subChapterId");
    //   subChapterIds = _.uniq(subChapterIds);

      var subChapters = mlDBController.find('MlSubChapters', {chapterId:args.queryProperty.query, isActive:true}, context).fetch();

    // }

    const data = subChapters;
    const totalRecords = subChapters.length
    return {totalRecords: totalRecords, data: data};
  }

  else {
    return {
      count: 0,
      data:[

      ]
    }
  }

  return {
    count : count,
    data : data
  }

};
