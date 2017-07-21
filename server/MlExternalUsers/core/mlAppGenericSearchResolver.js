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
      case "EXTERNALUSERS":
        return'Users';
        break;
      default:
        return 'Generic';
    }
  }
};

MlResolver.MlQueryResolver['AppGenericSearch'] = (obj, args, context, info) =>{
  // console.log(obj, args);
  let moduleName = args ? args.module : "";
  moduleName =moduleName.toUpperCase();
  let count = 0;
  let data = [];
  // console.log(args);
  let findOptions = {
    skip: args.queryProperty&&args.queryProperty.skip,
    limit: args.queryProperty&&args.queryProperty.limit
  };
  if (moduleName == "FUNDERPORTFOLIO") {
      let value = mlDBController.find('MlPortfolioDetails', {status: 'gone live', communityCode: "FUN"}, context).fetch()    //making dependency of funders on portfolio status
      let portId = _.map(value, '_id');
      let finalQuery = {portfolioDetailsId: {$in: portId}};
      data = MlFunderPortfolio.find(finalQuery, findOptions).fetch();
      count = MlFunderPortfolio.find(finalQuery).count();
  }

  else if (args.module == "serviceProviderPortfolioDetails") {
    let value = mlDBController.find('MlPortfolioDetails', {status: 'gone live', communityCode: "SPS"}, context).fetch()
    let portId = _.map(value, '_id')
    let finalQuery = {portfolioDetailsId: {$in: portId}};
    data = MlServiceProviderPortfolio.find(finalQuery, findOptions).fetch();
    count = MlServiceProviderPortfolio.find(finalQuery, findOptions).count();
  }
  else if (args.module == "startupPortfolioDetails") {
    let value = mlDBController.find('MlPortfolioDetails', {status: 'gone live', communityCode: "STU"}, context).fetch()
    let portId = _.map(value, '_id')
    let finalQuery = {portfolioDetailsId: {$in: portId}};
    data = MlStartupPortfolio.find(finalQuery, findOptions).fetch();
    count = MlStartupPortfolio.find(finalQuery, findOptions).count();
  }

  else if (args.module == "ideatorPortfolioDetails") {
    var allIds = [];
    var ideator =[];

    var allIdeas = MlIdeas.find({isActive:true}).fetch();
    allIds = _.map(allIdeas, "userId");
    allIds = _.uniq(allIds);

    _.each(allIds, function (userId) {
      let portfolios = MlPortfolioDetails.find({userId:userId, status: 'gone live'}).fetch();
      var ideasArr = [];
      if(!_.isEmpty(portfolios)){                                                           /**checking portfolio is there or not with this ID*/
      _.each(portfolios, function (portfolio) {
          let ideas = MlIdeas.findOne({portfolioId:portfolio._id}) || {};
          ideasArr.push(ideas);
        })
        let user = Meteor.users.findOne({_id:userId});
        let ideaObj = {
          userId:userId,
          ideas:ideasArr,
          chapterName:portfolios[0].chapterName,
          name:user.profile.firstName+" "+user.profile.lastName,
          accountType:portfolios[0].accountType
        }
        ideator.push(ideaObj)
      }
    })
    //todo://need to include the search params in the query it self this is need to be change
    data = ideator;
    count = ideator.length;
  }
  else if (args.module == "externalUsers"){
    var totalRecords=0;

    if(args.offset && args.offset >0){   // `offset` may be `null`
      findOptions.skip=args.queryProperty.offset;
    };

    if (args.limit&&args.limit > 0) { // `limit` may be `null`
      findOptions.limit = args.queryProperty.limit;
    }

    let userFilterQuery={}; //'filter' applied by user
    if (args.fieldsData){
      userFilterQuery = getQuery.searchFunction(args);
    }

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

              var allUsers = mlDBController.find('users', {"$and":[{"profile.isSystemDefined":{$exists:false}},{"profile.isExternaluser":true}, {'profile.externalUserProfiles':{$elemMatch: queryObj}}]}, context, findOptions).fetch();

              _.each(allUsers, function (user){
                  let userProfiles = user.profile.externalUserProfiles;
                  let profile = _.find(userProfiles,  {'clusterId': cluster._id, 'communityDefCode': userType});
                  // _.each(userProfiles, function (profile) {
                      let userObj = {};
                      if (profile && profile.communityDefCode) {
                          if (profile.communityDefName == userType) {
                              userObj._id= user._id;
                              userObj.profile = user.profile;
                              userObj.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
                              userObj.communityCode = profile.communityDefCode;
                              let externalAdditionalInfo = _.find(user.profile.externalUserAdditionalInfo, {profileId:profile.profileId});
                              var latitude = null;
                              var longitude = null;
                              if(externalAdditionalInfo && externalAdditionalInfo.addressInfo && externalAdditionalInfo.addressInfo.length>0){   /*profile of the user should be there*/
                                  var address = _.find(externalAdditionalInfo.addressInfo, {isDefaultAddress:true});
                                  if(!address){
                                     address = externalAdditionalInfo.addressInfo[0]
                                  }
                                  latitude = address.latitude;
                                  longitude = address.longitude;
                              }
                              userObj.latitude = latitude;
                              userObj.longitude = longitude;
                              users.push(userObj);
                          }
                      }
                  // })
              })
          }

        // FOR All
        else{
            var externalUsers = mlDBController.find('users', {"$and": [{"profile.isSystemDefined": {$exists: false}}, {"profile.isExternaluser": true}, {'profile.externalUserProfiles': {$elemMatch: queryObj}}]}, context, findOptions).fetch();

            if (externalUsers && externalUsers.length > 0) {
                _.each(externalUsers, function (user) {
                    let userProfiles = user.profile.externalUserProfiles;
                    let profile = _.find(userProfiles, {
                      'clusterId': clusterId
                    });
                    if (profile && profile.communityDefCode) {
                    //     _.each(userProfiles, function (profile) {
                            let userObj = {};
                            userObj._id= user._id;
                            userObj.profile = user.profile;
                            userObj.name = (user.profile.firstName ? user.profile.firstName : "") + " " + (user.profile.lastName ? user.profile.lastName : "");
                            userObj.communityCode = profile.communityDefCode ? profile.communityDefCode : " ";
                            if (user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length > 0) {
                                let externalAdditionalInfo = _.find(user.profile.externalUserAdditionalInfo, {profileId:profile.profileId});
                                var latitude = null;
                                var longitude = null;
                                if(externalAdditionalInfo && externalAdditionalInfo.addressInfo && externalAdditionalInfo.addressInfo.length>0){   /*profile of the user should be there*/
                                    var address = _.find(externalAdditionalInfo.addressInfo, {isDefaultAddress:true});
                                    if(!address){
                                        address = externalAdditionalInfo.addressInfo[0]
                                    }
                                    latitude = address.latitude;
                                    longitude = address.longitude;
                                }
                                userObj.latitude = latitude;
                                userObj.longitude = longitude;
                                users.push(userObj);
                            }
                    //     })
                    }
                })
            }
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
