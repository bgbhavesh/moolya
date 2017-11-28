/**
 * Created by vishwadeep.kapoor on 07/08/17.
 */
import _ from 'lodash';
import MlTransactionsHandler from '../../commons/mlTransactionsLog';
class MlOfficeInteractionService {
  constructor() {
    if (!MlOfficeInteractionService.instance) {
      MlOfficeInteractionService.instance = this;
    }
    return MlOfficeInteractionService.instance;
  }

  // getUserDetails(userId) {
  //   var user = mlDBController.findOne('users', {_id: userId}, context) || {};
  //   return user;
  // }
  //
  // fetchContextUserDetails(context) {
  //   var contextUserId = context ? context.userId : null;
  //   var contextUser = this.getUserDetails(contextUserId) || {};
  //   return {contextUserId: contextUser._id, contextUserName: contextUser.username, contextUser: contextUser};
  // }

  createTransactionRequest(userId, transType, officeId, resourceId, fromUserId, fromUserType, context) {
    try {
      const activityType = transType;
      switch (activityType) {
        case 'officeDeactivate':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'officeDeactivate',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office Deactivate',
            context: context || {},
            transactionTypeId: 'office Deactivate',
            fromUserType
          });
          break;
        case 'officeBearerInvitation':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'officeBearerInvitation',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office Bearer Invitation',
            context: context || {},
            transactionTypeId: 'office',
            fromUserType
          });
          break;
        case 'principal':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'principal',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office principal',
            context: context || {},
            transactionTypeId: 'office',
            fromUserType
          });
          break;
        case 'officeBearerGoIndependent':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'goIndependent',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office bearer go independent',
            context: context || {},
            transactionTypeId: 'office',
            fromUserType
          });
          break;
        case 'retireOfficeBearer':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'retire OfficeBearer',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office bearer retired',
            context: context || {},
            transactionTypeId: 'office',
            fromUserType
          });
          break;
        case 'deactivateOfficeBearer':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'office',
            activity: 'deactivate OfficeBearer',
            transactionType: 'office',
            userId,
            activityDocId: resourceId,
            docId: officeId,
            transactionDetails: 'office bearer deactivated',
            context: context || {},
            transactionTypeId: 'office',
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
const mlOfficeInteractionService = new MlOfficeInteractionService();
Object.freeze(mlOfficeInteractionService);

export default mlOfficeInteractionService;

