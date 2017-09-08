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
        break
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
      default:
        return 'Generic';
    }
  }
};

MlResolver.MlQueryResolver['AppGenericSearch'] = (obj, args, context, info) =>{

  let filterQuery = args.queryProperty && args.queryProperty.filterQuery ? JSON.parse(args.queryProperty.filterQuery) : {};
  let searchText = args.queryProperty && args.queryProperty.searchText ? args.queryProperty.searchText : '';
  let searchFields = args.queryProperty && args.queryProperty.searchFields ? args.queryProperty.searchFields : [];

  let searchQuery = {};
  if(searchText && searchFields.length){
    searchQuery = searchFields.map( (field) => {
      let res = {};
      res[field] = new RegExp(searchText, 'ig');
      return res;
    });
    searchQuery = { "$or" : searchQuery };
  }

  console.log(filterQuery, searchFields, searchText, searchQuery);

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
      {'$match': {"port.status": "gone live", 'port.communityCode': "FUN", 'port.subChapterId': subChapterQuery}},
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
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
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
      {'$match': {"port.status": "gone live", 'port.communityCode': "SPS", 'port.subChapterId': subChapterQuery}},
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
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
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
      {'$match': {"port.status": "gone live", 'port.communityCode': "STU", 'port.subChapterId': subChapterQuery}},
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
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
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
      {'$match': {"port.status": "gone live", 'port.communityCode': "IDE", subChapterId: subChapterQuery } },
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
            "description": "$description"
          }],
          "chapterName": "$port.chapterName",
          "name": "$user.profile.firstName" + " " + "$user.profile.lastName",
          "accountType": "$port.accountType",
          "clusterId": '$port.clusterId',
          "chapterId": '$port.chapterId',
          "communityCode": '$port.communityCode',
          "industryId": '$port.industryId',
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
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
      {'$match': {"port.status": "gone live", 'port.communityCode': "INS", 'port.subChapterId': subChapterQuery}},
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
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
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
      {'$match': {"port.status": "gone live", 'port.communityCode': "CMP", 'port.subChapterId': subChapterQuery}},
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
          industryId: '$port.industryId'
        }
      },
      { $match: { "$and":  [ searchQuery, filterQuery ] } }
    ];
    data = mlDBController.aggregate('MlCompanyPortfolio', pipleline, context);
    count = data.length;
  }
  /*********************************************end of all portfolio queries************************************/
  else if (args.module == "externalUsers"){
    // if(args.offset && args.offset >0){   // `offset` may be `null`
    //   findOptions.skip=args.queryProperty.offset;
    // };
    //
    // if (args.limit&&args.limit > 0) { // `limit` may be `null`
    //   findOptions.limit = args.queryProperty.limit;
    // }
    //
    // let userFilterQuery={}; //'filter' applied by user
    // if (args.fieldsData){
    //   userFilterQuery = getQuery.searchFunction(args);
    // }

    var userType = args.queryProperty.query; // Funder, Ideator, Startup, etc.

    let loggedInUser = mlDBController.findOne('users', {'_id':context.userId}, context);
    var externalProfile = _.find(loggedInUser.profile.externalUserProfiles, {'isDefault':true});
    if(!externalProfile){
      externalProfile = loggedInUser.profile.externalUserProfiles[0];
    }

      // TODO: Add Browser condition

    var clusterId = externalProfile.clusterId;
    var chapterId = externalProfile.chapterId;
    var subChapterId = externalProfile.subChapterId;
    var communityCode = externalProfile.communityDefName;

    // Generic search query object for EXTERNAL Users
    var queryObj = {isActive: true};

    var users = [];

    if(clusterId != "" && chapterId != "" && subChapterId != "" && communityCode != ""){
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
              {
                $unwind :"$profile.externalUserProfiles"
              },
              {$match:{"profile.externalUserProfiles.clusterId":clusterId, "profile.externalUserProfiles.communityDefName":userType, "profile.externalUserProfiles.isApprove":true,"profile.externalUserProfiles.isActive":true}},  // Filter out specific community
              {
                $project:{
                  _id : 1,
                  name: "$profile.displayName",
                  communityCode: "$profile.externalUserProfiles.communityDefCode",
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
                  communityCode: "$profile.externalUserProfiles.communityDefCode",
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
