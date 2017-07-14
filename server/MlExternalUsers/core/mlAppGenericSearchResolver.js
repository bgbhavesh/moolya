/** ************************************************************
 * Date: 11 Jun, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Generic search engine app
 * JavaScript file mlAppGenericSearch.js
 * *************************************************************** */

/**
 * Import Graphql libs
 */
import MlResolver from '../../commons/mlResolverDef';
import _ from "underscore";
import _lodash from "lodash";

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
      let portId = _lodash.map(value, '_id');
      // let finalQuery = mergeQueries(query, {portfolioDetailsId: {$in: portId}});
      let finalQuery = {portfolioDetailsId: {$in: portId}};
      data = MlFunderPortfolio.find(finalQuery, findOptions).fetch();
      count = MlFunderPortfolio.find(finalQuery).count();
  }

  else if (args.module == "serviceProviderPortfolioDetails") {
    let value = mlDBController.find('MlPortfolioDetails', {status: 'gone live', communityCode: "SPS"}, context).fetch()
    let portId = _lodash.map(value, '_id')
    // let finalQuery = mergeQueries(query, {portfolioDetailsId: {$in: portId}});
    let finalQuery = {portfolioDetailsId: {$in: portId}};
    data = MlServiceProviderPortfolio.find(finalQuery, findOptions).fetch();
    count = MlServiceProviderPortfolio.find(finalQuery, findOptions).count();
  }

  else {
    return {
      count: 10,
      data:[
        {_id: 3, name:"pankaj", displayName:"Hello"},
        {_id: 4, name:"pankaj1", displayName:"Hello1"}
      ]
    }
  }

  return {
    count : count,
    data : data
  }

};
