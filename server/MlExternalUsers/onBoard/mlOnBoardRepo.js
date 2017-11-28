import MlTransactionsHandler from '../../commons/mlTransactionsLog';
import _ from 'lodash';

class MlOnBoard {
  getUserDetails(userId) {
    const user = mlDBController.findOne('users', { _id: userId }) || {};
    return user;
  }

  fetchContextUserDetails(context) {
    const contextUserId = context ? context.userId : null;
    const contextUser = this.getUserDetails(contextUserId) || {};
    return { contextUserId: contextUser._id, contextUserName: contextUser.username, contextUser };
  }


  createTransactionRequest(userId, transType, portfolioId, resourceId, fromUserId, fromUserType, context) {
    try {
      const transactionType = transType;
      switch (transactionType) {
        case 'investments':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'onBoard',
            activity: 'onBoard',
            transactionType: 'investments',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'investments',
            context: context || {},
            transactionTypeId: 'investments',
            fromUserType
          });
          break;
      }
    } catch (e) {
      // console
      console.log(e);
    }
  }
}

const mlOnBoard = new MlOnBoard();
Object.freeze(mlOnBoard);

export default mlOnBoard;
