
//import MlUserContext from '../mlUserContext'
import MlRespPayload from '../../../commons/mlPayload'
//import _ from 'lodash'

//import moment from "moment";
//import MlTransactionsHandler from '../../commons/mlTransactionsLog';


class MlLibraryRepo {
  constructor() {
  }

  portfolioLibraryCreation(portfolioDetailsId, libraryData, context){
    let portfolioContainer = [];
    try {
      let portfolioUserId = mlDBController.findOne('MlPortfolioDetails', portfolioDetailsId, context).userId;
      let portfolioInfo = {
        portfolioId: portfolioDetailsId,
        isPrivate: portfolioUserId !== context.userId ? false : true
      };
      portfolioContainer.push(portfolioInfo)
      libraryData.portfolioReference = portfolioContainer;
      libraryData.userId = portfolioUserId === context.userId ? context.userId : portfolioUserId;
      let newPortfolio = mlDBController.insert('MlLibrary', args.detailsInput, context)
      newPortfolio = newPortfolio ?  new MlRespPayload().successPayload(result, 200) : new MlRespPayload().errorPayload(e.message, 400);
      return newPortfolio;
    }
    catch(e) {return new MlRespPayload().errorPayload(e.message, 400);}
  }
}

module.exports = MlLibraryRepo
