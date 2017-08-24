/** ************************************************************
 * Date: 11 Jun, 2017
 * Programmer: Pankaj <pankajkumar.jatav@raksan.in>
 * Description : Generic search engine schema
 * JavaScript file mlAppGenericSearch.js
 * *************************************************************** */

/**
 * Import Graphql libs
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";

let appGenericSearch = `
    
    scalar JSON

    union AppGenericSearchUnion = Activity | FunderPortfolio | serviceProviderPortfolioDetails | startupPortfolioOutput | Ideator | Users | InstitutionPortfolio | CompanyPortfolio
   
    type AppGenericSearchResponse {
      count:Int,
      data:[AppGenericSearchUnion]
    }
    
    input appGenericSearchQueryProperty {
      limit : Int
      sortBy : String
      skip : Int,
      query : String
    }
  
    type Query {
      AppGenericSearch(module: String!, queryProperty: appGenericSearchQueryProperty): AppGenericSearchResponse!
    }
  `;

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],appGenericSearch]);
let supportedApi = [{api:'AppGenericSearch', actionName:'READ', moduleName:"GENERIC"}];
MlResolver.MlModuleResolver.push(supportedApi);
