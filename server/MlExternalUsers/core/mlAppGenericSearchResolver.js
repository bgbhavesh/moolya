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
    skip: args.queryProperty.skip,
    limit: args.queryProperty.limit
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
