
/**
 * Created by muralidhar on 17/05/17.
 */
import mlGenericTransactions from '../impl/MlGenericTransactions';
class MlTransactionsEngine {
  constructor() {
    if (!MlTransactionsEngine.instance) {
      MlTransactionsEngine.instance = this;
    }
    return MlTransactionsEngine.instance;
  }

  fetchTransactions(transactionType) {
    switch (transactionType) {
      case 'Registration':
        const registrationInstance = mlGenericTransactions;
        return registrationInstance;
        break;
      case 'Portfolio':
        const porfolioInstance = mlGenericTransactions;
        return porfolioInstance;
        break;
    }
  }
}

const mlTransactionsEngine = new MlTransactionsEngine();
Object.freeze(mlTransactionsEngine);

export default mlTransactionsEngine;

